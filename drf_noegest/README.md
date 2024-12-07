# creation d'un environnent manuellement
md drf_noegest
cd drf_noegest
py -m venv noegest-venv
noegest-venv\Scripts\activate

# installation des modules requis
pip install -r requirements.txt

# avec pycharm IDE la création de l'environnement est accompagnée et on peut vérifier les modules chargés

# creation de la base
py manage.py migrate # Création de la base avec les tables d'authentification
py manage.py makemigration # Creation des tables décirtes dans noegestion.models
py manage.py migrate # Tout make migration doit être suivi d'un migrate
py manage.py init_local_dev # Alimente la base avec un jeu d'essai et crée user et admin avec password 'MPdemo-43'

# raz d'une base en supprimant db.sqlite3 et le contenu de noegestion/migrations

# lancer le backend
py manage.py runserver
