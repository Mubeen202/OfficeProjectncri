from django.db import models
import uuid
# uuidField = uuid.UUID(uuidField)
from django.core.validators import MaxValueValidator, MinValueValidator
from careerJobs.models import *



class CandidateAppSubmit(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False )
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)
    email = models.EmailField('Email Address')
    lastOrganization = models.CharField(max_length=2000)
    phoneNumber = models.CharField(max_length=20)
    address = models.CharField(max_length=2000)
    state = models.CharField(max_length=200)
    zipCode = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    language = models.CharField(max_length=200)
    currentSalary = models.PositiveIntegerField(default=0)
    expectedSalary = models.PositiveIntegerField(default=0)
    profileImage = models.CharField(max_length=200, null=True, blank=True)
    professionalSummary = models.CharField(max_length=2000)
    created_by = models.ForeignKey(User, null=True, related_name='candidate_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='candidate_updator', on_delete=models.CASCADE)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=False)

    def __str__(self):
        return str(self.firstName + ' ' + self.lastName)
   
    # @property
    # def candidateRelatedJobs(self):
    #     return self.candidateRelatedJob_set.all()
    # def __str__(self):
    #     return self.firstName
    
    @property
    def candidateEducation(self):
        return self.candidateEducations_set.all()
    
    @property
    def candidateExperience(self):
        return self.candidateExperience_set.all()
    
    @property
    def candidateCertificates(self):
        return self.candidateCertificates_set.all()
    

 

class CandidateRelatedJob(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    careerJob = models.ForeignKey(CareerJobs, related_name = 'candidateApplyToThisJob', on_delete=models.CASCADE)
    canidateId = models.ForeignKey(CandidateAppSubmit, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.candidateId
    
    @property
    def answers(self):
        return self.answer_set.all()



# class CandidateRelatedJobs(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     careerJob = models.ForeignKey(CareerJobs, related_name = 'candidateApplyToThisJob', on_delete=models.CASCADE)
#     canidateId = models.ForeignKey(CandidateAppSubmit, on_delete=models.CASCADE)
#     created_at = models.DateTimeField( auto_now_add = True)
#     updated_at = models.DateTimeField(auto_now_add=True)
#     isActive = models.BooleanField(default=True)

#     def __str__(self):
#         return self.candidateId
    
#     @property
#     def answers(self):
#         return self.answer_set.all()

class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(JobQuestions , on_delete=models.CASCADE)
    candidateRelatedJob = models.ForeignKey(CandidateRelatedJob, on_delete=models.CASCADE, null=True)
    answerOfQues = models.CharField(max_length=200)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.answerOfQues


class CommonValues(models.Model):
    type = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    value = models.CharField(max_length=200)
    seqNo = models.CharField(max_length=200)
    isSetDefault = models.BooleanField(default=True)
    isProgramaticallyUsed = models.BooleanField(default=False)

    def __str__(self):
        return self.value


class RecruiterCandidateNotes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    candidateId = models.ForeignKey(CandidateAppSubmit, null=True,  on_delete=models.CASCADE)
    notes = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, null=True, related_name='notes_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='notes_updator', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    @property
    def checkboxValues(self):
        return self.values_set.all()
    
    def __str__(self):
        return  self.question 
    
    
    
class Calender(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    lable = models.CharField(max_length=200)
    descriptions = models.CharField(max_length=500)
    eventUrl = models.CharField(max_length=500)
    location = models.CharField(max_length=200)
    startDate= models.DateTimeField( auto_now_add = False)
    endDate = models.DateTimeField(auto_now_add=False)
    startTime = models.TimeField( auto_now_add=True)
    endTime = models.TimeField( auto_now_add=True)
    candidateId = models.ForeignKey(CandidateAppSubmit,  on_delete=models.CASCADE)
    addGuest = models.ForeignKey(User, related_name='recruiter_user', null=True,  on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, related_name='calender_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='calender_updator', on_delete=models.CASCADE)
    isActive = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    @property
    def checkboxValues(self):
        return self.values_set.all()
    
    def __str__(self):
        return  self.question 
 
 
class CoverLetter(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    descriptions = models.CharField(max_length=200, null=True, blank=True)
    candidateId = models.ForeignKey(CandidateAppSubmit,  on_delete=models.CASCADE)
    file = models.FileField(blank=True, null=True, upload_to='media/')
    # isActive = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    def __str__(self):
        return  self.candidateId 
 
 
 
 
 #CANDIDATE EDUCATION MODELS  
 
class Organization(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    isActive = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    def __str__(self):
        return  self.name 
class CandidateCertificates(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    certificateName = models.CharField(max_length=200, null=True, blank=True)
    candidateId = models.ForeignKey(CandidateAppSubmit,null=True,  related_name="candidateCertificates",  on_delete=models.CASCADE)
    certificateType = models.CharField(max_length=200, null=True, blank=True)
    descriptions =  models.CharField(max_length=2000, null=True, blank=True)
    toDate =  models.DateTimeField( auto_now_add = False, blank=False)
    fromDate =  models.DateTimeField( auto_now_add = False, blank=False)
    status = models.BooleanField(default=True) #completed or in progress
    
    #first we create property function that can allow create values record from job question table
    def __str__(self):
        return  self.certificateName


class CandidateExperience(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organizationId = models.CharField(max_length=200, null=True, blank=True)
    candidateId = models.ForeignKey(CandidateAppSubmit, null=True, related_name="candidateExperience", on_delete=models.CASCADE)
    position = models.CharField(max_length=200, null=True, blank=True)
    descriptions =  models.CharField(max_length=2000, null=True, blank=True)
    toDate =  models.DateTimeField( auto_now_add = False, blank=False)
    fromDate =  models.DateTimeField( auto_now_add = False, blank=False)
    status = models.BooleanField(default=True) #completed or in progress
    
    #first we create property function that can allow create values record from job question table
    def __str__(self):
        return  self.certificateName

class CandidateEducations(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    candidateId = models.ForeignKey(CandidateAppSubmit, null=True, related_name="candidateEducation",  on_delete=models.CASCADE)
    degreeName = models.CharField(max_length=200, null=True, blank=True)
    institutionName = models.CharField(max_length=200, null=True, blank=True)
    educationType = models.CharField(max_length=200, null=True, blank=True)
    descriptions =  models.CharField(max_length=2000, null=True, blank=True)
    toDate =  models.DateTimeField( auto_now_add = False, blank=False)
    fromDate =  models.DateTimeField( auto_now_add = False, blank=False)
    status = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    def __str__(self):
        return  self.degreeName
    

    
    
class CandidateEvaluation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    candidateRelatedJob = models.ForeignKey(CandidateRelatedJob, related_name='candidateRealtedFactors',   on_delete=models.CASCADE, null=True)
    Recomendations = models.CharField(max_length=200, null=True, blank=True)
    overAllScore =models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    overAllComments =  models.CharField(max_length=2000, null=True, blank=True)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    def __str__(self):
        return  self.degreeName
    @property
    def factorAnswers(self):
        return self.factoranswer_set.all()


class FactorAnswer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(Factors , on_delete=models.CASCADE)
    candidateEvaluationId = models.ForeignKey(CandidateEvaluation, on_delete=models.CASCADE, null=True)
    answerOfQues = models.CharField(max_length=200)
    score = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.answerOfQues
