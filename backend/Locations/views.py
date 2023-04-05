from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationSerializer
from . models import Location
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_locations(request):
    locations = Location.objects.all()
    serializer = LocationSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_locations(request):
    
    if request.method == 'POST':
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        locations = Location.objects.filter(user_id=request.user.id)
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)
    elif request.method == 'DELETE':
            Location.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)