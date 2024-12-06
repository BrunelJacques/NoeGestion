
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

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
        data['lastName'] = self.user.last_name
        data['firstName'] = self.user.first_name
        data['email'] = self.user.email
        data['groups'] = self.user.groups.values_list('name', flat=True)
        data['isStaff'] = self.user.is_staff
        data['isActive'] = self.user.is_active
        return data

class GeAnalytiqueSerializer(ModelSerializer):
    class Meta:
        model = GeAnalytique
        fields = [
            "id", "nom", "abrege","params", ]

class StArticleSerializer(ModelSerializer):

    class Meta:
        model = StArticle
        fields = ['id','nom','nom_court','qte_stock','prix_moyen','unite_stock',
                   'colis_par','unite_colis','rations',
                   'fournisseur','tx_tva','dernier_achat']

        def validate_name(self, value):
            if StArticle.objects.filter(nom=value).exists():
                raise serializers.ValidationError('Cet article existe déja')
            if StArticle.objects.filter(nom_court=value).exists():
                raise serializers.ValidationError('Ce nom court d article existe déja')
            return value

class StArticleNomSerializer(ModelSerializer):

    class Meta:
        model = StArticle
        fields = ['id','nom']

class StFournisseurSerializer(ModelSerializer):

    class Meta:
        model = StFournisseur
        exclude = []

class StMagasinSerializer(ModelSerializer):

    class Meta:
        model = StMagasin
        exclude = ['id',]

class StMagasin_articleSerializer(ModelSerializer):

    articles = serializers.SerializerMethodField()

    class Meta:
        model = StMagasin
        fields = ['id','nom','articles']

    def get_articles(self, instance):
        queryset = instance.articles.filter(active=True)
        serializer = StArticleSerializer(queryset, many=True)
        return serializer.data

class StRayonSerializer(ModelSerializer):

    class Meta:
        model = StRayon
        exclude = ['id',]

class StMouvementSerializer(ModelSerializer):
    article = StArticleSerializer()
    fournisseur = StFournisseurSerializer()

    class Meta:
        model = StMouvement
        fields = [
            "id","jour","sens","origine","article","nbcolis",
            "qtemouvement","prixunit","service","nbrations",
            "analytique","fournisseur","ordi","saisie","transfert"
        ]
