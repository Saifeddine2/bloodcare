from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserDonationsList, UserDonationsDetail, AddDonation , LastDonation

urlpatterns = [
    path('userdonations/', UserDonationsList.as_view(), name='user_donations_list'),
    path('userdonations/<int:pk>/', UserDonationsDetail.as_view(), name='user_donations_detail'),
    path('newuserdonations/', AddDonation.as_view(), name='add_donation'),
    path('userlastdonation/', LastDonation.as_view(), name='add_donation'),
]
