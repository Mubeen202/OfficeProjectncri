# Generated by Django 4.1.3 on 2023-04-10 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidateApplicationSubmition', '0010_rename_professionalsummry_candidateappsubmit_professionalsummary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidateappsubmit',
            name='profileImage',
            field=models.CharField(max_length=200, null=True),
        ),
    ]