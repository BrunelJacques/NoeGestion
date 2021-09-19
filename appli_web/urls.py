from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token


urlpatterns=[
  path('home',views.home,name='home'),
  path('home/<name>', views.home, name='home'),
  path('', views.home, name='home'),
  path('auth/login/', obtain_jwt_token),
  path('auth/refresh-token/', refresh_jwt_token),
]