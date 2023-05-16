#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------
# Application :    NoeNtock, gestion des stocks et prix de journée
# Usage : Ensemble de fonctions pour accès aux données
# Auteur:          Jacques BRUNEL 2021-10 Matthania
# Licence:         Licence GNU GPL
# ------------------------------------------------------------------------

import datetime, os
from outils                     import xformat

LIMITSQL = 100
# codes repas [ 1,      2,     3,     4       5]
CHOIX_REPAS = ['PtDej','Midi','Soir','5eme','Tous']

# pour info correspondance de champs stArticles Noethus Noegestion
"""CHAMPS_ARTICLES = {
    'noethys':
        ['IDarticle', 'rations', 'fournisseur', 'qteStock', 'txTva', 
         'magasin', 'rayon', 'qteMini', 'qteSaison', 'obsolete', 'prixMoyen',
         'prixActuel', 'dernierAchat', 'ordi', 'dateSaisie'],
    'noegest':
        ['id', 'nom', 'rations', 'qteparunitevente', 'fournisseur','qtestock', 
         'txtva', 'magasin', 'rayon', 'qtemini', 'qtesaison','obsolete', 
         'prixmoyen', 'prixactuel', 'dernierachat', 'ordi', 'datesaisie']
}"""

def GetNomTable(db,table="articles"):
    # retourne le nom de la table dans la base ouverte
    if db.nomBase == 'noegestion':
        return "appli_st%s"%table.lower()
    else:
        return "st%s"%table.capitalize()

# Gestion des inventaires -----------------------------------------------------

def PostArticles(db,champs=[],articles=[[],]):
    # uddate des champs d'un article, l'ID en première position
    retour = True
    table = GetNomTable(db,'articles')
    for article in articles:
        ret = db.ReqMAJ(table,
                    nomID=champs[0],
                    ID = article[0],
                    champs=champs[1:],values=article[1:],
                    mess="stdb_utils.PostArticles")
        #print(article[0],ret)
        if ret != 'ok':
            retour = False
    return retour

def PostMouvements(db,champs=[],mouvements=[[],]):
    # uddate des champs d'un mouvement, l'ID en première position
    retour = True

    nb = len(mouvements)
    table = GetNomTable(db,'mouvements')
    if table[:5] != 'appli':
        champs[0] = 'idMouvement'
    for mouvement in mouvements:
        ret = db.ReqMAJ(table,
                    nomID=champs[0],
                    ID = mouvement[0],
                    champs=champs[1:],values=mouvement[1:],
                    mess="stdb_utils.PostMouvements")
        if len(mouvements) > 100:
            print(nb)
            nb -=1
        if ret != 'ok':
            retour = False
    return retour

def PostInventaire(db,cloture=datetime.date.today(),inventaire=[[],]):
    # delete puis recrée l'inventaire à la date de cloture
    if cloture == None:
        cloture = datetime.date.today()
    finIso = xformat.Datetime_to_str(cloture, iso=True)

    ordi = os.environ['USERDOMAIN']
    dteSaisie = xformat.Datetime_to_str(datetime.date.today(), iso=True)
    table = GetNomTable(db,'inventaires')
    # Appelle l'inventaire précédent
    if table[:5] == 'appli':
        lstChamps = ['jour',
                 'article_id',
                 'qteStock',
                 'prixMoyen',
                 'prixActuel',
                 'ordi',
                 'dateSaisie',]
        condition = "%s.jour = '%s'" % (table, finIso)

    else:
        lstChamps = ['IDdate',
                 'IDarticle',
                 'qteStock',
                 'prixMoyen',
                 'prixActuel',
                 'ordi',
                 'dateSaisie',]
        condition = "%s.IDdate = '%s'" % (table, finIso)

    llDonnees = []
    # lignes reçues [dte,article,qte,prixMoyen,montant,lastPrix]
    for dte,article,qte,pxMoy,mtt,pxLast in inventaire:
        if dte != str(cloture): raise Exception(
            "cloture = %s diff de inventaire = %s"%(str(cloture),str(dte)))
        llDonnees.append([dte,article,qte,pxMoy,pxLast,ordi,dteSaisie])

    # test présence inventaire modifiable
    req = """   SELECT count(id), sum(modifiable = 0)
                FROM %s
                WHERE %s
                ;""" %(table,condition)

    retour = db.ExecuterReq(req, mess='stdb_utils.testPrésenceInventaire')
    if retour == "ok":
        recordset = db.ResultatReq()
        if recordset[0][0] > 0 and recordset[0][1] in (0,None):
            mess = "UTILS_Stoks.PostInventaire.ReqDel"
            ret = db.ReqDEL(table,condition=condition,mess=mess)
        elif  recordset[0][1] and  recordset[0][1] > 0:
            raise Exception("Des enregistrements non modifiables sont présents")

    ret = db.ReqInsert(table,champs=lstChamps,llValues=llDonnees,
                 mess="stdb_utils.PostInventaires")
    if ret == 'ok':
        return True
    return ret

