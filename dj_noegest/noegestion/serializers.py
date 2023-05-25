
from rest_framework.serializers import ModelSerializer, CharField
from noegestion.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# https://stackoverflow.com/questions/54544978/customizing-jwt-response-from-django-rest-framework-simplejwt
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses here
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['password'] = self.user.password
        data['lastname'] = self.user.last_name
        data['firstname'] = self.user.first_name
        data['groups'] = self.user.groups.values_list('name', flat=True)
        return data


class GeAnalytiqueSerializer(ModelSerializer):

    class Meta:
        model = GeAnalytique
        fields = [
            "id", "nom", "abrege","params", ]


class StMouvementSerializer(ModelSerializer):

    class Meta:
        model = StMouvement
        fields = [
            "id","jour", "sens", "origine", "article", "article","nbcolis",
            "qtemouvement","prixunit", "service", "nbrations", "transfert",
            "analytique", "fournisseur"]


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
