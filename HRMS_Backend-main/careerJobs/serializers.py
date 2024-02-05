from rest_framework import serializers

from candidateApplicationSubmition.serializers import *

from .models import *
from json import JSONEncoder
from uuid import UUID
import copy

old_default = JSONEncoder.default


    

class CompanyInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInformation
        fields = '__all__' 
        
class GettingCompanyInformationSerializer(serializers.ModelSerializer):
    created_by=serializers.StringRelatedField(read_only =True)
    updated_by=serializers.StringRelatedField(read_only =True)
    tenantId = serializers.StringRelatedField(read_only =True)
    class Meta:
        model = CompanyInformation
        fields = '__all__' 
class ExternalAgencySerializer(serializers.ModelSerializer):
    # created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = ExternalAgency
        fields = '__all__' 
class GettingExternalAgencySerializer(serializers.ModelSerializer):
    comapanyId= serializers.StringRelatedField()
    # created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    class Meta:
        model = ExternalAgency
        fields = '__all__'       

class TenantInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantInformation
        fields = '__all__' 
        
class GettingTenantInformationSerializer(serializers.ModelSerializer):
    updated_by=serializers.StringRelatedField()
    created_by=serializers.StringRelatedField()
    class Meta:
        model = TenantInformation
        fields = '__all__'  

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Departments
        fields = '__all__'
        
class GettingDepartmentSerializer(serializers.ModelSerializer):
    updated_by=serializers.StringRelatedField()
    created_by=serializers.StringRelatedField()
    companyId=serializers.StringRelatedField()
    class Meta:
        model = Departments
        fields = '__all__'
        
# class RecruiterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Recruiter 
#         fields = '__all__'

# class GettingRecruiterSerializer(serializers.ModelSerializer):
#     updated_by=serializers.StringRelatedField()
#     created_by=serializers.StringRelatedField()
#     class Meta:
#         model = Recruiter
#         fields = '__all__'  

# class AccountManagerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AccountManager
#         fields = '__all__'
        
class CareerContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerContent
        fields = '__all__'

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobQuestions
        fields = '__all__'
        

        

class CheckboxValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Values
        fields = '__all__'
 
class checkboxQuestionsSerializer(serializers.ModelSerializer):
    checkboxValues= CheckboxValuesSerializer(many=True)
    class Meta:
        model = JobQuestions
        fields = '__all__'
        
    def create(self, validated_data):
        checkboxValues = validated_data.pop('checkboxValues')
        questionId = JobQuestions.objects.create(**validated_data)
        def new_default(self, obj):
            if isinstance(obj, UUID):
                return str(obj)
            return old_default(self, obj)
        JSONEncoder.default = new_default
        for values in checkboxValues:
            Values.objects.create( **values, questionId=questionId)
        return questionId
    
    def update(self, instance, validated_data):
        checkboxValues = validated_data.pop('checkboxValues')
        instance.type = validated_data.get("type", instance.type)
        instance.question = validated_data.get("question", instance.question)
        instance.save()
        keep_values = []
        for value in checkboxValues:
            if "id" in value.keys():
                if Values.objects.filter(id=value["id"]).exists():
                    c = Values.objects.get(id=value["id"])
                    c.value = value.get('value', c.value)
                    c.save()
                    keep_values.append(c.id)
                else:
                    continue
            else:
                def new_default(self, obj):
                    if isinstance(obj, UUID):
                        return str(obj)
                    return old_default(self, obj)
                JSONEncoder.default = new_default
                c = Values.objects.create(**value, questionId=instance)
                keep_values.append(c.id)
        for value in instance.checkboxValues:
            if value.id not in keep_values:
                value.delete()

        return instance
     
    
               
class QuestionsSerializerCheckbox(serializers.ModelSerializer):
    values = CheckboxValuesSerializer(many= True)
    values = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='value',
    )
    class Meta:
        model = JobQuestions
        fields = '__all__'


