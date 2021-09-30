from django.shortcuts import get_object_or_404
from django.http import JsonResponse, HttpResponse

from ..models import stMouvements


def getSorties(idDate):
    resultat = dict()
    resultat['individus'] = makeSorties(idDate)
    #  On renvoie toutes les informations récoltées en Json.
    print(resultat)

    return JsonResponse(resultat,
                        safe=False,
                        json_dumps_params={'indent': 2})

def makeSorties(idDate):
    mouvements = stMouvements.objects.filter(idDate=idDate).values('idDate',
                                                                'idArticle',
                                                                'titulaire')
    return list(mouvements)
