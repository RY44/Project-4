from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        header = request.headers.get('Authorization')
        # If there is no header
        if not header:
            return None
        # If header doe not start with Bearer
        if not header.startswith('Bearer'):
            return PermissionDenied(detail="Invalid aith token formatt")
        # Remove space after Bearer
        token = header.replace('Bearer ', '')
        try:
            # Decodes token
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            # Use decoded payload to find User
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError as error:
            raise PermissionDenied(detail="Invalid Token")
        except User.DoesNotExist as error:
            raise PermissionDenied(detail="User Not Found")

        return (user, token)
