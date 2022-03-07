from asyncore import write
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        # Removes password & confirmation from data object
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        # Checks if pass matches confirmation
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'Does not match'})
        # Hash password
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ("id", "email", "username", "image_url",
                  "password", "password_confirmation")
