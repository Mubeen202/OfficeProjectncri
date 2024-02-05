# Generated by Django 4.1.3 on 2023-02-01 07:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CareerContent',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=200, unique=True)),
                ('details', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='CareerJobs',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('contactNumber', models.CharField(blank=True, max_length=200, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Email Address')),
                ('dateOpened', models.DateField()),
                ('jobStatus', models.CharField(blank=True, max_length=200, null=True)),
                ('jobType', models.CharField(blank=True, max_length=200, null=True)),
                ('workExperience', models.CharField(blank=True, max_length=200, null=True)),
                ('skillSet', models.CharField(blank=True, max_length=200, null=True)),
                ('salary', models.CharField(blank=True, max_length=200, null=True)),
                ('location', models.CharField(blank=True, max_length=200, null=True)),
                ('country', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('logo', models.CharField(blank=True, max_length=200, null=True)),
                ('postalCode', models.CharField(blank=True, max_length=200, null=True)),
                ('noOfJobOpening', models.PositiveIntegerField(default=0)),
                ('description', models.CharField(blank=True, max_length=5000, null=True)),
                ('requirments', models.CharField(blank=True, max_length=5000, null=True)),
                ('jobSummry', models.CharField(blank=True, max_length=2000, null=True)),
                ('views', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('accountManager', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='accountManager', to=settings.AUTH_USER_MODEL)),
                ('assignRecruiter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assignRecruiter', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CompanyInformation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200, unique=True)),
                ('code', models.CharField(max_length=200)),
                ('createdDateTime', models.DateTimeField(auto_now_add=True)),
                ('updatedDateTime', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='JobQuestions',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=200)),
                ('question', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='jobQuestion_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='jobQuestion_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Values',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('value', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('questionId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.jobquestions')),
            ],
        ),
        migrations.CreateModel(
            name='TenantInformation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=200, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('accessLevel', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_created', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_updated', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Recruiter',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=200, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recruiter_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recruiter_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='JobRelatedQuestions',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('flag', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='jobRelatedQuestion_creator', to=settings.AUTH_USER_MODEL)),
                ('jobId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.careerjobs')),
                ('questionId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.jobquestions')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='jobRelatedQuestion_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ExternalAgency',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('companyId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='externalCompany', to='careerJobs.companyinformation')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assignee', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Departments',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200, unique=True)),
                ('code', models.CharField(max_length=200, unique=True)),
                ('location', models.CharField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('companyId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='department_comp', to='careerJobs.companyinformation')),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='department_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='department_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='companyinformation',
            name='tenantId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='companyInformation', to='careerJobs.tenantinformation'),
        ),
        migrations.AddField(
            model_name='companyinformation',
            name='updated_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='updated_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='careerjobs',
            name='companyName',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.companyinformation'),
        ),
        migrations.AddField(
            model_name='careerjobs',
            name='created_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='careerjobs_creator', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='careerjobs',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.departments'),
        ),
        migrations.AddField(
            model_name='careerjobs',
            name='updated_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='careerjobs_updator', to=settings.AUTH_USER_MODEL),
        ),
    ]