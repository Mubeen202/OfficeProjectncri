# Generated by Django 4.1.3 on 2022-11-24 05:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_userroles_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userroles',
            name='userId',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userroles', to=settings.AUTH_USER_MODEL),
        ),
    ]