from rest_framework import serializers
from .models import Event , Participant


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['email']

class EventSerializer(serializers.ModelSerializer):
    participant_emails = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'eventname', 'location', 'association_or_hospital',
            'date_and_hour', 'participants_count', 'participant_emails'
        ]

    def get_participant_emails(self, obj):
        return [participant.email for participant in obj.participants.all()]
