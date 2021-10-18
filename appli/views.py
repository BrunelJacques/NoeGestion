from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from appli.stviews.sorties import *


@csrf_exempt
def stsorties(request,jour,origine='repas'):
    """
    Cette fonction va gérer toutes les URL de la forme
    /stsorties/<slug:jour>
    :param request : la requete qui a été envoyée au serveur
    :param id: l'id de la famille dont on cherche à obtenir
    les informations
    :return: Retourne les membres de la famille, ainsi qu'un maximum
    d'informations sur la famille, pour pouvoir les afficher dans
    Angular
    """
    if (request.method == 'GET'):
        return getSorties(jour,origine)
    elif (request.method == 'POST'):
        pass
    else:
        pass

@csrf_exempt
def starticles(request,contient=''):
    """
    Cette fonction va gérer toutes les URL de la forme
    /stsorties/<slug:jour>
    :param request : la requete qui a été envoyée au serveur
    :param id: l'id de la famille dont on cherche à obtenir
    les informations
    :return: Retourne les membres de la famille, ainsi qu'un maximum
    d'informations sur la famille, pour pouvoir les afficher dans
    Angular
    """
    if (request.method == 'GET'):
        return getArticles(contient)
    elif (request.method == 'POST'):
        pass
    else:
        pass

def home(request):
  return HttpResponse("<h1>NoeGestion</h1>"
                      "<h3>le serveur est fonctionnel</h3>"
                      "NoeGestion/home")
