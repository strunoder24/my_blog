from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model, authenticate, login, logout
from apps.api.models import Post
import apps.api.permissions as localPermissions

from apps.helpers.query_params import QueryParamsHelper
from apps.helpers.viewsets_methods import Destroy

from apps.api.serializers import UserSerializer
from apps.api.serializers import PostSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('users-list', request=request, format=format),
        'posts': reverse('posts-list', request=request, format=format)
    })


class LoginView(APIView):
    authentication_classes = ()
    permission_classes = ()

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
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


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
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
