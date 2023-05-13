import django.contrib.admin as admin
from .models import *

# Register your models here, ceux de l'appli qui seront gérés à la mano via admin.

# Affichage de la table en liste

class StArticleAdmin(admin.ModelAdmin):
    model = StArticle
    list_display = ["nom","magasin_id","nom_rayon","nom_fournisseur","qte_stock"]

    def nom_fournisseur(self, obj):
        return obj.fournisseur.nom
    nom_fournisseur.short_description = 'Commande à'

    def nom_magasin(self, obj):
        return obj.magasin.nom

    def nom_rayon(self, obj):
        return obj.rayon.nom
    nom_rayon.short_description = 'Rayon'


class StFournisseurAdmin(admin.ModelAdmin):
    model = StFournisseur
    list_display = ["nom"]


class StRayonAdmin(admin.ModelAdmin):
    model = StRayon
    list_display = ["nom","position","id"]


class StMagasinAdmin(admin.ModelAdmin):
    model = StMagasin
    list_display = ["nom","position","id"]


class GeAnalytiqueAdmin(admin.ModelAdmin):
    model = GeAnalytique
    list_display = ["label","abrege","axe","id"]


# Connection model - liste d'affichage
admin.site.register(GeAnalytique, GeAnalytiqueAdmin)

admin.site.register(StMagasin, StMagasinAdmin)

admin.site.register(StRayon, StRayonAdmin)

admin.site.register(StFournisseur, StFournisseurAdmin)

admin.site.register(StArticle, StArticleAdmin)

