# Generated by Django 4.1.3 on 2023-02-01 07:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('careerJobs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CandidateAppSubmit',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('firstName', models.CharField(max_length=200)),
                ('lastName', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, verbose_name='Email Address')),
                ('lastOrganization', models.CharField(max_length=2000)),
                ('phoneNumber', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=2000)),
                ('state', models.CharField(max_length=200)),
                ('zipCode', models.CharField(max_length=200)),
                ('country', models.CharField(max_length=200)),
                ('language', models.CharField(max_length=200)),
                ('currentSalary', models.PositiveIntegerField(default=0)),
                ('expectedSalary', models.PositiveIntegerField(default=0)),
                ('uploadResume', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidate_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidate_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CandidateCertificates',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('certificateName', models.CharField(blank=True, max_length=200, null=True)),
                ('certificateType', models.CharField(blank=True, max_length=200, null=True)),
                ('descriptions', models.CharField(blank=True, max_length=2000, null=True)),
                ('toDate', models.DateTimeField()),
                ('fromDate', models.DateTimeField()),
                ('status', models.BooleanField(default=True)),
                ('candidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
            ],
        ),
        migrations.CreateModel(
            name='CandidateEducations',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('degreeName', models.CharField(blank=True, max_length=200, null=True)),
                ('educationType', models.CharField(blank=True, max_length=200, null=True)),
                ('descriptions', models.CharField(blank=True, max_length=2000, null=True)),
                ('toDate', models.DateTimeField()),
                ('fromDate', models.DateTimeField()),
                ('status', models.BooleanField(default=True)),
                ('candidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
            ],
        ),
        migrations.CreateModel(
            name='CandidateExperience',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('position', models.CharField(blank=True, max_length=200, null=True)),
                ('descriptions', models.CharField(blank=True, max_length=2000, null=True)),
                ('toDate', models.DateTimeField()),
                ('fromDate', models.DateTimeField()),
                ('status', models.BooleanField(default=True)),
                ('candidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
            ],
        ),
        migrations.CreateModel(
            name='CommonValues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=200)),
                ('value', models.CharField(max_length=200)),
                ('seqNo', models.CharField(max_length=200)),
                ('isSetDefault', models.BooleanField(default=True)),
                ('isProgramaticallyUsed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('isActive', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='RecruiterCandidateNotes',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('notes', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('candidateId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notes_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notes_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CoverLetter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('descriptions', models.CharField(blank=True, max_length=200, null=True)),
                ('file', models.FileField(blank=True, null=True, upload_to='media/')),
                ('candidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
            ],
        ),
        migrations.CreateModel(
            name='CandidateRelatedJob',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('canidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
                ('careerJob', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='candidateApplyToThisJob', to='careerJobs.careerjobs')),
            ],
        ),
        migrations.CreateModel(
            name='CandidateQualification',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(blank=True, max_length=200, null=True)),
                ('candidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
                ('certificateId', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidatecertificates')),
                ('educationId', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateeducations')),
                ('experienceId', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateexperience')),
            ],
        ),
        migrations.AddField(
            model_name='candidateexperience',
            name='organizationId',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.organization'),
        ),
        migrations.CreateModel(
            name='Calender',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('lable', models.CharField(max_length=200)),
                ('descriptions', models.CharField(max_length=500)),
                ('eventUrl', models.CharField(max_length=500)),
                ('location', models.CharField(max_length=200)),
                ('startDate', models.DateTimeField()),
                ('endDate', models.DateTimeField()),
                ('startTime', models.TimeField(auto_now_add=True)),
                ('endTime', models.TimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('addGuest', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recruiter_user', to=settings.AUTH_USER_MODEL)),
                ('candidateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidateappsubmit')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='calender_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='calender_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('answerOfQues', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('candidateRelatedJob', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='candidateApplicationSubmition.candidaterelatedjob')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='careerJobs.jobquestions')),
            ],
        ),
    ]
