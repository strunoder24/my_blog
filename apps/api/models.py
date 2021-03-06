from django.db import models
from django.contrib.auth import get_user_model
from mptt.models import MPTTModel, TreeForeignKey


class Image(models.Model):
    name = models.CharField(max_length=100, default='')
    file = models.ImageField(upload_to="posts_images/", blank=True, null=True)
    size = models.IntegerField('Размер файла (Кб)', null=True, blank=True)
    create_date = models.DateTimeField(auto_now_add=True)

    @property
    def file_size(self):
        file_size = self.size
        if not file_size or file_size == 0:
            return '—'
        elif 1048576 > file_size > 1024:
            file_size = '{:.2f} МБ'.format(file_size / 1024)
        else:
            file_size = '{} КБ'.format(file_size)
        return file_size.replace('.', ',')

    class Meta:
        ordering = ('create_date',)

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=100, default='')
    markdown = models.TextField()
    preview_text = models.CharField(max_length=500, blank=True)
    lang = models.CharField(choices=[('en', 'english'), ('ru', 'russian')], default='ru', max_length=100)
    likes = models.PositiveIntegerField(default=0)
    main_image = models.ForeignKey(Image, related_name='post', blank=True, null=True, on_delete=models.SET_NULL)
    is_published = models.BooleanField(default=False)
    author = models.ForeignKey(get_user_model(), related_name='posts', on_delete=models.SET_NULL, blank=True, null=True)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-create_date',)


class Comment(MPTTModel, models.Model):
    author = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, blank=True, null=True)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    parent = TreeForeignKey('self', on_delete=models.SET_NULL, related_name="children", blank=True, null=True)
    text = models.CharField(max_length=600, default='')
    likes = models.PositiveIntegerField(default=0)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('create_date',)


class Tag(models.Model):
    name = models.CharField(max_length=60)
    posts = models.ManyToManyField(Post, related_name='tags', blank=True)
    create_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now_add=True)
