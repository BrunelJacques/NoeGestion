from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
  return HttpResponse("<h1>NoeGestion</h1>"
                      "<h3>le serveur est fonctionnel</h3>"
                      "NoeGestion/home")
