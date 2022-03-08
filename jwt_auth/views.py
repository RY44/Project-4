from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import UserSerializer
from django.conf import settings
from datetime import datetime, timedelta
import jwt


User = get_user_model()

# Create your views here.


class AllUsers(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        users = User.objects.all()
        serialized = UserSerializer(users, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)


class OneUser(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except:
            raise NotFound(detail="User not found")

    def get(self, request, pk):
        user = self.get_user(pk)
        serialized = UserSerializer(user)
        return Response(serialized.data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except:
            return Response("Failed to create User", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
    def post(self, request):
        print(request.data)
        try:
            user_to_login = User.objects.get(email=request.data.get('email'))
        except User.DoesNotExist:
            return PermissionDenied(detail="Unauthorised")
        if not user_to_login.check_password(request.data.get('password')):
            return PermissionDenied(detail="Unauthorised")
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({
            'sub': user_to_login.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, 'HS256')
        return Response({
            'token': token,
            'message': f"Welcome back {user_to_login.first_name}"
        }, status.HTTP_202_ACCEPTED)
