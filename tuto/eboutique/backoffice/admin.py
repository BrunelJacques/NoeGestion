from django.contrib import admin
from backoffice.models import *

# Register your models here, ceux de l'appli qui seront gérés à la mano via admin.

# ------------------------------------------------------------------
class zzItemInLine(admin.TabularInline):
    model = ProductAttribute

class ProductItemAdmin(admin.ModelAdmin):
    model = ProductItem
    #inlines = [ItemInLine, ]
    list_display = ('code', 'product_id', 'id')
    search_fields = ('name', 'status')

# ------------------------------------------------------------------
class ProductInLine(admin.TabularInline):
    model = ProductItem
    filter_vertical = ("attributes",) # facultatif, si bcp d'atributs sinon supprimer

class ProductAdmin(admin.ModelAdmin):
    model = Product
    inlines = [ProductInLine,]
    list_display = ["id", "name", "price_ht", "price_ttc"]
    list_editable = ["name", "price_ht", "price_ttc"]
    date_hierarchy = 'date_creation'
# -------------------------------------------------------------------
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductItem, ProductItemAdmin)
admin.site.register(ProductAttribute)
admin.site.register(ProductAttributeValue)