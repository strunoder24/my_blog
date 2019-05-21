from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('users/', views.UserViewSet.as_view({'get': 'list'})),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve'})),
    path('posts/', views.PostViewSet.as_view({'get': 'list'})),
]

urlpatterns = format_suffix_patterns(urlpatterns)