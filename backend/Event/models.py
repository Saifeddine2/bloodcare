from django.db import models
from authentication.models import User as CustomUser

class Event(models.Model):
    eventname = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    association_or_hospital = models.CharField(max_length=255)  
    date_and_hour = models.DateTimeField()
    participants_count = models.PositiveIntegerField(default=0)
    participants_emails = models.TextField(blank=True, default="")

    def __str__(self):
        return self.eventname

class Participant(models.Model):
    event = models.ForeignKey(Event, related_name='participants', on_delete=models.CASCADE)
    email = models.EmailField()

    def __str__(self):
        return self.email
