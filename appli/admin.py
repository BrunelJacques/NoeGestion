from django.contrib import admin

from django.contrib import admin

from .models import stMouvements, stArticles, stEffectifs,stInventaires

# Register your models here, pour les gérer avec interface admin.

admin.site.register(stMouvements)
admin.site.register(stArticles)
admin.site.register(stEffectifs)
admin.site.register(stInventaires)

