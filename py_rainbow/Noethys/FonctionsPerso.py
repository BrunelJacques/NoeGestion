#!/usr/bin/env python
# -*- coding: iso-8859-15 -*-
#------------------------------------------------------------------------
# Application :    Noethys, complété Matthania
# Auteur:           Ivan LUCAS, JB
# Copyright:       (c) 2010-11 Ivan LUCAS
# Licence:         Licence GNU GPL
#------------------------------------------------------------------------

import sys
import GestionDB
import datetime
import os
import codecs

# ---- Fonctions usuelles-------------------------------

def dateJour(fmt='fr'):
    dte = datetime.date.today()
    if fmt == 'fr':
        dte = '{:%d/%m/%Y}'.format(dte)
    elif fmt == 'ansi':
        dte = '{:%Y%m%d}'.format(dte)
    return dte

def Nz(valeur, type = "int"):
    try:
        valeur = float(valeur)
    except:
        valeur = 0.0
    if type == 'int':
        valeur = int(valeur)
    return valeur

def NoPunctuation(txt = ''):
    if not txt: return ''
    if txt.strip()== '': return ''
    import re
    punctuation = "!\"#$%&()*+,./:;<=>?@[\\]^_`{|}~"
    regex = re.compile('[%s]' % re.escape(punctuation))
    regex = regex.sub(' ', txt)
    return regex.replace('  ',' ')

def ChiffresSeuls(txt = ""):
    if txt == None: txt = ""
    permis = "0123456789+-.,"
    new = ""
    for a in txt:
        if a in permis:
            new += a
    return new

def Supprime_accent(texte):
    if not texte: return
    liste = [ ("é", "e"), ("è", "e"), ("ê", "e"), ("ë", "e"), ("à", "a"), ("û", "u"), ("ô", "o"),
              ("ç", "c"), ("î", "i"), ("ï", "i"),("/", ""), ("\\", "")]
    txtLow = texte.lower()
    for a, b in liste :
        if not a in txtLow: continue
        texte = texte.replace(a, b)
        texte = texte.replace(a.upper(), b.upper())
    return texte

def ListeToStr(lst=[], separateur=", "):
    # Convertit une liste en texte
    chaine = separateur.join([str(x) for x in lst])
    if chaine == "": chaine = "*"
    return chaine

# ------------------------------------------------------------------------

def Creation_liste_pb_personnes():
    """ Création de la liste des problèmes des personnes """
    listeIDpersonne = Recherche_ContratsEnCoursOuAVenir()
    dictNomsPersonnes, dictProblemesPersonnes = Recherche_problemes_personnes(listeIDpersonnes = tuple(listeIDpersonne))
    return dictNomsPersonnes, dictProblemesPersonnes
                
