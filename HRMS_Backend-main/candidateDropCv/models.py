from django.db import models
import uuid


class CandidateDropCv(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    linkedInUrl = models.CharField(max_length=2000)
    socialUrl = models.CharField(max_length=2000)
    resumeUpload = models.CharField(max_length=200)
    coverLetter = models.CharField(max_length=200)
    isActive = models.BooleanField(default=True)


