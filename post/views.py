from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post
from .serializers.common import PostSerializer
from .serializers.populated import PopulatedPostSerializer

# Create your views here.


class AllPosts(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        posts = Post.objects.all()
        serialized = PostSerializer(posts, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialized = PostSerializer(data=request.data)
        try:
            serialized.is_valid()
            serialized.save()
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        except:
            return Response(serialized.data, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class OnePost(APIView):
    # add permission make sure user owns post
    def get_post(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except:
            raise NotFound(detail="Post doesn't exsist")

    def get(self, request, pk):
        post = self.get_post(pk)
        serialized = PopulatedPostSerializer(post)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            post_to_delete = Post.objects.get(pk=pk)
            if post_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            post_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            raise NotFound(detail="Post not found")
        except:
            return Response({
                "detail": "Failed to delete Post"
            }, status=status.HTTP_401_UNAUTHORIZED)
