# admin.py

from django.contrib.admin import AdminSite

class CustomAdminSite(AdminSite):
    site_header = 'Custom Admin'

custom_admin_site = CustomAdminSite(name='custom_admin')

# Register your models with the custom admin site
# custom_admin_site.register(MyModel)
