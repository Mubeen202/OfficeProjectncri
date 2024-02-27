from django.urls import path, include, re_path
from django.views.static import serve
from django.conf import settings
# from rest_framework_swagger.views import get_swagger_view
from django.contrib import admin
# schema_view = get_swagger_view(title="Swagger Docs For Hrms")
urlpatterns = [
    # re_path(r'^$', schema_view),
    path('admin/',admin.site.urls),
    path('',include('emailNotification.urls')),
    path('api/',include('careerJobs.urls')),
    path('user/', include('accounts.urls', namespace='accounts')),
    path('file/', include('fileUpload.urls')),
    path('', include('candidateDropCv.urls')),
    path('', include('candidateApplicationSubmition.urls')),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}), 
    
]
