from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationSerializer, UserSerializer
from . models import Location, User
# Create your views here.


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def location_list(request):

    if request.method == 'GET':
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
          serializer = LocationSerializer(data=request.data)
    if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_list(request):

    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
          serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def location_detail(request):
    
    if request.method == 'PUT':
        serializer = LocationSerializer(Location,data=request.data)
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

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])    
def user_detail(request):
    
    if request.method == 'PUT':
        serializer = UserSerializer(Location,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        users = User.objects.filter(user_id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
            User.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def user_locations(request, location_pk, user_pk):
         try:
              location = Location.objects.get(pk=location_pk)
         except:
              return Response({"message": "Location not found!"}, status=status.HTTP_404_NOT_FOUND)
         try:
              user= User.objects.get(pk=user_pk)
         except:
              return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)
         
         location.user.add(Location)
         user.save()
         serializer = UserSerializer(User)
         return Response(serializer.data, status=status.HTTP_200_OK)