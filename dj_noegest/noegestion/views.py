from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from django.contrib.auth.models import User

from noegestion.permissions import *
from noegestion.serializers import *


class DjUserViewset(ModelViewSet):
    serializer_class = DjUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        serializer_class = DjUserSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self, *args, **kwargs):
            return User.objects.all()


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

