import rest_framework.routers as routers
import  django.contrib.admin as admin
from django.urls.conf import path,include

from rest_framework_simplejwt.views import TokenRefreshView

from noegestion.views import *


# Token qui retourne le détail de l'user authentifié via DRF_serializer
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Ici nous créons notre routeur
router = routers.SimpleRouter()
# Puis lui déclarons les url qu'il doit orienter
router.register('stmagasin', StMagasinViewset, basename='stmagasin')
router.register('strayon', StRayonViewset, basename='strayon')
router.register('stfournisseur', StFournisseurViewset, basename='stfournisseur')
router.register('geanalytique', GeAnalytiqueViewset, basename='geanalytique')
router.register('starticle', StArticleViewset, basename='starticle')
router.register('stmouvement', StMouvementViewset, basename='stmouvement')

router.register('starticlenom', StArticleNomViewset, basename='starticlenom')

# lecture seule de tous les fournisseurs avec les articles associés
router.register('stfournisseur_article', StFournisseur_articleViewset,basename='stfournisseur_article')

urlpatterns = [
    path('api-auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('admin-noegest/', admin.site.urls),
    #path('',admin.site.urls)
]
