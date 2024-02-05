from typing import Any, Optional
import datetime
from django.db.models import Q, Count
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import parsers, status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from json import JSONEncoder
from uuid import UUID
import __future__ 
from .models import *
from .renderers import UserJSONRenderer
from .serializers import *
from django.contrib.auth.hashers import make_password
from typing import Tuple, Dict
class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = RegistrationSerializer

    def post(self, request: Request) -> Response:
        """Return user response after a successful registration."""
        user_request = request.data.get('user', {})
       
        serializer = self.serializer_class(data=user_request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RegistrationUserAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserRegistrationSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        """Return user response after a successful registration."""
        user_request = request.data.get('user', {})
        # user_request['__set__created_by']= str(request.user.id)
        # user_request['updated_by']= str(request.user.id)
        # print('jjjj', user_request['created_by'], )
        user_request['password'] = make_password(user_request['password'])
        serializer = self.serializer_class(data=user_request)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if serializer:
            return Response({'message': 'User Created Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in User Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    
    

class UpdateUserByIdAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserRegistrationSerializer
    lookup_url_kwarg = 'id'
    parser_classes = [
        parsers.JSONParser,
        parsers.FormParser,
        parsers.MultiPartParser,
    ]

       
        
    def patch(self, request: Request , pk=None) -> Response:
        """Return user response after a successful registration."""
        clients = User.objects.get(id=pk)
        serializer_data = request.data.get('user', {})
        # serializer = UserRegistrationSerializer(clients, data=serializer_data, partial=True)
        # if serializer.is_valid():
        #     user = serializer.save()
        #     return Response(UserRegistrationSerializer(user).data)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(clients,data=serializer_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request: Request) -> Response:
        """Return user after login."""
        user = request.data.get('user', {})

       
        serializer = self.serializer_class(data=user)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer
    lookup_url_kwarg = 'id'
    parser_classes = [
        parsers.JSONParser,
        parsers.FormParser,
        parsers.MultiPartParser,
    ]

    def get(self, request: Request, *args: Tuple[Any], **kwargs: Dict[str, Any]) -> Response:
        """Get request."""
        serializer = self.serializer_class(request.user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request: Request, *args: Tuple[Any], **kwargs: Dict[str, Any]) -> Response:
        """Patch method."""
        serializer_data = request.data.get('user', {})
        serializer = UserSerializer(request.user, data=serializer_data, partial=True)
        
        

        if serializer.is_valid():
            # old_default = JSONEncoder.default
            # def new_default(self, users):
            #     if isinstance(users, UUID):
            #         return str(users)
            #     return old_default(self, users)
            # JSONEncoder.default = new_default
            user = serializer.save()
            print('jjlkjlkjlk', user)
            

            return Response(UserSerializer(user).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



   

class LogoutAPIView(APIView):
    serializer_class = LogoutSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request) -> Response:
        """Validate token and save."""
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message':'Logged Out Successfully'}, status=status.HTTP_204_NO_CONTENT)

class RolesView(viewsets.ViewSet):
    permission_classes =  (IsAuthenticated ,)
    
    def list(self, request):
        name_contain = request.GET.get('name')
        query = Q()
        if name_contain:
            query &= Q(name__icontains=name_contain)
        client = Roles.objects.all().filter(query).distinct()[:300000]
        serializer = GettingRolesSerializer(client, many=True)
        if serializer:
            return Response({'message':'Roles Fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Roles','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def create(self, request):
        request.data['created_by']=str(request.user.id)
        request.data['created_by']=str(request.user.id)
        request.data['updated_at']=timezone.now()
        serializer = RolesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Role Created Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Roles Creation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        clients = Roles.objects.get(id=pk)
        serializer = GettingRolesSerializer(clients)
        if serializer:
            return Response({'message':'Role  Fetch Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Role ','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, pk=None):
        try:
           clients = Roles.objects.get(id=pk)
           request.data['created_at']=clients.created_at
           request.data['updated_at'] = timezone.now()
           request.data['created_by']=clients.created_by.id
           request.data['updated_by']=str(request.user.id)
           serializer = RolesSerializer(instance=clients, data=request.data)
           serializer.is_valid(raise_exception=True)
           if serializer.is_valid():
               serializer.save()
               return Response({'message':'Role  Updated Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
           else:
               return Response({'message':'Some thing went Wrong in Role  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        
        except:
            return Response({'message':'Some thing went Wrong in Role  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
           clients = Roles.objects.get(id=pk)
           if(clients.isActive == True):
               currentDate = datetime.datetime.today()
               clients.updated_at = currentDate
            #    clients.updated_by=str(request.user.id)
               clients.isActive= False
               clients.save()
                # publish('product_deleted', pk)
               return Response({'message':'Role Deleted Successfully','error':False,'code':200},status=status.HTTP_204_NO_CONTENT)
           else:
                return Response({'message':'Role Already Deleted','error':True,'code':404},status=status.HTTP_204_NO_CONTENT)
        except:
                    return Response({'message':'Role  Deleted Error','error':True,'code':404},status=status.HTTP_204_NO_CONTENT)

class FetchUsers(viewsets.ViewSet):
    permission_classes =  (IsAuthenticated ,)
    def list(self, request):
        username_contain = request.GET.get('username')
        query = Q()
        if username_contain:
            query &= Q(username__icontains=username_contain)
        client = User.objects.all().filter(query,is_staff = False).distinct()[:300000]
        serializer = GettingUserRegistrationSerializer(client, many=True)
        if serializer:
            return Response({'message':'Users Fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Users','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

 
    def retrieve(self, request, pk=None):
        clients = User.objects.get(id=pk)
        serializer = GettingUserRegistrationSerializer(clients)
        if serializer:
            return Response({'message':'User  Fetch Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching User ','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
   

class UserRolesView(viewsets.ViewSet):
    permission_classes =  (IsAuthenticated ,)
    def list(self, request):
        client = UserRoles.objects.all().filter(isActive = True)
        serializer = GettingUserRolesSerializer(client, many=True)
        if serializer:
            return Response({'message':'User Roles Fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching User Roles','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def create(self, request):
        if(UserRoles.objects.filter(userId=request.data['userId'] , roleId=request.data['roleId'])):
            return Response({'message':'Record Already Exists!','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
        request.data['created_by']=str(request.user.id)
        request.data['updated_by']=str(request.user.id)
        request.data['updated_at']=timezone.now()
        serializer = UserRolesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'User Role Created Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in User Roles Creation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request):
       
        clients = UserRoles.objects.all().filter(userId = request.data['userId'], isActive = True)
        serializer = GettingUserRolesSerializer(clients, many=True)
        if serializer:
            return Response({'message':'User Roles  Fetch Successfully','error':False,'code':200,'result':{'totalRecords':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching User Roles ','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, pk=None):
        try:
           clients = UserRoles.objects.get(id=pk)
           request.data['created_at']=clients.created_at
           request.data['updated_at']=timezone.now()
           request.data['created_by']=clients.created_by.id
           request.data['updated_by']=str(request.user.id)
           serializer = UserRolesSerializer(instance=clients, data=request.data)
           serializer.is_valid(raise_exception=True)
           if serializer.is_valid():
               serializer.save()
               return Response({'message':'User Role  Updated Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
           else:
               return Response({'message':'Some thing went Wrong in User Role  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        
        except:
            return Response({'message':'Some thing went Wrong in User Role  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request):
        try:
           user = UserRoles.objects.filter(userId=request.data['userId'])
           for i in user:
               print(i.isActive)
               i.isActive = False
               i.save()
            
           return Response({'message':'User Roles Deleted SuccessFully','error':False,'code':204},status=status.HTTP_204_NO_CONTENT)

           
        except:
            return Response({'message':'Error Role  Deleted Error','error':True,'code':404},status=status.HTTP_400_BAD_REQUEST)


