#--------------------------
# IMPLANTATION NOEGESTION
#--------------------------

# créer un environnment propre au niveau du container du projet
py -m venv noegestion-venv
noegestion-venv\Scripts\activate

# après installation python et pip mettre à jour pip et les depracate
python -m pip install --upgrade PACKAGE_NAME
python -m pip list --outdated

# installation de Django
$ pip install django djangorestframework django-cors-headers Pillow

# django-admin.exe est dans noegestion-venv\Scripts
django-admin startproject django_noegest mysqlclient

# test serveur
cd django_noegest
py manage.py runserver
#la fusée django est opérationnelle  http://127.0.0.1:8000/

# La remontée des répertoires: django_noegest noegestion outils 
# et du module manage.py de github fonctionneront avec la base noegestion d'origine

# si la base d'origine n'existe pas on peut la recréer vide et la pointer dans settings.py
# supprimer les fichiers de migrations dans le répertoire nogestion/migrations (garder seulement le --init.py dans le répertoire)
# makemigration puis migrate permettront de recréer une migration initiale et de créer les tables vides
# créer un super user ensuite par >py manage.py createsuperuser
 



