from rest_framework import viewsets

from django.contrib.auth.models import User
from apps.api.models import Post

from apps.api.serializers import UserSerializer
from apps.api.serializers import PostSerializer
# from apps.api.permissions import IsOwnerOrReadOnly


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
