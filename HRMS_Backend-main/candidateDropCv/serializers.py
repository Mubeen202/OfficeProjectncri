from rest_framework import serializers

from .models import CandidateDropCv


class CandidateDropCvSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateDropCv
        fields = '__all__'