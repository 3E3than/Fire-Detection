from django.db import models

class UserLocation(models.Model):
    email = models.EmailField()
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f'{self.email} - {self.latitude}, {self.longitude}'
