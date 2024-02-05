from django.urls import path

from .views import CandidateDropCvViewSet

urlpatterns = [
    path('candidateSubmitApp', CandidateDropCvViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('candidateSubmitApp/<str:pk>', CandidateDropCvViewSet.as_view({
        'get': 'retrieve',
    })),
    
]