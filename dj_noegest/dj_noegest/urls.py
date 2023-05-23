from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth import views as authviews

#import noegestion.views
from noegestion.views import *

# Ici nous créons notre routeur
router_st = routers.SimpleRouter()
# Puis lui déclarons une url basée sur le mot clé ‘category’ et notre view

router_st.register('stmouvement', StMouvementViewset, basename='stmouvement')
router_st.register('starticle', StArticleViewset, basename='starticle')
router_st.register('stfournisseur', StFournisseurViewset, basename='stfournisseur')
router_st.register('strayon', StRayonViewset, basename='strayon')
router_st.register('stmagasin', StMagasinViewset, basename='stmagasin')

# https://stackoverflow.com/questions/54544978/customizing-jwt-response-from-django-rest-framework-simplejwt
from noegestion.views import MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home, name='home'),
    path('logout/',  authviews.LogoutView.as_view() , name='logout'),
    path('', include('rest_framework.urls')),
    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router_st.urls))
]