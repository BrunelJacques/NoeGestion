# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

import outils.xconst
import uuid
from typing import Optional
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
import django.db.models as models
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):  # type: ignore
    """UserManager class."""

    # type: ignore
    def create_user(self, username: str, email: str, password: Optional[str] = None) -> 'User':
        """Create and return a `User` with an email, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username: str, email: str, password: str) -> 'User':  # type: ignore
        """Create and return a `User` with superuser (admin) permissions."""
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bio = models.TextField(null=True)
    full_name = models.CharField(max_length=50, null=True)
    birth_date = models.DateField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self) -> str:
        """Return a string representation of this `User`."""
        string = self.email if self.email != '' else self.get_full_name()
        return f'{self.id} {string}'

    @property
    def tokens(self) -> dict[str, str]:
        """Allow us to get a user's token by calling `user.token`."""
        refresh = RefreshToken.for_user(self)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}

    def get_full_name(self) -> Optional[str]:
        """Return the full name of the user."""
        return self.full_name

    def get_short_name(self) -> str:
        """Return user username."""
        return self.username

    class Meta:
        db_table = 'auth_user'


class Analytiques(models.Model):
    """État des stocks à une date donnée"""
    code = models.CharField(primary_key=True, unique=True, max_length=8)
    label = models.CharField(max_length=200)
    abrege = models.CharField(max_length=32)
    params = models.TextField(blank=True, default='')
    axe = models.CharField(max_length=32, blank=True, default='')
    saisie = models.DateField(auto_now=True, null=True)
    obsolete = models.BooleanField(default=False, null=True)

    class Meta:
        db_table = 'ge_analytiques'
        verbose_name = 'Codes Analytiques de gestion'
        ordering = ['code',]

class Articles(models.Model):
    id = models.BigAutoField(primary_key=True)
    nom = models.CharField(unique=True, max_length=128, db_index=True)
    nom_court = models.CharField(unique=True, max_length=32, db_index=True)
    unite_stock = models.CharField(max_length=8,help_text="Unité de base pour compter, accompagne le nom")
    unite_colis = models.CharField(max_length=8,help_text="Utilisé lors des entrées pour un prix au conditionnement")
    colis_par = models.DecimalField(max_digits=10, decimal_places=4, default=1,help_text="Nbre d'unités stock par unité de colis")
    magasin = models.CharField(max_length=32, choices=outils.xconst.MAGASIN_CHOICES, blank=False, db_index=True)
    rayon = models.CharField(max_length=32, choices=outils.xconst.RAYON_CHOICES, blank=False,db_index=True)
    rations = models.DecimalField(max_digits=10, decimal_places=4, blank=False, default=1,help_text="Nbre de rations par unité de stock")
    fournisseur = models.CharField(max_length=32, blank=True, default='', db_index=True, help_text="Proposé par défaut")
    qte_stock = models.DecimalField(max_digits=10, decimal_places=4, default=0, db_index=True, help_text="recalculé régulièrement pour inventaire")
    tx_tva = models.DecimalField(max_digits=10, decimal_places=4, blank=False,default=5.5, help_text="tx de TVA en %")
    qte_mini = models.IntegerField(blank=True, null=True, help_text="Déclencheur d'alerte pour réappro")
    qte_saison = models.IntegerField(blank=True, null=True, help_text="Seuil souhaitable en haute saison")
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True, help_text="Prix unitaire moyen historique du stock")
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True, help_text="Dernier prix TTC unitaire livré ou de réappro")
    dernier_achat = models.DateField(blank=True, null=True, help_text="Date de dernière entrée avec prix saisi")
    ordi = models.CharField(max_length=32, default='', null=True, help_text="Nom de l'ordi utilisé pour l'entrée ou la modif")
    saisie = models.DateField(blank=True, null=True, help_text="Date de l'entrée ou la modif de l'item")

    def __str__(self): return self.nom_court

    class Meta:
        db_table = 'st_articles'

class Effectifs(models.Model):
    id = models.BigAutoField(primary_key=True)
    jour = models.DateField()
    analytique_code = models.ForeignKey(Analytiques, models.DO_NOTHING, default='00')
    midi_clients = models.IntegerField()
    midi_repas = models.IntegerField()
    soir_clients = models.IntegerField()
    soir_repas = models.IntegerField()
    prevu_clients = models.IntegerField()
    prevu_repas = models.IntegerField()
    ordi = models.CharField(max_length=32)
    saisie = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'st_effectifs'
        unique_together = (('jour', 'analytique'),)

class Inventaires(models.Model):
    id = models.BigAutoField(primary_key=True)
    jour = models.DateField()
    article_id = models.ForeignKey(Articles, models.DO_NOTHING)
    libelle = models.CharField(max_length=128, db_index=True, help_text=" Conserve le nom historique")
    unite_stock = models.CharField(max_length=8,help_text="Unité de base pour compter, accompagne le nom")
    qte_stock = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)
    montant = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    modifiable = models.BooleanField(blank=True, null=True)
    ordi = models.CharField(max_length=32)
    saisie = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'st_inventaires'
        unique_together = (('jour', 'article'),)

class Mouvements(models.Model):
    id = models.BigAutoField(primary_key=True)
    jour = models.DateField()
    analytique_code = models.ForeignKey(Analytiques, models.DO_NOTHING,)
    origine = models.CharField(max_length=8,db_index=True)
    fournisseur = models.CharField(max_length=32, db_index=True)
    nb_colis = models.DecimalField(max_digits=10, decimal_places=4)
    qtemouvement = models.DecimalField(max_digits=10, decimal_places=4)
    prixunit = models.DecimalField(max_digits=10, decimal_places=4)
    article_id = models.ForeignKey(Articles, models.DO_NOTHING)
    service = models.IntegerField(blank=True, null=True, help_text="Service repas concerné")
    transfert = models.DateField(blank=True, null=True, help_text="non modifiable si transféré")
    ordi = models.CharField(max_length=32)
    datesaisie = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'st_mouvements'
        index_together = ['jour','analytique_code', 'origine']


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'

class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)

class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)

class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)

class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'

class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)

class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'

class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
