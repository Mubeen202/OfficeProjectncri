from xmlrpc.client import Boolean
from django.db import models
import uuid
from django.db.models import CharField
from django_mysql.models import ListCharField
from accounts.models import User


class TenantInformation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    accessLevel = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, null=False, related_name='user_created', on_delete=models.CASCADE )
    updated_by = models.ForeignKey(User, null=False,related_name='user_updated', on_delete=models.CASCADE)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField( editable=True)
    isActive = models.BooleanField(default=True)
        
    def __str__(self) -> str:
        return self.name


class CompanyInformation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, unique=True)
    code = models.CharField(max_length=200, unique=True)
    tenantId = models.ForeignKey(TenantInformation, related_name='companyInformation', on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, related_name='created_by', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='updated_by', on_delete=models.CASCADE)
    createdDateTime = models.DateTimeField( auto_now_add = True)
    updatedDateTime= models.DateTimeField(editable=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.name
   

class ExternalAgency(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200)
    companyId = models.ForeignKey(CompanyInformation, related_name='externalCompany', on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, related_name='creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='assignee', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.name

    
class Recruiter(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=200, unique=True)
    created_by = models.ForeignKey(User, null=True, related_name='recruiter_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='recruiter_updator', on_delete=models.CASCADE)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.name
    
class Departments(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, unique=True)
    code = models.CharField(max_length=200, unique=True)
    location = models.CharField(max_length=500)
    companyId = models.ForeignKey(CompanyInformation, related_name='department_comp', on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, related_name='department_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='department_updator', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(editable=True)
    isActive = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name
 
    
class CareerContent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=200, unique=True)
    details = models.CharField(max_length=200)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.type
    

class CareerJobs(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    companyName = models.ForeignKey(CompanyInformation, blank=True,null=True,on_delete=models.CASCADE)
    contactNumber = models.CharField(max_length=200, blank=True,null=True)
    email = models.EmailField('Email Address', blank=True,null=True)
    accountManager = models.ForeignKey(User,blank=True,null=True,related_name="accountManager", on_delete=models.CASCADE)
    assignRecruiter = models.ForeignKey(User,blank=True,null=True, related_name="assignRecruiter", on_delete=models.CASCADE)
    dateOpened = models.DateField()
    draft = models.BooleanField(default=True)
    job_status = models.CharField(max_length=200, blank=True,null=True)
    jobType = models.CharField(max_length=200, blank=True,null=True) #part time , full time 
    workExperience = models.CharField(max_length=200, blank=True,null=True) #part time , full time v
    department = models.ForeignKey(Departments,blank=True,null=True, on_delete=models.CASCADE)    
    skillSet = models.CharField(max_length=200, blank=True,null=True) # marketing, it 
    salary= models.CharField(max_length=200, blank=True,null=True) # marketing, it 
    location= models.CharField(max_length=200, blank=True,null=True) # marketing, it 
    country= models.CharField(max_length=200, blank=True,null=True) # marketing, it 
    city= models.CharField(max_length=200, blank=True,null=True) # marketing, it 
    logo=  models.CharField(max_length=200, blank=True,null=True) # marketing, it  
    postalCode= models.CharField(max_length=200, blank=True,null=True) # marketing, it 
    noOfJobOpening= models.PositiveIntegerField(default=0)
    description = models.CharField(max_length=5000, blank=True,null=True)
    requirments = models.CharField(max_length=5000, blank=True,null=True)
    jobSummry = models.CharField(max_length=2000, blank=True,null=True)
    views = models.PositiveIntegerField(default=0)
    created_by = models.ForeignKey('accounts.User', null=True, related_name='careerjobs_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey('accounts.User', null=True, related_name='careerjobs_updator', on_delete=models.CASCADE)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    @property
    def jobsQuestions(self):
        return self.jobrelatedquestions_set.all()
    def __str__(self) -> str:
        return self.title
    
    
    @property
    def jobsFactorsQuestions(self):
        return self.jobRelatedFactors_set.all()
    def __str__(self) -> str:
        return self.title

 
    
class JobQuestions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=200)
    question = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, null=True, related_name='jobQuestion_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='jobQuestion_updator', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=False)
    
    #first we create property function that can allow create values record from job question table
    @property
    def checkboxValues(self):
        return self.values_set.all()
    
    def __str__(self):
        return  self.question 
    
class JobRelatedQuestions(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    jobId = models.ForeignKey(CareerJobs,null=True,  on_delete=models.CASCADE)
    questionId = models.ForeignKey(JobQuestions, null=True,  on_delete=models.CASCADE)
    flag = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, null=True, related_name='jobRelatedQuestion_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='jobRelatedQuestion_updator', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    def __str__(self):
        return  self.questionId 
    # def __unicode__(self):
    #     return self.type
class Factors(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    sampleQuestion = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, null=True, related_name='factor_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='factor_updator', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    #first we create property function that can allow create values record from job question table
    @property
    def checkboxValues(self):
        return self.values_set.all()
    
    def __str__(self):
        return  self.question 
    

class JobRelatedFactors(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    jobId = models.ForeignKey(CareerJobs, related_name='jobsFactorsQuestions', null=True,  on_delete=models.CASCADE)
    factorId = models.ForeignKey(Factors, null=True,  on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, related_name='jobRelatedFactor_creator', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, null=True, related_name='jobRelatedFactor_updator', on_delete=models.CASCADE)
    created_at= models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    def __str__(self):
        return  self.factorId 
    # def __unicode__(self):
    #     return self.type 
    
class Values(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    questionId = models.ForeignKey(JobQuestions, null=True,on_delete=models.CASCADE) 
    value = models.CharField(max_length=200)
    created_at = models.DateTimeField( auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self):
        return  self.question 
    # def __unicode__(self):
    #     return self.type
    
    
    

