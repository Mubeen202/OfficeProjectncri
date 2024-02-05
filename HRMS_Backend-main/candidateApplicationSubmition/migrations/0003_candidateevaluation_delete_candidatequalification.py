# Generated by Django 4.1.3 on 2023-02-06 07:22

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('candidateApplicationSubmition', '0002_alter_candidatecertificates_candidateid_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CandidateEvaluation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('Recomendations', models.CharField(blank=True, max_length=200, null=True)),
                ('overAllScore', models.CharField(blank=True, max_length=200, null=True)),
                ('overAllComments', models.CharField(blank=True, max_length=2000, null=True)),
                ('toDate', models.DateTimeField()),
                ('fromDate', models.DateTimeField()),
                ('status', models.BooleanField(default=True)),
                ('candidateRelatedJob', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='candidateRelatedJob', to='candidateApplicationSubmition.candidaterelatedjob')),
            ],
        ),
        migrations.DeleteModel(
            name='CandidateQualification',
        ),
    ]
