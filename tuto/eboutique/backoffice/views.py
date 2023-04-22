# from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect,HttpResponseNotFound

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.generic import TemplateView
from django.conf import settings

from django.template.response import TemplateResponse

def get_ip(request):
   x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
   if x_forwarded_for:
      ip = x_forwarded_for.split(',')[0]
   else:
      ip = request.META.get('REMOTE_ADDR')
   return ip

def TestTemplate(request):
    return TemplateResponse(request, 'backoffice/testTemplate.html',
                            {'name': 'example template',
                             'ip': get_ip(request) })

def Home(request):
    """ #pour tester request:

    print(dir(request))
    nom_user= request.GET['name']  # test lancé http://localhost:8000/home/?name=toto
    return HttpResponse("Bonjour %s, ici le 'home' des views de backoffice!"% nom_user)
    """
    return HttpResponse("Bonjour, ici le 'home' des views de backoffice!")
    #return HttpResponseNotFound("Erreur fichier introuvable")

class ProductView(TemplateView):
    template_name = "backoffice/product.html"
    def get_context_data(self, **kwargs):
        # context contient les paramètres de l'URL
        context = super(ProductView, self).get_context_data(**kwargs)
        context['firstname'] = "olivier"
        context['lastname'] = "engel"
        context['towns'] = ["Mulhouse", "Strasbourg", "Marseille"]
        context['data'] = {"age": 30, "genre": "male", "hobbies": "python"}
        context['years'] = (1900, 2000, 2019)
        return context

class LoginView(TemplateView):

  template_name = 'front/index.html'

  def post(self, request, **kwargs):

    username = request.POST.get('username', False)
    password = request.POST.get('password', False)
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        login(request, user)
        return HttpResponseRedirect( settings.LOGIN_REDIRECT_URL )

    return render(request, self.template_name)

class LogoutView(TemplateView):

  template_name = 'front/index.html'

  def get(self, request, **kwargs):

    logout(request)

    return render(request, self.template_name)

