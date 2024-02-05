# Generated by Django 4.1.3 on 2022-11-25 10:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_alter_userroles_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roles',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='userroles',
            name='userId',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
