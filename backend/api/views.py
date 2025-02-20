from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *


class StoreLocationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserLocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Location saved successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class WildfireView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = WildfireSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Wildfire data saved successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        wildfires = Wildfire.objects.all()
        serializer = WildfireSerializer(wildfires, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)