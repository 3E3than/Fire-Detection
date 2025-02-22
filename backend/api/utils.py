from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

def send_auto_email(user, city_country, prediction, confidence):
    # Check if the user has already been emailed today
    if user.last_email_sent and user.last_email_sent.date() == timezone.now().date():
        print(f"Email already sent today to {user.email}")
        return  # Do not send email again today
    
    # Customize the email message
    subject = f"Wildfire Prediction: {city_country}"
    message = (
        f"Dear User,\n\n"
        f"We have detected a wildfire in your area: {city_country}.\n"
        f"Prediction: {prediction}\n"
        f"Confidence: {confidence*100}%\n"
        f"Please take necessary precautions and stay safe.\n\n"
        f"Best regards,\n"
        f"Wildfire Monitoring Team"
    )

    recipient_list = [user.email]
    print(f"Sending email to {user.email} for location {city_country}")

    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)

    # Update last_email_sent to current time
    user.last_email_sent = timezone.now()
    user.save()
