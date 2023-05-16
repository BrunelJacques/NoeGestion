import sys
sys.path.append("..")
from outils import xconst, xformat

from django.db import models, transaction
#import requests # pour appels api externes transaction.atomic


class StMagasin(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    nom = models.CharField(max_length=30, unique=True)
    position = models.PositiveSmallIntegerField("Position", null=True)
    z = xformat.DateFrToIso('31/12/2012')
    class Meta:
        verbose_name = "StMagasin: Lieu de stockage"
        ordering = ["position"]

    def __unicode__(self):
        return self.nom

    def __str__(self):
        return self.nom


class StRayon(models.Model):

    id = models.CharField(max_length=5, primary_key=True)
    nom = models.CharField(max_length=30, unique=True)
    position = models.PositiveSmallIntegerField("Position", null=True)

    class Meta:
        verbose_name = "StRayon: Subdivisions de magasin"
        ordering = ["position"]

    def __unicode__(self):
        return self.id
    def __str__(self):
        return self.nom


class StFournisseur(models.Model):

    nom = models.CharField(max_length=30, unique=True)

    class Meta:
        verbose_name = "StFournisseur: approvisionnements d'article"
        ordering = ["nom"]

    def __unicode__(self):
        return "{} {:d}".format(self.nom, self.id)

    def __str__(self):
        return self.nom


class StArticle(models.Model):
    nom = models.CharField(unique=True, max_length=128)
    nom_court = models.CharField(unique=True, max_length=32, db_index=True)
    unite_stock = models.CharField(max_length=8,default='unit',
                                   help_text="Unité de base pour compter, accompagne le nom")
    unite_colis = models.CharField(max_length=8,default='pqt',
                                   help_text="Utilisé lors des entrées pour un prix au conditionnement")
    colis_par = models.DecimalField(max_digits=10, decimal_places=4, default=1,
                                    help_text="Nbre d'unités stock par unité de colis")
    magasin = models.ForeignKey('StMagasin',
                                on_delete=models.DO_NOTHING,
                                help_text="Lieu de stockage"
                                )
    rayon = models.ForeignKey('StRayon', default=1,related_name='articles',
                              on_delete=models.RESTRICT,
                              help_text="Catégorie de produit"
                              )
    rations = models.DecimalField(max_digits=10, decimal_places=4, blank=False, default=1,
                                  help_text="Nbre de rations par unité de stock")
    fournisseur = models.ForeignKey('StFournisseur', default=1,related_name='articles',
                                    on_delete=models.RESTRICT,
                                    help_text="Fournisseur habituel"
                                    )
    qte_stock = models.DecimalField(max_digits=10,decimal_places=4,default=0,db_index=True,
                                    help_text="recalculé régulièrement pour inventaire")
    tx_tva = models.DecimalField(max_digits=10, decimal_places=4, default=5.5,
                                 help_text="tx de TVA en %")
    qte_mini = models.DecimalField(blank=True,max_digits=8,decimal_places=2,null=True,
                                   help_text="Déclencheur d'alerte pour réappro")
    prix_moyen = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True,
                                     help_text="Prix unitaire moyen historique du stock")
    prix_actuel = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True,
                                      help_text="Dernier prix TTC unitaire livré ou de réappro")
    dernier_achat = models.DateField(null=True,
                                     help_text="Date de dernière entrée avec prix saisi")
    ordi = models.CharField( blank=True, max_length=32,
                             help_text="Nom de l'ordi utilisé pour l'entrée ou la modif")
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    obsolete = models.BooleanField(default=False)

    class Meta:
        verbose_name = "StArticle: Items de stock géré"
        ordering = ["nom_court"]

    def __str__(self):
        return self.nom_court


class GeAnalytique(models.Model):
    #État des stocks à une date donnée
    id = models.CharField(primary_key=True, max_length=5)
    label = models.CharField(unique=True, max_length=200)
    abrege = models.CharField(max_length=32)
    params = models.TextField(null=True, blank=True,default='')
    axe = models.CharField(max_length=32, blank=True, default='')
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")
    obsolete = models.BooleanField(default=False)

    def __str__(self): return self.abrege

    class Meta:
        verbose_name = 'GeAnalytique: Gestion générale, codes analytique'
        ordering = ['id',]


class StMouvement(models.Model):
    jour = models.DateField()
    sens = models.IntegerField(default=-1,
                               help_text="Entrée +1, Sortie -1")
    origine = models.CharField(max_length=8,db_index=True,choices=xconst.ORIGINE_CHOICES,
                               default='od_out',help_text="Type de mouvement selon sens")
    article = models.ForeignKey("StArticle",
                                on_delete=models.RESTRICT,
                                )
    analytique = models.ForeignKey("GeAnalytique",
                                   on_delete=models.SET("deleted"),
                                   )
    fournisseur = models.ForeignKey("StFournisseur", models.SET_NULL, null=True,
                                    help_text="Le fournisseur habituel de l'article est proposé"
                                    )
    nbcolis = models.DecimalField(max_digits=6, decimal_places=0, null=True, default=0,
                                  help_text="Pour les achats, nombre d'unité de vente")
    qtemouvement = models.DecimalField(max_digits=8, decimal_places=2,
                                       help_text="Nombre d'unité stockées")
    prixunit = models.DecimalField(max_digits=10, decimal_places=4)
    service = models.IntegerField(default=0,choices=xconst.REPAS_CHOICES,
                                  help_text="Service repas concerné")
    nbrations = models.DecimalField(max_digits=8, decimal_places=4,
                                    help_text="Nbre de ration par qteMouvement", null=True)
    transfert = models.DateField(null=True, help_text="non modifiable si date de transfert")
    ordi = models.CharField(max_length=32, blank=True, default="",
                            help_text="pour tracer les mouvements")
    saisie = models.DateField(auto_now=True,help_text="Date de l'entrée de l'item")

    class Meta:
        verbose_name = "StMouvement: Entrées et sorties de stock "
        indexes = [models.Index(fields=['jour','article','sens','origine']),
                   models.Index(fields=['article','sens','jour'])]

    def __str__(self):
        return "{:d/:m/:Y} {:d} {} {}".format(self.jour,self.sens,self.origine,self.article)


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


    class Meta:
        verbose_name = "StEffectifs: Présents aux repas quotidien"
        indexes = [models.Index(fields=["jour",]),]

    def __str__(self):
        return "{:d/:m/:Y} {d} repas {d} clients".format(self.jour,
                                                         self.midi_repas + self.soir_repas,
                                                         self.midi_clients + self.soir_clients,)


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

    class Meta:
        verbose_name = "StInventaire: archivages d'états de stock"
        indexes = [models.Index(fields=["jour", 'article']),]

    def __str__(self):
        return "{:d/:m/:Y} {}".format(self.jour, self.libelle)
