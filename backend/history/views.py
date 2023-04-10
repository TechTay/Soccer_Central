from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import HistorySerializer
from . models import History
# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_history(request):
    history = History.objects.all()
    serializer = HistorySerializer(history, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def user_history(request):
    
    if request.method == 'POST':
        serializer = HistorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        history = History.objects.filter(user_id=request.user.id)
        serializer = HistorySerializer(history, many=True)
        return Response(serializer.data)
    elif request.method == 'DELETE':
            History.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)