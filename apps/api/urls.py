from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.ApiRoot.as_view()),
    path('signup/', views.UserViewSet.as_view({'post': 'create'})),
    path('logout/', views.LogoutView.as_view()),
    path('signin/', views.LoginView.as_view()),
    path('user-info/', views.UserInfo.as_view(), name='user-info'),
    path('users/', views.UserViewSet.as_view({'get': 'list', 'delete': 'destroy'}), name='users-list'),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'}), name='user-detail'),
    path('posts/', views.PostViewSet.as_view({'get': 'list', 'post': 'create'}), name='posts-list'),
    path('posts/<int:pk>', views.PostViewSet.as_view({'get': 'retrieve'}), name='posts-detail'),
    path('comments/', views.CommentViewSet.as_view({'get': 'list', 'post': 'create'}), name='comments-list'),
    path('comments/<int:pk>/', views.CommentViewSet.as_view({
         'get': 'retrieve',
         'patch': 'partial_update',
         'delete': 'destroy'
         }), name='comments-detail'),
    path('tags/', views.TagViewSet.as_view({'get': 'list', 'post': 'create'}), name='tags-list'),
    path('tags/<int:pk>', views.TagViewSet.as_view({
        'get': 'retrieve',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='tags-detail')
]

urlpatterns = format_suffix_patterns(urlpatterns)