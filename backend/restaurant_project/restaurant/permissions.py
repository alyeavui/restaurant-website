from rest_framework import permissions

# For reviews
class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # SAFE methods allowed for anyone
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow if user is admin or the owner
        return request.user.is_staff or obj.user == request.user
