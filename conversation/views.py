from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db import IntegrityError
from .models import Conversation
from .serializers.common import ConversationSerializer
from .serializers.populated import PopulatedConversationSerializer

# Create your views here.


class AllConversations(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # get all convo with current user id
    def get(self, request):
        conversations = Conversation.objects.filter(owner=request.user.id)
        serialized = ConversationSerializer(conversations, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def post(self, request):
        conversations = Conversation.objects.filter(
            owner=request.user.id, post=request.data['post'])
        if conversations:
            return Response({
                "detail": "User has already started convo on this post"
            }, status=status.HTTP_400_BAD_REQUEST)
        serialized = ConversationSerializer(data=request.data)
        # user_convos = Conversation.objects.get(
        #     owner=request.user.id, post=request.post)
        # print('User convos -->', user_convos)
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


class OneConversation(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_conversation(self, pk):
        try:
            return Conversation.objects.get(pk=pk)
        except:
            raise NotFound(detail="Conversation doesn't exsist")

    def get(self, request, pk):
        conversation = self.get_conversation(pk)
        serialized = PopulatedConversationSerializer(conversation)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            conversation_to_delete = Conversation.objects.get(pk=pk)
            if conversation_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            conversation_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Conversation.DoesNotExist:
            raise NotFound(detail="Conversation not found")
        except:
            return Response({
                "detail": "Failed to delete Conversation"
            }, status=status.HTTP_401_UNAUTHORIZED)
