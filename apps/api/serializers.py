from rest_framework import serializers
from django.db import IntegrityError

from django.contrib.auth import get_user_model
from apps.api.models import Post, Comment, Tag


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


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'text', 'likes', 'create_date', 'edit_date', 'parent', 'post', 'children')
        read_only_fields = ('author', 'likes')

    def get_fields(self):
        fields = super().get_fields()
        if fields['children']:
            fields['children'] = CommentSerializer(many=True)
        return fields


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'create_date', 'edit_date')


class PostListSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()
    tags = TagSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ('author', 'create_date', 'edit_date', 'likes')

    def get_comments(self, obj):
        queryset = Comment.objects.filter(level=0, post=obj.id)
        serializer = CommentSerializer(instance=queryset, many=True)
        return serializer.data


class PostSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(allow_empty=True, write_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def to_representation(self, instance):          # Если метод GET то сериалайзер другой
        if self.context['request'].method == 'GET':
            serializer = PostListSerializer(instance)
            return serializer.data
        return super().to_representation(instance)

    def create(self, validated_data):
        tags_ids = validated_data.pop('tags')
        post = Post.objects.create(**validated_data)
        for tag_id in tags_ids:
            try:
                post.tags.add(tag_id)
            except IntegrityError:
                raise serializers.ValidationError(f"Тега c id: {tag_id} не существует в базе данных")
        return post
