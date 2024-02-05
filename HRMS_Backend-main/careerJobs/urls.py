from django.urls import path

# from middleware.Authorization import Authorized

from .views import *
urlpatterns = [
    path('allJobs',
         AllCareerJobsSerializerViewSet.as_view(
        {
        'get': 'list',
    })),
    path('allJobsCandidatePortal',
         AllCareerJobsSerializerViewSet.as_view(
        {
        'get': 'listCandidatePortal',
    })),
    path('getJobById/<str:pk>',
         AllCareerJobsSerializerViewSet.as_view(
        {
        'get': 'retrieve',
    })),
    path('jobs',
         CareerJobsSerializerViewSet.as_view(
        {
        'post': 'create',
    })),
    path('job/<str:pk>', CareerJobsSerializerViewSet.as_view({
        'put': 'update',
        'delete': 'destroy'
    })),
    
     path('jobPublish/<str:pk>', CareerJobsSerializerViewSet.as_view({
        'put': 'publish'
    })),
     path('jobGetById/<str:pk>', CareerJobsSerializerViewSet.as_view({
        'get': 'creatorReterive',
    })),
    
    
    
    path('company',
         CompanyInformationViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('company/<str:pk>', CompanyInformationViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
     path('tenantInformation',
         TenantInformationViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('tenantInformation/<str:pk>', TenantInformationViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('externalAgency',
         ExternalAgencyViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('externalAgency/<str:pk>', ExternalAgencyViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    
    path('department',
         DepartmentSerializerViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    
    path('departmentRecords',
         DepartmentSerializerViewSet.as_view(
        {
        'get': 'listValues',
    })),
    path('department/<str:pk>', DepartmentSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    
    # path('recruiter',
    #      RecruiterSerializerViewSet.as_view(
    #     {
    #     'get': 'list',
    #     'post': 'create'
    # })),
    # path('recruiter/<str:pk>', RecruiterSerializerViewSet.as_view({
    #     'get': 'retrieve',
    #     'put': 'update',
    #     'delete': 'destroy'
    # })),
    
    # path('accountManager',
    #      AccountManagerSerializerViewSet.as_view(
    #     {
    #     'get': 'list',
    #     'post': 'create'
    # })),
    # path('accountManager/<str:pk>', AccountManagerSerializerViewSet.as_view({
    #     'get': 'retrieve',
    #     'put': 'update',
    #     'delete': 'destroy'
    # })),
    path('careerContent',
         CareerContentSerializerViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('careerContent/<str:pk>', CareerContentSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('questions',
         QuestionsSerializerViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('checkboxQuestion',
         QuestionsSerializerViewSet.as_view(
        {
        
        'post': 'createCheckBoxQuestion'
    })),
      path('checkboxQuestion/<str:pk>', QuestionsSerializerViewSet.as_view({
        'put': 'updateCheckBoxQuestion',
    })),
    path('questions/<str:pk>', QuestionsSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('requiredQuestions/<str:pk>', QuestionsSerializerViewSet.as_view({
        'put': 'requiredQuestion',
    })),
    path('checkbox',
         CheckboxSerializerViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('checkbox/<str:pk>', CheckboxSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
      path('jobRelatedQuestion',JobRelatedQuestionsView.as_view(
        {
        'post': 'create',
        'get': 'list'
    })),
    path('jobRelatedQuestionsByJobId',JobRelatedQuestionsView.as_view(
        {
        'post': 'retrieve'
    })),
    path('jobRelatedQuestionByJobId/<str:pk>', JobRelatedQuestionsView.as_view({
        'put': 'update'
    })),
    
    #**************FACTORS*******************
    path('factor',FactorSerializerViewSet.as_view(
        {
        'post': 'create',
        'get': 'list'
    })),
    
    path('factor/<str:pk>', FactorSerializerViewSet.as_view({
        'put': 'update',
        'get':'retrieve',
        'delete':"destroy"
    })),

     path('jobRelatedFactor',JobRelatedFactorView.as_view(
        {
        'post': 'create',
        'get': 'list'
    })),
    path('jobRelatedFactorByJobId',JobRelatedFactorView.as_view(
        {
        'post': 'retrieve'
    })),
    path('jobRelatedFactorByJobId/<str:pk>', JobRelatedFactorView.as_view({
        'put': 'update',
        'delete':'destroy'
    })),
    path('deleteJobRelatedFactorByJobId', JobRelatedFactorView.as_view({
        
        'put':'destroy'
    })),

  
    
]