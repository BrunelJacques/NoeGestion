
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from noegestion.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# https://stackoverflow.com/questions/54544978/customizing-jwt-response-from-django-rest-framework-simplejwt
# permet de récupérer l'id user et ses groupes pour le front end
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

# Sérializers simples -----------------

class GeAnalytiqueSerializer(ModelSerializer):
    class Meta:
        model = GeAnalytique
        fields = [
            "id", "nom", "abrege","params"]

class StMagasinSerializer(ModelSerializer):

    class Meta:
        model = StMagasin
        exclude = []

class StRayonSerializer(ModelSerializer):

    class Meta:
        model = StRayon
        exclude = []

class StFournisseurSerializer(ModelSerializer):

    class Meta:
        model = StFournisseur
        fields = '__all__'

    def validate_nom(self, value):
        objects = StFournisseur.objects.filter(nom__icontains=value)
        if objects.exists():
            first = str(objects.first())
            raise serializers.ValidationError('Le nom %s est contenu dans %s'%(value,first))
        if not value or len(value) < 3:
            raise serializers.ValidationError('Longueur: 3c requis, sinon ambiguités possibles')
        return value

class StArticleSerializer(ModelSerializer):

    class Meta:
        model = StArticle
        fields = ['id','nom','nom_court','qte_stock','prix_moyen','unite_stock',
                   'colis_par','unite_colis','rations',
                   'fournisseur','tx_tva','dernier_achat']

    def validate_nom(self, value):
        if StArticle.objects.filter(nom=value).exists():
            raise serializers.ValidationError("Ce nom d'article existe déja")
        return value

    def validate_nom_court(self,value):
        objects = StArticle.objects.filter(nom__icontains=value)
        if objects.exists():
            first = str(objects.first())
            raise serializers.ValidationError(
                'Le nom court %s est contenu dans %s, différentiez les mieux' % (value, first))
        return value

# Réponse différentiée selon nature de reqiête
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

    def validate(self, data):
        if data['origine'] == 'achat'and (not data['fournisseur'] or len(data['fournisseur']) < 3):
            raise serializers.ValidationError("Les achats nécessitent un nom fournisseur")
        return data


# Listes d'articles----------------------------
class StFournisseur_articleSerializer(ModelSerializer):

    articles = serializers.SerializerMethodField()

    class Meta:
        model = StFournisseur
        fields = ['id','nom','articles']

    def get_articles(self, instance):
        queryset = instance.articles.filter(obsolete=False)
        serializer = StArticleNomSerializer(queryset, many=True)
        return serializer.data

class StMagasin_articleSerializer(ModelSerializer):

    articles = serializers.SerializerMethodField()

    class Meta:
        model = StMagasin
        fields = ['id','nom','articles']

    def get_articles(self, instance):
        """ Définition nécessaire en cas de SerializerMethodField()
        Le paramètre 'instance' est l'instance du fournisseur consulté.
        Dans le cas d'une liste, cette méthode est appelée autant de fois qu'il y a
         d'entités dans la liste"""

        # On applique le filtre sur notre queryset pour n'avoir que les produits actifs
        queryset = instance.articles.filter(obsolete=False)
        # Le serializer est créé avec le queryset défini et toujours défini en tant que many=True
        serializer = StArticleNomSerializer(queryset, many=True)
        # la propriété '.data' est le rendu de notre serializer que nous retournons ici
        return serializer.data

class StRayon_articleSerializer(ModelSerializer):

    articles = serializers.SerializerMethodField()

    class Meta:
        model = StRayon
        fields = ['id','nom','articles']

    def get_articles(self, instance):
        queryset = instance.articles.filter(obsolete=False)
        serializer = StArticleNomSerializer(queryset, many=True)
        return serializer.data

class StArticleNomSerializer(ModelSerializer):

    class Meta:
        model = StArticle
        fields = ['id','nom']

