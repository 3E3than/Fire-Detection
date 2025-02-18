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
