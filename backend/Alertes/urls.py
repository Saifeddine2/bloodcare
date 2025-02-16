from django.urls import path
from . import views

urlpatterns = [
    path('ajouter_alerte/', views.ajouter_alerte, name='ajouter_alerte'),
    path('liste_alertes/', views.liste_alertes, name='liste_alertes'),
]