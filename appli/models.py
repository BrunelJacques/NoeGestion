# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Starticles(models.Model):
    idarticle = models.CharField(db_column='IDarticle', max_length=32, primary_key=True)  # Field name made lowercase.
    rations = models.FloatField(blank=True, null=True)
    fournisseur = models.CharField(max_length=32, blank=True, null=True)
    qtestock = models.IntegerField(db_column='qteStock', blank=True, null=True)  # Field name made lowercase.
    txtva = models.FloatField(db_column='txTva', blank=True, null=True)  # Field name made lowercase.
    magasin = models.CharField(max_length=32, blank=True, null=True)
    rayon = models.CharField(max_length=32, blank=True, null=True)
    qtemini = models.IntegerField(db_column='qteMini', blank=True, null=True)  # Field name made lowercase.
    qtesaison = models.IntegerField(db_column='qteSaison', blank=True, null=True)  # Field name made lowercase.
    obsolete = models.IntegerField(blank=True, null=True)
    prixmoyen = models.FloatField(db_column='prixMoyen', blank=True, null=True)  # Field name made lowercase.
    prixactuel = models.FloatField(db_column='prixActuel', blank=True, null=True)  # Field name made lowercase.
    dernierachat = models.CharField(db_column='dernierAchat', max_length=10, blank=True, null=True)  # Field name made lowercase.
    ordi = models.CharField(max_length=16, blank=True, null=True)
    datesaisie = models.CharField(db_column='dateSaisie', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stArticles'


class Steffectifs(models.Model):
    iddate = models.CharField(db_column='IDdate', primary_key=True, max_length=10)  # Field name made lowercase.
    idanalytique = models.CharField(db_column='IDanalytique', max_length=8)  # Field name made lowercase.
    midiclients = models.IntegerField(db_column='midiClients', blank=True, null=True)  # Field name made lowercase.
    midirepas = models.IntegerField(db_column='midiRepas', blank=True, null=True)  # Field name made lowercase.
    soirclients = models.IntegerField(db_column='soirClients', blank=True, null=True)  # Field name made lowercase.
    soirrepas = models.IntegerField(db_column='soirRepas', blank=True, null=True)  # Field name made lowercase.
    prevuclients = models.IntegerField(db_column='prevuClients', blank=True, null=True)  # Field name made lowercase.
    prevurepas = models.IntegerField(db_column='prevuRepas', blank=True, null=True)  # Field name made lowercase.
    ordi = models.CharField(max_length=16, blank=True, null=True)
    datesaisie = models.CharField(db_column='dateSaisie', max_length=10, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stEffectifs'
        unique_together = (('iddate', 'idanalytique'),)


class Stinventaires(models.Model):
    iddate = models.CharField(db_column='IDdate', max_length=10, blank=True, null=True)  # Field name made lowercase.
    idarticle = models.CharField(db_column='IDarticle', max_length=32, blank=True, null=True)  # Field name made lowercase.
    qtestock = models.IntegerField(db_column='qteStock', blank=True, null=True)  # Field name made lowercase.
    qteconstat = models.IntegerField(db_column='qteConstat', blank=True, null=True)  # Field name made lowercase.
    prixmoyen = models.FloatField(db_column='prixMoyen', blank=True, null=True)  # Field name made lowercase.
    prixactuel = models.FloatField(db_column='prixActuel', blank=True, null=True)  # Field name made lowercase.
    ordi = models.CharField(max_length=16, blank=True, null=True)
    datesaisie = models.CharField(db_column='dateSaisie', max_length=10, blank=True, null=True)  # Field name made lowercase.
    modifiable = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stInventaires'
        unique_together = (('iddate', 'idarticle'),)


class Stmouvements(models.Model):
    idmouvement = models.AutoField(db_column='IDmouvement', primary_key=True)  # Field name made lowercase.
    date = models.CharField(max_length=10, blank=True, null=True)
    fournisseur = models.CharField(max_length=32, blank=True, null=True)
    origine = models.CharField(max_length=8, blank=True, null=True)
    idarticle = models.CharField(db_column='IDarticle', max_length=32, blank=True, null=True)  # Field name made lowercase.
    qte = models.IntegerField(blank=True, null=True)
    prixunit = models.FloatField(db_column='prixUnit', blank=True, null=True)  # Field name made lowercase.
    repas = models.IntegerField(blank=True, null=True)
    idanalytique = models.CharField(db_column='IDanalytique', max_length=8, blank=True, null=True)  # Field name made lowercase.
    ordi = models.CharField(max_length=16, blank=True, null=True)
    datesaisie = models.CharField(db_column='dateSaisie', max_length=10, blank=True, null=True)  # Field name made lowercase.
    modifiable = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stMouvements'