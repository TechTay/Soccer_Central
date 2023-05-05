from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationSerializer, UserSerializer, HistorySerializer
from . models import Location, User, LocationHistory
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def user_list(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
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

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def history_list(request):

    if request.method == 'GET':
        history = LocationHistory.objects.all()
        serializer = HistorySerializer(history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        location_id = request.data["location_id"]
        location = Location.objects.get(pk=location_id)
        request.data["location"] = location_id
        serializer = HistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','PATCH','DELETE'])
@permission_classes([IsAuthenticated])
def location_image(request, pk):
     image = get_object_or_404(Location, pk=pk)
     if request.method == "GET":
          serializer = LocationSerializer(image)
     elif request.method == 'PUT':
        serializer = LocationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     elif request.method == 'PATCH':
          serializer = LocationSerializer(image, data=request.data, partial=True)
          serializer.is_valid(raise_exception=True)
          serializer.save()
          return Response(status=status.HTTP_201_CREATED)
     elif request.method == 'DELETE':
          image.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET','POST'])
@permission_classes([AllowAny])
def join_game_details(request, location_pk):

    join_game = get_object_or_404(Location, pk=location_pk)
    if request.method == 'GET':
        
        
        serializer = LocationSerializer(join_game);
        return Response(serializer.data)

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
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])    
def history_detail(request):
    
    if request.method == 'PUT':
        serializer = HistorySerializer(Location,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        Lhistory = LocationHistory.objects.filter(user_id=request.user.id)
        serializer = HistorySerializer(Lhistory, many=True)
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
              history= LocationHistory.objects.get(pk=history_pk)
         except:
              return Response({"message": "History not found!"}, status=status.HTTP_404_NOT_FOUND)
         
         location.history.add(history)
         location.save()
         serializer = LocationSerializer(location)
         return Response(serializer.data, status=status.HTTP_200_OK)