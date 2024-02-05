from django.db import models
from accounts.models import User
import uuid
from django.db.models import CharField
from django_mysql.models import ListCharField
from candidateApplicationSubmition.models import *
# Create your models here.



class CandidateEmail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    #recruiter name
    name = models.ForeignKey(User, null=True, related_name='email_consultant', on_delete=models.CASCADE)
    #candidate email
    email = ListCharField(
        base_field=CharField(max_length=10),
        size=6,
        max_length=(6 * 11),  # 6 * 10 character nominals, plus commas
    )
    #candidate id 
    candidateId = models.ForeignKey(CandidateAppSubmit, null=False,  on_delete=models.CASCADE)
    #subject
    subject = models.CharField(max_length=50, null=True)
    #describtions
    describe = models.TextField(blank=True, null=True)
    #attached file
    file = models.FileField(blank=True, null=True, upload_to='media/')
    isSent =  models.BooleanField(default=False)
    created_by = models.DateTimeField(auto_now_add=True)
    updated_by = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Consult'
