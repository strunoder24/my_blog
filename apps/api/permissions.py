from rest_framework import permissions


class ReadAllDeleteSuperadmin(permissions.BasePermission):
    # Добавлять и смотреть могут все, менять и удалять только суперадмин
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True

        return request.user.is_superuser