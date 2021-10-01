from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse

from ..models import stMouvements


def getSorties(jour=None):
    resultat = dict()
    resultat['stsorties'] = makeSorties(jour)
    #  On renvoie toutes les informations récoltées en Json.
    print(resultat)

    return JsonResponse(resultat,
                        safe=False,
                        json_dumps_params={'indent': 2})

def makeSorties(jour):
    if not jour: jour = '2021-08-02'
    mouvements = stMouvements.objects.filter(jour=jour).values('jour',
                                                                'origine',
                                                                'article_id',
                                                                'qteMouvement',
                                                                'prixUnit')
    return list(mouvements)
