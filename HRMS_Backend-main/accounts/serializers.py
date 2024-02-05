from django.contrib.auth import authenticate
from rest_framework import exceptions, serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import *
import datetime
from .utils import validate_email as email_is_valid
from json import JSONEncoder
from uuid import UUID
from django.contrib.auth.hashers import make_password

old_default = JSONEncoder.default

class RegistrationSerializer(serializers.ModelSerializer[User]):
    """Serializers registration requests and creates a new user."""

    password = serializers.CharField(max_length=128, min_length=8)

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'bio',
            'full_name',
        ]

    def validate_email(self, value: str) -> str:
        """Normalize and validate email address."""
        valid, error_text = email_is_valid(value)
        if not valid:
            raise serializers.ValidationError(error_text)
        try:
            email_name, domain_part = value.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            value = '@'.join([email_name, domain_part.lower()])

        return value

    def create(self, validated_data):  # type: ignore
        """Return user after creation."""
        user = User.objects.create_user(
            username=validated_data['username'], full_name=validated_data['full_name'], email=validated_data['email'], password=validated_data['password'],
        )
        user.bio = validated_data.get('bio', '')
        # user.full_name = validated_data.get('full_name', '')
        user.save(update_fields=['bio'])
        return user




class LoginSerializer(serializers.ModelSerializer[User]):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):  # type: ignore
        """Get user token."""
        user = User.objects.get(email=obj.email)

        return {'refresh': user.tokens['refresh'], 'access': user.tokens['access']}

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password', 'tokens', 'full_name', 'is_staff']

    def validate(self, data):  # type: ignore
        """Validate and return user login."""
        email = data.get('email', None)
        password = data.get('password', None)
        users = User.objects.filter(email=email).first()
        if email is None:
            raise serializers.ValidationError('An email address is required to log in.')

        if password is None:
            raise serializers.ValidationError('A password is required to log in.')

        user = authenticate(username=email, password=password)

        if users is None:
            raise serializers.ValidationError('Username doesn’t exist. Contact administrator.')
        
        if not users.check_password(password):
            raise serializers.ValidationError('Password is incorrect.')
        if not user.is_active:
            raise serializers.ValidationError('This user is not currently activated.')
        return user


class GettingRolesSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    updated_by= serializers.StringRelatedField()
    class Meta:
        model = Roles
        fields = '__all__'
        
class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'
        
class UserRolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRoles
        fields = '__all__'
        read_only_fields = ('userId',)
        
class GettingUserRolesSerializer(serializers.ModelSerializer):
    userId = serializers.StringRelatedField()
    roleId = RolesSerializer(many=False, read_only=True)
    class Meta:
        model = UserRoles
        fields = '__all__'
        
        

class UserRegistrationSerializer(serializers.ModelSerializer[User]):
    """Serializers registration requests and creates a new user."""

    password = serializers.CharField(max_length=128, min_length=8)
    
    # created_by = serializers.CharField(max_length=128, min_length=8)
    # updated_by = serializers.CharField(max_length=128, min_length=8)
    usersRoles = UserRolesSerializer(many=True)

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'password',
            # 'created_by',
            'bio',
            'full_name',
            
            # 'updated_by',
            'usersRoles'
        ]
        

    def validate_email(self, value: str) -> str:
        """Normalize and validate email address."""
        valid, error_text = email_is_valid(value)
        if not valid:
            raise serializers.ValidationError(error_text)
        try:
            email_name, domain_part = value.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            value = '@'.join([email_name, domain_part.lower()])

        return value

    
   
    def create(self, validated_data):
        
        usersRoles = validated_data.pop('usersRoles')
        # usersRoles.updated_at = datetime.datetime.today()
        userId = User.objects.create(**validated_data)
        def new_default(self, obj):
            if isinstance(obj, UUID):
                return str(obj)
            return old_default(self, obj)
        JSONEncoder.default = new_default
        for role in usersRoles:
            # print('this is runnign  create', role['created_by'])
            # role['updated_at'] = timezone.now()
            UserRoles.objects.create(**role, userId=userId)
        return userId
    
    def update(self, instance, validated_data):
        usersRoles = validated_data.pop('usersRoles')
        # instance.updated_at = validated_data.get("username", timezone.now())
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.full_name = validated_data.get("full_name", instance.full_name)
        # instance.password = validated_data.get(make_password("password"), make_password(instance.password))
        instance.save()
        keep_userRoles = []
        for role in usersRoles:
            if "id" in role.keys():
                if UserRoles.objects.filter(id=role["id"]).exists():
                    c = UserRoles.objects.get(id=role["id"])
                    c.roleId = role.get('roleId', c.roleId)
                    c.save()
                    keep_userRoles.append(c.id)
                else:
                    continue
            else:
                def new_default(self, obj):
                    if isinstance(obj, UUID):
                        return str(obj)
                    return old_default(self, obj)
                JSONEncoder.default = new_default
                c = UserRoles.objects.create(**role, userId=instance)
                keep_userRoles.append(c.id)
        # print('ssssss', vars(instance))
        for role in instance.usersRoles:
            if role.id not in keep_userRoles:
                role.delete()

        return instance
        
class UserSerializer(serializers.ModelSerializer[User]):
    """Handle serialization and deserialization of User objects."""
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'username',
            'password',
            'tokens',
            'bio',
            'full_name',
            'birth_date',
            'is_staff',
            'groups'
            
        )
        read_only_fields = ('tokens', 'is_staff')

    def update(self, instance, validated_data):  # type: ignore
        """Perform an update on a User."""

        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance
    
    
    


class LogoutSerializer(serializers.Serializer[User]):
    refresh = serializers.CharField()

    def validate(self, attrs):  # type: ignore
        """Validate token."""
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):  # type: ignore
        """Validate save backlisted token."""

        try:
            RefreshToken(self.token).blacklist()

        except TokenError as ex:
            raise exceptions.AuthenticationFailed(ex)


class GettingUserRegistrationSerializer(serializers.ModelSerializer[User]):
    """Serializers registration requests and creates a new user."""

    password = serializers.CharField(max_length=128, min_length=8)
    usersRoles = GettingUserRolesSerializer(many=True, read_only=True)
  

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'password',
            # 'tokens',
            # 'bio',
            # 'full_name',
            # 'birth_date',
            # 'is_staff',
            # 'groups'
            'full_name',
            'usersRoles'
        ]

    def validate_email(self, value: str) -> str:
        """Normalize and validate email address."""
        valid, error_text = email_is_valid(value)
        if not valid:
            raise serializers.ValidationError(error_text)
        try:
            email_name, domain_part = value.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            value = '@'.join([email_name, domain_part.lower()])

        return value

    def create(self, validated_data):  # type: ignore
            """Return user after creation."""
            user = User.objects.create_user(
                username=validated_data['username'], full_name=validated_data['full_name'], email=validated_data['email'], password=validated_data['password'],
            )
            user.bio = validated_data.get('bio', '')
            # user.full_name = validated_data.get('full_name', '')
            user.save(update_fields=['bio'])
            return user
    def create(self, validated_data):
        
        usersRoles = validated_data.pop('usersRoles')
        userId = User.objects.create(**validated_data)
        def new_default(self, obj):
            if isinstance(obj, UUID):
                return str(obj)
            return old_default(self, obj)
        JSONEncoder.default = new_default
        for role in usersRoles:
            UserRoles.objects.create(**role, userId=userId)
        return userId
    
    