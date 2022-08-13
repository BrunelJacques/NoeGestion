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

REPAS_CHOICES = [
        (1, 'Matin'),
        (2, 'Midi'),
        (3, 'Soir'),
        (4, 'Tous'),
    ]

ORIGINE_CHOICES = [
        ('entrees', (
            ('achat', 'Achats'),
            ('retour', 'Retour de camp'),
            ('od_in', 'Correctif entrée'),
        )
         ),
        ('sorties', (
            ('repas', 'Repas en cuisine'),
            ('camp', 'Sortie pour camp'),
            ('od_out', 'Correctif sortie')
        )
         )
    ]

MAGASIN_CHOICES = [
        ('FRI', 'Frigo'),
        ('SUR', 'Congel'),
        ('RES', 'Reserve')
    ]

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

