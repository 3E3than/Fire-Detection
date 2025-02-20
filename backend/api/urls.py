from django.urls import path
from .views import *



urlpatterns = [
    path('store-location/', StoreLocationView.as_view(), name='store-location'),
    path('wildfire/', WildfireView.as_view(), name='wildfire-list'),
    path('send-email/', SendEmailView.as_view(), name='send-email'),
]