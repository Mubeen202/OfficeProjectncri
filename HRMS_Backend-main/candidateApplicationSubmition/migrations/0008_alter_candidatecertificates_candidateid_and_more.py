# Generated by Django 4.1.3 on 2023-04-04 22:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('candidateApplicationSubmition', '0007_candidateeducations_institutionname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidatecertificates',
            name='candidateId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidateCertificates', to='candidateApplicationSubmition.candidateappsubmit'),
        ),
        migrations.AlterField(
            model_name='candidateeducations',
            name='candidateId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidateEducation', to='candidateApplicationSubmition.candidateappsubmit'),
        ),
        migrations.AlterField(
            model_name='candidateevaluation',
            name='candidateRelatedJob',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidateRealtedFactors', to='candidateApplicationSubmition.candidaterelatedjob'),
        ),
        migrations.AlterField(
            model_name='candidateexperience',
            name='candidateId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='candidateExperience', to='candidateApplicationSubmition.candidateappsubmit'),
        ),
        migrations.AlterField(
            model_name='candidateexperience',
            name='organizationId',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
