# Generated by Django 4.1.3 on 2023-02-01 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careerJobs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobquestions',
            name='isActive',
            field=models.BooleanField(default=False),
        ),
    ]