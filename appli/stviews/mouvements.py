# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from outils import xformat
from django.utils import timezone

from ..models import stMouvements

def getMouvements(jour,origine):
    resultat = dict()
    resultat['stmouvements'] = makeMouvements(jour,origine)
    #  On renvoie toutes les informations récoltées en Json.
    return JsonResponse(resultat,
                        safe=False,
                        json_dumps_params={'indent': 2})

def makeMouvements(jour,origine):
    if not jour: jour = xformat.DateToIso(timezone.now())[:10]

    mvts = stMouvements.objects.filter(jour=jour,origine=origine)
    lst = []
    for mvt in mvts:
        lst.append({
            'id':mvt.id,
            'jour':mvt.jour,
            'origine':mvt.origine,
            'article_id': mvt.article_id,
            'article':mvt.article.nom,
            'nbUnitesVente':mvt.nbUnitesVente,
            'qteMouvement':mvt.qteMouvement,
            'prixUnit':mvt.prixUnit,
            'repas':mvt.get_repas_display(),
            'nbRations':mvt.nbRations,
            'nbRationsArt':mvt.article.rations,
            'qteParUniteVente':mvt.article.qteParUniteVente,
            'qteStock':mvt.article.qteStock,
            'magasin':mvt.article.get_magasin_display(),
            'rayon': mvt.article.get_rayon_display(),
            'uniteStock':mvt.article.uniteStock,
            'uniteVente': mvt.article.uniteVente,
            'fournisseur': mvt.fournisseur,
            'fournisseurArt': mvt.article.fournisseur,
            'txTva': mvt.article.txTva,
            'prixMoyen': mvt.article.prixMoyen,
            'analytique': mvt.analytique.code,
            'transfertCompta': mvt.transfertCompta,
        })
    return list(lst)
