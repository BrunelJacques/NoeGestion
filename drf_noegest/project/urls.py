from rest_framework import routers
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
router.register('geanalytique', GeAnalytiqueViewset, basename='geanalytique')
router.register('stmouvement', StMouvementViewset, basename='stmouvement')
router.register('starticle', StArticleViewset, basename='starticle')
router.register('starticlenom', StArticleNomViewset, basename='starticlenom')
router.register('stfournisseur', StFournisseurViewset, basename='stfournisseur')
router.register('strayon', StRayonViewset, basename='strayon')
router.register('stmagasin', StMagasinViewset, basename='stmagasin')

router.register('stfournisseur_article', StFournisseur_articleViewset,basename='stfournisseur_article')
router.register('stmagasin_article', StMagasin_articleViewset,basename='stmagasin_article')
#router.register('admin/starticle', AdminArticleViewset, basename='admin-article')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('rest_framework.urls')),
    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls))
]
