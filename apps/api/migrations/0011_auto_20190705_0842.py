# Generated by Django 2.2.1 on 2019-07-05 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20190705_0835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='posts',
            field=models.ManyToManyField(blank=True, related_name='tags', to='api.Post'),
        ),
    ]
