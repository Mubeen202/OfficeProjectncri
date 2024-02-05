"""
WSGI config for hrms project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrms.settings')
if __name__ == '__main__':
   django.setup()
application = get_wsgi_application()
