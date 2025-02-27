from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
#from rest_framework import status
from .serializers import *

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
    # Retourne serializer_class de l'instance ou retrieve_serializer_class si l'action est retrieve
    retrieve_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.retrieve_serializer_class is not None:
            return self.retrieve_serializer_class
        return super().get_serializer_class()

# Views simples
class GeAnalytiqueViewset(ModelViewSet):
    serializer_class = GeAnalytiqueSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self,  *args, **kwargs):
        axe = self.request.GET.get('axe', 'ACTIVITES')
        if self.action == 'list':
            obsolete = self.request.GET.get('obsolete', False)
            ret = GeAnalytique.objects.filter(axe=axe,obsolete=obsolete)
        else:
            ret = GeAnalytique.objects.all()
        return ret

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

class StFournisseurViewset(ModelViewSet):

    serializer_class = StFournisseurSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StFournisseur.objects.all()

class StArticleViewset(ModelViewSet):
    serializer_class = StArticleSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        id = self.request.GET.get('id',None)
        nom = self.request.GET.get('nom', '').strip()

        if self.action != 'list':
            ret = StArticle.objects.all()
        elif id:
            ret = StArticle.objects.filter(id=id)
        elif len(nom) > 0:
            obsolete = self.request.GET.get('obsolete',False)
            ret = (StArticle.objects.filter(nom__istartswith=nom,
                                           obsolete=obsolete)
                   | StArticle.objects.filter(nom_court__istartswith=nom,                                                                                         obsolete=obsolete))
        else:
            ret = StArticle.objects.all()

        return ret.order_by('id')

# Retour différent selon nature requête
class StMouvementViewset(ModelViewSet):
    serializer_class = StMouvementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self,  *args, **kwargs):
        if self.action == 'retrieve':
            return StMouvement.objects.all()
        if self.action in ('update', 'partial_update'):
            return StMouvement.objects.all()
        else:
            origine = self.request.GET.get('origine', '*')
            jour = self.request.GET.get('jour','1999-12-31')
            id = self.request.GET.get('id','0')
            if origine != "*":
                ret = StMouvement.objects.filter(origine=origine,jour=jour)
            elif id != '0':
                ret = StMouvement.objects.filter(id=id)
            else:
                ret = None
            return ret

    def perform_create(self, serializer):
        serializer.save(ordi=self.request.user.username)

    def perform_update(self, serializer):
        # alimente la trace de l'utisateur authentifié et du nom de son ordi
        sep = " > "
        username = self.request.user.username
        if len(username) == 0:
            username = "NoToken"
        if 'ordi' in serializer.validated_data:
            ordisent = serializer.validated_data['ordi']
        else:
            ordisent = "Ordi inconnu"
        if len(username+ordisent)>29:
            # racourcissemnent des libellés à 32 au total
            sep = ">"
            username = username[:min(12,len(username))]
            ordisent = ordisent[:31-len(username)]
        serializer.save(ordi=f"{username}{sep}{ordisent}")

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
            ret = StArticle.objects.filter(nom__contains=nom,obsolete=obsolete)
        else:
            ret = StArticle.objects.all()
        return ret.order_by('nom')

