#!/usr/bin/env python
# -*- coding: utf-8 -*-

#------------------------------------------------------------------------------
# Application:  NoeGestion, Gestion des bases de données
# Commande:     ap_create_database Complements django mysql
# Auteur:       Jacques Brunel
# Copyright:    (c) 2021-09   Matthania
# Licence:      Licence GNU GPL
#------------------------------------------------------------------------------

import os
import sys
import utils_db
import manage

def Manage(*args):
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



def CreateBaseMySql(nomConfig='default'):
    """lance 'create base' de la base définie par django puis 'migrate'"""
    db = utils_db.DB(nomConfig=nomConfig, mute=True)
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
    Manage(('makemigrations', 'appli_web'))
    Manage(('migrate',))


#------------------------------------------------------------------------------
if __name__ == "__main__":
    os.chdir("..")
    CreateBaseMySql(nomConfig='default')