class CareerJobRelatedQuestions(serializers.ModelSerializer):
    class Meta:
        model = JobRelatedQuestions
        fields = '__all__'
        
        
class CareerJobRelatedQuestionsFetching(serializers.ModelSerializer):
    jobId = serializers.StringRelatedField()
    questionId = QuestionsSerializerCheckbox( many=False, read_only=True)
    
    class Meta:
        model = JobRelatedQuestions
        fields = '__all__'
        # read_only_fields =('questionId', 'jobquestions_set')
        
class FactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factors
        fields = '__all__'
        
class CareerJobRelatedFactor(serializers.ModelSerializer):
    class Meta:
        model = JobRelatedFactors
        fields = '__all__'
        
        
class CareerJobRelatedFactorFetching(serializers.ModelSerializer):
    jobId = serializers.StringRelatedField()
    factorId = FactorSerializer( many=False, read_only=True)
    class Meta:
        model = JobRelatedFactors
        fields = '__all__'
        # read_only_fields =('questionId', 'jobquestions_set')

class CareerJobsPublishSerializer(serializers.ModelSerializer):
    accountManager_attribute = serializers.CharField(source='accountManager.my_attribute', allow_null=True, required=False)
    assignRecruiter_attribute = serializers.CharField(source='assignRecruiter.my_attribute', allow_null=True, required=False)
    
    class Meta:
        model = CareerJobs
        fields = '__all__'
        
class StatsJobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerJobs
        fields = '__all__'
        
class CareerJobsCreationDemoSerializer(serializers.ModelSerializer):
    jobsQuestions = CareerJobRelatedQuestions(many=True)
    jobsFactorsQuestions = CareerJobRelatedFactor(many=True)
    class Meta:
        model = CareerJobs
        fields = '__all__'
        
    def create(self, validated_data):
        jobsQuestions = validated_data.pop('jobsQuestions')
        jobsFactorsQuestions = validated_data.pop('jobsFactorsQuestions')
        jobId = CareerJobs.objects.create(**validated_data)
        def new_default(self, obj):
            if isinstance(obj, UUID):
                return str(obj)
            return old_default(self, obj)
        JSONEncoder.default = new_default
        for jobQuestion in jobsQuestions:
            JobRelatedQuestions.objects.create( **jobQuestion, jobId=jobId)
        for jobsFactorsQuestion in jobsFactorsQuestions:
            JobRelatedFactors.objects.create( **jobsFactorsQuestion, jobId=jobId)
            
        return jobId
    
    def update(self, instance, validated_data):
        jobsQuestions = validated_data.pop('jobsQuestions')
        jobsFactorsQuestions = validated_data.pop('jobsFactorsQuestions')
        instance.accountManager = validated_data.get("accountManager", instance.accountManager)
        instance.assignRecruiter = validated_data.get("assignRecruiter", instance.assignRecruiter)
        instance.city = validated_data.get("city", instance.city)
        instance.companyName = validated_data.get("companyName", instance.companyName)
        instance.contactNumber = validated_data.get("contactNumber", instance.contactNumber)
        instance.country = validated_data.get("country", instance.country)
        instance.created_by = validated_data.get("created_by", instance.created_by)
        instance.dateOpened = validated_data.get("dateOpened", instance.dateOpened)
        instance.department = validated_data.get("department", instance.department)
        instance.description = validated_data.get("description", instance.description)
        instance.email = validated_data.get("email", instance.email)
        instance.isActive = validated_data.get("isActive", instance.isActive)
        instance.job_status = validated_data.get("job_status", instance.job_status)
        instance.jobSummry = validated_data.get("jobSummry", instance.jobSummry)
        instance.jobType = validated_data.get("jobType", instance.jobType)
        instance.location = validated_data.get("location", instance.location)
        instance.logo = validated_data.get("logo", instance.logo)
        instance.noOfJobOpening = validated_data.get("noOfJobOpening", instance.noOfJobOpening)
        instance.postalCode = validated_data.get("postalCode", instance.postalCode)
        instance.requirments = validated_data.get("requirments", instance.requirments)
        instance.salary = validated_data.get("salary", instance.salary)
        instance.skillSet = validated_data.get("skillSet", instance.skillSet)
        instance.title = validated_data.get("title", instance.title)
        instance.updated_by = validated_data.get("updated_by", instance.updated_by)
        instance.workExperience = validated_data.get("workExperience", instance.workExperience)
        instance.save()
        keep_jobRelatedQuestions = []
        keep_jobsFactorsQuestions = []
        for question in jobsQuestions:
            if "id" in question.keys():
                if JobRelatedQuestions.objects.filter(id=question["id"]).exists():
                    c = JobRelatedQuestions.objects.get(id=question["id"])
                    c.questionId = question.get('questionId', c.questionId)
                    c.save()
                    keep_jobRelatedQuestions.append(c.id)
                else:
                    continue
            else:
                def new_default(self, obj):
                    if isinstance(obj, UUID):
                        return str(obj)
                    return old_default(self, obj)
                JSONEncoder.default = new_default
                c = JobRelatedQuestions.objects.create(**question, jobId=instance)
                keep_jobRelatedQuestions.append(c.id)
        for job in instance.jobsQuestions:
            if job.id not in keep_jobRelatedQuestions:
                job.delete()

        for factor in jobsFactorsQuestions :
            if "id" in factor.keys():
                if JobRelatedFactors.objects.filter(id=factor["id"]).exists():
                    c = JobRelatedFactors.objects.get(id=factor["id"])
                    c.factorId = factor.get('factorId', c.factorId)
                    c.save()
                    keep_jobsFactorsQuestions.append(c.id)
                else:
                    continue
            else:
                def new_default(self, obj):
                    if isinstance(obj, UUID):
                        return str(obj)
                    return old_default(self, obj)
                JSONEncoder.default = new_default
                c = JobRelatedFactors.objects.create(**factor, jobId=instance)
                keep_jobsFactorsQuestions.append(c.id)
        # for job in instance.jobsFactorsQuestions:
        #     if job.id not in keep_jobsFactorsQuestions:
        #         job.delete()

        return instance
  

  
    
