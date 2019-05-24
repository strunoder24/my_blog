from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status

from django.contrib.auth import get_user_model
from apps.api.models import Post
import apps.api.permissions as localPermissions

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
