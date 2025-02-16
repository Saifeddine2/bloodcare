from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserDonations
from .serializers import UserDonationsSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from twilio.rest import Client
from django.conf import settings
from datetime import timedelta
from django.utils import timezone

class LastDonation(APIView):

    permission_classes = [IsAuthenticated]

    # def get(self, request, format=None):
    #     last_donation = UserDonations.get_last_donation(request.user)
    #     if last_donation:
    #         serializer = UserDonationsSerializer(last_donation)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response({"detail": "No donations found."}, status=status.HTTP_404_NOT_FOUND)

    def send_whatsapp_message(self, user):
        account_sid = 'AC08fa179eba993b591cdff8276fdc2a36'
        auth_token = '[AuthToken]'
        client = Client(account_sid,auth_token)
        message = (
            "Hello, it's Blood Care! We wanted to inform you that you can now donate blood, "
            "as you have exceeded the resting period. People are in need of blood."
        )
        try:
            client.messages.create(
                body=message,
                from_='whatsapp:+14155238886',  
                to=f'whatsapp:{user.phone_number}'  
            )
            print(f"WhatsApp message sent to {user.phone_number} successfully.")
        except Exception as e:
            print(f"Failed to send message to {user.phone_number}: {e}")

    def get(self, request, format=None):
        last_donation = UserDonations.get_last_donation(request.user)
        if last_donation:
            serializer = UserDonationsSerializer(last_donation)
            donation_date = last_donation.date
            
            # Vérifiez si la dernière donation date de plus de 3 mois
            if donation_date < (timezone.now() - timedelta(days=90)):
                self.send_whatsapp_message(request.user)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response({"detail": "No donations found."}, status=status.HTTP_404_NOT_FOUND)
    
class UserDonationsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        donations = UserDonations.objects.filter(user=request.user)
        serializer = UserDonationsSerializer(donations, many=True)
        return Response(serializer.data)

    # def post(self, request, format=None):
    #     serializer = UserDonationsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=request.user)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDonationsDetail(APIView):
    permission_classes = [IsAuthenticated]

    # def get_object(self, pk):
    #     try:
    #         return UserDonations.objects.get(pk=pk)
    #     except UserDonations.DoesNotExist:
    #         raise Http404

    # def get(self, request, pk, format=None):
    #     donation = self.get_object(pk)
    #     serializer = UserDonationsSerializer(donation)
    #     return Response(serializer.data)

    # def put(self, request, pk, format=None):
    #     donation = self.get_object(pk)
    #     serializer = UserDonationsSerializer(donation, data=request.data)
    #     if serializer.is_valid():
    #         if donation.user != request.user:
    #             return Response({'error': 'You do not have permission to edit this donation.'}, status=status.HTTP_403_FORBIDDEN)
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     donation = self.get_object(pk)
    #     if donation.user != request.user:
    #         return Response({'error': 'You do not have permission to delete this donation.'}, status=status.HTTP_403_FORBIDDEN)
    #     donation.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    
class AddDonation(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserDonationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)