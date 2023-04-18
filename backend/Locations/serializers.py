from rest_framework import serializers
from .models import Location, User, LocationHistory



class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'address', 'date', 'time','title', 'image_url','user']
        depth = 1

class UserSerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'location']
        
class HistorySerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=True, read_only=True)

    class Meta:
        model = LocationHistory
        fields = ['id', 'date_of_play','location','location_id','user_id']
        

    location_id = serializers.IntegerField(write_only=True)
        