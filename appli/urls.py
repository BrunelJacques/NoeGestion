from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

#

from . import views
#from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from .views import (
    LoginAPIView,
    LogoutAPIView,
    RegistrationAPIView,
    UserRetrieveUpdateAPIView,
)

urlpatterns=[
  path('register/', RegistrationAPIView.as_view(), name='register_user'),
  path('login/', LoginAPIView.as_view(), name='login_user'),
  path('logout/', LogoutAPIView.as_view(), name="logout_user"),
  path('user/', UserRetrieveUpdateAPIView.as_view(), name='user'),  # kwargs={'id': None},
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('home',views.home,name='home'),
  path('home/<name>', views.home, name='home'),
  path('', views.home, name='home'),
  #path('auth/login/', obtain_jwt_token),
  #path('auth/refresh-token/', refresh_jwt_token),

  path('sorties', views.sorties, name='sorties'),
  path('mouvements', views.mouvements, name='mouvements'),
  path('articles', views.articles, name='articles'),
  path('article/<str:id>', views.article, name='article'),
  path('effectifs', views.effectifs, name='effectifs'),
  path('effectif/<int:id>', views.effectif, name='effectif'),
  path('inventaires', views.inventaires, name='inventaires'),
  path('inventaire/<int:id>', views.inventaire, name='inventaire'),
  path('choix/', views.choix, name='stchoices')
]