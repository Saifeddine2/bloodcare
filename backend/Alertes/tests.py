import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Alertes
from .views import ajouter_alerte, liste_alertes  
from .serializers import AlertesSerializer

@pytest.mark.django_db
def test_creer_alerte_non_authentifie():
    # Test de création d'une alerte 
    client = APIClient()
    data = {
        'lieu': 'Lieu de l\'alerte',
        'nom': 'Nom de la personne',
        'prenom': 'Prénom de la personne',
        'tel': '1234567890',
        'typeDeSang': 'A+',
        'niveauGravite': 'moyen',
        'description': 'Description de l\'alerte'
    }
    url = reverse('ajouter_alerte')  
    response = client.post(url, data, format='json')
    
    assert response.status_code == 201  # Vérifie que la création de l'alerte réussit
    alerte = Alertes.objects.get(id=response.data['id'])
    assert alerte.lieu == data['lieu']  

@pytest.mark.django_db
def test_liste_alertes_non_authentifie():
    # Test de récupération de la liste des alertes 
    Alertes.objects.create(lieu='Lieu 1', nom='Nom 1', prenom='Prénom 1', tel='1111111111',
                           typeDeSang='B+', niveauGravite='moyen', description='Description 1')
    Alertes.objects.create(lieu='Lieu 2', nom='Nom 2', prenom='Prénom 2', tel='2222222222',
                           typeDeSang='AB-', niveauGravite='élevé', description='Description 2')

    # Utilisation de l'API client pour envoyer une requête GET à l'endpoint de liste des alertes
    client = APIClient()
    url = reverse('liste_alertes') 
    response = client.get(url)
    
    assert response.status_code == 200  
    alertes = Alertes.objects.all()
    serializer = AlertesSerializer(alertes, many=True)
    assert response.data == serializer.data  
