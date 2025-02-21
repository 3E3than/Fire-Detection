from django.contrib import admin
from .models import *

class UserLocationAdmin(admin.ModelAdmin):
    list_display = ('email', 'latitude', 'longitude')
    search_fields = ('email',)  # Allows search by email
    list_filter = ('latitude', 'longitude')  # Optional: Filters locations by latitude and longitude

admin.site.register(UserLocation, UserLocationAdmin)

class WildfireAdmin(admin.ModelAdmin):
    list_display = ('location', 'latitude', 'longitude', 'radius', 'status')
    list_filter = ('status', 'radius')  # Optional: You can filter wildfires by status or radius
    search_fields = ('location',)  # Allows searching by location
    list_editable = ('status',)  # Allows in-line editing of the status

admin.site.register(Wildfire, WildfireAdmin)

# Add the Location model to admin
class LocationAdmin(admin.ModelAdmin):
    list_display = ('city', 'country_code')  # Display these fields in the list view
    search_fields = ('city',)  # Allows searching by city
    list_filter = ('country_code',)  # Allows filtering by country code

admin.site.register(Location, LocationAdmin)
