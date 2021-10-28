# Generated by Django 3.2.7 on 2021-10-01 19:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appli', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='geanalytiques',
            options={'managed': True, 'ordering': ['nom'], 'verbose_name': 'CodeAnalytique'},
        ),
        migrations.AlterModelOptions(
            name='starticles',
            options={'managed': True, 'ordering': ['nom'], 'verbose_name': 'Articles Stock'},
        ),
        migrations.RenameField(
            model_name='geanalytiques',
            old_name='analytique',
            new_name='nom',
        ),
        migrations.RenameField(
            model_name='starticles',
            old_name='article',
            new_name='nom',
        ),
    ]
