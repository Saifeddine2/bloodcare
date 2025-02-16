
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Alertes(models.Model):
    id = models.AutoField(primary_key=True)
    lieu = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)  
    prenom = models.CharField(max_length=100)  
    tel = models.CharField(max_length=100)  
    typeDeSang = models.CharField(max_length=100)  
    niveauGravite = models.CharField(max_length=100, default='faible') 
    description = models.TextField()  
    date = models.DateTimeField(auto_now_add=True)  # Utilisation de auto_now_add=True
    def __str__(self):
        return self.nom