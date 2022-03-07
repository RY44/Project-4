from .common import PostSerializer
from conversation.serializers.common import ConversationSerializer
from jwt_auth.serializers.common import UserSerializer


class PopulatedPostSerializer(PostSerializer):
    conversation = ConversationSerializer(many=True)
    # owner = UserSerializer(many=True)
