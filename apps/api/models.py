from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    title = models.CharField(max_length=100, default='')
    markdown = models.TextField()
    parsed_markdown = models.TextField(blank=True)
    lang = models.CharField(choices=[('en', 'english'), ('ru', 'russian')], default='ru', max_length=100)
    likes = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(get_user_model(), related_name='posts', on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('create_date',)
