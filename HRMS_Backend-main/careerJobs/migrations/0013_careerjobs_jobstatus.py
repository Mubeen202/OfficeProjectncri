# Generated by Django 4.1.3 on 2023-03-01 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careerJobs', '0012_remove_careerjobs_jobstatus_alter_careerjobs_draft'),
    ]

    operations = [
        migrations.AddField(
            model_name='careerjobs',
            name='jobStatus',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
