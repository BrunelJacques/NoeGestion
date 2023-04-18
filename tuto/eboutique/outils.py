#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ------------------------------------------------------------------------
# NE LANCER qu'une fois (crée les ID en dur
# ------------------------------------------------------------------------

def go():
        #Alimente la base de donnée avec quelques éléments
        # Création d'un attribut
        product_attribute = ProductAttribute(name="couleur")
        product_attribute.save()

        # Création des valeurs des attributs
        attribute1 = ProductAttributeValue(value="bleu", product_attribute=product_attribute, position=0)
        attribute1.save()

        attribute2 = ProductAttributeValue(value="jaune", product_attribute=product_attribute, position=0)
        attribute2.save()

        attribute2 = ProductAttributeValue(value="brun", product_attribute=product_attribute, position=0)
        attribute2.save()

        # Création du produit
        product = Product(name="Tshirt", id="54065", price_ht=25, price_ttc=30)
        product.save()

        # Création d'une déclinaison de produit
        product_item = ProductItem(product=product, code="5046", code_ean13="a1")
        product_item.save()
        product_item.attributes.add(attribute1)
        product_item.attributes.add(attribute1)
        product_item.save()

if __name__ == "__main__":
    import os
    import sys
    import django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE','eboutique.settings')
    django.setup()
    from backoffice.models import *
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
    #go()