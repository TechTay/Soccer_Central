from rest_framework import serializers
from .models import Image



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id','image_url','user', 'user_id']
        depth = 1