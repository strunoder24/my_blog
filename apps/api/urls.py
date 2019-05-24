from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('user_info/', views.user_info),
    path('users/', views.UserViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'destroy'})),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'})),
    path('posts/', views.PostViewSet.as_view({'get': 'list', 'post': 'create'})),
]

urlpatterns = format_suffix_patterns(urlpatterns)