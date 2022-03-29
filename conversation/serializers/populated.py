from .common import ConversationSerializer
from comment.serializers.common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedConversationSerializer(ConversationSerializer):
    comment = CommentSerializer(many=True)
