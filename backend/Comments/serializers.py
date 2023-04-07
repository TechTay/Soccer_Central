from rest_framework import serializers
from .models import Comment



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'text', 'likes', 'dislikes', 'user_id','user']
        depth = 1