def Recherche_problemes_personnes(listeIDpersonnes = (), infosPersonne=[]):
    """ Recherche les problèmes dans les dossiers des personnes """
    
    dictProblemes = {}
    dictNoms = {}
    
    #
    # Analyse des fiches individuelles
    #
    
    if len(listeIDpersonnes) == 0 : listeIDpersonnesTmp = "(100000)"
    elif len(listeIDpersonnes) == 1 : listeIDpersonnesTmp = "(%d)" % listeIDpersonnes[0]
    else : listeIDpersonnesTmp = str(tuple(listeIDpersonnes))
    
    DB = GestionDB.DB()        
    req = """SELECT IDpersonne, civilite, nom, nom_jfille, prenom, date_naiss, cp_naiss, ville_naiss, pays_naiss, nationalite, num_secu, adresse_resid, cp_resid, ville_resid, IDsituation
    FROM personnes WHERE IDpersonne IN %s ORDER BY nom; """ % listeIDpersonnesTmp
    DB.executerReq(req)
    listePersonnes = DB.resultatReq()
    
    # Récupère ici les infos directement dans les contrôles de la fiche individuelle
    if len(infosPersonne) != 0 :
        listePersonnes = infosPersonne

    for personne in listePersonnes :
        IDpersonne = personne[0]
        civilite = personne[1]
        nom = personne[2]
        nom_jfille = personne[3]
        prenom = personne[4]
        date_naiss = personne[5]
        cp_naiss = personne[6]
        ville_naiss = personne[7]
        pays_naiss = personne[8]
        nationalite = personne[9]
        num_secu = personne[10]
        adresse_resid = personne[11]
        cp_resid = personne[12]
        ville_resid = personne[13]
        IDsituation = personne[14]
        
        dictNoms[IDpersonne] = nom + " " + prenom
        problemesFiche = []
        
        # Civilité
        if civilite == "" or civilite == None : problemesFiche.append( ("Civilité") )
        # Nom
        if nom == "" or nom == None : problemesFiche.append( ("Nom de famille") )
        # Nom de jeune fille
        if civilite == "Mme" :
            if nom_jfille == "" or nom_jfille == None : problemesFiche.append( ("Nom de jeune fille") )
        # Prénom
        if prenom == "" or prenom == None : problemesFiche.append( ("Prénom") )
        # Date de naissance
        if str(date_naiss).strip(" ") == "" or date_naiss == None : problemesFiche.append( ("Date de naissance") )
        # CP_naissance
        if str(cp_naiss).strip(" ") == "" or cp_naiss == None : problemesFiche.append( ("Code postal de la ville de naissance") )
        # Ville de naissance
        if ville_naiss == "" or ville_naiss == None : problemesFiche.append( ("Ville de naissance") )
        # Pays de naissance
        if pays_naiss == "" or pays_naiss == None or pays_naiss == 0 : problemesFiche.append( ("Pays de naissance") )
        # Nationalite
        if nationalite == "" or nationalite == None or nationalite == 0 : problemesFiche.append( ("Nationalité") )
        # Num Sécu
        if str(num_secu).strip(" ") == "" or num_secu == None : problemesFiche.append( ("Numéro de sécurité sociale") )
        # Adresse résidence
        if adresse_resid == "" or adresse_resid == None : problemesFiche.append( ("Adresse de résidence") )
        # Code postal résidence
        if str(cp_resid).strip(" ") == "" or cp_resid == None : problemesFiche.append( ("Code postal de résidence") )
        # Ville résidence
        if ville_resid == "" or ville_resid == None : problemesFiche.append( ("Ville de résidence") )
        # Situation
        if IDsituation == "" or IDsituation == None or IDsituation == 0 : problemesFiche.append( ("Situation sociale") )

    
        # Analyse des coordonnées
        req = """SELECT IDcoord
        FROM coordonnees
        WHERE IDpersonne=%d;
        """ % IDpersonne
        DB.executerReq(req)
        listeCoords = DB.resultatReq()
        
        if len(listeCoords) == 0 : 
            problemesFiche.append( ("Coordonnées téléphoniques") )
        
        # Met les données dans le dictionnaire
        if len(problemesFiche) != 0 : 
            if (IDpersonne in dictProblemes) == False : dictProblemes[IDpersonne] = {}
            if len(problemesFiche) == 1 : 
                categorie = "1 information manquante"
            else:
                categorie = str(len(problemesFiche))  + " informations manquantes"
            dictProblemes[IDpersonne][categorie] = problemesFiche
            
    
    #
    # Analyse des pièces à fournir
    #
    
    date_jour = datetime.date.today()
    
    # Initialisation de la base de données
    DB = GestionDB.DB()
        
    for IDpersonne in listeIDpersonnes :
        piecesManquantes = []
        piecesPerimees = []
        DictPieces = {}
        
        # Recherche des pièces SPECIFIQUES que la personne doit fournir...
        req = """
        SELECT types_pieces.IDtype_piece, types_pieces.nom_piece
        FROM diplomes INNER JOIN diplomes_pieces ON diplomes.IDtype_diplome = diplomes_pieces.IDtype_diplome INNER JOIN types_pieces ON diplomes_pieces.IDtype_piece = types_pieces.IDtype_piece
        WHERE diplomes.IDpersonne=%d;
        """ % IDpersonne
        DB.executerReq(req)
        listePiecesAFournir = DB.resultatReq()
        
        if type(listePiecesAFournir) != list :
            listePiecesAFournir = list(listePiecesAFournir)
        
        # Recherche des pièces BASIQUES que la personne doit fournir...
        req = """
        SELECT diplomes_pieces.IDtype_piece, types_pieces.nom_piece
        FROM diplomes_pieces INNER JOIN types_pieces ON diplomes_pieces.IDtype_piece = types_pieces.IDtype_piece
        WHERE diplomes_pieces.IDtype_diplome=0;
        """ 
        DB.executerReq(req)
        listePiecesBasiquesAFournir = DB.resultatReq()
        
        listePiecesAFournir.extend(listePiecesBasiquesAFournir)
        
        # Recherche des pièces que la personne possède
        req = """
        SELECT types_pieces.IDtype_piece, pieces.date_debut, pieces.date_fin
        FROM types_pieces LEFT JOIN pieces ON types_pieces.IDtype_piece = pieces.IDtype_piece
        WHERE (pieces.IDpersonne=%d AND pieces.date_debut<='%s' AND pieces.date_fin>='%s')
        ORDER BY pieces.date_fin;
        """ % (IDpersonne, date_jour, date_jour)
        DB.executerReq(req)
        listePieces = DB.resultatReq()
        dictTmpPieces = {}
        for IDtype_piece, date_debut, date_fin in listePieces :
            dictTmpPieces[IDtype_piece] = (date_debut, date_fin)
        
        # Passe en revue toutes les pièces à fournir et regarde si la personne possède les pièces correspondantes
        for IDtype_piece, nom_piece in listePiecesAFournir :
            if (IDtype_piece in dictTmpPieces) == True :
                date_debut = dictTmpPieces[IDtype_piece][0]
                date_fin = dictTmpPieces[IDtype_piece][1]
                # Recherche la validité
                date_fin = datetime.date(int(date_fin[:4]), int(date_fin[5:7]), int(date_fin[8:10]))
                reste = str(date_fin - date_jour)
                if reste != "0:00:00":
                    jours = int(reste[:reste.index("day")])
                    if jours < 15  and jours > 0:
                        etat = "Attention"
                    elif jours <= 0:
                        etat = "PasOk"
                    else:
                        etat = "Ok"
                else:
                    etat = "Attention"
            else:
                etat = "PasOk"
            DictPieces[IDtype_piece] = (etat, nom_piece)
        

        for IDtype_piece, donnees in DictPieces.items() :
            etat, nom_piece = donnees
            if etat == "Ok": continue
            if etat == "PasOk" :
                piecesManquantes.append(nom_piece)
            if etat == "Attention" :
                piecesPerimees.append(nom_piece)

    
        # Met les listes de problèmes dans un dictionnaire
        if len(piecesManquantes) != 0 : 
            if (IDpersonne in dictProblemes) == False : dictProblemes[IDpersonne] = {}
            if len(piecesManquantes) == 1 : 
                categorie = "1 pièce manquante"
            else:
                categorie = str(len(piecesManquantes))  + " pièces manquantes"
            dictProblemes[IDpersonne][categorie] = piecesManquantes

        if len(piecesPerimees) != 0 : 
            if (IDpersonne in dictProblemes) == False : dictProblemes[IDpersonne] = {}
            if len(piecesPerimees) == 1 : 
                categorie = "1 pièce bientôt périmée"
            else:
                categorie = str(len(piecesPerimees))  + " pièces bientôt périmées"
            dictProblemes[IDpersonne][categorie] = piecesPerimees
        
        
        # Analyse des contrats
        problemesContrats = []
        DB = GestionDB.DB()        
        req = """SELECT IDpersonne, signature, due
        FROM contrats 
        WHERE IDpersonne = %d
        ORDER BY date_debut;""" % IDpersonne
        DB.executerReq(req)
        listeContrats = DB.resultatReq()
        
        for contrat in listeContrats :
            signature = contrat[1]
            due = contrat[2]
            # Signature
            if signature == "" or signature == "Non" : 
                txt = "Contrat non signé"
                problemesContrats.append( (txt) )
            # DUE
            if due == "" or due == "Non" : 
                txt = "DUE à faire"
                problemesContrats.append( (txt) )
        
        # Met les données dans le dictionnaire
        if len(problemesContrats) != 0 : 
            if (IDpersonne in dictProblemes) == False : dictProblemes[IDpersonne] = {}
            if len(problemesContrats) == 1 : 
                categorie = "1 contrat à voir"
            else:
                categorie = str(len(problemesContrats))  + " contrats à voir"
            dictProblemes[IDpersonne][categorie] = problemesContrats
    

    # Fin de la fonction    
    DB.close()
    
