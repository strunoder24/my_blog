from django.db import models
from django.contrib.auth import get_user_model


class Post(models.Model):
    title = models.CharField(max_length=100, default='')
    markdown = models.TextField()
    parsed_markdown = models.TextField(blank=True)
    lang = models.CharField(choices=[('en', 'english'), ('ru', 'russian')], default='ru', max_length=100)
    likes = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(get_user_model(), related_name='posts', on_delete=models.SET_NULL, blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('create_date',)


class Comment(models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, blank=True, null=True)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(max_length=600, default='')
    likes = models.PositiveIntegerField(default=0)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('create_date',)
