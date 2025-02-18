from django.urls import path
from .views import *


urlpatterns = [
    path('store-location/', StoreLocationView.as_view(), name='store-location'),
]