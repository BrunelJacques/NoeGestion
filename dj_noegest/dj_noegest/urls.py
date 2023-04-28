from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from noegestion.views import *

# Ici nous créons notre routeur
router = routers.SimpleRouter()
# Puis lui déclarons une url basée sur le mot clé ‘category’ et notre view
# afin que l’url générée soit celle que nous souhaitons ‘/api/category/’
router.register('starticle', StArticleViewset, basename='starticle')
router.register('stfournisseur', StFournisseurViewset, basename='stfournisseur')
router.register('strayon', StRayonViewset, basename='strayon')
router.register('stmagasin', StMagasinViewset, basename='stmagasin')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls))
]