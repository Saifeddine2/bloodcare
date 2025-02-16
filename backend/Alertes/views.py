from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Alertes, User 
from .serializers import AlertesSerializer
from twilio.rest import Client
from django.conf import settings
import re
import time

@api_view(['POST'])
def ajouter_alerte(request):
    serializer = AlertesSerializer(data=request.data)
    if serializer.is_valid():
        alert = serializer.save()
        
        envoyer_message_sms(alert)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def est_compatible(blood_type_alert, blood_type_user):
    compatible_types = {
        'A+': ['A+', 'A-', 'O+', 'O-'],
        'A-': ['A-', 'O-'],
        'B+': ['B+', 'B-', 'O+', 'O-'],
        'B-': ['B-', 'O-'],
        'AB+': ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
        'AB-': ['AB-', 'A-', 'B-', 'O-'],
        'O+': ['O+', 'O-'],
        'O-': ['O-'],
    }
    
    return blood_type_user in compatible_types.get(blood_type_alert, [])

def envoyer_message_sms(alert):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    # Construct the message body with a placeholder for the user's name
    message_body_template = (
        "\n"
        "Hello {user_name}!\n"
        "💔New Critical Alert! A blood donation is urgently needed.\n"
        "Check out the details and help those in need!\n"
        "Description: {description}\n"
        "Location: {location}\n"
        "Phone: {phone}\n"
        "Blood Type: {blood_type}\n"
        "Severity Level: {severity_level}\n"
        "From BLOOD-CARE 🩸"
    )

    utilisateurs = User.objects.values_list('phone_number', 'blood_type', 'name')

    print("Numéros de téléphone des utilisateurs :", list(utilisateurs))

    for numero, blood_type, user_name in utilisateurs:
        if numero:  
            if not re.match(r'^\+?\d+$', numero):
                print(f"Le numéro {numero} contient des caractères non numériques, message non envoyé.")
                continue
            
            if not est_compatible(alert.typeDeSang, blood_type):
                print(f"Le groupe sanguin {blood_type} n'est pas compatible avec l'alerte. Message non envoyé.")
                continue
            
            if numero.startswith('0'):
                numero = '+212' + numero[1:]  
            elif not numero.startswith('+'):
                continue
            
            # Format the message body with the user's name and alert details
            message_body = message_body_template.format(
                user_name=user_name,
                description=alert.description,
                location=alert.lieu,
                phone=alert.tel,
                blood_type=alert.typeDeSang,
                severity_level=alert.niveauGravite
            )

            print("Numéro formaté :", numero)
            print("Corps du message :", message_body)

            try:
                message = client.messages.create(
                    body=message_body,
                    from_=settings.TWILIO_SMS_NUMBER,
                    to=numero
                )
                print(f"Message envoyé à {numero}: {message.sid}")

                time.sleep(1)
            except Exception as e:
                print(f"Erreur lors de l'envoi du message à {numero}: {e}")


@api_view(['GET'])
def liste_alertes(request):
    alertes_objects = Alertes.objects.all()
    serializer = AlertesSerializer(alertes_objects, many=True)
    return Response(serializer.data)