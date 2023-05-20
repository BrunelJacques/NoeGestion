from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly

from noegestion.permissions import *
from noegestion.serializers import *

# pour test d'accès direct à django
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

#@login_required
def home(request):
    name = "l'inconnu %s" %request.user.username
    if hasattr(request.user,'last_name'):
        name = "%s : %s %s" %(request.user.username,
                              request.user.first_name,
                              request.user.last_name)
    message = "Bonjour %s " %(name)
    return render(request, 'noegestion/home.html', context={'message': message})


# via serialiser Rest
class StArticleViewset(ModelViewSet):

    serializer_class = StArticleSerializer
    permission_classes = [IsAdminAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return StArticle.objects.all()
    

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

