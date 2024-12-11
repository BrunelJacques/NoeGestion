import django.contrib.admin as admin
from .models import *
# Register your models here, Ils seront gérés à la mano via admin.

# Affichage de la table en liste dans l'interface admin

class StMouvementAdmin(admin.ModelAdmin):
    list_display = ["id","jour","article","sens","cle_origine","nbcolis","qte_mouvement",
                    "prixunit","service","nbrations","nom_article",
                    "cle_analytique","fournisseur"]
    search_fields = ('jour',"article__nom","article__nom_court")
    list_filter = ('origine','fournisseur','service','jour')

    def nom_article(self, obj):
        return obj.article.nom
    nom_article.short_description = 'Article Nom Long'

    def cle_origine(self, obj):
        return obj.origine
    cle_origine.short_description = 'Origine'

    def cle_analytique(self, obj):
        return obj.analytique
    cle_analytique.short_description = 'Camp'

    def qte_mouvement(self, obj):
        return obj.qtemouvement
    qte_mouvement.short_description = 'QteMvt'

class StArticleAdmin(admin.ModelAdmin):

    list_display = ["id","nom","nom_court","id_magasin","id_rayon","nom_fournisseur","qte_stock"]
    search_fields = ['nom',"nom_court"]
    list_filter = ['magasin','rayon','fournisseur']

    def nom_fournisseur(self, obj):
        if obj.fournisseur:
            return obj.fournisseur.nom
    nom_fournisseur.short_description = 'Commande à'

    def id_magasin(self, obj):
        return obj.magasin.id
    id_magasin.short_description = "Magasin"

    def id_rayon(self, obj):
        return obj.rayon.id
    id_rayon.short_description = 'Rayon'

class StFournisseurAdmin(admin.ModelAdmin):
    list_display = ["id","nom"]
    search_fields = ['nom','id']


class StRayonAdmin(admin.ModelAdmin):
    list_display = ["id","nom","position"]

class StMagasinAdmin(admin.ModelAdmin):
    list_display = ["id","nom","position"]

class GeAnalytiqueAdmin(admin.ModelAdmin):
    list_display = ["id","nom","abrege","axe"]


# Connection model - liste d'affichage
admin.site.register(GeAnalytique, GeAnalytiqueAdmin)

admin.site.register(StMagasin, StMagasinAdmin)

admin.site.register(StRayon, StRayonAdmin)

admin.site.register(StFournisseur, StFournisseurAdmin)

admin.site.register(StArticle, StArticleAdmin)

admin.site.register(StMouvement, StMouvementAdmin)

