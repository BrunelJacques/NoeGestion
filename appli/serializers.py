from rest_framework import serializers

from .models import Stmouvements, Steffectifs, Stinventaires, Starticles


class SortiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stmouvements
        fields = ('idmouvement',
                  'date',
                  'origine',
                  'idarticle',
                  'qte',
                  'prixunit',
                  'repas',
                  'ordi',
                  'idanalytique',
                  'datesaisie',
                  'modifiable',
                  )

class EffectifsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Steffectifs
        fields = ('iddate',
                  'idanalytique',
                  'midiclients',
                  'midirepas',
                  'soirclients',
                  'soirrepas',
                  'prevuclients',
                  'prevurepas',
                  'ordi',
                  'datesaisie',
                  )

class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Starticles
        fields = ('idarticle',
                  'rations',
                  'fournisseur',
                  'qtestock',
                  'txtva',
                  'magasin',
                  'rayon',
                  'qtemini',
                  'qtesaison',
                  'obsolete',
                  'prixmoyen',
                  'prixactuel',
                  'dernierachat',
                  'ordi',
                  'datesaisie',
                  )