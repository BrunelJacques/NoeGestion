from django.contrib import admin

from .models import Starticles, Stmouvements, Steffectifs, Stinventaires
# Register your models here, pour les gérer avec interface admin.

admin.site.register(Stmouvements)
admin.site.register(Starticles)
admin.site.register(Steffectifs)
admin.site.register(Stinventaires)

