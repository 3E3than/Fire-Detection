from rest_framework import serializers
from .models import *

class UserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = ['email', 'latitude', 'longitude']


class WildfireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wildfire
        fields = ['id', 'location', 'latitude', 'longitude', 'radius', 'status']
