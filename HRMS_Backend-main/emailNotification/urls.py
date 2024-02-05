from django.urls import path

# from middleware.Authorization import Authorized

from .views import *
urlpatterns = [
   
  path('send',
         EmailSerializerViewSet.as_view(
        {
        'post': 'sendEmail',
    })),
  path('emailDraft',
         EmailSerializerViewSet.as_view(
        {
        'post': 'draftEmail',
    })),
  path('emailDraftSent',
         EmailSerializerViewSet.as_view(
        {
        'put': 'draftEmailSent',
    })),
   path('getEmailDetails',
         EmailSerializerViewSet.as_view(
        {
        'post': 'list',
    })),
   path('getDraftEmailDetails',
         EmailSerializerViewSet.as_view(
        {
        'post': 'draftList',
    }))
    
]