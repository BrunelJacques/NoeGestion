from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
import datetime

# pour test d'accès direct à django
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# via décorateur de base Django
@login_required
def home(request):
    name = "l'inconnu %s" %request.user.username
    if hasattr(request.user,'last_name'):
        name = "%s : %s %s" %(request.user.username,
                              request.user.first_name,
                              request.user.last_name)
    message = "Bonjour %s " %(name)
    return render(request, 'home.html', context={'message': message})

class GetRetrieveSerializer:

    retrieve_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.retrieve_serializer_class is not None:
            return self.retrieve_serializer_class
        return super().get_serializer_class()

# Views simples
class GeAnalytiqueViewset(ReadOnlyModelViewSet):
    serializer_class = GeAnalytiqueSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self,  *args, **kwargs):
        axe = self.request.GET.get('axe', 'ACTIVITES')
        obsolete = self.request.GET.get('obsolete', False)
        return GeAnalytique.objects.filter(axe=axe,obsolete=obsolete)

class StMagasinViewset(GetRetrieveSerializer, ModelViewSet):

    serializer_class = StMagasinSerializer
    retrieve_serializer_class = StMagasin_articleSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StMagasin.objects.all()

class StRayonViewset(GetRetrieveSerializer,ModelViewSet):
    serializer_class = StRayonSerializer
    retrieve_serializer_class = StRayon_articleSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StRayon.objects.all()

class StFournisseurViewset(GetRetrieveSerializer,ModelViewSet):

    serializer_class = StFournisseurSerializer
    retrieve_serializer_class = StFournisseur_articleSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StFournisseur.objects.all()

class StArticleViewset(ModelViewSet):
    serializer_class = StArticleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        id = self.request.GET.get('id',None)
        nom = self.request.GET.get('nom', '').strip()
        if id:
            ret = StArticle.objects.filter(id=id)
        elif len(nom) > 0:
            obsolete = self.request.GET.get('obsolete',False)
            ret = StArticle.objects.filter(nom__istartswith=nom,obsolete=obsolete) \
                   | StArticle.objects.filter(nom_court__istartswith=nom,obsolete=obsolete)
        else:
            ret = StArticle.objects.all()
        return ret.order_by('nom')

# Retour différent selon nature requête
class StMouvementViewset(ModelViewSet):
    serializer_class = StMouvementSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self,  *args, **kwargs):
        if self.action == 'retrieve':
            return StMouvement.objects.all()
        else:
            origine = self.request.GET.get('origine', 'repas')
            jour = self.request.GET.get('jour','2022-09-17')
            return StMouvement.objects.filter(origine=origine,jour=jour)


# Liste complete avec articles actifs ---------------------
class StFournisseur_articleViewset(ReadOnlyModelViewSet):

    serializer_class = StFournisseur_articleSerializer
    def get_queryset(self, *args, **kwargs):
        return StFournisseur.objects.all()


class StArticleNomViewset(ReadOnlyModelViewSet):
    serializer_class = StArticleNomSerializer

    def get_queryset(self, *args, **kwargs):
        nom = self.request.GET.get('nom', '').strip()
        obsolete = self.request.GET.get('obsolete', False)
        if len(nom) > 0:
            ret = StArticle.objects.filter(nom__istartswith=nom,obsolete=obsolete)
        else:
            ret = StArticle.objects.all()
        return ret.order_by('nom')

