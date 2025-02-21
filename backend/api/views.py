from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserLocation, Wildfire, Location
from .serializers import UserLocationSerializer, WildfireSerializer
from ai.app import get_fire_predictions
import os

# StoreUserLocationView to handle storing user location data
class StoreLocationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserLocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Location saved successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# WildfireView to handle storing wildfire data and retrieving existing data
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


# LocationView to handle storing and retrieving locations
class LocationView(APIView):
    def get(self, request, *args, **kwargs):
        locations = Location.objects.all()
        locations_data = [{'city': location.city, 'country_code': location.country_code} for location in locations]
        return Response(locations_data, status=status.HTTP_200_OK)


from django.http import StreamingHttpResponse
from django.shortcuts import render
from .models import Location
from ai.app import get_fire_predictions

# This view will handle the streaming of logs
def predict_fire(request):
    try:
        # Fetch all locations from the database
        locations = Location.objects.all()

        # Create a generator to stream logs
        def log_generator():
            yield "Starting fire prediction process...\n"
            results = get_fire_predictions(locations)
            for result in results:
                city_country = result[0]
                prediction = result[1]
                confidence = result[2]
                yield f"Processed {city_country}: Prediction = {prediction}, Confidence = {confidence}\n"
            yield "Fire prediction process completed.\n"

        # Return the streaming response to the frontend
        return StreamingHttpResponse(log_generator(), content_type='text/plain')
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def write_predictions_to_file(results):
    output_file_path = os.path.join(os.getcwd(), 'fire_predictions_output.txt')

    try:
        with open(output_file_path, 'w') as file:
            for result in results:
                location = result[0]
                prediction = result[1]
                confidence = result[2]
                output_data = f"Location: {location}, Prediction: {prediction}, Confidence: {confidence}\n"
                file.write(output_data)

        print(f"Predictions written to {output_file_path}")
    except Exception as e:
        print(f"Error writing to file: {e}")
