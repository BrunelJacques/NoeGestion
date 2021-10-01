#from django.test import TestCase
from django.db.models import F
from appli.models import geAnalytiques,stArticles,stMouvements


# tests ----------------------------------------------------------------------
print("\n************** Bonjour les tests 'appli' *****************************")

#test = stArticles.objects.filter(article__istartswith='bananes')
#test = stArticles.objects.get(article__istartswith='bananes').montantStock
#test = stArticles.objects.filter(fournisseur__icontains='gourmet')
## mouvements ayant le code analytique '00'
#test = stMouvements.objects.filter(analytique__code__exact='00')
## articles ayant au moins un mouvement (relation inversée)
#test = stArticles.objects.filter(stmouvements__qteMouvement__gte='1')
## mouvements dont la quantité est celle de la quantité en stock
#test = stMouvements.objects.filter(qteMouvement__exact=F('article__qteStock'))

test = stMouvements.objects.aggregate()
print(len(test),test,)
print(type(test))


print("************** Fin des tests *****************************************")

"""
Lancement via terminal : 'py manage.py test'

alternative en lancement debug
Par l'outil de Debugger sous le scarabé vert, gérer le Run Configuration.
Script path:    D:\Projets\\NoeGestion\manage.py
Parameters:     test
Project:        NoeGestion
Working dir:    D:\Projects\\Noegestion
# laisser la fenêtre debug ouverte pour conserver la config"""

