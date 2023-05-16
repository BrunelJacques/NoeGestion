from rest_framework.permissions import BasePermission


class IsAdminAuthenticated(BasePermission):
    # existe de base IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser...

    def has_permission(self, request, view):
        # Ne donnons l’accès qu’aux utilisateurs administrateurs authentifiés
        return bool( request.user and request.user.is_authenticated and request.user.is_superuser)
