from rest_framework import serializers

from emailNotification.serializers import *

from .models import *
from json import JSONEncoder
from uuid import UUID
import copy

old_default = JSONEncoder.default


    

class ConsultSerializer(serializers.ModelSerializer):
    email = serializers.JSONField() # change is here
    class Meta:
        model = CandidateEmail
        fields = ('id', 'name', 'email','subject', 'describe', 'file', 'created_by', 'updated_by', 'candidateId', 'isSent')
     
class GettingConsultSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField() # change is here
    candidateId = serializers.StringRelatedField() # change is here
    class Meta:
        model = CandidateEmail
        fields = '__all__'
 
 