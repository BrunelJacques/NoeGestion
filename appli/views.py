from typing import Any

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, parsers
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .models import Mouvements, Articles, Effectifs, Inventaires
from .renderers import UserJSONRenderer
from .serializers import MouvementsSerializer, ArticlesSerializer, EffectifsSerializer, InventairesSerializer, \
    RegistrationSerializer, LoginSerializer, UserSerializer, LogoutSerializer
from outils import xconst


@csrf_exempt
def mouvements(request: Request) -> JsonResponse:
    jour = request.GET.get('jour', None)
    origine = request.GET.get('origine', None)
    if request.method == 'GET':
        mouvements = Mouvements.objects.all()
        if origine is not None:
            mouvements = mouvements.filter(origine=origine)
        if jour is not None:
            mouvements = mouvements.filter(jour=jour)
        mouvements_serializer = MouvementsSerializer(mouvements, many=True)
        return JsonResponse(mouvements_serializer.data, safe=False)
    elif request.method == 'POST':
        mouvements_data = JSONParser().parse(request)
        mouvements_serializer = MouvementsSerializer(data=mouvements_data)
        if mouvements_serializer.is_valid():
            mouvements_serializer.save()
            return JsonResponse(mouvements_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse(None, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def mouvement(request: Request, id: int) -> JsonResponse:
    mouvement = Mouvements.objects.get(pk=id)
    if request.method == 'GET':
        mouvement_serializer = MouvementsSerializer(mouvement)
        return JsonResponse(mouvement_serializer.data, safe=False)
    elif request.method == 'PUT':
        mouvement_data = JSONParser().parse(request)
        mouvement_serializer = MouvementsSerializer(article, data=mouvement_data)
        if mouvement_serializer.is_valid():
            mouvement_serializer.save()
            return JsonResponse(mouvement_serializer.data)
        return JsonResponse(mouvement_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        mouvement.delete()
        return JsonResponse({'message': 'Article bel et bien supprimé, comme on dit !'},
                            status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['GET'])
def sorties(request: Request) -> JsonResponse:
    """Cette fonction retourne les sorties

    Une sortie est un mouvement qui a pour origine un repas.
    On peut passer en paramètre dans l'URL une valeur 'jour'
    Dans ce cas la fonction ne renvoie que les sorties du jour
    On récupère le résultat de la requête, que l'on met dans
    un serializer, puis on le renvoie au format JSON.
    """

    jour = request.GET.get('jour', None)
    origine = request.GET.get('origine', 'repas')
    if request.method == 'GET':
        sorties = Mouvements.objects.all().filter(origine=origine)
        if jour is not None:
            sorties = sorties.filter(jour=jour)
        sorties_serializer = MouvementsSerializer(sorties, many=True)
        return JsonResponse(sorties_serializer.data, safe=False)
    else:
        return JsonResponse(None, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST'])
def articles(request: Request) -> JsonResponse:
    rayon = request.GET.get('rayon', None)
    fournisseur = request.GET.get('fournisseur', None)
    magasin = request.GET.get('magasin', None)
    if request.method == 'GET':
        articles = Articles.objects.all()
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
@api_view(['GET', 'PUT', 'DELETE'])
def article(request: Request, id: int) -> JsonResponse:
    article = Articles.objects.get(pk=id)
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
@api_view(['GET', 'POST'])
def effectifs(request: Request) -> JsonResponse:
    if request.method == 'GET':
        effectifs = Effectifs.objects.all()
        jour = request.GET.get('jour', None)
        if jour is not None:
            effectifs = effectifs.filter(jour=jour)
        effectifs_serializer = EffectifsSerializer(effectifs, many=True)
        return JsonResponse(effectifs_serializer.data, safe=False)
    elif request.method == 'POST':
        effectifs_data = JSONParser().parse(request)
        effectifs_serializer = EffectifsSerializer(data=effectifs_data)
        if effectifs_serializer.is_valid():
            effectifs_serializer.save()
            return JsonResponse(effectifs_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(effectifs_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def effectif(request: Request, id: int) -> JsonResponse:
    effectif = Effectifs.objects.get(pk=id)
    if request.method == 'GET':
        effectif_serializer = EffectifsSerializer(effectif)
        return JsonResponse(effectif_serializer.data, safe=False)

    elif request.method == 'PUT':
        effectif_data = JSONParser().parse(request)
        effectif_serializer = EffectifsSerializer(effectif, data=effectif_data)
        if effectif_serializer.is_valid():
            effectif_serializer.save()
            return JsonResponse(effectif_serializer.data)
        return JsonResponse(effectif_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        effectif.delete()
        return JsonResponse({'message': 'Article bel et bien supprimé, comme on dit !'},
                            status=status.HTTP_204_NO_CONTENT)
    return JsonResponse(None, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
def choix(request: Request) -> JsonResponse:
    if request.method == 'GET':
        dic = dict()
        dic['origine'] = xconst.ORIGINE_CHOICES
        dic['repas'] = xconst.REPAS_CHOICES
        dic['magasin'] = xconst.MAGASIN_CHOICES
        dic['rayon'] = xconst.RAYON_CHOICES
        return JsonResponse(dic,
                            safe=False,
                            json_dumps_params={'indent': 2})
    else:
        return JsonResponse(None, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST'])
def inventaires(request: Request) -> JsonResponse:
    if request.method == 'GET':
        inventaires = Inventaires.objects.all()
        jour = request.GET.get('jour', None)
        article = request.GET.get('article', None)
        if jour is not None:
            inventaires = inventaires.filter(jour=jour)
        if article is not None:
            inventaires = inventaires.filter(article=article)
        inventaires_serializer = InventairesSerializer(inventaires, many=True)
        return JsonResponse(inventaires_serializer.data, safe=False)
    elif request.method == 'POST':
        inventaire_data = JSONParser().parse(request)
        inventaire_serializer = InventairesSerializer(data=inventaire_data)
        if inventaire_serializer.is_valid():
            inventaire_serializer.save()
            return JsonResponse(inventaire_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(inventaire_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def inventaire(request: Request, id: int) -> JsonResponse:
    inventaire = Inventaires.objects.get(pk=id)
    if request.method == 'GET':
        inventaire_serializer = InventairesSerializer(inventaire)
        return JsonResponse(inventaire_serializer.data, safe=False)

    elif request.method == 'PUT':
        inventaire_data = JSONParser().parse(request)
        inventaire_serializer = InventairesSerializer(inventaire, data=inventaire_data)
        if inventaire_serializer.is_valid():
            inventaire_serializer.save()
            return JsonResponse(inventaire_serializer.data)
        return JsonResponse(inventaire_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        inventaire.delete()
        return JsonResponse({'message': 'Inventaire bel et bien supprimé, comme on dit !'},
                            status=status.HTTP_204_NO_CONTENT)


class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request: Request) -> Response:
        """Return user response after a successful registration."""
        user_request = request.data.get('user', {})
        serializer = self.serializer_class(data=user_request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request: Request) -> Response:
        """Return user after login."""
        user = request.data.get('user', {})

        serializer = self.serializer_class(data=user)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'
    parser_classes = [
        parsers.JSONParser,
        parsers.FormParser,
        parsers.MultiPartParser,
    ]

    def get(self, request: Request, *args: tuple[Any], **kwargs: dict[str, Any]) -> Response:
        """Get request."""
        serializer = self.serializer_class(request.user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, *args: tuple[Any], **kwargs: dict[str, Any]) -> Response:
        """Patch method."""
        serializer_data = request.data.get('user', {})

        serializer = UserSerializer(request.user, data=serializer_data, partial=True)

        if serializer.is_valid():
            user = serializer.save()

            return Response(UserSerializer(user).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    serializer_class = LogoutSerializer

    permission_classes = (IsAuthenticated,)

    def post(self, request: Request) -> Response:
        """Validate token and save."""
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
