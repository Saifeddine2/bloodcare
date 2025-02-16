from rest_framework import serializers
from .models import Alertes

class AlertesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alertes
        fields = ['id', 'lieu', 'nom', 'prenom', 'tel', 'typeDeSang', 'niveauGravite', 'description', 'date']
