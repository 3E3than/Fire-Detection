from django.core.mail import send_mail
from django.conf import settings

def send_auto_email(recipient_list):
    subject = "Wildfire Detected!"
    message = "Dear User, A wildfire has been detected near your location. Please take necessary precautions. Stay safe!"
    recipient_list = [recipient_list]
    print("Sending email to", recipient_list)

    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)
