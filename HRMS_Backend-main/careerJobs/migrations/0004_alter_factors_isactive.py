# Generated by Django 4.1.3 on 2023-02-07 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('careerJobs', '0003_factors_jobrelatedfactors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='factors',
            name='isActive',
            field=models.BooleanField(default=True),
        ),
    ]