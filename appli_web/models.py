from django.db import models

# Describe your models here.

class geAnalytiques(models.Model):
    # Etat des stocks à une date donnée
    idAnalytique = models.CharField(max_length=8, blank=True, unique=True,
                                    db_index=True)
    label = models.CharField(max_length=200, blank=True,
                             help_text="Libellé long du code analytique",
                             )
    params = models.TextField( blank=True,
                               help_text="liste texte de paramétrages constructeurs, pour le calcul coût"
                               )
    axe = models.CharField(max_length=32, blank=True,
                           help_text="axe analytique 'VEHICULES' 'CONVOIS' 'PRIXJOUR', defaut = vide"
                           )
    dateSaisie = models.DateField(auto_now=True)

    def __str__(self):
        return "%s %s" % (self.idAnalytique,self.label)

    class Meta:
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

    idArticle = models.CharField(max_length=128, blank=True, unique=True,
                                 db_index=True,
                                 help_text="Désignation du produit",
                                 )
    rations = models.DecimalField(max_digits=10,decimal_places=4,blank=True,
                                  help_text="Nombre de ration pour une unité"
                                  )
    fournisseur = models.CharField(max_length=32, blank=True,
                                   db_index=True,
                                   help_text="Fournisseur habituel"
                                   )
    qteStock = models.IntegerField( null=False, default=0,
                                    help_text="Stock en live"
                                    )
    txTva = models.DecimalField(max_digits=10,decimal_places=4,blank=False,
                                help_text="tx de TVA en %"
                                )
    magasin = models.IntegerField( blank=False, choices=MAGASIN_CHOICES,
                                   db_index=True,
                                   help_text="Lieu de stockage: réserve, congel,frigo"
                                   )
    rayon = models.IntegerField( blank=False, choices=RAYON_CHOICES,
                                 db_index=True,
                                 help_text="rayon ou famille produit: type de produit dans le magasin"
                                 )
    qteMini = models.IntegerField( null=False, default=0,
                                   help_text="Seuil déclenchant une alerte rouge"
                                   )
    qteSaison = models.IntegerField( null=False, default=0,
                                     help_text="Seuil souhaitable en haute saison"
                                     )
    obsolete = models.BooleanField( null=False, default=False,
                                    help_text="1 article qui n'est plus utilisé"
                                    )
    prixMoyen = models.DecimalField(max_digits=10,decimal_places=4,blank=True,
                                    help_text="Prix unitaire moyen historique du stock"
                                    )
    prixActuel = models.DecimalField(max_digits=10,decimal_places=4,blank=True,
                                     help_text="Dernier prix TTC unitaire livré ou de réappro"
                                     )
    dernierAchat = models.DateField(blank=False,
                                    help_text="Date de dernière entrée avec prix saisi"
                                    )
    ordi = models.CharField(max_length=32, blank=True,
                            help_text= "Nom de l'ordi utilisé entrée ou modif")
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
    idAnalytique = models.ForeignKey(geAnalytiques,
                                     on_delete=models.RESTRICT,
                                     help_text="PK Section analytique du camp à facturer null pour Cuisine"
                                     )
    idDate = models.DateField(blank=False,
                              db_index=True,
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
    ordi = models.CharField(max_length=32, blank=True,
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
        db_table = 'stEffectifs'
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
                                     help_text="Section analytique du camp à facturer, nulle pour cuisine"
                                     )
    idDate = models.DateField(blank=False,
                              db_index=True,
                              help_text="date du mouvement de stock"
                              )
    idArticle = models.ForeignKey(stArticles,
                                  on_delete=models.RESTRICT,
                                  db_index=True,
                                  help_text="article mouvementé"
                                  )
    fournisseur = models.CharField(max_length=32, blank=True,
                                   db_index=True,
                                   help_text="Fournisseur de l'entrée"
                                   )
    origine = models.CharField(max_length=32,blank=False,
                               choices=ORIGINE_CHOICES,
                               help_text="Origine du mouvement")
    qte = models.DecimalField( max_digits=10,decimal_places=4,
                               null=False, default=0,
                               help_text="Quantitée mouvementée signée"
                               )
    prixUnit = models.DecimalField(max_digits=10,decimal_places=4,blank=False,
                                   help_text= "Prix moyen pour sorties et retour, Prix revient pour achats"
                                )
    repas = models.IntegerField( blank=False, choices=REPAS_CHOICES,
                                 help_text="Repas concerné par la sortie vers cuisine")
    ordi = models.CharField(max_length=32, blank=True,
                            help_text="Nom de l'ordi utilisé entrée ou modif")
    dateSaisie = models.DateTimeField(auto_now=True)
    modifiable = models.BooleanField(default=True,
                                     help_text= "0/1 Marque un transfert export  réussi ou import"
                                    )

    def __str__(self):
        return '%s  %s' % (self.idAnalytique, str(self.idDate),)

    class Meta:
        db_table = 'stMouvements'
        ordering = ['idAnalytique','idDate',]

class stInventaires(models.Model):
    # Etat des stocks à une date donnée

    idDate = models.DateField(blank=False,
                              db_index=True,
                              help_text="PK Date de l'inventaire copie des stocks confirmée"
                              )
    idArticle = models.ForeignKey(stArticles,
                                  on_delete=models.RESTRICT,
                                  db_index=True,
                                  help_text="PK Désignation du produit"
                                  )
    qteStock = models.IntegerField(null=False, default=0,
                                   help_text="Qté reportée par calcul depuis dernier constat"
                                   )
    qteConstat = models.IntegerField(null=False, default=0,
                                     help_text="Qté constatée lors d'un inventaire"
                                     )
    prixMoyen = models.DecimalField(max_digits=10,decimal_places=4,blank=True,
                                    help_text="Prix unitaire moyen historique du stock"
                                    )
    prixActuel = models.DecimalField(max_digits=10,decimal_places=4,blank=True,
                                     help_text="Prix forcé pour valorisation de l'inventaire"
                                     )
    ordi = models.CharField(max_length=32, blank=True,
                            help_text="Nom de l'ordi utilisé entrée ou modif")
    dateSaisie = models.DateField(auto_now=True)
    modifiable = models.BooleanField(default=True,
                                     help_text="0/1 Marque un transfert export  réussi ou import"
                                     )

    def __str__(self):
        return self.idDate

    class Meta:
        db_table = 'stInventaires'
        ordering = ['idDate','idArticle',]

