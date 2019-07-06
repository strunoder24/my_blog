# Generated by Django 2.2.1 on 2019-07-06 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20190705_0842'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=100)),
                ('file', models.ImageField(blank=True, null=True, upload_to='posts_images/')),
                ('size', models.IntegerField(blank=True, null=True, verbose_name='Размер файла (Кб)')),
                ('create_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('create_date',),
            },
        ),
    ]
