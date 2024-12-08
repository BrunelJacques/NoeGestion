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

class MultipleSerializerMixin:

    detail_serializer_class = None

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.detail_serializer_class is not None:
            return self.detail_serializer_class
        return super().get_serializer_class()

# via serialiser-Rest retourne le détail du user authentifié
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GeAnalytiqueViewset(ReadOnlyModelViewSet):
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

    def create(self, request, *args, **kwargs):  # POST
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):  # PUT
        partial = kwargs.pop('partial', False)  # For partial updates (PATCH)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):  # DELETE
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

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

class StRayonViewset(ModelViewSet):
    serializer_class = StRayonSerializer

    def get_queryset(self, *args, **kwargs):
        return StRayon.objects.all()

class StFournisseurViewset(ModelViewSet):

    serializer_class = StFournisseurSerializer

    def get_queryset(self, *args, **kwargs):
        return StFournisseur.objects.all()

class StMagasinViewset(ReadOnlyModelViewSet):

    serializer_class = StMagasinSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StMagasin.objects.all()

class AdminStMagasinViewset(MultipleSerializerMixin,ModelViewSet):

    serializer_class = StMagasinSerializer
    detail_serializer_class = StMagasin_articleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StMagasin.objects.all()


