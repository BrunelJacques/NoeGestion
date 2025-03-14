
from rest_framework.serializers import ModelSerializer
import rest_framework.serializers as serializers

from noegestion.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

NBCAR_COURT = 3

def MotImbrique(instance,objects):
    # teste les noms imbriqués pouvant porter à confusion, recherche les débuts communs
    cible = None
    if objects.exists():
        for obj in objects:
            if instance and instance.id == obj.id:
                continue  # c'est un update, obj est celui de l'instance
            cible = obj
    return cible

def MotTropCourt(value,nbcar=NBCAR_COURT):
    # Teste les noms trop courts qui vont bloquer les futures saisies
    ok = False
    if not value or len(value) < nbcar:
        ok = True
    return ok


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

# permet de ne pas transposer en string les DecimalFields 'coerce_to_string' = False
class BaseModelSerializer(serializers.ModelSerializer):

    def build_standard_field(self, field_name, model_field):
        field_class, field_kwargs = super().build_standard_field(field_name, model_field)
        if isinstance(model_field, models.DecimalField):
            field_kwargs['coerce_to_string'] = False
        return field_class, field_kwargs

    def build_relational_field(self, field_name, relation_info):
        field_class, field_kwargs = super().build_relational_field(field_name, relation_info)
        return field_class, field_kwargs

# Sérializers simples -----------------

class GeAnalytiqueSerializer(ModelSerializer):
    class Meta:
        model = GeAnalytique
        fields = [
            "id", "nom", "abrege","params","axe", "obsolete"]

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
        # Test noms imbriqués pouvant porter à confusion, recherche les débuts communs
        objects = StFournisseur.objects.filter(nom__startswith=value)
        cible = MotImbrique(self.instance,objects)
        if cible:
            mess = "Le nom %s est contenu dans %s, complétez!"%(value,cible)
            raise serializers.ValidationError(mess)

        # Test noms trop courts qui vont bloquer les futures saisies
        if MotTropCourt(value):
            mess = "Longueur: %dc requis, sinon ambiguités possibles"%NBCAR_COURT
            raise serializers.ValidationError(mess)

        return value

class StArticleSerializer(BaseModelSerializer):

    class Meta:
        model = StArticle

        fields = ['id','nom','nom_court','magasin','rayon','qte_stock','prix_moyen',
                  'unite_stock','colis_par','unite_colis','rations','fournisseur',
                  'tx_tva','dernier_achat']

    def validate_nom_court(self,value):

        # le changement peut se heurter à un autre article.nom_court
        objects = StArticle.objects.filter(nom_court__startswith=value)
        cible = MotImbrique(self.instance,objects)
        if cible:
            mess = "L'article %s contient déjà le nom court %s, " % (cible,value)
            mess += "différentiez-les mieux"
            raise serializers.ValidationError(mess)

        # Teste les noms trop courts qui vont bloquer les futures saisies
        nbcar = 4
        if MotTropCourt(value,nbcar):
            mess = "Longueur: %dc requis pour %s, sinon ambiguités possibles"%(nbcar,value)
            raise serializers.ValidationError(mess)
        return value

    def validate(self,data):
        # le test du model passe avant mais distingue les casses
        key = 'nom_court'
        objects = StArticle.objects
        initial_value = self.initial_data[key]
        if data[key] == initial_value:
            # nom inchangé, aucun risque de doublon
            return data
        # le nom a changé, le nouveau ne doit pas déjà exister
        kwd = {key: data[key],}
        if objects.filter(**kwd).exists():
            mess = "%s %s existe pas de doublons possible" % (key,data[key])
            raise serializers.ValidationError(mess)
        return data

# Réponse différentiée selon nature de requête
class StMouvementSerializer(BaseModelSerializer):
    article = StArticleSerializer()
    #article_nom_court = serializers.SerializerMethodField()

    class Meta:
        model = StMouvement
        fields = [
            "id","jour","sens","origine","article",
            "nb_colis","qte_mouvement","prix_unit","service","rations",
            "analytique","fournisseur","ordi","saisie","ordi","transfert"
        ]

    #def get_article_nom_court(self, obj):
    #    return obj.article.nom_court

    def validate(self, data):
        ok = True
        if 'origine' in data and data['origine'] == 'achat':
            if (not 'fournisseur' in data) or  not data['fournisseur']:
                ok = False
        elif not 'origine' in data:
            if self.instance.origine == 'achat':
                if (not 'fournisseur' in data) or  not data['fournisseur']:
                    ok = False

        if not ok:
            mess = "Les achats nécessitent un nom de fournisseur"
            raise serializers.ValidationError(mess)

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

