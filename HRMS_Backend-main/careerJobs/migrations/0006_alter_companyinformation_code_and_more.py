# Generated by Django 4.1.3 on 2023-02-17 10:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careerJobs', '0005_alter_jobrelatedfactors_jobid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyinformation',
            name='code',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='companyinformation',
            name='updatedDateTime',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='tenantinformation',
            name='updated_at',
            field=models.DateTimeField(),
        ),
    ]
