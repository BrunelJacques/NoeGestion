from django.db import models

# Create your models here.


class zzActivites(models.Model):
    # classe test
    idactivite = models.AutoField(db_column='IDactivite', primary_key=True)  # Field name made lowercase.
    nom = models.CharField(max_length=200, blank=True, null=True)
    abrege = models.CharField(max_length=50, blank=True, null=True)
    coords_org = models.IntegerField(blank=True, null=True)
    rue = models.CharField(max_length=200, blank=True, null=True)
    cp = models.CharField(max_length=10, blank=True, null=True)
    ville = models.CharField(max_length=100, blank=True, null=True)
    tel = models.CharField(max_length=50, blank=True, null=True)
    fax = models.CharField(max_length=50, blank=True, null=True)
    mail = models.CharField(max_length=100, blank=True, null=True)
    site = models.CharField(max_length=100, blank=True, null=True)
    logo_org = models.IntegerField(blank=True, null=True)
    logo = models.TextField(blank=True, null=True)
    date_debut = models.CharField(max_length=10, blank=True, null=True)
    date_fin = models.CharField(max_length=10, blank=True, null=True)
    public = models.CharField(max_length=20, blank=True, null=True)
    vaccins_obligatoires = models.IntegerField(blank=True, null=True)
    date_creation = models.CharField(max_length=10, blank=True, null=True)
    nbre_inscrits_max = models.IntegerField(blank=True, null=True)
    code_comptable = models.TextField(blank=True, null=True)

    # ajout selon 'https://www.univ-orleans.fr/iut-orleans/informatique
    # /intra/tuto/django/django-models.html'
    def __str__(self):
        return self.nom

    @property
    def categorie(self):
        return self.abrege[-2:]

    @property
    def annee(self):
        return self.abrege[4:]

    class Meta:
        managed = False
        db_table = 'activites'
