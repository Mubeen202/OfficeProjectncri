from django.urls import path

from .views import *

urlpatterns = [
    #************COMMON VALUES*****************
    path('commonValues', CommonValuesSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingCommonValues', CommonValuesSerializerViewSet.as_view({
        'post': 'list',
    })),
    path('common/<str:pk>', CommonValuesSerializerViewSet.as_view({
        'get': 'retrieve'
    })),
    
    #************CANDIDATE EDUCATION*****************
    
    path('candidateEducation', CandidateEducationSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingCandidateEducation', CandidateEducationSerializerViewSet.as_view({
        'post': 'list',
    })),
    path('candidateEducation/<str:pk>', CandidateEducationSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete':'destroy'
    })),
    
    
     #************CANDIDATE EXPERIENCE*****************
    
    path('candidateExperience', CandidateExperienceSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingCandidateExperience', CandidateExperienceSerializerViewSet.as_view({
        'post': 'list',
    })),
    path('candidateExperience/<str:pk>', CandidateExperienceSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete':'destroy'
    })),
    
    
     #************CANDIDATE CERTIFICATION*****************
    
    path('candidateCertification', CandidateCertificationSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingcandidateCertification', CandidateCertificationSerializerViewSet.as_view({
        'post': 'list',
    })),
    path('candidateCertification/<str:pk>', CandidateCertificationSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete':'destroy'
    })),
    
 
    #************ORGANIZATION*****************
    path('organization',
         OrganizationSerializerViewSet.as_view(
        {
        'get': 'list',
        'post': 'create'
    })),
    path('organization/<str:pk>', OrganizationSerializerViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    
    
    #************CANDIDATE NOTES*****************
    
     path('recruiterNotes', RecruiterCandidateNotesSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingRecruiterNotes', RecruiterCandidateNotesSerializerViewSet.as_view({
        'post': 'list',
    })),
    path('recruiterNotes/<str:pk>', RecruiterCandidateNotesSerializerViewSet.as_view({
        'put': 'update',
        'delete':'destroy'
    })),
    
    #************CANDIDATE CALENDER*****************
    path('calender', CalenderSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingCalenderRecords', CalenderSerializerViewSet.as_view({
        'post': 'list',
    })),
    path('calender/<str:pk>', CalenderSerializerViewSet.as_view({
        'put': 'update',
        'delete':'destroy'
    })),
    
    #************CANDIDATE COVER LETTER*****************
     path('coverLetter', CoverLetterSerializerViewSet.as_view({
        'post': 'create'
    })),
    path('gettingCoverLetter', CoverLetterSerializerViewSet.as_view({
        'post': 'list',
    })),
   
    
    #************CANDIDATE*****************
    path('candidate', CandidateSerializerViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    
     path('candidateAndJob', CandidateSerializerViewSet.as_view({
       
        'post': 'linkCandidateToJob'
    })),
  
    path('candidate/<str:pk>', CandidateSerializerViewSet.as_view({
        'get': 'retrieve',
    })),
    
    
  #************CREATE CANDIDATE THROUGH PORTAL*****************
  path('createCandidateThroughPortal', CandidateSerializerFromCandidatePortalViewSet.as_view({
        
        'post': 'createCandidateOnPortal'
    })),
    
#************CANDIDATE REALTED JOB AND SUBMIT ANSWERS THROUGH PORTAL*****************
  
    path('candidateLinkToJobThroughPortal', CandidateSerializerFromCandidatePortalViewSet.as_view({
        'post': 'candidateLinkToJob',
    })),
  
  
  
  
  #************CANDIDATE REALTED JOB AND SUBMIT ANSWERS*****************
    path('candidateLinkToJob', CandidateRelatedJobSerializerViewSet.as_view({
            'get': 'list',
            'post': 'create'
        })),
  
    path('candidateLinkToJob/<str:pk>', CandidateRelatedJobSerializerViewSet.as_view({
        'get': 'retrieve',
    })),

 #************CANDIDATE EVAUALTION AGAINST JOB AND ANSWERS*****************
    path('candidateEvaluation', CandidateRelatedEvaluationSerializerViewSet.as_view({
            'get': 'list',
            'post': 'create'
        })),
  
    path('candidateEvaluation/<str:pk>', CandidateRelatedEvaluationSerializerViewSet.as_view({
        'get': 'retrieve',
    })),
    
    
    #************CANDIDATE SUBMIT ANSWER TO REALTED JOB*****************
     path('candidateSubmitAnswer', CandidateApplicationSubmitAnswerSerializerViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('candidateSubmitAnswer/<str:pk>', CandidateApplicationSubmitAnswerSerializerViewSet.as_view({
        'get': 'retrieve',
    }))
    
]