from rest_framework import serializers
from .models import Location, User



class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'address', 'date', 'time','title', 'image_url','user']
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    Location = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'Location']
        

        