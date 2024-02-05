# Generated by Django 4.1.3 on 2023-02-06 07:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('careerJobs', '0002_alter_jobquestions_isactive'),
    ]

    operations = [
        migrations.CreateModel(
            name='Factors',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('sampleQuestion', models.CharField(max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='factor_creator', to=settings.AUTH_USER_MODEL)),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='factor_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='JobRelatedFactors',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('isActive', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='jobRelatedFactor_creator', to=settings.AUTH_USER_MODEL)),
                ('factorId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.factors')),
                ('jobId', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='careerJobs.careerjobs')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='jobRelatedFactor_updator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
