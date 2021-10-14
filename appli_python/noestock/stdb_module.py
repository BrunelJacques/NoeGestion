#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------
# stModule: fonctions pour gestion des stocks
# ------------------------------------------------------------------------
from outils    import xformat
from appli_python.ap_databases  import DB
from appli_python.ap_db_sql import *
import stdb_utils as su

class Inventaire:
    # calculs d'inventaire FIFO à une date donnée dite clôture
    today = datetime.date.today()
    def __init__(self,cloture=today,dbConfig='default',achat='achat'):
        # 'achat' origine avec prix s'appliquant aux autres mvts
        self.achat = achat
        self.db = None
        # si dbConfig n'est pas fourni, il y a un différé de la définition
        if dbConfig:
            self.db = DB(dbConfig)
        self.cloture = cloture
        self.mvtsCorriges = []
        self.lastInventaire = su.GetLastInventaire(self.db,cloture)
        if len(self.lastInventaire) == 0:
            self.lastInventaire = None
        else:
            for ligne in self.lastInventaire:
                mvtInv = ligne

    def SetDB(self,dbConfig,mute):
        self.db = DB(dbConfig,mute)

    def CloseDB(self):
        self.db.Close()

    def _IsAchat(self,origine):
        ok = False
        if origine.find(self.achat): ok = True
        if origine.find('invent'): ok = True
        return ok

    def MajQtePrixArticles(self,fin=datetime.date.today()):
        # Met à jour les champs qte prixMoyen dans article
        if self.db.nomBase == 'noegestion':
            lstChamps = ['nom','qtestock','prixmoyen','prixactuel','id']
        else:
            lstChamps = ['idArticle','qteStock','prixMoyen','prixActuel','idArticle']

        ddArticles = su.GetArticles(self.db,lstChamps)
        if len(ddArticles) == 0:
            return False

        llinventaire = self.CalculInventaire(fin=fin)
        llarticles = []
        # ligne :[dte, article, qte, prixMoyen, montant, lastPrix]
        for dte, article, qte, prixMoyen, montant, lastPrix in llinventaire:
            if not lastPrix : lastPrix = 0
            artIn = ddArticles[article]
            if self.db.nomBase == 'noegestion':
                artOut = [artIn['nom'],artIn['nom'],qte,prixMoyen,lastPrix,artIn['id']]
            else:
                artOut = [artIn['idarticle'],qte,prixMoyen,lastPrix,artIn['idarticle']]
            llarticles.append(artOut)
                
        ok = su.PostArticles(self.db,lstChamps,llarticles)
        return ok

    def PostInventaire(self):
        # Enregistre les lignes d'inventaire à la date cloture
        ret = self.MajPrixSortiesMouvements()
        if ret: llinventaire = self.CalculInventaire()
        ok = su.PostInventaire(self.db,self.cloture, llinventaire)
        return ok

    def _xAjoutInventaire(self,lstMmouvements):
        # ajout de la reprise d'inventaire dans des mouvements sur une péiode
        if not self.lastInventaire: return
        for ligne in self.lastInventaire:
            jour, article, qte, pxMoyen = ligne[:4]
            lstMmouvements.append([jour,"inventaire",article,qte,pxMoyen,None])
        return

    def CalculInventaire(self,fin=None):
        # retourne un inventaire: liste de liste, alimente self.mttInventaire
        if fin == None: fin = self.cloture

        debut = None
        if self.lastInventaire:
            # présence d'un inventaire antérieur
            debut = xformat.DateToDatetime(self.lastInventaire[0][0])

        #mouvements['jour', 'origine', 'nomArticle', 'qteMouvement','prixUnit']
        llMouvements = su.GetMouvements(self.db,debut=debut,fin=fin)
        # ajoute l'inventaire précédent aux mouvements filtrés
        self._xAjoutInventaire(llMouvements)

        # liste préalable pour traitement par article
        lstArticles = []
        for jour,origine,article,qte,pu,id in llMouvements:
            if not article:
                raise Exception("Article disparu! mvt du %s qte= %d"%(jour,qte))
            if not article in lstArticles:
                lstArticles.append(article)
        lstArticles.sort()
        if lstArticles == None:
            raise Exception("Aucun mouvement dans la période du %s au %s"\
                  %(debut,fin))

        # composition de l'inventaire
        llinventaire= []
        self.mttInventaire = 0
        for article in lstArticles:
            lstMvts = [x[0:2]+x[3:] for x in llMouvements if x[2] == article]
            qte, mtt, lastPrix = self._CalculInventaireUnArticle(lstMvts)
            self.mttInventaire += mtt
            if qte == 0:
                pu = 0.0
            else: pu = round(mtt/qte,4)
            if qte != 0 and mtt != 0:
                # compose [dte,article,qte,prixMoyen,montant,lastPrix]
                llinventaire.append([
                    xformat.DatetimeToStr(fin,iso=True),
                    article,
                    round(qte,4),
                    pu,
                    round(mtt,4),
                    lastPrix,
                    ])
        return llinventaire

    def _CalculInventaireUnArticle(self,mvts=[[],]):
        # mouvements en tuple (date,origine, qte,pu,id) qte est signé
        mttFin = 0.0
        qteProgress = 0.0
        qteFin = sum([qte for dte,origine,qte,pu,id in mvts])

        lstPU = [pu for dte,origine,qte,pu,id in mvts if origine == self.achat]
        if len(lstPU) == 0:
            # si pas d'entrée principale: moyenne des prix présents
            lstPU = [pu for dte, origine, qte, pu, id in mvts if pu > 0]
            
        # calcul d'une valeur par défaut de prix unitaire
        if len(lstPU) > 0:
            pu = sum(lstPU) / len(lstPU)
        else: pu = 1

        # recherche des derniers achats (reverse), pour calcul du reste final
        lastPrix = None
        for dte,origine,qte,pu,id in sorted(mvts,reverse=True):
            # ne prend que les achats
            if origine != self.achat:
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
        return qteFin,round(mttFin,2),lastPrix

    def MajPrixSortiesMouvements(self, fin=None):
        ok = False
        if fin == None: fin = self.cloture
        debut = None
        if self.lastInventaire:
            # présence d'un inventaire antérieur
            debut = xformat.DateToDatetime(self.lastInventaire[0][0])

        #['jour', 'origine', 'nomArticle', 'qteMouvement','prixUnit']
        self.mvtsCorriges = su.GetMouvements(self.db,debut=debut,fin=fin)
        self._xAjoutInventaire(self.mvtsCorriges)
        self.mvtsCorriges.sort()

        lstArticles = []
        # listes préalable, chaque article est traité à part
        for jour,origine,article,qte,pu,id in self.mvtsCorriges:
            if not article in lstArticles:
                lstArticles.append(article)
        lstArticles.sort()
        if lstArticles == None:
            raise Exception("Aucun mouvement dans la période du %s au %s"\
                  %(debut,fin))

        nbrUpdates = 0
        self.llModifsMouvements = []
        for artArt in lstArticles:
            mvtsArticle = []
            self.dicPrixMvtOld = {}
            self.dicPrixMvtNew = {}
            # isole les mouvements de l'article
            for jour,origine,artMvt,qte,pu,id in self.mvtsCorriges:
                if artMvt != artArt:
                    continue
                self.dicPrixMvtOld[id] = pu                
                mvtsArticle.append([jour,origine,artMvt,qte,pu,id])

            #if artArt == "ABRICOTS FRAIS KG": print()# debug arrêt sur article
            self._xRecalculPrixSortiesUnArticle(mvtsArticle)
            for id,prix in self.dicPrixMvtNew.items():
                # les calculs intermédiaires font varier temporairement prix
                if abs(prix - self.dicPrixMvtOld[id]) > 0.0001:
                    self.llModifsMouvements.append([prix,id])
                    nbrUpdates += 1
            ok = True

        # écrit les modifs dans la table mouvements
        su.PostMouvements(self.db,champs=['prixUnit', 'idMouvement'],
                          mouvements=self.llModifsMouvements)

        print(nbrUpdates)
        return ok

    def _xRecalculPrixSortiesUnArticle(self, mvts=[[],]):
        # mouvements en liste (date,origine, qte,pu,id) qte est signé
        mvts.sort(key=lambda x: (x[0],x[-1])) # tri sur deux champs date, ID

        # sépare les mouvements achats,entrées, sorties
        dicAchats = {}
        dicEntrees = {}
        lstEntrees = []
        lstSorties = []
        qteAchats = 0
        mttAchats = 0
        for mvt in mvts:
            dte, origine, article, qte, pu, id = mvt
            # les achats vont dans un dic
            if origine in (self.achat, "inventaire"):
                qteAchats += qte
                mttAchats += round(pu * qte,2)
                if not (dte,id) in dicAchats:
                    dicAchats[(dte,id)] = {}
                dicAchats[(dte,id)]['qteIn'] = qte
                dicAchats[(dte,id)]['mvt'] = mvt
            # les autres entrées vont dans un dicEntree et une liste
            elif qte > 0:
                if not (dte,id) in dicEntrees:
                    dicEntrees[(dte,id)] = {}
                dicEntrees[(dte,id)]['qteIn'] = qte
                dicEntrees[(dte,id)]['mvt'] = mvt
                lstEntrees.append(mvt)
            # les sorties sont dans une liste qui sera triée par date
            else:
                lstSorties.append(mvt)
        if article == 'MAIS DOUX 4/4':
            print()

        # si pas de sortie : abandon
        if len(lstSorties) == 0: return

        # init de l'affectation des entrées sur sorties (qte et montants)
        tmpAffect = {}
        firstOdIn = None
        firstSortie = None
        for mvt in lstSorties:
            tmpAffect[mvt[-1]] = {'qteAff':0,'mttAff':0}
            if not firstSortie and (mvt[4] != 0): firstSortie = mvt[4]
            if not firstOdIn and (mvt[4] != 0) and (mvt[3] > 0):
                firstSortie = mvt[4]
        lastIx = mvt[-1]


        def determinePrixEstime():
            # prix moyen des achats ou inventaire
            if qteAchats > 0:
                prixEstime = round(mttAchats / qteAchats,4)
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
                ix = mvt[-1]
                if (not ix in tmpAffect) or (tmpAffect[ix]['qteAff'] == 0):
                    # on met le prix moyen
                    if mvt[4] != prixEstime:
                        mvt[4] = prixEstime  # modif interne
                        self.dicPrixMvtNew[mvt[-1]] = prixEstime  # pour modif BD
                elif tmpAffect[ix]['qteAff'] < -mvt[3]:
                    nbrest = -mvt[3] - tmpAffect[ix]['qteAff']
                    newPrix = (nbrest * prixEstime) + tmpAffect[ix]['mttAff']
                    newPrix = newPrix / (nbrest + tmpAffect[ix]['qteAff'])
                    newPrix = round(newPrix,4)
                    if mvt[4] != newPrix:
                        mvt[4] = newPrix  # modif interne
                        self.dicPrixMvtNew[mvt[-1]] = newPrix  # pour modif BD

        def modifPrixMvts(dicIn,lmvtsOut):
            for (dteIn, id), dicMvtIn in dicIn.items():
                qteIn = dicMvtIn['qteIn']
                if qteIn == 0: continue
                mvtIn = dicMvtIn['mvt']
                puIn = mvtIn[4]
                # recherche sorties non affectées à une entrée et applique le prix
                for mvt in lmvtsOut:
                    dateOut, origine, article, qteOut, puOut, id = mvt
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
                        mvt[4] = puOutNew  # modif interne
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
            modifPrixMvts(dicEntrees,lstSorties)

        # coeur: affectation du prix d'entrée sur les sorties plus anciennes
        modifPrixMvts(dicAchats,lstSorties)

        # vérif si toutes les sorties ont été couvertes par des achats
        if tmpAffect[lastIx]['qteAff'] == 0:
            affectPrixEstime(lstSorties)


class Tests:
    def __init__(self,name=None):
        ok =True
        if not name:
            for method in [
                self.CalculInventaire,
                self.RecalculPrixSorties,
            ]:
                ok = ok & method()
                del method
        else:
            ok = eval("self.%s()"%(name))
        self.ok = ok

    def CalculInventaire(self):
        ret = Inventaire().CalculInventaire()
        if len(ret) > 0: return True
        return False

    def RecalculPrixSorties(self):
        ret = Inventaire().MajPrixSortiesMouvements()
        return ret

if __name__ == '__main__':
    import os
    os.chdir("..")
    inv = Inventaire(datetime.date(2021,9,30),'wan_noethys')
    #test = Tests()
    #test = Tests("CalculInventaire")
    #test = inv.RecalculPrixSorties()
    test = inv.MajQtePrixArticles()
    print(inv.mttInventaire)
