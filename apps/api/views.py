from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions

from django.contrib.auth.models import User
from apps.api.models import Post

from apps.helpers.query_params import QueryParamsHelper
from apps.helpers.viewsets_methods import Destroy

from apps.api.serializers import UserSerializer
from apps.api.serializers import PostSerializer
# from apps.api.permissions import IsOwnerOrReadOnly


@api_view(['GET'])
def user_info(request, format=None):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def destroy(self, request, *args, **kwargs):
        q = request.GET
        id_list = QueryParamsHelper(q).get_values_as_numbers('ids')
        destroyer = Destroy(User, id_list)
        return destroyer.destroy_multiple()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
