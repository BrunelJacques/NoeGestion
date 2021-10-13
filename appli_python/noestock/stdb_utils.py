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


# Gestion des inventaires -----------------------------------------------------

def PostMouvements(db,champs=[],mouvements=[[],]):
    # uddate des champs d'un mouvement, l'ID en dernière position
    retour = True
    for mouvement in mouvements:
        ret = db.ReqMAJ('stMouvements',
                    nomID=champs[-1],
                    ID = mouvement[-1],
                    champs=champs[:-1],values=mouvement[:-1],
                    mess="UTILS_Stocks.PostMouvements")
        if ret != 'ok':
            retour = False
    return retour

def PostInventaire(db,cloture=datetime.date.today(),inventaire=[[],]):
    # delete puis recrée l'inventaire à la date de cloture
    if cloture == None:
        cloture = datetime.date.today()
    ordi = os.environ['USERDOMAIN']
    dteSaisie = xformat.DatetimeToStr(datetime.date.today(),iso=True)
    # Appelle l'inventaire précédent
    lstChamps = ['IDdate',
                 'IDarticle',
                 'qteStock',
                 'prixMoyen',
                 'prixActuel',
                 'ordi',
                 'dateSaisie',]
    llDonnees = []
    # lignes reçues [date,article,qte,prixMoyen,montant,lastPrix]
    for dte,article,qte,pxMoy,mtt,pxLast in inventaire:
        if dte != str(cloture): raise Exception(
            "cloture = %s diff de inventaire = %s"%(str(cloture),str(dte)))
        llDonnees.append([dte,article,qte,pxMoy,pxLast,ordi,dteSaisie])

    # test présence inventaire
    finIso = xformat.DatetimeToStr(cloture,iso=True)
    condition = "stInventaires.IDdate = '%s'"%finIso
    req = """   SELECT *
                FROM stInventaires
                WHERE %s
                ;""" %(condition)

    retour = db.ExecuterReq(req, mess='UTILS_Stocks.testPrésenceInventaire')
    if retour == "ok":
        recordset = db.ResultatReq()
        if len(recordset) > 0:
            mess = "UTILS_Stoks.PostInventaire.ReqDel"
            ret = db.ReqDEL('stInventaires',condition=condition,mess=mess)

    ret = db.ReqInsert('stInventaires',champs=lstChamps,llValues=llDonnees,
                 mess="UTILS_Stocks.PostInventaires")
    if ret == 'ok':
        return True
    return ret

def GetLastInventaire(db,cloture=None):
    # retourne l'inventaire précédent la date de cloture
    if cloture == None:
        cloture = datetime.date.today()
    # Appelle l'inventaire précédent
    lstChamps = ['IDdate','IDarticle','qteStock','prixMoyen',]
    finIso = xformat.DatetimeToStr(cloture,iso=True)
    req = """   SELECT %s
                FROM stInventaires
                WHERE   (stInventaires.IDdate = 
                            (SELECT MAX(stInv.IDdate) 
                            FROM stInventaires as stInv
                            WHERE stInv.IDdate < '%s')
                        )
                ;""" % (",".join(lstChamps),finIso)

    retour = db.ExecuterReq(req, mess='UTILS_Stocks.SqlLastInventaire')
    llInventaire = []
    if retour == "ok":
        recordset = db.ResultatReq()
        for record in recordset:
            mouvement = []
            for ix  in range(len(lstChamps)):
                mouvement.append(record[ix])
            llInventaire.append(mouvement)
    return llInventaire

def GetMouvements(db,debut=None,fin=None):
    # retourne une  liste de mouvements en forme de liste
    lstChamps = ['date','origine','stMouvements.IDarticle','qte','prixUnit','IDmouvement']
    # normalisation datefin
    if fin == None: fin = datetime.date.today()
    elif not isinstance(fin,datetime.date):
        fin = xformat.DateToDatetime(fin)
    # normalisation datedebut
    if debut == None:
        debut = fin - datetime.timedelta(days=180)
    finIso = xformat.DateToIso(fin)
    debutIso = xformat.DatetimeToStr(debut,iso=True)
    # Appelle les mouvements de la période
    req = """   SELECT %s
                FROM stMouvements
                WHERE   (   (date > '%s' ) 
                            AND (date <= '%s' ))
                ;""" % (",".join(lstChamps),debutIso,finIso)

    retour = db.ExecuterReq(req, mess='UTILS_Stocks.SqlMouvementsPeriode')
    llMouvements = []
    if retour == "ok":
        recordset = db.ResultatReq()
        for record in recordset:
            mouvement = []
            for ix  in range(len(lstChamps)):
                mouvement.append(record[ix])
            llMouvements.append(mouvement)
    return llMouvements
