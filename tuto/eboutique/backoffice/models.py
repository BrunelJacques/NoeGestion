from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    id = models.IntegerField(primary_key=True)

    def __unicode__(self):
        return "{0} [{1}]".format(self.name, self.id)


class ProductItem(models.Model):
    color = models.CharField(max_length=100)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)

    def __unicode__(self):
        return "{0} {{1}} [{2}]".format(self.product.name, self.color, self.id)