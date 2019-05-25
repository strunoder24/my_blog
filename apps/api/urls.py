from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('signup/', views.UserViewSet.as_view({'post': 'create'})),
    path('signin/', views.UserViewSet.as_view({'get': 'list'})),
    path('user_info/', views.user_info),
    path('users/', views.UserViewSet.as_view({'get': 'list', 'delete': 'destroy'})),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve', 'delete': 'destroy'})),
    path('posts/', views.PostViewSet.as_view({'get': 'list', 'post': 'create'})),
]

urlpatterns = format_suffix_patterns(urlpatterns)