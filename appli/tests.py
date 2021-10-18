#from django.test import TestCase
from django.db.models import F, Count, Sum
from appli.models import geAnalytiques,stArticles,stMouvements
import os
#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'serveur_django.settings')

# tests ----------------------------------------------------------------------
print("\n************** Bonjour les tests 'appli' *****************************")
test = None
#test = stArticles.objects.filter(article__istartswith='bananes')
"""test = stArticles.objects.get(article__istartswith='bananes').montantStock
test = stArticles.objects.filter(fournisseur__icontains='gourmet')"""
##      mouvements ayant le code analytique '00'
"""test = stMouvements.objects.filter(analytique__code__exact='00')"""
##      articles ayant au moins un mouvement (relation inversée) query pour sql
"""test = stArticles.objects.filter(stmouvements__qteMouvement__gte='1')
#test = stArticles.objects.filter(stmouvements__qteMouvement__gte='1').query"""
##      mouvements dont la quantité est celle de la quantité en stock
"""test = stMouvements.objects.filter(qteMouvement__exact=F('article__qteStock'))"""
##      pointe l'objet article du cinquième mouvement (objets liés)
"""test = stMouvements.objects.all()[5].article"""
##      retourne tous les mouvements de l'article 17, ou le nombre de mvt
"""article = stArticles.objects.get(id=17)
test = article.stmouvements_set.all()
test2 = article.stmouvements_set.count()"""
##      nombre et montants des mouvements de l'article
"""test = stArticles.objects.filter(id=17)\
    .aggregate(nbreMvts=Count('stmouvements'),
               mtt=Sum('stmouvements__qteMouvement'))"""
##      retourne le nom d'affichage du magasin
article = stMouvements.objects.filter(jour='2021-05-01')[0].article
test = article.get_magasin_display()


print(test)
print(type(test))


print("************** Fin des tests *****************************************")

# Mode d'emploi des tests
"""
Lancement via terminal : 'py manage.py test'

alternative en lancement debug:
Par l'outil 'clé à molette' sous le scarabé vert dans Debug, 
'Modify Run Configuration'.
Script path:    D:\Projets\\NoeGestion\manage.py
Parameters:     test
Project:        NoeGestion
Working dir:    D:\Projects\\Noegestion
# laisser la fenêtre debug ouverte pour conserver la config"""

