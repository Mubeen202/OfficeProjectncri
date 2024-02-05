import uuid
from typing import Dict, Optional
from django.utils import timezone

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken


class UserManager(BaseUserManager):  # type: ignore
    """UserManager class."""

    # type: ignore
    def create_user(self, username: str, email: str, full_name: str,password: Optional[str] = None) -> 'User':
        """Create and return a `User` with an email, username and password."""
        
        print('this is running for register')
        if username is None:
            raise TypeError('Users must have a username.')
        if full_name is None:
            raise TypeError('Users must have a full name.')
        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email), full_name=full_name)
        
        user.set_password(password)
        user.save()
        print('ddddd', user.password)

        return user

    def create_superuser(self, username: str, email: str,full_name: str, password: str, ) -> 'User':  # type: ignore
        """Create and return a `User` with superuser (admin) permissions."""
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email,full_name, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bio = models.TextField(null=True)
    full_name = models.CharField(db_index=True, max_length=200, null=True)
    birth_date = models.DateField(null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','full_name']
    
    def __str__(self) -> str:
        return self.full_name
    objects = UserManager()
    
    @property
    def usersRoles(self):
        return self.userroles_set.all()
    @property
    def tokens(self) -> Dict[str, str]:
        """Allow us to get a user's token by calling `user.token`."""
        refresh = RefreshToken.for_user(self)
        return {'refresh': str(refresh), 'access': str(refresh.access_token)}
    def get_full_name(self) -> str:
        """Return the full name of the user."""
        return self.full_name
    def get_short_name(self) -> str:
        """Return user username."""
        return self.username
    
    
    
    


class Roles(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, null=True, related_name='role_created', on_delete=models.CASCADE )
    updated_by = models.ForeignKey(User, null=True, related_name='role_updated', on_delete=models.CASCADE )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(editable=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.name

 
class UserRoles(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    userId = models.ForeignKey(User, null=True,   on_delete=models.CASCADE)
    roleId = models.ForeignKey(Roles, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, null=True, related_name='user_role_created', on_delete=models.CASCADE )
    updated_by = models.ForeignKey(User, null=True, related_name='user_role_updated', on_delete=models.CASCADE )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)
    
    def __str__(self) -> str:
        return self.roleId
 
 
    