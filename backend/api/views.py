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
    def get(self, request, *args, **kwargs):
        wildfires = Wildfire.objects.filter(status=Wildfire.ONGOING)
        serializer = WildfireSerializer(wildfires, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        if isinstance(request.data, list):  # Handle bulk insert
            serializer = WildfireSerializer(data=request.data, many=True)
        else:
            serializer = WildfireSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Wildfire data saved successfully!"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
from .utils import send_auto_email
from .models import UserLocation, Wildfire

# Modified predict_fire view to send email to users near the wildfire location
def predict_fire(request):
    try:
        locations = Location.objects.all()

        def log_generator():
            yield "Starting fire prediction process...\n"
            results = get_fire_predictions(locations)

            for result in results:
                city_country = result[0]
                prediction = result[1]
                confidence = result[2]

                yield f"Processed {city_country}: Prediction = {prediction}, Confidence = {confidence}\n"

                # Check if wildfire exists at this location
                wildfire = Wildfire.objects.filter(location=city_country).first()

                if prediction == "fire":
                    if wildfire:
                        wildfire.status = Wildfire.ONGOING
                        wildfire.save()
                        yield f"Updated wildfire status at {city_country} to Ongoing.\n"
                    else:
                        Wildfire.objects.create(
                            location=city_country,
                            latitude=0.0,  # Replace with actual latitude
                            longitude=0.0, # Replace with actual longitude
                            radius=10000,  # Default radius in meters (adjustable)
                            status=Wildfire.ONGOING
                        )
                        yield f"New wildfire recorded at {city_country}.\n"

                    # Send email to users near the wildfire location
                    user_locations = UserLocation.objects.filter(
                        latitude__gte=wildfire.latitude - 3, 
                        latitude__lte=wildfire.latitude + 3,
                        longitude__gte=wildfire.longitude - 3, 
                        longitude__lte=wildfire.longitude + 3,
                    )
                    
                    for user in user_locations:
                        yield f"Sending email to {user.email} for location {city_country}\n"
                        send_auto_email(user, city_country, prediction, confidence)

                else:
                    if wildfire:
                        wildfire.status = Wildfire.INACTIVE
                        wildfire.save()
                        yield f"Updated wildfire status at {city_country} to Inactive.\n"

            yield "Fire prediction process completed.\n"

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
