from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from appli_web.stviews.sorties import *


@csrf_exempt
def stsorties(request, idDate):
    """
    Cette fonction va gérer toutes les URL de la forme
    /famille/<int:id>
    :param request : la requete qui a été envoyée au serveur
    :param id: l'id de la famille dont on cherche à obtenir
    les informations
    :return: Retourne les membres de la famille, ainsi qu'un maximum
    d'informations sur la famille, pour pouvoir les afficher dans
    Angular
    """
    if (request.method == 'GET'):
        return getSorties(idDate)
    elif (request.method == 'POST'):
        pass
    else:
        pass

def home(request):
  return HttpResponse("<h1>NoeGestion</h1>"
                      "<h3>le serveur est fonctionnel</h3>"
                      "NoeGestion/home")
