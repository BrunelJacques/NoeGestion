# Generated by Django 3.2.7 on 2021-10-01 10:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='geAnalytiques',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('analytique', models.CharField(db_index=True, max_length=8, unique=True)),
                ('label', models.CharField(help_text='Libellé long du code analytique', max_length=200)),
                ('params', models.TextField(blank=True, default='', help_text='liste texte de paramétrages constructeurs, pour le calcul coût')),
                ('axe', models.CharField(blank=True, default='', help_text="axe analytique 'VEHICULES' 'CONVOIS' 'PRIXJOUR', defaut = vide", max_length=32)),
                ('dateSaisie', models.DateField(auto_now=True, null=True)),
            ],
            options={
                'verbose_name': 'CodeAnalytique',
                'ordering': ['analytique'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='stArticles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article', models.CharField(db_index=True, help_text='Désignation du produit', max_length=128, unique=True)),
                ('rations', models.DecimalField(decimal_places=4, default=1, help_text='Nombre de ration pour une unité stock', max_digits=10)),
                ('qteParUniteVente', models.DecimalField(decimal_places=4, default=1, help_text='Quantité rentrée pour une unité de vente', max_digits=10)),
                ('fournisseur', models.CharField(blank=True, db_index=True, default='', help_text='Fournisseur habituel', max_length=32)),
                ('qteStock', models.IntegerField(blank=True, help_text='Stock en live', null=True)),
                ('txTva', models.DecimalField(decimal_places=4, default=0, help_text='tx de TVA en %', max_digits=10)),
                ('magasin', models.CharField(choices=[('FRI', 'Réfrigérateur'), ('SUR', 'Surgelés'), ('RES', 'Réserve')], db_index=True, help_text='Lieu de stockage: réserve, congel,frigo', max_length=32)),
                ('rayon', models.CharField(choices=[('BSS', 'Boissons'), ('CND', 'Condiments'), ('FCL', 'Féculents'), ('FRS', 'Frais'), ('FRT', 'Fruits'), ('LGM', 'Légumes'), ('PSS', 'Poisson'), ('SCR', 'Sucré'), ('VND', 'Viande')], db_index=True, help_text='rayon ou famille produit: type de produit dans le magasin', max_length=32)),
                ('qteMini', models.IntegerField(blank=True, help_text='Seuil déclenchant une alerte rouge', null=True)),
                ('qteSaison', models.IntegerField(blank=True, help_text='Seuil souhaitable en haute saison', null=True)),
                ('obsolete', models.BooleanField(default=False, help_text="1 article qui n'est plus utilisé", null=True)),
                ('prixMoyen', models.DecimalField(blank=True, decimal_places=4, help_text='Prix unitaire moyen historique du stock', max_digits=10, null=True)),
                ('prixActuel', models.DecimalField(blank=True, decimal_places=4, help_text='Dernier prix TTC unitaire livré ou de réappro', max_digits=10, null=True)),
                ('dernierAchat', models.DateField(blank=True, help_text='Date de dernière entrée avec prix saisi', null=True)),
                ('ordi', models.CharField(default='', help_text="Nom de l'ordi utilisé entrée ou modif", max_length=32, null=True)),
                ('dateSaisie', models.DateField(auto_now=True, null=True)),
            ],
            options={
                'verbose_name': 'Articles Stock',
                'ordering': ['article'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='stMouvements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jour', models.DateField(db_index=True, help_text='PK date du mouvement de stock')),
                ('fournisseur', models.CharField(blank=True, db_index=True, default='', help_text="Fournisseur de l'entrée", max_length=32)),
                ('origine', models.CharField(choices=[('entrees', (('achat', 'Achats'), ('retour', 'Retour de camp'), ('od_in', 'Correctif entrée'))), ('sorties', (('repas', 'Repas en cuisine'), ('camp', 'Sortie pour camp'), ('od_out', 'Correctif sortie')))], help_text='Origine du mouvement', max_length=32)),
                ('nbUnitesVente', models.DecimalField(decimal_places=4, default=1, help_text='Nombre une unité vente', max_digits=10)),
                ('qteMouvement', models.DecimalField(decimal_places=4, default=0, help_text='Quantitée mouvementée signée', max_digits=10)),
                ('prixUnit', models.DecimalField(decimal_places=4, help_text='Prix moyen pour sorties et retour, Prix revient pour achats', max_digits=10)),
                ('repas', models.IntegerField(blank=True, choices=[(1, 'Matin'), (2, 'Midi'), (3, 'Soir'), (4, 'Tous')], help_text='Repas concerné par la sortie vers cuisine', null=True)),
                ('ordi', models.CharField(blank=True, default='', help_text="Nom de l'ordi utilisé entrée ou modif", max_length=32)),
                ('dateSaisie', models.DateTimeField(auto_now=True)),
                ('transfertCompta', models.DateField(help_text='Marque un transfert export  réussi', null=True)),
                ('analytique', models.ForeignKey(help_text='PK Section analytique du camp à facturer', null=True, on_delete=django.db.models.deletion.RESTRICT, to='appli.geanalytiques')),
                ('article', models.ForeignKey(help_text='PK article mouvementé', on_delete=django.db.models.deletion.RESTRICT, to='appli.starticles')),
            ],
            options={
                'verbose_name': 'Mouvements de stock',
                'ordering': ['analytique', 'jour', 'article'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='stInventaires',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jour', models.DateField(db_index=True, help_text="PK Date de l'inventaire copie des stocks confirmée")),
                ('qteStock', models.IntegerField(default=0, help_text='Qté reportée par calcul depuis dernier constat')),
                ('qteConstat', models.IntegerField(default=0, help_text="Qté constatée lors d'un inventaire")),
                ('prixMoyen', models.DecimalField(blank=True, decimal_places=4, help_text='Prix unitaire moyen historique du stock', max_digits=10, null=True)),
                ('prixActuel', models.DecimalField(blank=True, decimal_places=4, help_text="Prix pour valorisation de l'inventaire", max_digits=10, null=True)),
                ('ordi', models.CharField(blank=True, default='', help_text="Nom de l'ordi utilisé entrée ou modif", max_length=32)),
                ('dateSaisie', models.DateField(auto_now=True)),
                ('modifiable', models.BooleanField(default=True, help_text='Transfert export  réussi ou import')),
                ('article', models.ForeignKey(help_text='PK Désignation du produit', on_delete=django.db.models.deletion.RESTRICT, to='appli.starticles')),
            ],
            options={
                'verbose_name': 'Inventaires',
                'ordering': ['jour', 'article'],
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='stEffectifs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('jour', models.DateField(help_text="PK Date de la situation de l'effectif")),
                ('midiClients', models.IntegerField(default=0, help_text='Nbre de repas midi clients facturés ')),
                ('midiRepas', models.IntegerField(default=0, help_text='Nbre de repas midi pour le staff et les clients')),
                ('soirClients', models.IntegerField(default=0, help_text='Nbre de repas aux clients présents le soir ')),
                ('soirRepas', models.IntegerField(default=0, help_text='Nbre de repas pour le staff et les clients le soir')),
                ('prevuClients', models.IntegerField(default=0, help_text="Nbre d'inscrits payants ")),
                ('prevuRepas', models.IntegerField(default=0, help_text="Nbre d'inscrits staff inclus")),
                ('ordi', models.CharField(blank=True, default='', help_text="Nom de l'ordi utilisé entrée ou modif", max_length=32)),
                ('dateSaisie', models.DateField(auto_now=True)),
                ('analytique', models.ForeignKey(help_text='PK Section analytique du camp à facturer null pour Cuisine', on_delete=django.db.models.deletion.RESTRICT, to='appli.geanalytiques')),
            ],
            options={
                'verbose_name': 'Effectifs présents',
                'ordering': ['analytique', 'jour'],
                'managed': True,
            },
        ),
        migrations.AddIndex(
            model_name='stmouvements',
            index=models.Index(fields=['analytique', 'jour', 'article'], name='appli_stmou_analyti_75aedf_idx'),
        ),
        migrations.AddIndex(
            model_name='stinventaires',
            index=models.Index(fields=['jour', 'article'], name='appli_stinv_jour_051cec_idx'),
        ),
        migrations.AddConstraint(
            model_name='stinventaires',
            constraint=models.UniqueConstraint(fields=('jour', 'article'), name='jour_article_unique'),
        ),
        migrations.AddIndex(
            model_name='steffectifs',
            index=models.Index(fields=['jour', 'analytique'], name='appli_steff_jour_a36b6a_idx'),
        ),
        migrations.AddConstraint(
            model_name='steffectifs',
            constraint=models.UniqueConstraint(fields=('jour', 'analytique'), name='jour_analytique_unique'),
        ),
    ]