# Generated by Django 2.2.1 on 2019-05-26 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_seen',
            field=models.DateTimeField(null=True, verbose_name='Дата последнего появления на сайте'),
        ),
    ]