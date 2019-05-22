from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=100, default='')
    markdown = models.TextField()
    parsed_markdown = models.TextField(blank=True)
    lang = models.CharField(choices=[('en', 'english'), ('ru', 'russian')], default='ru', max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('create_date',)
