from rest_framework import viewsets
from rest_framework.decorators import api_view, detail_route
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth import get_user_model, authenticate, login, logout
import apps.api.permissions as localPermissions

from apps.helpers.query_params import QueryParamsHelper
from apps.helpers.viewsets_methods import Destroy

from apps.api.models import Post, Comment, Tag

from apps.api.serializers import UserSerializer, PostSerializer, CommentSerializer, TagSerializer


class ApiVersions(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        return Response({
            'api-v1': 'http://localhost:8000/api/v1/',
        })


class ApiRoot(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        return Response({
            'users': reverse('users-list', request=request, format=format),
            'posts': reverse('posts-list', request=request, format=format),
            'tags': reverse('tags-list', request=request, format=format)
        })


class LoginView(APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                serializer = UserSerializer(instance=user)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={'error': 'Логин или пароль указаны неверно'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    authentication_classes = ()
    permission_classes = ()

    def post(self, request):
        user = request.user
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserInfo(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (localPermissions.ReadAllDeleteSuperadmin,)

    def destroy(self, request, *args, **kwargs):
        q = request.GET
        if QueryParamsHelper(q).has_param('ids'):
            id_list = QueryParamsHelper(q).get_values_as_numbers('ids')
            destroyer = Destroy(get_user_model(), id_list)
            return destroyer.destroy_multiple()
        else:
            return super().destroy(request)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(level=0)
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = Tag.objects.get(name=kwargs['name'])
            serializer = TagSerializer(instance)
            return Response(serializer.data)

        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
