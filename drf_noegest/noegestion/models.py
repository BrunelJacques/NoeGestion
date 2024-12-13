from django.core.exceptions import ValidationError
import django.db.models as models
from django.db.models.functions import Lower
import django.utils.timezone as timezone
from utils import xconst

class StMagasin(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    nom = models.CharField(max_length=30, unique=True)
    position = models.PositiveSmallIntegerField("Position", default=1)

    def __str__(self):
        return f"{self.nom} ({self.id})"

    class Meta:
        verbose_name = "(Lieu stockage) magasin"
        ordering = ["position"]

class StRayon(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    nom = models.CharField(max_length=30, unique=True)
    position = models.PositiveSmallIntegerField("Position", default=1)

    def __str__(self):
        return f"{self.nom} ({self.id})"

    class Meta:
        verbose_name = "(Rayon/magasin) rayon"
        ordering = ["position"]

class StFournisseur(models.Model):

    nom = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return f"{self.nom} ({self.id})"

    class Meta:
        verbose_name = "fournisseur"
        ordering = [Lower("nom")]

class GeAnalytique(models.Model):
    #État des stocks à une date donnée
    id = models.CharField(primary_key=True, max_length=5)
    nom = models.CharField(unique=True, max_length=200)
    abrege = models.CharField(max_length=32)
    params = models.TextField(blank=True, default='')
    axe = models.CharField(max_length=32)
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")
    obsolete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}-{self.abrege}"

    def save(self, *args,**kwargs):
        self.saisie = timezone.now().date()  # Mettre à jour le champ saisie
        super(StArticle,self).save(*args,**kwargs)

    class Meta:
        verbose_name = '(Gestion) analytique'
        ordering = ['id',]

class StArticle(models.Model):
    nom = models.CharField(unique=True, max_length=128)
    nom_court = models.CharField(unique=True, max_length=32, db_index=True)
    unite_stock = models.CharField(max_length=8,default='unit',
                                   help_text="Unité de base pour compter, accompagne le nom")
    unite_colis = models.CharField(max_length=8,blank=True,default='pqt',
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
    fournisseur = models.ForeignKey('StFournisseur', null=True,blank=True,related_name='articles',
                                    on_delete=models.RESTRICT,
                                    help_text="Fournisseur habituel"
                                    )
    qte_stock = models.DecimalField(max_digits=10,decimal_places=4,default=0,
                                    help_text="recalculé régulièrement pour inventaire")
    tx_tva = models.DecimalField(max_digits=10, decimal_places=4, default=5.5,
                                 help_text="tx de TVA en %")
    qte_mini = models.DecimalField(null=True,blank=True,max_digits=8,decimal_places=2,
                                   help_text="Déclencheur d'alerte pour réappro")
    prix_moyen = models.DecimalField(null=True,blank=True,max_digits=10, decimal_places=4,
                                     help_text="Prix unitaire moyen historique du stock")
    prix_actuel = models.DecimalField(null=True,blank=True,max_digits=10, decimal_places=4,
                                      help_text="Dernier prix TTC unitaire livré ou de réappro")
    dernier_achat = models.DateField(null=True,blank=True,
                                     help_text="Date de dernière entrée avec prix saisi")
    ordi = models.CharField( blank=True,default='', max_length=32,
                             help_text="Nom de l'ordi utilisé pour l'entrée ou la modif")
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    obsolete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nom_court} ({self.id})"

    def save(self, *args,**kwargs):
        self.nom_court = self.nom_court.upper()
        self.nom = self.nom.upper()
        self.saisie = timezone.now().date()  # Mettre à jour le champ saisie
        super(StArticle,self).save(*args,**kwargs)

    class Meta:
        verbose_name = "(Item stocké) article"
        ordering = [Lower("nom_court")]

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
    fournisseur = models.ForeignKey("StFournisseur",models.SET_NULL,
                                    null=True,blank=True,
                                    related_name='+',
                                    help_text="Le fournisseur habituel de l'article est proposé en mouvement"
                                    )
    nbcolis = models.DecimalField(max_digits=6, decimal_places=0,
                                  null=True, blank=True,
                                  help_text="Pour les achats, nombre d'unité de vente")
    qtemouvement = models.DecimalField(max_digits=8, decimal_places=2,
                                       help_text="Nombre d'unités en mouvement")
    prixunit = models.DecimalField(max_digits=10, null=True, blank=True, decimal_places=4)
    service = models.IntegerField(default=0, choices=xconst.SERVICE_CHOICES,
                                  help_text="Service repas concerné")
    nbrations = models.DecimalField(max_digits=8, decimal_places=4,
                                    null=True, blank=True,
                                    help_text="Nbre de ration par unité Mouvement")
    transfert = models.DateField(null=True,blank=True,
                                 help_text="non modifiable si date de transfert")
    ordi = models.CharField(blank=True, default="",max_length=32,
                            help_text="pour tracer les mouvements, 'user/station'")
    saisie = models.DateField(auto_now=True,help_text="Date modif de l'item")

    def __str__(self):
        return f"{self.jour.strftime('%d/%m;%Y')}-{self.origine}-{self.article}"

    def clean(self):
        if self.origine == 'achat' and self.fournisseur is None:
            mess = "Le champ fournisseur ne peut pas être nul lorsque origine est 'achat'"
            raise ValidationError(mess)

    def save(self, *args, **kwargs):
        self.full_clean()
        self.saisie = timezone.now().date()  # Mettre à jour le champ saisie avec la date du jour
        super(StMouvement, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "(Mvt d'article) mouvement"
        indexes = [models.Index(fields=['jour','article','sens','origine']),
                   models.Index(fields=['article','sens','jour'])]
        ordering = ['jour',Lower('article__nom_court')]

class StEffectif(models.Model):
    jour = models.DateField()
    midi_clients = models.IntegerField(default=0)
    midi_repas = models.IntegerField(default=0)
    soir_clients = models.IntegerField(default=0)
    soir_repas = models.IntegerField(default=0)
    prevu_clients = models.IntegerField(null=True,blank=True)
    prevu_repas = models.IntegerField(null=True,blank=True)
    ordi = models.CharField(blank=True,default='',max_length=32)
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    def __str__(self):
        repas = self.midi_repas + self.soir_repas
        clients = self.midi_clients + self.soir_clients
        return f"{self.jour.strftime('%d/%m/%Y')}-{repas} {clients}"

    def save(self, *args,**kwargs):
        self.saisie = timezone.now().date()  # Mettre à jour le champ saisie
        super(StEffectif,self).save(*args,**kwargs)

    class Meta:
        verbose_name = "(Nbre de repas) effectif"
        indexes = [models.Index(fields=["jour",]),]

class StInventaire(models.Model):
    jour = models.DateField(help_text="Date de l'inventaire")
    article = models.ForeignKey("StArticle", models.SET_NULL,
                                null=True,blank=True,
                               help_text=" Id historique de l'article")
    article_nom = models.CharField(max_length=128,
                                   blank=True, default="",
                                   help_text=" Conserve le nom historique")
    unite_stock = models.CharField(max_length=8,help_text="Unité de base pour compter, accompagne le nom")
    qte_stock = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4,
                                     null=True,blank=True)
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4,
                                      null=True,blank=True)
    montant = models.DecimalField(max_digits=10, decimal_places=2,
                                  null=True,blank=True,
                                  help_text="Montant arrété pour la compta")
    modifiable = models.BooleanField(default=True)
    ordi = models.CharField(blank=True,default='',max_length=32)
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    def __str__(self):
        return "{:d/:m/:Y} {}".format(self.jour, self.article_nom)

    def save(self, *args,**kwargs):
        self.saisie = timezone.now().date()  # Mettre à jour le champ saisie
        super(StInventaire,self).save(*args,**kwargs)

    class Meta:
        verbose_name = "(Etats de stock) inventaire"
        indexes = [models.Index(fields=["jour", 'article']),]
