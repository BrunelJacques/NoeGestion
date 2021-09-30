from django.db import models

# Describe your models here.

class geAnalytiques(models.Model):
    # Etat des stocks à une date donnée
    idAnalytique = models.CharField(max_length=8, blank=False, unique=True,
        db_index=True)
    label = models.CharField(max_length=200, blank=False,
        help_text="Libellé long du code analytique",
        )
    params = models.TextField(
        blank=True,default='',
        help_text="liste texte de paramétrages constructeurs, pour le calcul coût"
        )
    axe = models.CharField(max_length=32,
        blank=True, default='',
        help_text="axe analytique 'VEHICULES' 'CONVOIS' 'PRIXJOUR', defaut = vide"
        )
    dateSaisie = models.DateField(auto_now=True,null=True,)

    def __str__(self):
        return "%s %s" % (self.idAnalytique,self.label)

    class Meta:
        managed = True
        verbose_name = 'CodeAnalytique'
        ordering = ['idAnalytique',]

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

    idArticle = models.CharField(max_length=128,
        blank=False, unique=True,
        db_index=True,
        help_text="Désignation du produit",
        )
    rations = models.DecimalField(max_digits=10,decimal_places=4,
        blank=False, default=1,
        help_text="Nombre de ration pour une unité stock"
        )
    qteParUniteVente = models.DecimalField(max_digits=10,decimal_places=4,
        blank=False,default=1,
        help_text="Quantité rentrée pour une unité de vente"
        )
    fournisseur = models.CharField(max_length=32,
        blank=True, default='',
        db_index=True,
        help_text="Fournisseur habituel"
        )
    qteStock = models.IntegerField(
        blank=True, null=True,
        help_text="Stock en live"
        )
    txTva = models.DecimalField(max_digits=10,decimal_places=4,
        blank=False, default=0,
        help_text="tx de TVA en %"
        )
    magasin = models.CharField(max_length=32,
        choices=MAGASIN_CHOICES,
        blank=False,
        db_index=True,
        help_text="Lieu de stockage: réserve, congel,frigo"
        )
    rayon = models.CharField(max_length=32,
        choices=RAYON_CHOICES,
        blank=False,
        db_index=True,
        help_text="rayon ou famille produit: type de produit dans le magasin"
        )
    qteMini = models.IntegerField(
        blank=True, null=True,
        help_text="Seuil déclenchant une alerte rouge"
        )
    qteSaison = models.IntegerField(
        blank=True, null=True,
        help_text="Seuil souhaitable en haute saison"
        )
    obsolete = models.BooleanField(
        null=True, default = False,
        help_text="1 article qui n'est plus utilisé"
        )
    prixMoyen = models.DecimalField(max_digits=10,decimal_places=4,
        blank=True, null=True,
        help_text="Prix unitaire moyen historique du stock"
        )
    prixActuel = models.DecimalField(max_digits=10,decimal_places=4,
        blank=True, null=True,
        help_text="Dernier prix TTC unitaire livré ou de réappro"
        )
    dernierAchat = models.DateField(
        blank=True,null=True,
        help_text="Date de dernière entrée avec prix saisi"
        )
    ordi = models.CharField(max_length=32,
        null=True,default='',
        help_text= "Nom de l'ordi utilisé entrée ou modif"
        )
    dateSaisie = models.DateField(
        null=True,
        auto_now=True)

    @property
    def montant(self):
        return self.qteStock * self.prixMoyen

    def __str__(self):
        return self.idArticle

    class Meta:
        managed=True
        verbose_name = 'Articles Stock'
        ordering = ['idArticle',]

class stEffectifs(models.Model):
    # articles utilisés pour les stocks
    idAnalytique = models.ForeignKey(geAnalytiques,
        on_delete=models.RESTRICT,
        help_text="PK Section analytique du camp à facturer null pour Cuisine"
        )
    idDate = models.DateField(blank=False,
        help_text="PK Date de la situation de l'effectif"
        )
    midiClients = models.IntegerField( null=False, default=0,
        help_text="Nbre de repas midi clients facturés "
        )
    midiRepas = models.IntegerField( null=False, default=0,
        help_text="Nbre de repas midi pour le staff et les clients"
        )
    soirClients = models.IntegerField( null=False, default=0,
        help_text="Nbre de repas aux clients présents le soir "
        )
    soirRepas = models.IntegerField( null=False, default=0,
        help_text="Nbre de repas pour le staff et les clients le soir"
        )
    prevuClients = models.IntegerField( null=False, default=0,
        help_text="Nbre d'inscrits payants "
        )
    prevuRepas = models.IntegerField( null=False, default=0,
        help_text="Nbre d'inscrits staff inclus"
        )
    ordi = models.CharField(max_length=32,
        blank=True, default='',
        help_text= "Nom de l'ordi utilisé entrée ou modif")
    dateSaisie = models.DateField(auto_now=True)

    @property
    def clients(self):
        # nombre de clients présents dans la journée
        preparations = 2 # nombre de préparations de repas
        if self.midiRepas * self.soirRepas == 0:
            preparations = 1 # pas de repas midi ou soir
        return (self.midiClients + self.soirClients) / preparations

    def __str__(self):
        return self.idDate

    @property
    def repas(self):
        # total des repas préparés
        return self.midiRepas + self.soirRepas


    class Meta:
        managed=True
        verbose_name = 'Effectifs présents'
        indexes = [
            models.Index(fields=['idDate','idAnalytique',])
        ]
        constraints = (models.UniqueConstraint(
            fields=['idDate','idAnalytique',],
            name='date_analytique_unique'
            ),
        )

        ordering = ['idAnalytique','idDate',]

