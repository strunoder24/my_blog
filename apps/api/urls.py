from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.ApiRoot.as_view()),
    path('logout/', views.LogoutView.as_view()),
    path('signin/', views.LoginView.as_view()),
    path('user-info/', views.UserInfo.as_view(), name='user-info'),
    path('signup/', views.UserViewSet.as_view({
        'post': 'create'
    })),
    path('users/', views.UserViewSet.as_view({
        'get': 'list',
        'delete': 'destroy'
    }), name='users-list'),
    path('users/<int:pk>/', views.UserViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    }), name='user-detail'),
    path('posts/', views.PostViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'patch': 'partial_update'
    }), name='posts-list'),
    path('posts/<int:pk>/', views.PostViewSet.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='posts-detail'),
    path('comments/', views.CommentViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='comments-list'),
    path('comments/<int:pk>/', views.CommentViewSet.as_view({
         'get': 'retrieve',
         'patch': 'partial_update',
         'delete': 'destroy'
    }), name='comments-detail'),
    path('tags/', views.TagViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='tags-list'),
    path('tags/<str:name>/', views.TagViewSet.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
    }), name='tags-detail'),
    path('upload/', views.ImageFileUploader.as_view({
        'post': 'create'
    }), name='upload'),
    path('images/', views.ImagesViewsSet.as_view({
        'get': 'list'
    }), name='upload'),
    path('images/<int:pk>/', views.ImagesViewsSet.as_view({
        'get': 'retrieve',
    }), name='upload'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
