# documentation
"""
chacune de ces fonctions va gérer toutes les URL de la forme
/mafonction/<slug:monparam>
:param request : la requete qui a été envoyée au serveur
:param id: l'id de la famille dont on cherche à obtenir
les informations
:return: Retourne les membres de la famille, ainsi qu'un maximum
d'informations sur la famille, pour pouvoir les afficher dans
Angular
"""

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser

from .models import Stmouvements, Starticles
from .serializers import SortiesSerializer, ArticlesSerializer


#from .stviews.sorties import *
#from .stviews.mouvements import *

# Create your views here.

#@csrf_protect

@csrf_exempt
def stmouvements(request,jour,origine='repas'):
    if (request.method == 'GET'):
        pass
        #return getMouvements(jour,origine)
    elif (request.method == 'POST'):
        pass
    else:
        pass

@csrf_exempt
def stsorties(request):
    jour = request.GET.get('jour', None)
    origine = request.GET.get('origine', 'repas')
    if (request.method == 'GET'):
        sorties = Stmouvements.objects.all().filter(origine=origine)
        if jour is not None:
            sorties = sorties.filter(date=jour)
        sorties_serializer = SortiesSerializer(sorties, many=True)
        return JsonResponse(sorties_serializer.data, safe=False)
        #return getSorties(jour,origine)
    elif (request.method == 'POST'):
        pass
    else:
        pass

@csrf_exempt
def starticles(request):
    rayon = request.GET.get('rayon', None)
    fournisseur = request.GET.get('fournisseur', None)
    magasin = request.GET.get('magasin', None)
    if request.method == 'GET':
        articles = Starticles.objects.all()
        if rayon is not None:
            articles = articles.filter(rayon=rayon)
        if fournisseur is not None:
            articles = articles.filter(fournisseur=fournisseur)
        if magasin is not None:
            articles = articles.filter(magasin=magasin)
        articles_serializer = ArticlesSerializer(articles, many=True)
        return JsonResponse(articles_serializer.data, safe=False)

    elif request.method == 'POST':
        articles_data = JSONParser().parse(request)
        articles_serializer = ArticlesSerializer(data=articles_data)
        if articles_serializer.is_valid():
            articles_serializer.save()
            return JsonResponse(articles_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(articles_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def starticle(request,id):
    print(id)
    article = Starticles.objects.get(pk=id)
    if request.method == 'GET':
        article_serializer = ArticlesSerializer(article)
        return JsonResponse(article_serializer.data, safe=False)

    elif request.method == 'PUT':
        article_data = JSONParser().parse(request)
        article_serializer = ArticlesSerializer(article, data=article_data)
        if article_serializer.is_valid():
            article_serializer.save()
            return JsonResponse(article_serializer.data)
        return JsonResponse(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        article.delete()
        return JsonResponse({'message': 'Article bel et bien supprimé, comme on dit !'},
                            status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def steffectifs(request):
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        pass
    elif request.method == 'DELETE':
        pass

@csrf_exempt
def steffectif(request,id):
    if request.method == 'GET':
        pass
    elif request.method == 'PUT':
        pass
    elif request.method == 'DELETE':
        pass

@csrf_exempt
def stchoices(request):
    if (request.method == 'GET'):
        pass
        #return getChoices()
    else:
        pass

def home(request):
  return HttpResponse("<h1>NoeGestion</h1>"
                      "<h3>le serveur est fonctionnel</h3>"
                      "NoeGestion/home")
