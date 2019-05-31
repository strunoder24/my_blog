from rest_framework import serializers

from django.contrib.auth import get_user_model
from apps.api.models import Post


class UserSerializer(serializers.ModelSerializer):
    create_date = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'user_permissions', 'create_date', 'is_superuser',
                  'first_name', 'last_name', 'is_active', 'is_staff')

    @staticmethod
    def get_create_date(obj):
        return obj.date_joined.replace(tzinfo=None)

    def create(self, validated_data):
        return get_user_model().objects.create_user(email=validated_data['email'],
                                                    password=validated_data['password'],
                                                    username=validated_data['username'])


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('author', 'create_date', 'edit_date', 'likes')
