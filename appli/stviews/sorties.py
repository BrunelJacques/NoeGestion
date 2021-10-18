# -*- coding: utf-8 -*-

from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse
from outils import xformat
from django.utils import timezone

from ..models import stMouvements,stArticles

def getSorties(jour,origine):
    resultat = dict()
    resultat['stsorties'] = makeSorties(jour,origine)
    #  On renvoie toutes les informations récoltées en Json.
    return JsonResponse(resultat,
                        safe=False,
                        json_dumps_params={'indent': 2})

def makeSorties(jour,origine):
    if not jour: jour = xformat.DateToIso(timezone.now())[:10]
    """codes_magasins = [x for (x,y) in stArticles.MAGASIN_CHOICES]
    noms_magasins = [y for (x,y) in stArticles.MAGASIN_CHOICES]"""

    mvts = stMouvements.objects.filter(jour=jour,origine=origine)
    lst = []
    for mvt in mvts:
        lst.append({
            'id':mvt.id,
            'jour':mvt.jour,
            'origine':mvt.origine,
            'article':mvt.article.nom,
            'nbUnitesVente':mvt.nbUnitesVente,
            'qteMouvement':mvt.qteMouvement,
            'prixUnit':mvt.prixUnit,
            'repas':mvt.get_repas_display(),
            'nbRations':mvt.nbRations,
            'rations':mvt.article.rations,
            'qteParUniteVente':mvt.article.qteParUniteVente,
            'qteStock':mvt.article.qteStock,
            'magasin':mvt.article.get_magasin_display(),
            'rayon': mvt.article.get_rayon_display(),
            'uniteStock':mvt.article.uniteStock,
            'uniteVente': mvt.article.uniteVente,
        })
    """mouvements = stMouvements.objects.filter(jour=jour,
                                             origine=origine).values(
        'jour',
        'origine',
        'article__nom',
        'qteMouvement',
        'prixUnit',
        'article__magasin',
        )
    for mvt in mouvements:
        ix = codes_magasins.index(mvt['article__magasin'])
        mvt['nomMagasin'] = "%s"%noms_magasins[ix]"""
    return list(lst)

def zzzmakeSorties(jour,origine):
    # version avec values, pb du nom du choice
    if not jour: jour = xformat.DateToIso(timezone.now())[:10]
    codes_magasins = [x for (x,y) in stArticles.MAGASIN_CHOICES]
    noms_magasins = [y for (x,y) in stArticles.MAGASIN_CHOICES]
    mouvements = stMouvements.objects.filter(jour=jour,
                                             origine=origine).values(
        'jour',
        'origine',
        'article__nom',
        'qteMouvement',
        'prixUnit',
        'article__magasin',
        )
    for mvt in mouvements:
        ix = codes_magasins.index(mvt['article__magasin'])
        mvt['nomMagasin'] = "%s"%noms_magasins[ix]
    return list(mouvements)

def getArticles(contient):
    resultat = dict()
    resultat['starticles'] = makeArticles(contient)
    #  On renvoie toutes les informations récoltées en Json.
    return JsonResponse(resultat,
                        safe=False,
                        json_dumps_params={'indent': 2})

def makeArticles(contient):
    arts = stArticles.objects.filter(nom__icontains= contient)
    lst = []
    for art in arts:
        lst.append({
            'id':art.id,
            'nom':art.nom,
            'rations':art.rations,
            'qteParUniteVente':art.qteParUniteVente,
            'qteStock':art.qteStock,
            'magasin':art.get_magasin_display(),
            'rayon': art.get_rayon_display(),
            'uniteStock':art.uniteStock,
            'uniteVente': art.uniteVente,
        })
    return list(lst)
