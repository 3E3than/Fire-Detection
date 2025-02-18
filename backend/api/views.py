from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserLocation
from .serializers import UserLocationSerializer

class StoreLocationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserLocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Location saved successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