##    print dictProblemes

    return dictNoms, dictProblemes

def Recherche_ContratsEnCoursOuAVenir() :
    """ Renvoie la liste des personnes qui ont ou vont avoir un contrat """
    # Recherche des contrats
    dateDuJour = str(datetime.date.today())
    DB = GestionDB.DB()        
    req = """SELECT contrats.IDpersonne, contrats_class.nom, contrats.date_debut, contrats.date_fin, contrats.date_rupture, contrats_types.duree_indeterminee
    FROM contrats INNER JOIN contrats_class ON contrats.IDclassification = contrats_class.IDclassification INNER JOIN contrats_types ON contrats.IDtype = contrats_types.IDtype
    WHERE contrats.date_fin>='%s'
    ORDER BY contrats.date_debut;""" % dateDuJour
    DB.executerReq(req)
    listeContrats = DB.resultatReq()
    DB.close()
    # Retourne la liste des IDpersonne
    if len(listeContrats) == 0 :
        return []
    else:
        listeIDpersonne = []
        for contrat in listeContrats :
            listeIDpersonne.append(contrat[0])
        return listeIDpersonne

# ----------------------------------------------------------------------------------------------------------------------------------------------------------

def EnvoyerMail(adresses = [], sujet="", message=""):
    """ Envoyer un Email avec le client de messagerie par défaut """
    if len(adresses) == 1 :
        commande = "mailto:%s" % adresses[0]
    else:
        commande = "mailto:%s" % adresses[0] + "?"
        if len(adresses) > 1 :
            commande+= "bcc=%s" % adresses[1]
        for adresse in adresses[2:] :
            commande+= "&bcc=%s" % adresse
    if sujet != "" : 
        if len(adresses) == 1 : 
            commande += "?"
        else :
            commande += "&"
        commande += "subject=%s" % sujet
    if message != "" : 
        if len(adresses) == 1 and sujet == "" : 
            commande += "?"
        else:
            commande += "&"
        commande += "body=%s" % message
    #print commande
    import webbrowser
    webbrowser.open(commande)

