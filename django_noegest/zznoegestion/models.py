# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

import outils.xconst as xconst
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

class User(AbstractUser):
    bio = models.TextField(blank=True)
    profile_pic = models.ImageField(blank=True)

    def __str__(self):
        return self.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Articles(models.Model):
    article_id = models.BigAutoField(primary_key=True, unique=True, default=1)
    nom = models.CharField(unique=True, max_length=128, db_index=True)
    nom_court = models.CharField(unique=True, max_length=32, db_index=True)
    unite_stock = models.CharField(max_length=8,help_text="Unité de base pour compter, accompagne le nom")
    unite_colis = models.CharField(max_length=8,help_text="Utilisé lors des entrées pour un prix au conditionnement")
    colis_par = models.DecimalField(max_digits=10, decimal_places=4, default=1,help_text="Nbre d'unités stock par unité de colis")
    magasin = models.CharField(max_length=32, choices=xconst.MAGASIN_CHOICES, blank=False, db_index=True)
    rayon = models.CharField(max_length=32, choices=xconst.RAYON_CHOICES, blank=False,db_index=True)
    rations = models.DecimalField(max_digits=10, decimal_places=4, blank=False, default=1,help_text="Nbre de rations par unité de stock")
    fournisseur = models.CharField(max_length=32, blank=True, default='', db_index=True, help_text="Proposé par défaut")
    qte_stock = models.DecimalField(max_digits=10, decimal_places=4, default=0, db_index=True, help_text="recalculé régulièrement pour inventaire")
    tx_tva = models.DecimalField(max_digits=10, decimal_places=4, blank=False,default=5.5, help_text="tx de TVA en %")
    qte_mini = models.IntegerField(blank=True, null=True, help_text="Déclencheur d'alerte pour réappro")
    qte_saison = models.IntegerField(blank=True, null=True, help_text="Seuil souhaitable en haute saison")
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True, help_text="Prix unitaire moyen historique du stock")
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True, help_text="Dernier prix TTC unitaire livré ou de réappro")
    dernier_achat = models.DateField(null=True, help_text="Date de dernière entrée avec prix saisi")
    ordi = models.CharField( blank=True, max_length=32, help_text="Nom de l'ordi utilisé pour l'entrée ou la modif")
    saisie = models.DateField(null=True, help_text="Date de l'entrée ou la modif de l'item")

    def __str__(self): return self.nom_court

    class Meta:
        db_table = 'st_articles'

class Analytiques(models.Model):
    #État des stocks à une date donnée
    code_id = models.CharField(primary_key=True, unique=True, max_length=8)
    label = models.CharField(max_length=200)
    abrege = models.CharField(max_length=32)
    params = models.TextField(blank=True, default='')
    axe = models.CharField(max_length=32, blank=True, default='')
    saisie = models.DateField(auto_now=True, null=True)
    obsolete = models.BooleanField(default=False)

    class Meta:
        managed = True
        db_table = 'ge_analytiques'
        verbose_name = 'Codes Analytiques de gestion'
        ordering = ['code_id',]

class Mouvements(models.Model):
    id = models.BigAutoField(primary_key=True)
    jour = models.DateField()
    code_id = models.ForeignKey(Analytiques, models.DO_NOTHING,)
    origine = models.CharField(max_length=8,db_index=True)
    fournisseur = models.CharField(max_length=32, db_index=True, blank=True, default='')
    article_id = models.ForeignKey(Articles, models.DO_NOTHING)
    nbcolis = models.DecimalField(max_digits=6, decimal_places=0, default=0)
    qtemouvement = models.DecimalField(max_digits=8, decimal_places=2)
    prixunit = models.DecimalField(max_digits=10, decimal_places=4)
    service = models.IntegerField(default=3, help_text="Service repas concerné")
    nbrations = models.DecimalField(max_digits=8, decimal_places=4, default=0, help_text="Nbre de ration par qteMouvement")
    transfert = models.DateField(null=True, help_text="non modifiable si date de transfert")
    ordi = models.CharField(max_length=32, blank=True, default="", help_text="pour tracer les mouvements")
    datesaisie = models.DateField(null=True)

    class Meta:
        db_table = 'st_mouvements'
        index_together = ['jour','code_id', 'origine']

class Effectifs(models.Model):
    id = models.BigAutoField(primary_key=True)
    jour = models.DateField()
    code_id = models.ForeignKey(Analytiques, models.DO_NOTHING, default='00')
    midi_clients = models.IntegerField()
    midi_repas = models.IntegerField()
    soir_clients = models.IntegerField()
    soir_repas = models.IntegerField()
    prevu_clients = models.IntegerField()
    prevu_repas = models.IntegerField()
    ordi = models.CharField(max_length=32)
    saisie = models.DateField(null=True)

    class Meta:
        db_table = 'st_effectifs'
        unique_together = (('jour', 'code_id'),)

class Inventaires(models.Model):
    id = models.BigAutoField(primary_key=True)
    jour = models.DateField()
    article_id = models.ForeignKey(Articles, models.DO_NOTHING)
    libelle = models.CharField(max_length=128, db_index=True, help_text=" Conserve le nom historique")
    unite_stock = models.CharField(max_length=8,help_text="Unité de base pour compter, accompagne le nom")
    qte_stock = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    montant = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    modifiable = models.BooleanField(null=True)
    ordi = models.CharField(null=True, max_length=32)
    saisie = models.DateField(null=True)

    class Meta:
        db_table = 'st_inventaires'
        unique_together = (('jour', 'article_id'),)
