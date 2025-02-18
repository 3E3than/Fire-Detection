from django.db import models

class UserLocation(models.Model):
    email = models.EmailField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f'{self.email} - {self.latitude}, {self.longitude}'

class Wildfire(models.Model):
    ONGOING = 'Ongoing'
    INACTIVE = 'Inactive'
    STATUS_CHOICES = [
        (ONGOING, 'Ongoing'),
        (INACTIVE, 'Inactive'),
    ]
    
    location = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    radius = models.PositiveIntegerField()  # In meters (10,000 meters = 10km)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=INACTIVE,
    )

    def __str__(self):
        return f"Wildfire at {self.location} - {self.status} - {self.radius}m radius"
