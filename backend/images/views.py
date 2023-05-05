from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Image
from .serializers import ImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions, viewsets
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

@api_view(['GET','PUT','PATCH','DELETE'])
@permission_classes([IsAuthenticated])
def add_image(request, pk):
     image = get_object_or_404(Image, pk=pk)
     if request.method == "GET":
          serializer = ImageSerializer(image)
     elif request.method == 'PUT':
        serializer = ImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     elif request.method == 'PATCH':
          serializer = ImageSerializer(image, data=request.data, partial=True)
          serializer.is_valid(raise_exception=True)
          serializer.save()
          return Response(status=status.HTTP_201_CREATED)
     elif request.method == 'DELETE':
          image.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)
     

    

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_images(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        images = Image.objects.filter(user_id=request.user.id)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)
    elif request.method == 'DELETE':
            Image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)