def _GetLastInventaireNoethys(db,cloture=None):
    # retourne l'inventaire précédent la date de cloture
    if cloture == None:
        cloture = datetime.date.today()
    # Appelle l'inventaire précédent
    lstChamps = ['IDdate','IDarticle','qteStock','prixMoyen',]
    finIso = xformat.Datetime_to_str(cloture, iso=True)

    req = """   SELECT %s
                FROM stInventaires
                WHERE   (stInventaires.IDdate = 
                            (SELECT MAX(stInv.IDdate) 
                            FROM stInventaires as stInv
                            WHERE stInv.IDdate < '%s')
                        )
                ;""" % (",".join(lstChamps),finIso)

    retour = db.ExecuterReq(req, mess='stdb_utils.SqlLastInventaire')
    llInventaire = []
    if retour == "ok":
        recordset = db.ResultatReq()
        for record in recordset:
            mouvement = []
            for ix  in range(len(lstChamps)):
                mouvement.append(record[ix])
            llInventaire.append(mouvement)
    return llInventaire

def GetLastInventaire(db,cloture=None):
    # retourne l'inventaire précédent la date de cloture

    table = GetNomTable(db,'mouvements')
    if table[:5] != 'appli':
        llInventaire = _GetLastInventaireNoethys(db,cloture)
        return llInventaire
    if cloture == None:
        cloture = datetime.date.today()
    # Appelle l'inventaire précédent
    lstChamps = ['jour','article_id','appli_stinventaires.qteStock',
                 'appli_stinventaires.prixMoyen',]
    finIso = xformat.Datetime_to_str(cloture, iso=True)

    req = """   SELECT %s
                FROM appli_stinventaires
                LEFT JOIN appli_starticles 
                        ON article_id = appli_starticles.id
                WHERE   (appli_stinventaires.jour = 
                            (SELECT MAX(stInv.jour) 
                            FROM appli_stinventaires as stInv
                            WHERE stInv.jour < '%s')
                        )
                ;""" % (",".join(lstChamps),finIso)

    retour = db.ExecuterReq(req, mess='stdb_utils.SqlLastInventaire')
    llInventaire = []
    if retour == "ok":
        recordset = db.ResultatReq()
        for record in recordset:
            mouvement = []
            for ix  in range(len(lstChamps)):
                mouvement.append(record[ix])
            llInventaire.append(mouvement)
    return llInventaire

def GetMouvements(db,apres=None,fin=None):
    # retourne une  liste de mouvements en forme de liste

    table = GetNomTable(db,'mouvements')
    # normalisation datefin
    if fin == None: fin = datetime.date.today()
    elif not isinstance(fin,datetime.date):
        fin = xformat.DateToDatetime(fin)
    # normalisation datedebut
    if apres == None:
        apres = fin - datetime.timedelta(days=180)
    finIso = xformat.DateToIso(fin)
    apresIso = xformat.Datetime_to_str(apres, iso=True)
    # Appelle les mouvements de la période
    if table[:5] == 'appli':
        lstChamps = ['ID','jour','origine','article_id','qteMouvement','prixUnit']
        dte = 'jour'
    else:
        lstChamps = ['IDmouvement','date','origine','IDarticle','qte','prixUnit']
        dte = 'date'
    req = """   SELECT %s
                FROM %s
                WHERE   (   (%s > '%s' ) 
                            AND (%s <= '%s' ))
                ;""" % (",".join(lstChamps),table,dte,apresIso,dte,finIso)

    retour = db.ExecuterReq(req, mess='stdb_utils.GetMouvements')
    llMouvements = []
    if retour == "ok":
        recordset = db.ResultatReq()
        for record in recordset:
            mouvement = []
            for ix  in range(len(lstChamps)):
                mouvement.append(record[ix])
            llMouvements.append(mouvement)
    return llMouvements

def GetArticles(db,lstChamps=None):
    # retourne un dict{id:article} d'articles en forme dictionnaire
    table = GetNomTable(db,'mouvements')
    if lstChamps == None:
        lstChamps = db.GetListeChamps(table)

    table = GetNomTable(db,'articles')
    # Appelle les articles
    req = """   SELECT %s
                FROM %s
                ;"""%(",".join(lstChamps),table)
    retour = db.ExecuterReq(req, mess='stdb_utils.GetArticles')
    ddArticles = {}

    # retour en dict, pour récupérer les noms de champs différant noethys%gest
    if retour == "ok":
        recordset = db.ResultatReq()
        for record in recordset:
            article = {}
            for ix  in range(len(lstChamps)):
                article[lstChamps[ix]] = (record[ix])
            # l'id article est en première position
            ddArticles[record[0]]=article
    return ddArticles
