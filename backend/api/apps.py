from django.apps import AppConfig
from ai.app import load_model, predict
from api.utils import send_auto_email

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        load_model()
        print("Model loaded successfully!")