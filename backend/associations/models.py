from django.db import models
from authentication.models import User

class Event(models.Model):
    association = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    lieu = models.CharField(max_length=255)
    description = models.TextField()
    participants = models.ManyToManyField(User, related_name='events_participated', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.association.nom} - {self.date} - {self.lieu}"
