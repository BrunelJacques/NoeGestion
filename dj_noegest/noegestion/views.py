from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from noegestion.serializers import *
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

# via serialiser-Rest retourne le détail du user authentifié
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GeAnalytiqueViewset(ModelViewSet):
    serializer_class = GeAnalytiqueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self,  *args, **kwargs):
        axe = self.request.GET.get('axe', 'ACTIVITES')
        obsolete = self.request.GET.get('obsolete', False)
        return GeAnalytique.objects.filter(axe=axe,obsolete=obsolete)

class StMouvementViewset(ModelViewSet):
    serializer_class = StMouvementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self,  *args, **kwargs):
        id = self.request.GET.get('id',None)
        if id:
            return StMouvement.objects.filter(id=id)
        else:
            origine = self.request.GET.get('origine', 'repas')
            jour = self.request.GET.get('jour',str(datetime.date.today()))
            return StMouvement.objects.filter(origine=origine,jour=jour)


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

class StArticleNomViewset(ModelViewSet):
    serializer_class = StArticleNomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        nom = self.request.GET.get('nom', '').strip()
        obsolete = self.request.GET.get('obsolete', False)
        if len(nom) > 0:
            ret = StArticle.objects.filter(nom__istartswith=nom,obsolete=obsolete)
        else:
            ret = StArticle.objects.all()
        return ret.order_by('nom')

class StMagasinViewset(ModelViewSet):

    serializer_class = StMagasinSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StMagasin.objects.all()

class StRayonViewset(ModelViewSet):
    serializer_class = StRayonSerializer

    def get_queryset(self, *args, **kwargs):
        return StRayon.objects.all()

class StFournisseurViewset(ModelViewSet):

    serializer_class = StFournisseurSerializer

    def get_queryset(self, *args, **kwargs):
        return StFournisseur.objects.all()

