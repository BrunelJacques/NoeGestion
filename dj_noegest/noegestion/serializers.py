from rest_framework.serializers import ModelSerializer
from noegestion.models import StArticle,StMagasin,StFournisseur,StRayon
from django.contrib.auth.models import User

class DjUserSerializer(ModelSerializer):

    class Meta:
        model = User
        exclude = ['id',]




class StArticleSerializer(ModelSerializer):

    class Meta:
        model = StArticle
        exclude = ['id','saisie','dernier_achat']
        #read_only_fields = ('id', )
        

class StFournisseurSerializer(ModelSerializer):

    class Meta:
        model = StFournisseur
        exclude = ['id',]


class StMagasinSerializer(ModelSerializer):

    class Meta:
        model = StMagasin
        exclude = ['id',]


class StRayonSerializer(ModelSerializer):

    class Meta:
        model = StRayon
        exclude = ['id',]