class CareerJobsSerializer(serializers.ModelSerializer):
    companyName = serializers.StringRelatedField()
    department = serializers.StringRelatedField()
    accountManager = serializers.StringRelatedField()
    assignRecruiter = serializers.StringRelatedField()
    updated_by=serializers.StringRelatedField()
    created_by=serializers.StringRelatedField()
    class Meta:
        model = CareerJobs 
        fields = '__all__'


class CareerJobsSerializerFetchById(serializers.ModelSerializer):
    companyName = serializers.StringRelatedField()
    department = serializers.StringRelatedField()
    accountManager = serializers.StringRelatedField()
    assignRecruiter = serializers.StringRelatedField()
    jobsQuestions = CareerJobRelatedQuestionsFetching(many = True)
    updated_by=serializers.StringRelatedField()
    created_by=serializers.StringRelatedField()
   
    class Meta:
        model = CareerJobs 
        fields = '__all__'
        depth = 1



class CareerJobsSerializerFetchByIdForCreator(serializers.ModelSerializer):
    companyName = serializers.StringRelatedField()
    department = serializers.StringRelatedField()
    accountManager = serializers.StringRelatedField()
    assignRecruiter = serializers.StringRelatedField()
    jobsQuestions = CareerJobRelatedQuestionsFetching(many = True)
    jobsFactorsQuestions= CareerJobRelatedFactorFetching(many = True)
    updated_by=serializers.StringRelatedField()
    created_by=serializers.StringRelatedField()
    # jobsQuestions = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='questionId',
    # )
    candidateApplyToThisJob = FetchCandidateAppSubmitSerializer(many=True)
    # candidateRelatedFactors = CandidateEvaluationSerializer(many=True)

    

    # candidateApplyToThisJob = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='email',
    # )
   
    class Meta:
        model = CareerJobs 
        fields = '__all__'
        
