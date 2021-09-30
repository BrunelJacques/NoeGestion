from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse

from ..models import stMouvements


def getSorties(idDate=None):
    resultat = dict()
    resultat['stsorties'] = makeSorties(idDate)
    #  On renvoie toutes les informations récoltées en Json.
    print(resultat)

    return JsonResponse(resultat,
                        safe=False,
                        json_dumps_params={'indent': 2})

def makeSorties(idDate):
    if not idDate: idDate = '2021-08-02'
    mouvements = stMouvements.objects.filter(idDate=idDate).values('idDate',
                                                                'origine'
                                                                'idArticle',
                                                                'qteMouvement',
                                                                'prixUnit')
    return list(mouvements)
