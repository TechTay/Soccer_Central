from rest_framework import serializers
from .models import Reply

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'comment', 'comment_id', 'text','user_id', 'user']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)
    comment_id = serializers.IntegerField(write_only=True)