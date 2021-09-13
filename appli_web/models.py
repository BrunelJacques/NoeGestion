from django.db import models

# Create your models here.

class stArticles(models.Model):
    # articles utilisés pour les stocks

    MAGASIN_CHOICES = [
        ('FRI', 'Réfrigérateur'),
        ('SUR', 'Surgelés'),
        ('RES', 'Réserve')
    ]

    RAYON_CHOICES = [
        ('BSS', 'Boissons'),
        ('CND', 'Condiments'),
        ('FCL', 'Féculents'),
        ('FRS', 'Frais'),
        ('FRT', 'Fruits'),
        ('LGM', 'Légumes'),
        ('PSS', 'Poisson'),
        ('SCR', 'Sucré'),
        ('VND', 'Viande'),
    ]

    idArticle = models.CharField(max_lenght=128, blank=True, unique=True,
                                 db_index=True)
    rations = models.DecimalField(blank=True)
    fournisseur = models.CharField(max_lenght=32, blank=True,
                                   db_index=True)
    qteStock = models.IntegerField( null=False, default=0)
    txTva = models.DecimalField(blank=False)
    magasin = models.IntegerField( blank=False, choices=MAGASIN_CHOICES,
                                   db_index=True)
    rayon = models.IntegerField( blank=False, choices=RAYON_CHOICES,
                                 db_index=True)
    qteMini = models.IntegerField( null=False, default=0)
    qteSaison = models.IntegerField( null=False, default=0)
    obsolete = models.BooleanField( null=False, default=False)
    prixMoyen = models.DecimalField(blank=True)
    prixActuel = models.DecimalField(blank=True)
    dernierAchat = models.DateField(blank=False)
    ordi = models.CharField(max_lenght=32, blank=True)
    dateSaisie = models.DateField(auto_now=True)

    @property
    def montant(self):
        return self.qteStock * self.prixMoyen

    def __str__(self):
        return self.idArticle

    class Meta:
        db_table = 'stArticles'
        ordering = ['idArticle',]

class stEffectifs(models.Model):
    # articles utilisés pour les stocks
    idAnalytique = models.CharField(max_lenght=32, blank=True,
                                    db_index=True)
    idDate = models.DateField(blank=False,
                              db_index=True)
    midiClients = models.IntegerField( null=False, default=0)
    midiRepas = models.IntegerField( null=False, default=0)
    soirClients = models.IntegerField( null=False, default=0)
    soirRepas = models.IntegerField( null=False, default=0)
    prevuClients = models.IntegerField( null=False, default=0)
    prevuRepas = models.IntegerField( null=False, default=0)
    ordi = models.CharField(max_lenght=32, blank=True)
    dateSaisie = models.DateField(auto_now=True)

    @property
    def clients(self):
        # nombre de clients présents dans la journée
        preparations = 2 # nombre de préparations de repas
        if self.midiRepas * self.soirRepas == 0:
            preparations = 1 # pas de repas midi ou soir
        return (self.midiClients + self.soirClients) / preparations

    @property
    def repas(self):
        # total des repas préparés
        return self.midiRepas + self.soirRepas

    def __str__(self):
        return '%s  %s'%(idAnalytique, str(idDate))

    class Meta:
        db_table = 'stEffectifs'
        ordering = ['idAnalytique','idDate',]

class stMouvements(models.Model):
    # mouvements de sortie ou d'entrée en stock

    REPAS_CHOICES = [
        (1, 'Matin'),
        (2, 'Midi'),
        (3, 'Soir'),
        (4, 'Tous'),
    ]

    idAnalytique = models.CharField(max_lenght=32, blank=True)
    idDate = models.DateField(blank=False)
    idArticle = models.CharField(max_lenght=128, blank=True)
    fournisseur = models.CharField(max_lenght=32, blank=True)
    origine = models.CharField(max_lenght=32, blank=True)
    qte = models.IntegerField( null=False, default=0)
    prixUnit = models.DecimalField(blank=False)
    repas = models.IntegerField( blank=False, choices=REPAS_CHOICES,)
    ordi = models.CharField(max_lenght=32, blank=True)
    dateSaisie = models.DateTimeField(auto_now=True)
    modifiable = models.BooleanField(default=True)

    def __str__(self):
        return '%s  %s'%(idAnalytique, str(idDate),)

    class Meta:
        db_table = 'stMouvements'
        ordering = ['idAnalytique','idDate',]

class stInventaires(models.Model):
    # Etat des stocks à une date donnée

    idDate = models.DateField(blank=False)
    idArticle = models.CharField(max_lenght=128, blank=True)
    qteStock = models.IntegerField(null=False, default=0)
    qteConstat = models.IntegerField(null=False, default=0)
    prixMoyen = models.DecimalField(blank=True)
    prixActuel = models.DecimalField(blank=True)
    ordi = models.CharField(max_lenght=32, blank=True)
    dateSaisie = models.DateField(auto_now=True)
    modifiable = models.BooleanField(default=True)

    def __str__(self):
        return idDate

    class Meta:
        db_table = 'stInventaires'
        ordering = ['idDate','idArticle',]


class analytiques(models.Model):
    # Etat des stocks à une date donnée
    idAnalytique = models.CharField(max_lenght=8, blank=True, unique=True,
                                    db_index=True)
    label = models.CharField(max_lenght=200, blank=True)
    params = models.TextField( blank=True)
    axe = models.CharField(max_lenght=32, blank=True)
    dateSaisie = models.DateField(auto_now=True)

    def __str__(self):
        return "%s"%self.idAnalytique

    class Meta:
        db_table = 'analytiques'
        ordering = ['idAnalytique',]



class activites(models.Model):
    # classe test
    IDactivite = models.AutoField(db_column='IDactivite', primary_key=True)
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
        managed = True
        db_table = 'activites'
