# coding: utf-8

"""Personnaliser votre administration

avec les options suivantes:
AdminSite.site_header	Texte renseigné dans la balise h1 en haut de page. Par défaut la valeur est Django Administration
AdminSite.site_title	Texte renseigné à la fin de la balise title de chaque page. Par défaut la valeur est Django site admin
AdminSite.index_title	Le texte renseigné au haut de la page d'index de l'administration. Par défaut: Site administration
index_template	path vers un template personnalisé qui sera utilisé par la vue principale de l'administration
app_index_template	path vers un template personnalisé qui sera utilisé par la vue principale de l'application
login_template	path vers un template pour le login
login_form	sous-classe de AuthenticationForm qui sera utilisée par la vue du login d'administration
logout_template	path vers le template de logout
password_change_template	template pour le changement de mot de passe
password_change_done_template	template pour la confirmation du changement de mot de passe"""

import django.db.models as models
import django.utils.timezone as timezone

# origine python.doctor

PRODUCT_STATUS = (
    (0, 'Offline'),
    (1, 'Online'),
    (2, 'Out of stock')
)

class Product(models.Model):
    class Meta:
        verbose_name = "Produit"

    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)
    price_ht = models.DecimalField(max_digits=8,
                                   decimal_places=2,
                                   verbose_name="Prix unitaire HT")
    price_ttc = models.DecimalField(max_digits=8,
                                    decimal_places=2,
                                    verbose_name="Prix unitaire TTC")
    status = models.SmallIntegerField(choices=PRODUCT_STATUS, default=0)
    # DateTimeField pour 'now' instead 'date'
    date_creation = models.DateField(default=timezone.now,
                                         blank=True,
                                         verbose_name="Date création")
    def __unicode__(self):
        return "{0} [{1}]".format(self.name, self.id)

class ProductItem(models.Model):
    class Meta:
        verbose_name = "Déclinaison Produit"

    product = models.ForeignKey('Product',
                                related_name="product_item",
                                on_delete=models.CASCADE)
    code = models.CharField(max_length=10, null=True, blank=True, unique=True)
    code_ean13 = models.CharField(max_length=13,null=True)
    attributes = models.ManyToManyField("ProductAttributeValue",
                                        related_name="product_item",
                                        blank=True)
    def __unicode__(self):
        return "{0} [{1}]".format(self.product.name, self.code)

class ProductAttribute(models.Model):
    """
    Attributs produit
    """
    class Meta:
        verbose_name = "Attribut"

    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name

class ProductAttributeValue(models.Model):
    """
    Valeurs des attributs
    """

    class Meta:
        verbose_name = "Valeur attribut"
        ordering = ['position']

    value = models.CharField(max_length=100)
    product_attribute = models.ForeignKey('ProductAttribute',
                                          verbose_name="Unité",
                                          on_delete=models.CASCADE)
    position = models.PositiveSmallIntegerField("Position", null=True, blank=True)

    def __unicode__(self):
        return "{0} [{1}]".format(self.value, self.product_attribute)

# origine doc django

class Publication(models.Model):
    title = models.CharField(max_length=30)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title


class Article(models.Model):
    headline = models.CharField(max_length=100)
    publications = models.ManyToManyField(Publication)

    class Meta:
        ordering = ["headline"]

    def __str__(self):
        return self.headline