from tokenize import blank_re
from rest_framework import serializers

from .models import *

class CommonValuesSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(required=False)
    class Meta:
        model = CommonValues
        fields = '__all__'     
       
class AnswerSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(required=False)
   
    class Meta:
        model = Answer
        fields = '__all__'
        read_only_fields = ('candidateAppSubmit',)


class FactorAnswerSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(required=False)
   
    class Meta:
        model = FactorAnswer
        fields = '__all__'
        # read_only_fields = ('candidateAppSubmit',)

class CandidateEducationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateEducations
        fields = '__all__' 
        
        
class CandidateExperienceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CandidateExperience
        fields = '__all__'
        
class GettingCandidateExperienceSerializer(serializers.ModelSerializer):
    organizationId = serializers.StringRelatedField()
    class Meta:
        model = CandidateExperience
        fields = '__all__'
        
class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__' 
    
class CandidateCertificatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateCertificates
        fields = '__all__' 

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateAppSubmit
        fields = '__all__'
        
        
        

        
class GettingCandidateSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    updated_by = serializers.StringRelatedField()
    candidateEducation = CandidateEducationsSerializer(many=True)
    candidateExperience= GettingCandidateExperienceSerializer(many=True)
    candidateCertificates = CandidateCertificatesSerializer(many= True)
    class Meta:
        model = CandidateAppSubmit
        fields = '__all__'
        
class CreateCandidateSerializer(serializers.ModelSerializer):
    candidateEducation = CandidateEducationsSerializer(many=True)
    candidateExperience= CandidateExperienceSerializer(many=True)
    candidateCertificates = CandidateCertificatesSerializer(many= True)
    class Meta:
        model = CandidateAppSubmit
        fields = '__all__'
        
    def create(self, validated_data):
        candidateEducation = validated_data.pop('candidateEducation')
        candidateExperience = validated_data.pop('candidateExperience')
        candidateCertificates = validated_data.pop('candidateCertificates')
        candidateId = CandidateAppSubmit.objects.create(**validated_data)
        for education in candidateEducation:
            CandidateEducations.objects.create(**education, candidateId=candidateId)
            
        for experience in candidateExperience:
            CandidateExperience.objects.create(**experience, candidateId=candidateId)
            
        for certificate in candidateCertificates:
            CandidateCertificates.objects.create(**certificate, candidateId=candidateId)
            
        return candidateId


  
class CandidateAppSubmitSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    # careerJobs= serializers.StringRelatedField()
    class Meta:
        model = CandidateRelatedJob
        fields = '__all__'

    def create(self, validated_data):
        answers = validated_data.pop('answers')
        candidateRelatedJob = CandidateRelatedJob.objects.create(**validated_data)
        for answer in answers:
            Answer.objects.create(**answer, candidateRelatedJob=candidateRelatedJob)
        return candidateRelatedJob


class CandidateEvaluationSerializer(serializers.ModelSerializer):
    factorAnswers = FactorAnswerSerializer(many=True)
    # careerJobs= serializers.StringRelatedField()
    class Meta:
        model = CandidateEvaluation
        fields = '__all__'

    def create(self, validated_data):
        factorAnswers = validated_data.pop('factorAnswers')
        candidateRelatedJob = CandidateEvaluation.objects.create(**validated_data)
        for answer in factorAnswers:
            FactorAnswer.objects.create(**answer, candidateEvaluationId=candidateRelatedJob)
        return candidateRelatedJob

  
class CandidateRelatedJobSerializer(serializers.ModelSerializer):
    CandidateRelatedJobs = CandidateAppSubmitSerializer(many= True)
    class Meta:
        model = CandidateAppSubmit
        fields = '__all__'
        
    def create(self, validated_data):
        CandidateRelatedJobs= validated_data.pop('CandidateRelatedJobs')
        canidateId = CandidateAppSubmit.objects.create(**validated_data)
        for candidate in CandidateRelatedJobs:
            CandidateRelatedJob.objects.create(**candidate, canidateId=canidateId)
        return canidateId
 
class FetchCandidateAppSubmitSerializer(serializers.ModelSerializer):
    canidateId= CandidateSerializer(read_only=True)
    answers = AnswerSerializer(many=True)
    candidateRealtedFactors= CandidateEvaluationSerializer(many=True)
    careerJob= serializers.StringRelatedField()
    
    class Meta:
        model = CandidateRelatedJob
        fields = '__all__'

    # def create(self, validated_data):
    #     answers = validated_data.pop('answers')
    #     candidateRelatedJob = CandidateRelatedJob.objects.create(**validated_data)
    #     for answer in answers:
    #         Answer.objects.create(**answer, candidateRelatedJob=candidateRelatedJob)
    #     return candidateRelatedJob
    
        
class RecruiterCandidateNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruiterCandidateNotes
        fields = '__all__'

class GetRecruiterCandidateNotesSerializer(serializers.ModelSerializer):
    candidateId = serializers.StringRelatedField()
    updated_by = serializers.StringRelatedField()
    created_by = serializers.StringRelatedField()
    class Meta:
        model = RecruiterCandidateNotes
        fields = '__all__'


class CalenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calender
        fields = '__all__'
        
class GettingCalenderSerializer(serializers.ModelSerializer):
    candidateId = serializers.StringRelatedField()
    addGuest = serializers.StringRelatedField()
    updated_by = serializers.StringRelatedField()
    created_by = serializers.StringRelatedField()
    class Meta:
        model = Calender
        fields = '__all__'


class CoverLeterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoverLetter
        fields = '__all__'
        
class GettingCoverLeterSerializer(serializers.ModelSerializer):
    candidateId = serializers.StringRelatedField()
    class Meta:
        model = CoverLetter
        fields = '__all__'

 
        
    

          
        
