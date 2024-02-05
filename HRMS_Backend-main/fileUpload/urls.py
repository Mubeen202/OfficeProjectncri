from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


from .views import FileUploadView


urlpatterns = [
    path('file', FileUploadView.as_view({
        'post': 'post'
    })),

    path('file/<str:pk>', FileUploadView.as_view({
        'put': 'put',
        'delete': 'delete'
    }))
    # path('files',  Home)
]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)