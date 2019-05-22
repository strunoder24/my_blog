from rest_framework import serializers

from django.contrib.auth.models import User
from apps.api.models import Post


class UserSerializer(serializers.ModelSerializer):
    create_date = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'user_permissions', 'create_date', 'is_superuser',
                  'first_name', 'last_name', 'is_active', 'is_staff', 'password')

    @staticmethod
    def get_create_date(obj):
        return obj.date_joined.replace(tzinfo=None)

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()

        return user


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('markdown', 'title', 'lang', 'author', 'create_date', 'edit_date')
