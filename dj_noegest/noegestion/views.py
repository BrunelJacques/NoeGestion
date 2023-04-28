from rest_framework.viewsets import ModelViewSet

from noegestion.models import StArticle,StRayon,StFournisseur,StMagasin
from noegestion.serializers import *


class StArticleViewset(ModelViewSet):

    serializer_class = StArticleSerializer

    def get_queryset(self, *args, **kwargs):
        return StArticle.objects.all()
    

class StMagasinViewset(ModelViewSet):

    serializer_class = StMagasinSerializer

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