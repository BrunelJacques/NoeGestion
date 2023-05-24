from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import django.contrib.auth.views as authviews

#import noegestion.views
from noegestion.views import *

# Ici nous créons notre routeur
router_api = routers.SimpleRouter()
# Puis lui déclarons les url qu'ils doit orienter
router_api.register('geanalytique', GeAnalytiqueViewset, basename='geanalytique')
router_api.register('stmouvement', StMouvementViewset, basename='stmouvement')
router_api.register('starticle', StArticleViewset, basename='starticle')
router_api.register('stfournisseur', StFournisseurViewset, basename='stfournisseur')
router_api.register('strayon', StRayonViewset, basename='strayon')
router_api.register('stmagasin', StMagasinViewset, basename='stmagasin')

# https://stackoverflow.com/questions/54544978/customizing-jwt-response-from-django-rest-framework-simplejwt
from noegestion.views import MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home, name='home'),
    path('', include('rest_framework.urls')),
    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router_api.urls))
]