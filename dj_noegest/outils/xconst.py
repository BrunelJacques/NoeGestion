#!/usr/bin/python3
# -*- coding: utf-8 -*-

#  Jacques Brunel
#  MATTHANIA - Projet NoeGestion - xconst.py (constantes)
#  2021-10-11

SYMBOLE = "€"

LISTE_JOURS = ["Lundi", "Mardi", "Mercredi","Jeudi","Vendredi", "Samedi", "Dimanche"]

LISTE_MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août",
              "Septembre", "Octobre", "Novembre", "Décembre"]

LISTE_NB_MINI_JOURS_MOIS = [31,28,31,30,31,30,31,31,30,31,30,31]

LISTE_MOIS_ABREGE =[("Janv."), ("Fév."), ("Mars"), ("Avril"), ("Mai"), ("Juin"), ("Juil."),
                    ("Août"), ("Sept."), ("Oct."), ("Nov."), ("Déc.")]

# en dur car utilisé dans les fonctions
SERVICE_CHOICES = [
        (0, '-'),
        (1, 'matin'),
        (2, 'midi'),
        (3, 'soir'),
        (4, '5eme'),
        (5, 'tous'),
]

# en dur, non libre
ORIGINE_CHOICES = [
        ('achat', 'Entrée par Achats'),
        ('retour', 'Entrée Retour de camp'),
        ('od_in', 'Entrée Corrective'),
        ('repas', 'Sortie Repas en cuisine'),
        ('camp', 'Sortie pour camp'),
        ('od_out', 'Sortie Corrective')
    ]

# init model StMagasin, modif libres possibles
MAGASIN_CHOICES = [
        ('FRI', 'Frigo'),
        ('SUR', 'Congel'),
        ('RES', 'Reserve')
    ]

# init model StRayon, modif libres possibles
RAYON_CHOICES = [
        ('BSS', 'Boissons'),
        ('CND', 'Condiments'),
        ('FCL', 'Féculents'),
        ('FRS', 'Frais'),
        ('FRT', 'Fruits'),
        ('LGM', 'Légumes'),
        ('PSS', 'Poisson'),
        ('SCR', 'Sucré'),
        ('VND', 'Viande'),
    ]

