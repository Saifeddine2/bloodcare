from django.db import models
from django.forms import ValidationError
from authentication.models import User
from associations.models import Event

class RendezVous(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    citizen = models.ForeignKey(User, on_delete=models.CASCADE)
    heure_rdv = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.event} - {self.citizen} - {self.heure_rdv}"



class Notification(models.Model):
    TYPE_CHOICES = [
        ('Reminder', 'Reminder'),
        ('Information', 'Information'),
    ]

    recipient = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type} - {self.event} - {self.recipient}"


class UserDonations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='donations')
    date = models.DateField()
    location = models.CharField(max_length=255)
    volume = models.FloatField()

    def __str__(self):
        return f"{self.user.email} - {self.date}"

    def clean(self):
        if self.volume <= 0:
            raise ValidationError('The volume must be a positive number.')

    @staticmethod
    def get_last_donation(user):
        """Récupère la dernière donation de l'utilisateur."""
        return UserDonations.objects.filter(user=user).order_by('-date').first()
