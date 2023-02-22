# Generated by Django 4.2b1 on 2023-04-15 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backoffice', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productitem',
            old_name='product',
            new_name='product_id',
        ),
        migrations.RemoveField(
            model_name='product',
            name='code',
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]