# -----------------------------------------  Affiche l'aide -----------------------------------------------------------------------------------

def RecupNomCadrePersonne(IDpersonne):
    """ Récupère le nom du cadre de décoration pour une personne donnée """
    DB = GestionDB.DB()        
    req = "SELECT cadre_photo FROM personnes WHERE IDpersonne=%d;" % IDpersonne
    DB.executerReq(req)
    donnees = DB.resultatReq()
    DB.close()
    if len(donnees) == 0 : return None
    cadre_photo = donnees[0][0]
    if cadre_photo == "" : return None
    return cadre_photo

def GetRepertoireProjet(fichier=""):
    frozen = getattr(sys, 'frozen', '')
    if not frozen:
        chemin = os.path.dirname(os.path.abspath(__file__))
    else :
        chemin = os.path.dirname(sys.executable)
    return os.path.join(chemin, fichier)

def GetVersionLogiciel(datee=False):
    """ Recherche du texte version du logiciel dans fichier versions """
    fichierVersion = codecs.open(
        GetRepertoireProjet("Versions.txt"),
        encoding='utf-8',
        mode='r')
    txtVersion = fichierVersion.readlines()[0]
    fichierVersion.close()
    pos_debut_numVersion = txtVersion.find("n")
    if datee:
        pos_fin_numVersion = txtVersion.find(")") + 1
    else:
        pos_fin_numVersion = txtVersion.find("(")
    numVersion = txtVersion[pos_debut_numVersion+1:pos_fin_numVersion].strip()
    return numVersion

def ConvertVersionTuple(txtVersion=""):
    """ Convertit un numéro de version texte en tuple """
    if "(" in txtVersion:
        # si la version est avec ('date'), il faut s'en tenir au numéro version
        txtVersion = txtVersion.split("(")[0]
    texteVersion = ChiffresSeuls(txtVersion)
    tupleTemp = []
    for num in texteVersion.split(".") :
        tupleTemp.append(int(num))
    return tuple(tupleTemp)

def CompareVersions(versionApp="", versionMaj=""):
    """ Compare 2 versions """
    """ Return True si la version MAJ est plus récente """
    a,b = [[int(n) for n in version.split(".")] for version in [versionMaj, versionApp]]
    return a>b

def LanceFichierExterne(nomFichier) :
    """ Ouvre un fichier externe sous windows ou linux """
    nomSysteme = sys.platform
    if nomSysteme.startswith("win") : 
        nomFichier = nomFichier.replace("/", "\\")
        os.startfile(nomFichier)
    if "linux" in nomSysteme : 
        os.system("xdg-open " + nomFichier)

def OuvrirCalculatrice():
    if sys.platform.startswith("win") : LanceFichierExterne("calc.exe")
    if "linux" in sys.platform : os.system("gcalctool")

def Formate_taille_octets(size):
    """
    fonction qui prend en argument un nombre d'octets
    et renvoie la taille la plus adapté
    """
    seuil_Kio = 1024
    seuil_Mio = 1024 * 1024
    seuil_Gio = 1024 * 1024 * 1024

    if size > seuil_Gio:
        return "%.2f Go" % (size/float(seuil_Gio))
    elif size > seuil_Mio:
        return "%.2f Mo" % (size/float(seuil_Mio))
    elif size > seuil_Kio:
        return "%.2f Ko" % (size/float(seuil_Kio))
    else:
        return "%i o" % size

def GetIDfichier():
    try :
        DB = GestionDB.DB()
        req = """SELECT IDparametre, nom, parametre 
        FROM parametres WHERE nom='IDfichier';"""
        DB.ExecuterReq(req,MsgBox="ExecuterReq")
        listeTemp = DB.ResultatReq()
        DB.Close()
        IDfichier = listeTemp[0][2]
    except :
        IDfichier = ""
    return IDfichier

def GenerationIDdoc():
    """ Génération d'un ID unique à base de la date, de l'heure de l'IDfichier et d'un numéro aléatoire """
    IDfichier = GetIDfichier()[14:17]
    import random
    numAleatoire = random.randint(100, 999)
    horodatage = datetime.datetime.now().strftime("%Y%m%d%H%M%S") 
    IDdoc = "%s%s%d" % (horodatage, IDfichier, numAleatoire)
    return IDdoc


if __name__ == "__main__":
    pass
