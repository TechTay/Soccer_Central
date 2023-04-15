from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationSerializer, UserSerializer, HistorySerializer
from . models import Location, User
from django.db import connection
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
            
    #         with connection.cursor() as cursor:
    #             cursor.execute(
    #             f""" SELECT `authentication_user`.`id` FROM `authentication_user` INNER JOIN `Locations_location_user` ON (`authentication_user`.`id` = `Locations_location_user`.`user_id`) WHERE `Locations_location_user`.`location_id` = {location.id}; args=({location.id},); alias=default
    # INSERT IGNORE INTO `Locations_location_user` (`location_id`, `user_id`) VALUES ({location.id}, {user.id}); args=({location.id}, {user.id}); alias=default
    # SELECT `django_content_type`.`id`, `django_content_type`.`app_label`, `django_content_type`.`model` FROM `django_content_type` WHERE (`django_content_type`.`app_label` = 'Locations' AND `django_content_type`.`model` = 'location') LIMIT 21; args=('Locations', 'location'); alias=default"""   
    #             )  
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
        locations = Location.objects.filter(user__id=request.user.id)
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
         
         location.user.add(user)
         location.save()
         serializer = LocationSerializer(location)
         return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def locations_history(request, location_pk, history_pk):
         try:
              location = Location.objects.get(pk=location_pk)
         except:
              return Response({"message": "Location not found!"}, status=status.HTTP_404_NOT_FOUND)
         try:
              history= HistorySerializer.objects.get(pk=history_pk)
         except:
              return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)
         
         location.history.add(history)
         location.save()
         serializer = LocationSerializer(location)
         return Response(serializer.data, status=status.HTTP_200_OK)