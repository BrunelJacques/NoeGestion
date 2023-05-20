from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from noegestion.views import *

# Ici nous créons notre routeur
router_st = routers.SimpleRouter()
# Puis lui déclarons une url basée sur le mot clé ‘category’ et notre view
# afin que l’url générée soit celle que nous souhaitons ‘/api/category/’
router_st.register('starticle', StArticleViewset, basename='starticle')
router_st.register('stfournisseur', StFournisseurViewset, basename='stfournisseur')
router_st.register('strayon', StRayonViewset, basename='strayon')
router_st.register('stmagasin', StMagasinViewset, basename='stmagasin')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home, name='home'),
    path('', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('st/', include(router_st.urls))
]