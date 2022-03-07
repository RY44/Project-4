from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db import IntegrityError
from .models import Comment
from .serializers.common import CommentSerializer

# Create your views here.


class AllComments(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serialized = CommentSerializer(data=request.data)
        try:
            serialized.is_valid()
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        except AssertionError as e:
            print(str(e))
            return Response({
                "detail": str(e)
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except:
            return Response({
                "detail": "Unprocessable Entity"
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