class stMouvements(models.Model):
    # mouvements de sortie ou d'entrée en stock

    ORIGINE_CHOICES = [
        ('entrees',(
                ('achat','Achats'),
                ('retour','Retour de camp'),
                ('od_in','Correctif entrée'),
            )
        ),
        ('sorties',(
            ('repas','Repas en cuisine'),
            ('camp','Sortie pour camp'),
            ('od_out','Correctif sortie')
            )
        )
    ]

    REPAS_CHOICES = [
        (1, 'Matin'),
        (2, 'Midi'),
        (3, 'Soir'),
        (4, 'Tous'),
    ]

    idAnalytique = models.ForeignKey(geAnalytiques,
        on_delete=models.RESTRICT,
        null=True,
        db_index=True,
        help_text="PK Section analytique du camp à facturer"
        )
    idDate = models.DateField(blank=False,
        db_index=True,
        help_text="PK date du mouvement de stock"
        )
    idArticle = models.ForeignKey(stArticles,
        on_delete=models.RESTRICT,
        db_index=True,
        help_text="PK article mouvementé"
        )
    fournisseur = models.CharField(max_length=32,
        blank=True, default='',
        db_index=True,
        help_text="Fournisseur de l'entrée"
        )
    origine = models.CharField(max_length=32,blank=False,
        choices=ORIGINE_CHOICES,
        help_text="Origine du mouvement"
        )
    nbUnitesVente = models.DecimalField(max_digits=10,decimal_places=4,
        blank=False, default=1,
        help_text="Nombre une unité vente"
        )
    qteMouvement = models.DecimalField(max_digits=10, decimal_places=4,
                                       null=False, default=0,
                                       help_text="Quantitée mouvementée signée"
                                       )
    prixUnit = models.DecimalField(max_digits=10,decimal_places=4,
        blank=False,
        help_text= "Prix moyen pour sorties et retour, Prix revient pour achats"
        )
    repas = models.IntegerField(choices=REPAS_CHOICES,
        blank=True, null=True,
        help_text="Repas concerné par la sortie vers cuisine")
    ordi = models.CharField(max_length=32,
        blank=True, default='',
        help_text="Nom de l'ordi utilisé entrée ou modif")
    dateSaisie = models.DateTimeField(auto_now=True)
    transfertCompta = models.DateField(
        null=True,
        help_text= "Marque un transfert export  réussi"
        )

    def __str__(self):
        return '%s  %s' % (self.idAnalytique, str(self.idDate),)

    class Meta:
        managed=True
        verbose_name = 'Mouvements de stock'
        indexes = [
            models.Index(fields=['idAnalytique','idDate','idArticle',])
        ]
        ordering = ['idAnalytique','idDate','idArticle']

class stInventaires(models.Model):
    # Etat des stocks à une date donnée

    idDate = models.DateField(
        blank=False,
        db_index=True,
        help_text="PK Date de l'inventaire copie des stocks confirmée"
        )
    idArticle = models.ForeignKey(
        stArticles,
        on_delete=models.RESTRICT,
        db_index=True,
        help_text="PK Désignation du produit"
        )
    qteStock = models.IntegerField(
        null=False, default=0,
        help_text="Qté reportée par calcul depuis dernier constat"
        )
    qteConstat = models.IntegerField(
        null=False, default=0,
        help_text="Qté constatée lors d'un inventaire"
        )
    prixMoyen = models.DecimalField(
        max_digits=10,decimal_places=4,
        blank=True, null=True,
        help_text="Prix unitaire moyen historique du stock"
        )
    prixActuel = models.DecimalField(
        max_digits=10,decimal_places=4,
        blank=True, null=True,
        help_text="Prix pour valorisation de l'inventaire"
        )
    ordi = models.CharField(
        max_length=32,
        blank=True, default='',
        help_text="Nom de l'ordi utilisé entrée ou modif"
        )
    dateSaisie = models.DateField(auto_now=True)
    modifiable = models.BooleanField(
        default=True,
        help_text="Transfert export  réussi ou import"
        )

    def __str__(self):
        return self.idDate

    class Meta:
        managed=True
        verbose_name = 'Inventaires'
        indexes = [
            models.Index(fields=['idDate',
                                 'idArticle',])
        ]
        constraints = (models.UniqueConstraint(
            fields=['idDate','idArticle',],
            name='date_article_unique'
            ),
        )
        ordering = ['idDate','idArticle',]

