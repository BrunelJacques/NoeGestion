#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------
# stModule: gestion des stocks opérations d'inventaire et cohérence
# ------------------------------------------------------------------------
from outils import xformat
from appli_python.ap_databases import DB
from appli_python.ap_db_sql import *
import stdb_utils as su


class Inventaire:
    # calculs d'inventaire FIFO à une date donnée dite clôture
    today = datetime.date.today()

    def __init__(self, cloture=today, dbConfig='default', achat='achat'):
        # 'achat' origine avec prix s'appliquant aux autres mvts en priorité
        self.achat = achat
        self.db = None
        # si dbConfig n'est pas fourni, il y a un différé de la définition
        if dbConfig:
            self.db = DB(dbConfig)
        if not isinstance(cloture, datetime.date):
            raise Exception("Date '%s' pas de type datetime!" % str(cloture))
        self.cloture = cloture
        self.mvtsCorriges = []
        self.lastInventaire = self._GetLastInventaire(cloture)

    def _SetDB(self, dbConfig, mute):
        self.db = DB(dbConfig, mute)

    def _IsAchat(self, origine):
        ok = False
        if origine.find(self.achat) >= 0: ok = True
        if origine.find('invent') >= 0: ok = True
        return ok

    def _xAjoutInventaire(self, lstMmouvements):
        # ajout de la reprise d'inventaire dans des mouvements sur une péiode
        if not self.lastInventaire: return
        for ligne in self.lastInventaire:
            jour, article, qte, pxMoyen = ligne[:4]
            lstMmouvements.append([None, jour, "inventaire", article, qte, pxMoyen])
        return

    def _CalculInventaireUnArticle(self, mvts=[[], ]):
        # mouvements en tuple (id,date,origine, qte,pu) qte est signé
        mttFin = 0
        qteProgress = 0
        qteFin = sum([qte for id, dte, origine, qte, pu in mvts])

        lstPU = [pu for id, dte, origine, qte, pu in mvts if
                 pu and self._IsAchat(origine)]
        if len(lstPU) == 0:
            # si pas d'entrée principale: moyenne des prix présents
            lstPU = [pu for id, dte, origine, qte, pu in mvts if
                     (pu and (pu > 0))]

        # calcul d'une valeur par défaut de prix unitaire
        if len(lstPU) > 0:
            pu = sum(lstPU) / len(lstPU)
        else:
            pu = 1

        # recherche des derniers achats (reverse), pour calcul du reste final
        lastPrix = None
        for id, dte, origine, qte, pu in sorted(mvts,
                                                key=lambda x: (x[1], x[0]),
                                                reverse=True):
            # ne prend que les achats
            if not self._IsAchat(origine):
                continue
            if not lastPrix:
                lastPrix = pu
            # cet achat n'a pas été consommé, inférieur au reste en stock
            if qteProgress + qte < qteFin:
                mttFin += qte * pu
                qteProgress += qte
            else:
                break
        # ajuste la dernière part
        if qteProgress != qteFin:
            # prend une part de cet achat restant partiellement
            part = qteFin - qteProgress
            mttFin += (part * pu)

        # retour : qte, mttTotal à la date de clôture
        return qteFin, round(mttFin, 2), lastPrix

    def _xRecalculPrixSortiesUnArticle(self, mvts=[[], ]):
        # mouvements en liste (id,date,origine, qte,pu) qte est signé
        mvts.sort(key=lambda x: (x[1], x[0]))  # tri sur deux champs date, ID

        # sépare les mouvements achats,entrées, sorties
        dicAchats = {}
        dicEntrees = {}
        lstEntrees = []
        lstSorties = []
        firstAchat = None
        mttAchats = 0
        for mvt in mvts:
            id, dte, origine, article, qte, pu = mvt
            # les achats vont dans un dic
            if self._IsAchat(origine):
                if not firstAchat and pu > 0:
                    firstAchat = pu
                mttAchats += round(pu * qte, 2)
                if not (dte, id) in dicAchats:
                    dicAchats[(dte, id)] = {}
                dicAchats[(dte, id)]['qteIn'] = qte
                dicAchats[(dte, id)]['mvt'] = mvt
            # les autres entrées vont dans un dicEntree et une liste
            elif qte > 0:
                if not (dte, id) in dicEntrees:
                    dicEntrees[(dte, id)] = {}
                dicEntrees[(dte, id)]['qteIn'] = qte
                dicEntrees[(dte, id)]['mvt'] = mvt
                lstEntrees.append(mvt)
            # les sorties sont dans une liste qui sera triée par date
            else:
                lstSorties.append(mvt)

        # si pas de sortie : abandon
        if len(lstSorties) == 0: return

        # init de l'affectation des entrées sur sorties (qte et montants)
        tmpAffect = {}
        firstOdIn = None
        firstSortie = None
        for mvt in lstSorties:
            tmpAffect[mvt[0]] = {'qteAff': 0, 'mttAff': 0}
            if not firstSortie and (mvt[5] != 0): firstSortie = mvt[5]
            if not firstOdIn and (mvt[5] != 0) and (mvt[4] > 0):
                firstSortie = mvt[5]
            lastIx = mvt[0]

        def determinePrixEstime():
            # prix moyen des achats ou inventaire
            if firstAchat and firstAchat > 0:
                prixEstime = firstAchat
            elif firstOdIn:
                # on prend le prix de la première odIn
                prixEstime = firstOdIn
            else:
                # on prend le prix de la première sortie
                prixEstime = firstSortie
            return prixEstime

        prixEstime = determinePrixEstime()

        def affectPrixEstime(mvts):
            # après affectation des achats il reste des sorties
            for mvt in mvts:
                ix = mvt[0]
                if (not ix in tmpAffect) or (tmpAffect[ix]['qteAff'] == 0):
                    # on met le prix moyen
                    if mvt[5] != prixEstime:
                        mvt[5] = prixEstime  # modif interne
                        self.dicPrixMvtNew[mvt[0]] = prixEstime  # pour modif BD
                elif tmpAffect[ix]['qteAff'] < -mvt[4]:
                    nbrest = -mvt[4] - tmpAffect[ix]['qteAff']
                    newPrix = (nbrest * prixEstime) + tmpAffect[ix]['mttAff']
                    newPrix = newPrix / (nbrest + tmpAffect[ix]['qteAff'])
                    newPrix = round(newPrix, 4)
                    if mvt[5] != newPrix:
                        mvt[5] = newPrix  # modif interne
                        self.dicPrixMvtNew[mvt[0]] = newPrix  # pour modif BD

        def modifPrixMvts(dicIn, lmvtsOut):
            for (dteIn, id), dicMvtIn in dicIn.items():
                qteIn = dicMvtIn['qteIn']
                if qteIn == 0: continue
                mvtIn = dicMvtIn['mvt']
                puIn = mvtIn[5]
                # recherche sorties non affectées à une entrée et applique le prix
                for mvt in lmvtsOut:
                    id, dateOut, origine, article, qteOut, puOut = mvt
                    ix = id
                    qteAffecte = tmpAffect[ix]['qteAff']
                    if qteOut < 0 and qteAffecte >= -qteOut: continue
                    if qteOut == 0: continue

                    # l'entrée impute son prix sur la sortie,
                    qteLettre = min(qteIn, -qteOut - qteAffecte)
                    prixLettre = puIn
                    montantLettre = prixLettre * qteLettre
                    tmpAffect[ix]['qteAff'] += qteLettre
                    tmpAffect[ix]['mttAff'] += montantLettre
                    puOutNew = tmpAffect[ix]['mttAff'] / tmpAffect[ix]['qteAff']
                    qteIn -= qteLettre
                    # ici le prix de la sortie est actualisé (élément de liste)
                    if puOut != puOutNew:
                        mvt[5] = puOutNew  # modif interne
                        self.dicPrixMvtNew[id] = puOutNew  # pour modif BD
                    if qteIn == 0:
                        break
                    if qteIn < 0:
                        raise Exception("SurAffectation de l'entrée %s:%s" % (
                            dteIn, dicMvtIn))

        # aligne le prix des odIn sur le prix moyen des achats ou estime
        if len(lstEntrees) > 0:
            affectPrixEstime(lstEntrees)
            # coeur: affectation du prix odIn sur les sorties plus anciennes
            modifPrixMvts(dicEntrees, lstSorties)

        # coeur: affectation du prix d'entrée sur les sorties plus anciennes
        modifPrixMvts(dicAchats, lstSorties)

        # vérif si toutes les sorties ont été couvertes par des achats
        if tmpAffect[lastIx]['qteAff'] == 0:
            affectPrixEstime(lstSorties)

    def _CloseDB(self):
        self.db.Close()

    def _GetLastInventaire(self, jour=datetime.date.today()):
        # retourne l'inventaire précédent le jour donné
        lastInventaire = su.GetLastInventaire(self.db, jour)
        if len(lastInventaire) == 0:
            lastInventaire = None
        return lastInventaire

    # -------- Méthodes disponibles pour les lanceurs---------------------------

    def MajQtePrixArticles(self, fin=datetime.date.today()):
        # Met à jour les champs qte prixMoyen dans article
        if self.db.nomBase == 'noegestion':
            nameid = 'id'
        else:
            nameid = 'idArticle'
        lstChamps = [nameid, 'qteStock', 'prixMoyen', 'prixActuel']

        # lecture des valeurs actuelles
        ddArticles = su.GetArticles(self.db, lstChamps)
        if len(ddArticles) == 0:
            return False

        # recalcul de l'inventaire à aujourd'hui
        llinventaire = self.CalculInventaire(fin=fin)

        def appendArticle(article, qte, prixMoyen, lastPrix, ):
            artIn = ddArticles[article]
            artOut = [artIn[nameid], qte, prixMoyen, lastPrix, ]
            llarticles.append(artOut)

        # exportation des valeurs d'inventaire pour stArticles
        llarticles = []
        lstNomsArt = []
        # ligne :[dte, article, qte, prixMoyen, montant, lastPrix]
        for dte, article, qte, prixMoyen, montant, lastPrix in llinventaire:
            lstNomsArt.append(article)
            if not lastPrix: lastPrix = 0
            appendArticle(article, qte, prixMoyen, lastPrix, )

        # raz des qtés article pas à zéro et pas dans l'inventaire
        for key, dicArt in ddArticles.items():
            if not key in lstNomsArt and dicArt['qteStock'] != 0:
                article = dicArt[nameid]
                qte = 0
                # seule la qte sera RAZ
                prixMoyen = dicArt['prixMoyen']
                lastPrix = dicArt['prixActuel']
                appendArticle(article, qte, prixMoyen, lastPrix, )

        ok = su.PostArticles(self.db, lstChamps, llarticles)
        return ok

    def PostInventaire(self):
        # Enregistre les lignes d'inventaire à la date cloture
        ret = self.MajPrixSortiesMouvements()
        if ret: llinventaire = self.CalculInventaire()
        ok = su.PostInventaire(self.db, self.cloture, llinventaire)
        return ok

    def CalculInventaire(self, fin=None):
        # retourne un inventaire, sans écrire dans les tables
        """format de retour: liste de liste,
        ce calcul alimente self.mttInventaire"""
        if fin == None:
            fin = self.cloture
        else:
            self.lastInventaire = su.GetLastInventaire(self.db, fin)

        apres = None
        if self.lastInventaire:
            # présence d'un inventaire antérieur
            apres = xformat.DateToDatetime(self.lastInventaire[0][0])

        # mouvements['jour', 'origine', 'article_id', 'qteMouvement','prixUnit']
        llMouvements = su.GetMouvements(self.db, apres=apres, fin=fin)
        # ajoute l'inventaire précédent aux mouvements filtrés
        self._xAjoutInventaire(llMouvements)

        # liste préalable pour traitement par article
        lstArticles = []
        for id, jour, origine, article, qte, pu in llMouvements:
            if not article:
                raise Exception("Article disparu! mvt du %s qte= %d" % (jour, qte))
            if not article in lstArticles:
                lstArticles.append(article)
        lstArticles.sort()
        if lstArticles == None:
            raise Exception("Aucun mouvement dans la période du %s au %s" \
                            % (apres, fin))

        # composition de l'inventaire
        llinventaire = []
        self.mttInventaire = 0
        for article in lstArticles:
            """if article == 'BISC COOKIES PAQUET':
                print()"""
            lstMvts = [x[0:3] + x[4:] for x in llMouvements if x[3] == article]
            qte, mtt, lastPrix = self._CalculInventaireUnArticle(lstMvts)
            self.mttInventaire += mtt
            if qte == 0:
                pu = 0.0
            else:
                pu = round(mtt / qte, 4)
            if qte != 0 and mtt != 0:
                # compose [dte,article,qte,prixMoyen,montant,lastPrix]
                llinventaire.append([
                    xformat.DatetimeToStr(fin, iso=True),
                    article,
                    round(qte, 4),
                    pu,
                    round(mtt, 4),
                    lastPrix,
                ])
        return llinventaire

    def MajPrixSortiesMouvements(self, fin=None):
        # modifie les prix de table mouvements pour sorties et od_in
        ok = False
        if fin == None:
            fin = self.cloture
        else:
            self.lastInventaire = self._GetLastInventaire(fin)

        apres = None
        if self.lastInventaire:
            # présence d'un inventaire antérieur
            apres = xformat.DateToDatetime(self.lastInventaire[0][0])

        # ['jour', 'origine', 'article_id', 'qteMouvement','prixUnit']
        self.mvtsCorriges = su.GetMouvements(self.db, apres=apres, fin=fin)
        self._xAjoutInventaire(self.mvtsCorriges)
        self.mvtsCorriges.sort(key=lambda x: (x[1], x[0]))

        lstArticles = []
        # listes préalable, chaque article est traité à part
        for id, jour, origine, article, qte, pu in self.mvtsCorriges:
            if not article in lstArticles:
                lstArticles.append(article)
        lstArticles.sort()
        if lstArticles == None:
            raise Exception("Aucun mouvement dans la période du %s au %s" \
                            % (apres, fin))

        nbrUpdates = 0
        self.llModifsMouvements = []
        for artArt in lstArticles:
            mvtsArticle = []
            self.dicPrixMvtOld = {}
            self.dicPrixMvtNew = {}
            # isole les mouvements de l'article
            for id, jour, origine, artMvt, qte, pu in self.mvtsCorriges:
                if artMvt != artArt:
                    continue
                self.dicPrixMvtOld[id] = pu
                mvtsArticle.append([id, jour, origine, artMvt, qte, pu])

            # if artArt == "ABRICOTS FRAIS KG": print()# debug arrêt sur article
            self._xRecalculPrixSortiesUnArticle(mvtsArticle)
            for id, prix in self.dicPrixMvtNew.items():
                # les calculs intermédiaires font varier temporairement prix
                if abs(prix - self.dicPrixMvtOld[id]) > 0.0001:
                    self.llModifsMouvements.append([id, prix])
                    nbrUpdates += 1
            ok = True

        # écrit les modifs dans la table mouvements
        su.PostMouvements(self.db, champs=['id', 'prixUnit', ],
                          mouvements=self.llModifsMouvements)
        print("Nbre d'articles modifiés:", nbrUpdates)
        return ok


class Tests:
    def __init__(self, name=None):
        ok = True
        if not name:
            for method in [
                self.CalculInventaire,
                self.RecalculPrixSorties,
            ]:
                ok = ok & method()
                del method
        else:
            ok = eval("self.%s()" % (name))
        self.ok = ok

    def CalculInventaire(self):
        ret = Inventaire().CalculInventaire()
        if len(ret) > 0: return True
        return False

    def MajPrixSortiesMouvements(self):
        ret = Inventaire().MajPrixSortiesMouvements()
        return ret


if __name__ == '__main__':
    import os

    os.chdir("..")
    inv = Inventaire(datetime.date(2021, 9, 30), 'lan_noegestion')
    # test = Tests()
    # test = Tests("CalculInventaire")
    # test = inv.MajPrixSortiesMouvements()
    # test = inv.MajQtePrixArticles()
    test = inv.PostInventaire()
    print(inv.mttInventaire)
