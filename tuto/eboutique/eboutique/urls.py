#!/usr/bin/python
# coding: utf-8

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
from backoffice.views import *
from backoffice.models import *
from django.views.generic import *
from django.contrib.auth.decorators import login_required

admin.autodiscover()

class ProductsView(ListView):
    # pour test listview liste tous les id des product
    model = Product
    template_name = "template/product_list.html"
    context_object_name = "products"
    #queryset = Product.objects.filter(id__gt=400)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', Home),
    path('', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('backoffice/',login_required(TemplateView.as_view(template_name='backoffice/index.html'))),
    path('test/template/', TestTemplate),
    #path('listview', ListView.as_view(model=Product,template_name='backoffice/product_list.html')),
    path('listview/',ProductsView.as_view()),
    path('product/<int:id>',ProductView.as_view())
]
