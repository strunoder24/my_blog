from django.contrib import admin
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'lang', 'create_date', 'edit_date')
    list_display_links = ('id', 'title')
    list_per_page = 25


admin.site.register(Post, PostAdmin)
