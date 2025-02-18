from django.contrib import admin
from .models import UserLocation

class UserLocationAdmin(admin.ModelAdmin):
    list_display = ('email', 'latitude', 'longitude')
    search_fields = ('email',)  # Allows search by email
    list_filter = ('latitude', 'longitude')  # Optional: Filters locations by latitude and longitude

admin.site.register(UserLocation, UserLocationAdmin)
