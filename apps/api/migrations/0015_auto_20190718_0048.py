# Generated by Django 2.2.1 on 2019-07-18 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_post_preview_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='preview_text',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
