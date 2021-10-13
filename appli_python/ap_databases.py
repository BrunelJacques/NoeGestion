#!/usr/bin/env python
# -*- coding: utf-8 -*-

#------------------------------------------------------------------------------
# Application:  NoeGestion, Gestion des bases de données
# Commande:     ap_databases Complements django accès mysql
# Auteur:       Jacques Brunel
# Copyright:    (c) 2021-09   Matthania
# Licence:      Licence GNU GPL
#------------------------------------------------------------------------------

import os
from appli_python.ap_db_sql import DB
import manage # appelé par exec

def _Manage(*args):
    """lancement de manage par module, arg est la ligne d'options de manage"""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'serveur_django.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Problème de lancement de Manage!!!"
        ) from exc
    params = ['manage.py',]
    for param in args:
        params += param
    execute_from_command_line(params)

def CreateBaseDjango(dbConfig='default'):
    """lance 'create base' de la base définie par django puis 'migrate'"""
    db = DB(dbConfig=dbConfig, mute=True)
    if db.echec:
        # erreur lors de la connexion
        print(db.erreur)
        return
    db.AfficheTestOuverture()
    mess = 'ko'
    if not db.IsDatabaseExits():
        db.CreateBaseMySql(ifExist=False)
        if not db.echec:
            mess = "Base '%s' créée"%(db.nomBase)
    else:
        mess = "la base '%s' existait préalablement"%(db.nomBase)
    print(mess)

    # lancement migrate
    print(os.getcwd())
    _Manage(('makemigrations', 'appli'))
    _Manage(('migrate',))

def GetChampsTableNoethys(nomTable):
    # retourne une liste des champs par dic DB_schema
    from srcNoelite.DB_schema import DB_TABLES as tables_noethys
    # alternative d'accès si absence du projet NoeXpy dans le path
    """
    import sys
    mydir = os.path.dirname(__file__)
    noelite_dir = os.path.join(mydir, '..', '..', 'NoeXpy','srcNoelite')
    sys.path.append(noelite_dir)
    import DB_schema
    tables_noethys = DB_schema.DB_TABLES
    """
    schema = tables_noethys[nomTable]
    champs = [x for x,y,z in schema]
    return champs

def GetChampsTableNoegest(nomTable):
    # retourne une liste de nom de champs par SQL show columns
    dbgest = DB('lan_noegestion')
    nom = 'appli_'+nomTable.lower()
    lt = dbgest.GetListeChamps(nom)
    champs = [x for (x,type) in lt]
    return champs

#------------------------------------------------------------------------------
if __name__ == "__main__":
    os.chdir("..")
    print(os.getcwd())
    #CreateBaseDjango(dbConfig='default')
    ret = GetChampsTableNoegest('stArticles')
    print()
