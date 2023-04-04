from rest_framework import serializers
from .models import Location



class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'address', 'date', 'time', 'user_id', 'rating']
        depth = 1