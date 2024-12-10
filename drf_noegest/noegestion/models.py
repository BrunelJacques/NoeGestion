import django.db.models as models
from utils import xconst

class StMagasin(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    nom = models.CharField(max_length=30, unique=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return f"{self.nom} ({self.id})"

    class Meta:
        verbose_name = "Lieu stockage: StMagasin"
        ordering = ["position"]

class StRayon(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    nom = models.CharField(max_length=30, unique=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    def __str__(self):
        return f"Rayon {self.id}-{self.nom}"

    class Meta:
        verbose_name = "Rayon/magasin: StRayon"
        ordering = ["position"]

class StFournisseur(models.Model):

    nom = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return f"Fournisseur {self.id}-{self.nom}"

    class Meta:
        verbose_name = "StFournisseur"
        ordering = ["nom"]

class GeAnalytique(models.Model):
    #État des stocks à une date donnée
    id = models.CharField(primary_key=True, max_length=5)
    nom = models.CharField(unique=True, max_length=200)
    abrege = models.CharField(max_length=32)
    params = models.TextField(null=True, blank=True,default='')
    axe = models.CharField(max_length=32, blank=True, default='')
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")
    obsolete = models.BooleanField(default=False)

    def __str__(self):
        return f"Analytique {self.id}-{self.nom}"

    class Meta:
        verbose_name = 'Codes analytique'
        ordering = ['id',]

class StArticle(models.Model):
    nom = models.CharField(unique=True, max_length=128)
    nom_court = models.CharField(unique=True, max_length=32, db_index=True)
    unite_stock = models.CharField(max_length=8,default='unit',
                                   help_text="Unité de base pour compter, accompagne le nom")
    unite_colis = models.CharField(max_length=8,default='pqt',
                                   help_text="Utilisé lors des entrées pour un prix au conditionnement")
    colis_par = models.DecimalField(max_digits=10, decimal_places=4, default=1,
                                    help_text="Nbre d'unités stock par unité de colis")
    magasin = models.ForeignKey('StMagasin',related_name='articles',
                                on_delete=models.RESTRICT,
                                help_text="Stockage_lieu"
                                )
    rayon = models.ForeignKey('StRayon', related_name='articles',
                              on_delete=models.RESTRICT,
                              help_text="Catégorie de produit"
                              )
    rations = models.DecimalField(max_digits=10, decimal_places=4, blank=False, default=1,
                                  help_text="Nbre de rations par unité de stock")
    fournisseur = models.ForeignKey('StFournisseur', null=True,related_name='articles',
                                    on_delete=models.RESTRICT,
                                    help_text="Fournisseur habituel"
                                    )
    qte_stock = models.DecimalField(max_digits=10,decimal_places=4,default=0,db_index=True,
                                    help_text="recalculé régulièrement pour inventaire")
    tx_tva = models.DecimalField(max_digits=10, decimal_places=4, default=5.5,
                                 help_text="tx de TVA en %")
    qte_mini = models.DecimalField(blank=True,null=True,max_digits=8,decimal_places=2,
                                   help_text="Déclencheur d'alerte pour réappro")
    prix_moyen = models.DecimalField(blank=True, null=True,max_digits=10, decimal_places=4,
                                     help_text="Prix unitaire moyen historique du stock")
    prix_actuel = models.DecimalField(blank=True, null=True,max_digits=10, decimal_places=4,
                                      help_text="Dernier prix TTC unitaire livré ou de réappro")
    dernier_achat = models.DateField(null=True,
                                     help_text="Date de dernière entrée avec prix saisi")
    ordi = models.CharField( blank=True, null=True, max_length=32,
                             help_text="Nom de l'ordi utilisé pour l'entrée ou la modif")
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    obsolete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nom_court}-{self.nom}"

    class Meta:
        verbose_name = "Item stocké: StArticle"
        ordering = ["nom_court"]

class StMouvement(models.Model):
    jour = models.DateField()
    sens = models.IntegerField(default=-1,
                               help_text="Entrée +1, Sortie -1")
    origine = models.CharField(max_length=8,db_index=True,choices=xconst.ORIGINE_CHOICES,
                               default='od_out',help_text="Type de mouvement selon sens")
    article = models.ForeignKey("StArticle",related_name='+',
                                on_delete=models.RESTRICT,
                                )
    analytique = models.ForeignKey("GeAnalytique",related_name='+',
                                   on_delete=models.RESTRICT,
                                   )
    fournisseur = models.ForeignKey("StFournisseur", models.SET_NULL, null=True,related_name='+',
                                    help_text="Le fournisseur habituel de l'article est proposé"
                                    )
    nbcolis = models.DecimalField(max_digits=6, decimal_places=0, null=True,
                                  help_text="Pour les achats, nombre d'unité de vente")
    qtemouvement = models.DecimalField(max_digits=8, decimal_places=2,
                                       help_text="Nombre d'unités en mouvement")
    prixunit = models.DecimalField(max_digits=10, decimal_places=4)
    service = models.IntegerField(default=0, choices=xconst.SERVICE_CHOICES,
                                  help_text="Service repas concerné")
    nbrations = models.DecimalField(max_digits=8, decimal_places=4,
                                    help_text="Nbre de ration par unité Mouvement", null=True)
    transfert = models.DateField(null=True, help_text="non modifiable si date de transfert")
    ordi = models.CharField(max_length=32, blank=True, default="",
                            help_text="pour tracer les mouvements")
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    def __str__(self):
        return f"{self.jour.strftime('%d/%m;%Y')}-{self.origine}-{self.article}"

    class Meta:
        verbose_name = "Mvt d'article: StMouvement"
        indexes = [models.Index(fields=['jour','article','sens','origine']),
                   models.Index(fields=['article','sens','jour'])]

class StEffectif(models.Model):
    jour = models.DateField()
    midi_clients = models.IntegerField()
    midi_repas = models.IntegerField()
    soir_clients = models.IntegerField()
    soir_repas = models.IntegerField()
    prevu_clients = models.IntegerField()
    prevu_repas = models.IntegerField()
    ordi = models.CharField(max_length=32)
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    def __str__(self):
        repas = self.midi_repas + self.soir_repas
        clients = self.midi_clients + self.soir_clients
        return f"{self.jour.strftime('%d/%m/%Y')}-{repas} {clients}"

    class Meta:
        verbose_name = "Présents aux repas: StEffectif"
        indexes = [models.Index(fields=["jour",]),]

class StInventaire(models.Model):
    jour = models.DateField(help_text="Date de l'inventaire")
    article = models.ForeignKey("StArticle", models.SET_NULL, null=True,
                               help_text=" Id historique de l'article")
    article_nom = models.CharField(max_length=128,null=True,
                               help_text=" Conserve le nom historique")
    unite_stock = models.CharField(max_length=8,help_text="Unité de base pour compter, accompagne le nom")
    qte_stock = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    montant = models.DecimalField(max_digits=10, decimal_places=2, null=True,
                                  help_text="Montant arrété pour la compta")
    modifiable = models.BooleanField(null=True)
    ordi = models.CharField(null=True, max_length=32)
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    def __str__(self):
        return "{:d/:m/:Y} {}".format(self.jour, self.article_nom)

    class Meta:
        verbose_name = "archivages d'états de stock: StInventaire"
        indexes = [models.Index(fields=["jour", 'article']),]
