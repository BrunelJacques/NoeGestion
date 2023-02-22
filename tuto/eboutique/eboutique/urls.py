"""
URL configuration for eboutique project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from backoffice.views import Home, LoginView, LogoutView
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', Home),
    path('', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('backoffice/',login_required(TemplateView.as_view(template_name='backoffice/index.html'))),

]
