from django.db import models
from django.utils import timezone

# models = tables. Toujours une majuscule dans le nom cf 'relations inverses'

"""
class geAnalytiques(models.Model):
    # Etat des stocks à une date donnée
    code = models.CharField(max_length=8, blank=False, unique=True, db_index=True)
    label = models.CharField(max_length=200, blank=False,
    help_text="Libellé long du code analytique",
        )
    obsolete = models.BooleanField(
        null=True, default = False,
        help_text="code qui n'est plus utilisé, plus proposé"
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
        return "%s %s" % (self.code, self.label)

    class Meta:
        managed = True
        verbose_name = 'CodeAnalytique'
        ordering = ['code',]
"""


class stArticles(models.Model):
    # articles utilisés pour les stocks

    MAGASIN_CHOICES = [
        ('FRI', 'Frigo'),
        ('SUR', 'Congel'),
        ('RES', 'Reserve')
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

    nom = models.CharField(max_length=128,
                           blank=False, unique=True,
                           db_index=True,
                           help_text="Désignation du produit",
                           )
    rations = models.DecimalField(max_digits=10, decimal_places=4,
                                  blank=False, default=1,
                                  help_text="Nombre de rations proposé pour chaque unité stock sortie"
                                  )
    qteParUniteVente = models.DecimalField(max_digits=10, decimal_places=4,
                                           blank=False, default=1,
                                           help_text="Nbre d'unité de stock proposé pour chaque unité de vente"
                                           )
    uniteStock = models.CharField(max_length=8,
                                  blank=True, default='',
                                  db_index=False,
                                  help_text="Nom de l'unité de décompte du stock et des sorties"
                                  )
    uniteVente = models.CharField(max_length=8,
                                  blank=True, default='un',
                                  db_index=False,
                                  help_text="Nom de l'unité vente habituellement utilisée lors des achats"
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
    txTva = models.DecimalField(max_digits=10, decimal_places=4,
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
        null=True, default=False,
        help_text="1 article qui n'est plus utilisé"
    )
    prixMoyen = models.DecimalField(max_digits=10, decimal_places=4,
                                    blank=True, null=True,
                                    help_text="Prix unitaire moyen historique du stock"
                                    )
    prixActuel = models.DecimalField(max_digits=10, decimal_places=4,
                                     blank=True, null=True,
                                     help_text="Dernier prix TTC unitaire livré ou de réappro"
                                     )
    dernierAchat = models.DateField(
        blank=True,
        help_text="Date de dernière entrée avec prix saisi"
    )
    ordi = models.CharField(max_length=32,
                            blank=True,
                            default='',
                            help_text="Nom de l'ordi utilisé entrée ou modif"
                            )
    dateSaisie = models.DateField(auto_now=True, null=True, )

    @property
    def montantStock(self):
        return round(self.qteStock * self.prixMoyen, 2)

    def __str__(self):
        return self.nom

    class Meta:
        managed = True
        verbose_name = 'Articles Stock'
        ordering = ['nom', ]


class stEffectifs(models.Model):
    # articles utilisés pour les stocks
    analytique = models.ForeignKey(geAnalytiques,
                                   on_delete=models.RESTRICT,
                                   default='00',
                                   help_text="PK Section analytique du camp à facturer '00' pour Cuisine"
                                   )
    jour = models.DateField(blank=False,
                            help_text="PK Date de la situation de l'effectif"
                            )
    midiClients = models.IntegerField(null=False, default=0,
                                      help_text="Nbre de repas midi clients facturés "
                                      )
    midiRepas = models.IntegerField(null=False, default=0,
                                    help_text="Nbre de repas midi pour le staff et les clients"
                                    )
    soirClients = models.IntegerField(null=False, default=0,
                                      help_text="Nbre de repas aux clients présents le soir "
                                      )
    soirRepas = models.IntegerField(null=False, default=0,
                                    help_text="Nbre de repas pour le staff et les clients le soir"
                                    )
    prevuClients = models.IntegerField(null=False, default=0,
                                       help_text="Nbre d'inscrits payants "
                                       )
    prevuRepas = models.IntegerField(null=False, default=0,
                                     help_text="Nbre d'inscrits staff inclus"
                                     )
    ordi = models.CharField(max_length=32,
                            blank=True, default='',
                            help_text="Nom de l'ordi utilisé entrée ou modif")
    dateSaisie = models.DateField(auto_now=True, null=True, )

    @property
    def clients(self):
        # nombre de clients présents dans la journée
        preparations = 2  # nombre de préparations de repas
        if self.midiRepas * self.soirRepas == 0:
            preparations = 1  # pas de repas midi ou soir
        return (self.midiClients + self.soirClients) / preparations

    def __str__(self):
        return self.jour

    @property
    def repas(self):
        # total des repas préparés
        return self.midiRepas + self.soirRepas

    class Meta:
        managed = True
        verbose_name = 'Effectifs présent'
        indexes = [
            models.Index(fields=['jour', 'analytique', ])
        ]
        constraints = (models.UniqueConstraint(
            fields=['jour', 'analytique', ],
            name='jour_analytique_unique'
        ),
        )

        ordering = ['analytique', 'jour', ]


class stMouvements(models.Model):
    # mouvements de sortie ou d'entrée en stock

    ORIGINE_CHOICES = [
        ('entrees', (
            ('achat', 'Achats'),
            ('retour', 'Retour de camp'),
            ('od_in', 'Correctif entrée'),
        )
         ),
        ('sorties', (
            ('repas', 'Repas en cuisine'),
            ('camp', 'Sortie pour camp'),
            ('od_out', 'Correctif sortie')
        )
         )
    ]

    REPAS_CHOICES = [
        (1, 'Matin'),
        (2, 'Midi'),
        (3, 'Soir'),
        (4, 'Tous'),
    ]

    analytique = models.ForeignKey(geAnalytiques,
                                   on_delete=models.RESTRICT,
                                   null=True,
                                   db_index=True,
                                   help_text="Camp particulier à facturer, pas de valeur défaut"
                                   )
    jour = models.DateField(blank=False,
                            db_index=True,
                            help_text="PK date du mouvement de stock"
                            )
    article = models.ForeignKey(stArticles,
                                on_delete=models.RESTRICT,
                                db_index=True,
                                help_text="PK article mouvementé"
                                )
    fournisseur = models.CharField(max_length=32,
                                   blank=True, default='',
                                   db_index=True,
                                   help_text="Fournisseur de l'entrée"
                                   )
    origine = models.CharField(max_length=32, blank=False,
                               choices=ORIGINE_CHOICES,
                               help_text="Origine du mouvement"
                               )
    nbUnitesVente = models.DecimalField(max_digits=10, decimal_places=4,
                                        blank=False, default=1,
                                        help_text="Lors des achats: Nombre stocké par unité vente"
                                        )
    nbRations = models.DecimalField(max_digits=10, decimal_places=4,
                                    blank=False, default=1,
                                    help_text="Lors des sorties: Nombre de rations par unité stock sortie"
                                    )
    qteMouvement = models.DecimalField(
        max_digits=10, decimal_places=4,
        null=False, default=0,
        help_text="Quantité mouvementée signée en unité de stock"
    )
    prixUnit = models.DecimalField(max_digits=10, decimal_places=4,
                                   blank=False,
                                   help_text="PrixTTC saisi pour achats, Prix calculé pour autres mvts"
                                   )
    repas = models.IntegerField(choices=REPAS_CHOICES,
                                blank=True, null=True,
                                help_text="Repas concerné par la sortie vers cuisine")
    ordi = models.CharField(max_length=32,
                            blank=True, default='',
                            help_text="Nom de l'ordi utilisé entrée ou modif")
    dateSaisie = models.DateField(auto_now=True, null=True, )
    transfertCompta = models.DateField(
        blank=True,
        help_text="Marque la date d'un transfert export  réussi"
    )

    @property
    def montantMouvement(self):
        return self.qteMouvement * self.prixUnit

    def __str__(self):
        return '%s  %s' % (self.analytique, str(self.jour),)

    def sorties_ce_jour(self, jour=timezone.datetime.today()):
        lstOriginesSorties = [x for (x, y) in self.ORIGINE_CHOICES['sorties']]
        ceJour = (self.dateSaisie == jour)
        sortie = self.origine in lstOriginesSorties
        return ceJour and sortie

    class Meta:
        managed = True
        verbose_name = 'Mouvements de stock'
        db_table = 'stMouvements'
        indexes = [
            models.Index(fields=['analytique', 'jour', 'article', ])
        ]
        ordering = ['analytique', 'jour', 'article']


class stInventaires(models.Model):
    # Etat des stocks à une date donnée

    jour = models.DateField(
        blank=False,
        db_index=True,
        help_text="PK Date de l'inventaire copie des stocks confirmée"
    )
    article = models.ForeignKey(
        stArticles,
        on_delete=models.RESTRICT,
        db_index=True,
        help_text="PK Désignation du produit"
    )
    qteStock = models.IntegerField(
        null=False, default=0,
        help_text="Qté reportée par calcul depuis dernier constat"
    )
    prixMoyen = models.DecimalField(
        max_digits=10, decimal_places=4,
        blank=True, null=True,
        help_text="Prix unitaire historique du stock, FirstInFirstOut"
    )
    prixActuel = models.DecimalField(
        max_digits=10, decimal_places=4,
        blank=True, null=True,
        help_text="Dernier prix d'achat, le jour de l'inventaire"
    )
    montant = models.DecimalField(
        max_digits=10, decimal_places=2,
        blank=True, null=True,
        help_text="valeur des articles en stock du stock"
    )

    ordi = models.CharField(
        max_length=32,
        blank=True, default='',
        help_text="Nom de l'ordi utilisé entrée ou modif"
    )
    dateSaisie = models.DateField(auto_now=True, null=True, )
    modifiable = models.BooleanField(
        default=None,
        help_text="0 : Transfert export  réussi ou import. Sinon -1|1|null"
    )

    def __str__(self):
        return self.jour

    class Meta:
        managed = True
        verbose_name = 'Inventaire'
        indexes = [
            models.Index(fields=['jour',
                                 'article', ])
        ]
        constraints = (models.UniqueConstraint(
            fields=['jour', 'article', ],
            name='jour_article_unique'
        ),
        )
        ordering = ['jour', 'article', ]


# mise à jour structure de la base de donnée
"""par le terminal
py manage.py makemigrations appli
py manage.py migrate

Si RAZ de la base, création d'une base vide, console python:
from  appli_python.ap_databases import CreateBaseDjango
CreateBaseDjango(dbConfig='default')
"""


# Models.py, je regénère le fichier à partir de la base noegestion

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

import outils.xconst


class Starticles(models.Model):
    idarticle = models.CharField(db_column='IDarticle', max_length=32, primary_key=True)  # Field name made lowercase.
    rations = models.FloatField(blank=True, null=True)
    fournisseur = models.CharField(max_length=32, blank=True, null=True)
    qtestock = models.IntegerField(db_column='qteStock', blank=True, null=True)  # Field name made lowercase.
    txtva = models.FloatField(db_column='txTva', blank=True, null=True)  # Field name made lowercase.
    magasin = models.CharField(max_length=32, choices=outils.xconst.MAGASIN_CHOICES, blank=True, null=True)
    rayon = models.CharField(max_length=32, choices=outils.xconst.RAYON_CHOICES, blank=True, null=True)
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
    origine = models.CharField(max_length=8, choices=outils.xconst.ORIGINE_CHOICES, blank=True, null=True)
    article = models.ForeignKey(Starticles, on_delete=models.RESTRICT, db_index=True, help_text="PK article mouvementé")  # Field name made lowercase.
    qte = models.IntegerField(blank=True, null=True)
    prixunit = models.FloatField(db_column='prixUnit', blank=True, null=True)  # Field name made lowercase.
    repas = models.IntegerField(blank=True, choices=outils.xconst.REPAS_CHOICES, null=True)
    idanalytique = models.CharField(db_column='IDanalytique', max_length=8, blank=True, null=True)  # Field name made lowercase.
    ordi = models.CharField(max_length=16, blank=True, null=True)
    datesaisie = models.CharField(db_column='dateSaisie', max_length=10, blank=True, null=True)  # Field name made lowercase.
    modifiable = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stMouvements'
