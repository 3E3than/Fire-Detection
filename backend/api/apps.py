from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Connect the signal after migrations are complete
        print("Ready")
        post_migrate.connect(self.fetch_and_process_data, sender=self)
        print("Connected to post_migrate signal")

    def fetch_and_process_data(self, sender, **kwargs):
        """Trigger data processing after migrations"""
        # You can leave this empty or just do basic checks
        print("Migrations complete. Ready to trigger data processing.")
