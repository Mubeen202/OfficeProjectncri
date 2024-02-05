from .serializers import *
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from careerJobs.paginate import Paginate
from django.db.models import Q, Count
from django.utils import timezone
# from middleware.Authorization import Authorized
from rest_framework.exceptions import AuthenticationFailed
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import *
import datetime
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticatedOrReadOnly
old_format = '%Y-%m-%dT%H:%M:%S.%fZ'
new_format = '%d-%m-%Y %H:%M:%S'
# import serializers


class CareerJobsSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    def create(self, request):
        request.data['created_by'] = str(request.user.id)
        request.data['updated_by'] = str(request.user.id)
        serializer = CareerJobsCreationDemoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Job Created Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Job Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def creatorReterive(self, request, pk=None):
        careerJob = CareerJobs.objects.get(id=pk)
        if careerJob is None:
            raise AuthenticationFailed('job is not found agianst this id!')
        serializer = CareerJobsSerializerFetchByIdForCreator(careerJob)
        if serializer:
            return Response({'message': 'Job Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Job', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        careerJob = CareerJobs.objects.get(id=pk)
        currentDate = datetime.datetime.today()
        request.data['created_at'] = careerJob.created_at
        request.data['updated_at'] = currentDate
        request.data['created_by'] = careerJob.created_by.id
        request.data['updated_by'] = str(request.user.id)
        serializer = CareerJobsCreationDemoSerializer(instance=careerJob, data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_updated', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Job Updated Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Job Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def publish(self, request, pk=None):
        careerJob = CareerJobs.objects.get(id=pk)
        currentDate = datetime.datetime.today()
        request.data['updated_at'] = currentDate
        request.data['isActive'] = True
        request.data['updated_by'] = str(request.user.id)
        serializer = CareerJobsPublishSerializer(instance=careerJob, data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_updated', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Job Updated Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Job Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        careerJob = CareerJobs.objects.get(id=pk)
        careerJob.isActive = False
        careerJob.save()
        # publish('product_deleted', pk)
        return Response({'message': 'Job Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class AllCareerJobsSerializerViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    def list(self, request):
        title_contain = request.GET.get('title')
        department_contain = request.GET.get('department')
        jobType_contain = request.GET.get('jobType')
        query = Q()
        if title_contain:
            query &= Q(title__icontains=title_contain)
        if department_contain:
            query &= Q(department__name__icontains=department_contain)
        if jobType_contain:
            query &= Q(jobType__icontains=jobType_contain)
            
            
            
        # careerjobs = CareerJobs.objects.all().filter(query, draft=False, isActive=True).distinct()
        careerjobs = CareerJobs.objects.all().filter(query).distinct()
        
        #stats jobs models
        draftJobs = CareerJobs.objects.all().filter(draft= True, isActive=True)
        # draftJobs = CareerJobs.objects.all().filter(updated_by= str(request.user.id), draft= True)
        postedJobs = CareerJobs.objects.all()
        closeJobs = CareerJobs.objects.all().filter(isActive=False)
        activeJobs = CareerJobs.objects.all().filter(draft=False, isActive=True)
        #stats jobs serializers
        draftSerializer = StatsJobsSerializer(draftJobs, many=True)
        postedSerializer = StatsJobsSerializer(postedJobs, many=True)
        closeSerializer = StatsJobsSerializer(closeJobs, many=True)
        activeSerializer = StatsJobsSerializer(activeJobs, many=True)

        serializer = CareerJobsSerializer(careerjobs, many=True)
        

        # questions = CareerJobRelatedQuestions.objects.all().filter(jobId = serializer.data.id)
        if serializer:
            # return Response({
            #     'status':200,
            #     'data':{'careerJobs':serializer.data, 'pagination': data['pagination'] }
            # })
            return Response({'message': 'Career jobs fetch successfully', 'error': False, 'code': 200, 'result': {'postedJobs': len(postedSerializer.data),
                                'draftJobs': len(draftSerializer.data),
                                'closeJobs': len(closeSerializer.data),
                                'activeJobs': len(activeSerializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Career jobs fetching', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
    def listCandidatePortal(self, request):
        title_contain = request.GET.get('title')
        department_contain = request.GET.get('department')
        jobType_contain = request.GET.get('jobType')
        query = Q()
        if title_contain:
            query &= Q(title__icontains=title_contain)
        if department_contain:
            query &= Q(department__name__icontains=department_contain)
        if jobType_contain:
            query &= Q(jobType__icontains=jobType_contain)
            
            
            
        careerjobs = CareerJobs.objects.all().filter(query, draft=False, isActive=True).distinct()
        # careerjobs = CareerJobs.objects.all().filter(query).distinct()
        
        #stats jobs models
        draftJobs = CareerJobs.objects.all().filter(draft= True, isActive=True)
        # draftJobs = CareerJobs.objects.all().filter(updated_by= str(request.user.id), draft= True)
        postedJobs = CareerJobs.objects.all()
        closeJobs = CareerJobs.objects.all().filter(isActive=False)
        activeJobs = CareerJobs.objects.all().filter(draft=False, isActive=True)
        #stats jobs serializers
        draftSerializer = StatsJobsSerializer(draftJobs, many=True)
        postedSerializer = StatsJobsSerializer(postedJobs, many=True)
        closeSerializer = StatsJobsSerializer(closeJobs, many=True)
        activeSerializer = StatsJobsSerializer(activeJobs, many=True)

        serializer = CareerJobsSerializer(careerjobs, many=True)
        

        # questions = CareerJobRelatedQuestions.objects.all().filter(jobId = serializer.data.id)
        if serializer:
            # return Response({
            #     'status':200,
            #     'data':{'careerJobs':serializer.data, 'pagination': data['pagination'] }
            # })
            return Response({'message': 'Career jobs fetch successfully', 'error': False, 'code': 200, 'result': {'postedJobs': len(postedSerializer.data),
                                'draftJobs': len(draftSerializer.data),
                                'closeJobs': len(closeSerializer.data),
                                'activeJobs': len(activeSerializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Career jobs fetching', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        careerJob = CareerJobs.objects.get(id=pk)
        if careerJob is None:
            raise AuthenticationFailed('job is not found agianst this id!')
        serializer = CareerJobsSerializerFetchById(careerJob)
        if serializer:
            return Response({'message': 'Job Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Job', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)



class DepartmentSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        name_contain = request.GET.get('name')
        # companyId_contain = request.GET.get('companyId') 
        # companyId_contain = request.GET.get('companyId')

        query = Q()
        if name_contain:
            query &= Q(name__icontains=name_contain)
        # if companyId_contain:
        #     query &= Q(companyId__icontains=companyId_contain)
        client = Departments.objects.all().filter(query).distinct()[:300000]
        serializer = GettingDepartmentSerializer(client, many=True)
        if serializer:
            return Response({'message': 'Departments Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Departments', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
    def listValues(self, request):
        name_contain = request.GET.get('name')
        # companyId_contain = request.GET.get('companyId') 
        # companyId_contain = request.GET.get('companyId')

        query = Q()
        if name_contain:
            query &= Q(name__icontains=name_contain)
        # if companyId_contain:
        #     query &= Q(companyId__icontains=companyId_contain)
        client = Departments.objects.all().filter(query).distinct()[:300000]
        serializer = DepartmentSerializer(client, many=True)
        if serializer:
            return Response({'message': 'Departments Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Departments', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        request.data['created_by'] = str(request.user.id)
        request.data['updated_by'] = str(request.user.id)
        request.data['updated_at'] = timezone.now()
        serializer = DepartmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Department Created Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Department Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        clients = Departments.objects.get(id=pk)
        serializer = GettingDepartmentSerializer(clients)
        if serializer:
            return Response({'message': 'Company Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Company', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            clients = Departments.objects.get(id=pk)
            request.data['created_at'] = clients.created_at
            request.data['updated_at'] = timezone.now()
            request.data['created_by'] = clients.created_by.id
            request.data['updated_by'] = str(request.user.id)
            serializer = DepartmentSerializer(
                instance=clients, data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Department Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Some thing went Wrong in Department Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Some thing went Wrong in Department Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

        try:
            clients = Departments.objects.get(id=pk)
            if (clients.isActive == True):
                currentDate = datetime.datetime.today()
                clients.updated_at = currentDate
                # clients.updated_by = str(request.user.id)
                clients.isActive = False
                clients.save()
                # publish('product_deleted', pk)
                return Response({'message': 'Department Information Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'Department Information Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'message': 'Client Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class CompanyInformationViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        name_contain = request.GET.get('name')
        code_contain = request.GET.get('code')
        query = Q()
        if name_contain:
            query &= Q(name__icontains=name_contain)
        if code_contain:
            query &= Q(code__icontains=code_contain)
        client = CompanyInformation.objects.all().filter(query).distinct()[:300000]
        serializer = GettingCompanyInformationSerializer(client, many=True)
        if serializer:
            return Response({'message': 'Companies Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Companies', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        request.data['created_by'] = str(request.user.id)
        request.data['updated_by'] = str(request.user.id)
        request.data['updatedDateTime'] = timezone.now()
        serializer = CompanyInformationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Company Created Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Company Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        clients = CompanyInformation.objects.get(id=pk)
        serializer = GettingCompanyInformationSerializer(clients)
        if serializer:
            return Response({'message': 'Company Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Company', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            clients = CompanyInformation.objects.get(id=pk)
            request.data['createdDateTime'] = clients.createdDateTime
            request.data['updatedDateTime'] = timezone.now()
            request.data['created_by'] = clients.created_by.id
            request.data['updated_by'] = str(request.user.id)
            serializer = CompanyInformationSerializer(
                instance=clients, data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Company Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Some thing went Wrong in Company Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Some thing went Wrong in Company Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

        try:
            clients = CompanyInformation.objects.get(id=pk)
            if (clients.isActive == True):
                currentDate = datetime.datetime.today()
                clients.updatedDateTime = currentDate
                # clients.updated_by = str(request.user.id)
                clients.isActive = False
                clients.save()
                # publish('product_deleted', pk)
                return Response({'message': 'Company Information Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'Company Information Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'message': 'Client Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class TenantInformationViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        name_contain = request.GET.get('name')
        code_contain = request.GET.get('code')
        query = Q()
        if name_contain:
            query &= Q(name__icontains=name_contain)
        if code_contain:
            query &= Q(code__icontains=code_contain)
        client = TenantInformation.objects.all().filter(query).distinct()[:300000]
        serializer = GettingTenantInformationSerializer(client, many=True)
        if serializer:
            return Response({'message': 'Tenant Information Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Tenant Information ', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        currentDate = timezone.now()
        request.data['created_by'] = str(request.user.id)
        request.data['updated_by'] = str(request.user.id)
        request.data['updated_at'] = currentDate
        serializer = TenantInformationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Tenant Information  Created Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Tenant Information  Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        clients = TenantInformation.objects.get(id=pk)
        serializer = GettingTenantInformationSerializer(clients)
        if serializer:
            return Response({'message': 'Tenant Information  Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Tenant Information ', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:

            clients = TenantInformation.objects.get(id=pk)
            request.data['created_at'] = clients.created_at
            request.data['updated_at'] = timezone.now()
            request.data['created_by'] = clients.created_by.id
            request.data['updated_by'] = str(request.user.id)
            serializer = TenantInformationSerializer(
                instance=clients, data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Tenant Information  Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Some thing went Wrong in Tenant Information  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'message': 'Some thing went Wrong in Tenant Information  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            clients = TenantInformation.objects.get(id=pk)
            if (clients.isActive == True):
                clients = TenantInformation.objects.get(id=pk)
                currentDate = datetime.datetime.today()
                clients.updated_at= currentDate
                clients.isActive= False
                clients.save()
                # publish('product_deleted', pk)
                return Response({'message': 'Tenant Information  Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'Tenant Information  Already Deleted', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Tenant Information  Deleted Error', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)


class ExternalAgencyViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated, )
    def list(self, request):
        client = ExternalAgency.objects.all().filter(isActive=True)
        serializer = GettingExternalAgencySerializer(client, many=True)
        if serializer:
            return Response({'message': 'External Agencies Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching External Agencies ', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        request.data['createdBy'] = str(request.user.id)
        request.data['updatedBy'] = str(request.user.id)
        serializer = ExternalAgencySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'External Agency Created Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in External Agency  Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        clients = ExternalAgency.objects.get(id=pk)
        serializer = GettingExternalAgencySerializer(clients)
        if serializer:
            return Response({'message': 'External Agency  Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching External Agency ', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            clients = ExternalAgency.objects.get(id=pk)
            currentDate = datetime.datetime.today()
            request.data['updated_at'] = currentDate
            request.data['createdBy'] = clients.createdBy
            request.data['updatedBy'] = str(request.user.id)
            serializer = ExternalAgencySerializer(
                instance=clients, data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'External Agency  Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Some thing went Wrong in External Agency  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Some thing went Wrong in External Agency  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            clients = ExternalAgency.objects.get(id=pk)
            if (clients.isActive == True):
                clients.isActive = False
                clients.save()
                # publish('product_deleted', pk)
                return Response({'message': 'External Agency  Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'External Agency  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'message': 'External Agency  Deleted Error', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)


# class RecruiterSerializerViewSet(viewsets.ViewSet):
#     permission_classes = (IsAuthenticated,)

#     def list(self, request):
#         recruiter = Recruiter.objects.all().filter(isActive=True)
#         serializer = GettingRecruiterSerializer(recruiter, many=True)
#         if serializer:
#             return Response({'message': 'Recruiter Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'message': 'Some thing went Wrong in Fetching Recruiter ', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


#     def create(self, request):
#         try:
#             request.data['created_by'] = str(request.user.id)
#             request.data['updated_by'] = str(request.user.id)
#             serializer = RecruiterSerializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message': 'Recruiter Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#             else:
#                     return Response({'message': 'Some thing went Wrong in Recruiter Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response({'message': 'Some thing went Wrong in Recruiter Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         recruiter = Recruiter.objects.get(id=pk)
#         serializer = GettingRecruiterSerializer(recruiter)
#         if serializer:
#             return Response({'message': 'Recruiter Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'message': 'Some thing went Wrong in Fetching Recruiter', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


#     def update(self, request, pk=None):
#         try:
#             recruiter = Recruiter.objects.get(id=pk)
#             currentDate = datetime.datetime.today()
#             request.data['created_at'] = recruiter.created_at
#             request.data['updated_at'] = currentDate
#             request.data['created_by'] = recruiter.created_by.id
#             request.data['updated_by'] = str(request.user.id)
#             serializer = RecruiterSerializer(instance=recruiter, data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             # publish('product_updated', serializer.data)
#             if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message': 'Recruiter  Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#             else:
#                     return Response({'message': 'Some thing went Wrong in Recruiter  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response({'message': 'Some thing went Wrong in Recruiter  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

#     def destroy(self, request, pk=None):
#         try:
#             recruiter = Recruiter.objects.get(id=pk)
        
#             if (recruiter.isActive == True):
#                     currentDate = datetime.datetime.today()
#                     recruiter.updated_at = currentDate
#                     # clients.updated_by = str(request.user.id)
#                     recruiter.isActive = False
#                     recruiter.save()
#                     # publish('product_deleted', pk)
#                     return Response({'message': 'Recruiter Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
#             else:
#                 return Response({'message': 'Recruiter Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
#         except:
#             return Response({'message': 'Recruiter Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class QuestionsSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        try:
            questions = JobQuestions.objects.all().filter(type='checkbox', isActive=True)
            questionsCheckbox = JobQuestions.objects.all().exclude(type='checkbox')
            serializer = QuestionsSerializer(questionsCheckbox, many=True)
            serializer1 = QuestionsSerializerCheckbox(questions, many=True)
            if serializer.is_valid:
                return Response({'message': 'Question Fetching Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data + serializer1.data}}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Error occured while fetching Questions', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'message': 'Some Thing Went Wrong while fetching Questions', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = QuestionsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid:
                serializer.save()
                # publish('product_created', serializer.data)
                return Response({'message': 'Question Adding Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data}}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Error occured while Creating Questions', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'ESome thing went wrong while Creating Questions', 'error': True, 'code': 401, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


    def createCheckBoxQuestion(self, request):
        try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = checkboxQuestionsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid:
                serializer.save()
                # publish('product_created', serializer.data)
                return Response({'message': 'Question Adding Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data}}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Error occured while Creating Questions', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'ESome thing went wrong while Creating Questions', 'error': True, 'code': 401, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def updateCheckBoxQuestion(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        currentDate = datetime.datetime.today()
        request.data['created_at'] = recruiter.created_at
        request.data['updated_at'] = currentDate
        request.data['created_by'] = recruiter.created_by.id
        request.data['updated_by'] = str(request.user.id)
        serializer = checkboxQuestionsSerializer(instance=recruiter, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        serializer = QuestionsSerializer(recruiter)
        return Response(serializer.data)

    def update(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        currentDate = datetime.datetime.today()
        request.data['created_at'] = recruiter.created_at
        request.data['updated_at'] = currentDate
        request.data['created_by'] = recruiter.created_by.id
        request.data['updated_by'] = str(request.user.id)
        serializer = QuestionsSerializer(instance=recruiter, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def requiredQuestion(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        recruiter.flag = True
        recruiter.save()
        # publish('product_deleted', pk)
        return Response({'message': 'Question Required Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)

    def destroy(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        recruiter.isActive = False
        recruiter.save()
        # publish('product_deleted', pk)
        return Response({'message': 'Question Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)



#***********FACTORS*************
class FactorSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        try:
            factor = Factors.objects.all().filter(isActive=True)
            serializer = FactorSerializer(factor, many=True)
            if serializer.is_valid:
                return Response({'message': 'Factor Fetching Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data}}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Error occured while fetching Questions', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'message': 'Some Thing Went Wrong while fetching Questions', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = FactorSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid:
                serializer.save()
                # publish('product_created', serializer.data)
                return Response({'message': 'Factor Adding Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data}}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Error occured while Creating Factors', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'ESome thing went wrong while Creating Factors', 'error': True, 'code': 401, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)



 
    def retrieve(self, request, pk=None):
        recruiter = Factors.objects.get(id=pk)
        serializer = FactorSerializer(recruiter)
        return Response(serializer.data)

    def update(self, request, pk=None):
        recruiter = Factors.objects.get(id=pk)
        currentDate = datetime.datetime.today()
        request.data['created_at'] = recruiter.created_at
        request.data['updated_at'] = currentDate
        request.data['created_by'] = recruiter.created_by.id
        request.data['updated_by'] = str(request.user.id)
        serializer = FactorSerializer(instance=recruiter, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

 
    def destroy(self, request, pk=None):
        recruiter = Factors.objects.get(id=pk)
        recruiter.isActive = False
        recruiter.save()
        # publish('product_deleted', pk)
        return Response({'message': 'Factor Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)

#***************JOB RELATED FACTOR***********************

class JobRelatedFactorView(viewsets.ViewSet):
    permission_classes =  (IsAuthenticated ,)
    def list(self, request):
        client = JobRelatedFactors.objects.all().filter( isActive = True)
        serializer = CareerJobRelatedFactorFetching(client, many=True)
        if serializer:
            return Response({'message':'Job Related Factors Question Fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Job Related Factors Question','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def create(self, request):
        if(JobRelatedFactors.objects.filter(jobId=request.data['jobId'] , factorId=request.data['factorId'])):
            return Response({'message':'Record Already Exists!','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
        request.data['created_by']=str(request.user.id)
        request.data['updated_by']=str(request.user.id)
        serializer = CareerJobRelatedFactor(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'All Job Related Factor Question Created Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Job Related Factor Question  Creation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request):
       
        clients = JobRelatedFactors.objects.all().filter(jobId = request.data['jobId'], isActive = True)
        serializer = CareerJobRelatedFactorFetching(clients, many=True)
        if serializer:
            return Response({'message':'Job Related Factor  Fetch Successfully','error':False,'code':200,'result':{'totalRecords':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Job Related Factor ','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, pk=None):
        try:
           clients = JobRelatedFactors.objects.get(id=pk)
           currentDate = datetime.datetime.today()
           request.data['created_at']=clients.created_at
           request.data['updated_at'] = currentDate
           request.data['created_by']=clients.created_by.id
           request.data['updated_by']=str(request.user.id)
           serializer = CareerJobRelatedFactor(instance=clients, data=request.data)
           serializer.is_valid(raise_exception=True)
           if serializer.is_valid():
               serializer.save()
               return Response({'message':'Job Related Factor  Updated Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
           else:
               return Response({'message':'Some thing went Wrong in Job Related Factor  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        
        except:
            return Response({'message':'Some thing went Wrong in User Role  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request):
        try:
           user = JobRelatedFactors.objects.filter(jobId=request.data['jobId'])
           for i in user:
               print(i.isActive)
               i.isActive = False
               i.save()
            
           return Response({'message':'Job Related Factors Deleted SuccessFully','error':False,'code':204},status=status.HTTP_204_NO_CONTENT)

           
        except:
            return Response({'message':'Error Role  Deleted Error','error':True,'code':404},status=status.HTTP_400_BAD_REQUEST)

class CheckboxSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        try:
            checkbox = Values.objects.all().filter(isActive=True)
            serializer = CheckboxValuesSerializer(checkbox, many=True)
            if serializer.is_valid:
                return Response({'message': 'CheckBoxes Fetching Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data}}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'Error occured while fetching CheckBoxes', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({'message': 'Some Thing Went Wrong while fetching CheckBoxes', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        try:
            questionId = request.data['questionId']
            questionSerialzer = JobQuestions.objects.get(id=questionId)
            if questionSerialzer.type == 'checkbox':
                serializer = CheckboxValuesSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid:
                    serializer.save()
                    # publish('product_created', serializer.data)
                    return Response({'message': 'CheckBoxe Adding Successfully', 'error': False, 'code': 200, 'result': {'items': serializer.data}}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Error occured while Creating CheckBoxe', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'Question Type must be checkbox', 'error': True, 'code': 401}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Some thing went wrong while Creating CheckBoxe', 'error': True, 'code': 401, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        serializer = CheckboxValuesSerializer(recruiter)
        return Response(serializer.data)

    def update(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        serializer = CheckboxValuesSerializer(
            instance=recruiter, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):
        recruiter = JobQuestions.objects.get(id=pk)
        recruiter.isActive = False
        recruiter.save()
        # publish('product_deleted', pk)
        return Response({'message': 'Recruiter Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


# class AccountManagerSerializerViewSet(viewsets.ViewSet):
#     permission_classes = (IsAuthenticated,)

#     def list(self, request):
#         recruiter = AccountManager.objects.all().filter(isActive=True)
#         serializer = AccountManagerSerializer(recruiter, many=True)
#         if serializer:
#             return Response({'message': 'Account Manager Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'message': 'Some thing went Wrong in Fetching Account Manager ', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


#     def create(self, request):
#         try:
#             request.data['created_by'] = str(request.user.id)
#             request.data['updated_by'] = str(request.user.id)
#             serializer = AccountManagerSerializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message': 'Account Manager Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#             else:
#                     return Response({'message': 'Some thing went Wrong in Account Manager Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response({'message': 'Some thing went Wrong in Account Manager Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         recruiter = AccountManager.objects.get(id=pk)
#         serializer = AccountManagerSerializer(recruiter)
#         if serializer:
#             return Response({'message': 'Account Manager Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'message': 'Some thing went Wrong in Fetching Account Manager', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


#     def update(self, request, pk=None):
#         try:
#             recruiter = AccountManager.objects.get(id=pk)
#             currentDate = datetime.datetime.today()
#             request.data['created_at'] = recruiter.created_at
#             request.data['updated_at'] = currentDate
#             request.data['created_by'] = recruiter.created_by.id
#             request.data['updated_by'] = str(request.user.id)
#             serializer = AccountManagerSerializer(instance=recruiter, data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             # publish('product_updated', serializer.data)
#             if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message': 'Account Manager  Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
#             else:
#                     return Response({'message': 'Some thing went Wrong in Account Manager  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#         except:
#             return Response({'message': 'Some thing went Wrong in Account Manager  Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

#     def destroy(self, request, pk=None):
#         try:
#             recruiter = AccountManager.objects.get(id=pk)
        
#             if (recruiter.isActive == True):
#                     currentDate = datetime.datetime.today()
#                     recruiter.updated_at = currentDate
#                     # clients.updated_by = str(request.user.id)
#                     recruiter.isActive = False
#                     recruiter.save()
#                     # publish('product_deleted', pk)
#                     return Response({'message': 'Account Manager Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
#             else:
#                 return Response({'message': 'Account Manager Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
#         except:
#             return Response({'message': 'Account Manager Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class CareerContentSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        careerContent = CareerContent.objects.all().filter(isActive=True)
        serializer = CareerContentSerializer(careerContent, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CareerContentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_created', serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        careerContent = CareerContent.objects.get(id=pk)
        serializer = CareerContentSerializer(careerContent)
        return Response(serializer.data)

    def update(self, request, pk=None):
        careerContent = CareerContent.objects.get(id=pk)
        serializer = CareerContentSerializer(
            instance=careerContent, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # publish('product_updated', serializer.data)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):
        careerContent = CareerContent.objects.get(id=pk)
        careerContent.isActive = False
        careerContent.save()
        # publish('product_deleted', pk)
        return Response({'message': 'Content Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class JobRelatedQuestionsView(viewsets.ViewSet):
    permission_classes =  (IsAuthenticated ,)
    def list(self, request):
        jobId = request.data['jobId']
        client = JobRelatedQuestions.objects.all().filter(jobId = jobId, isActive = True)
        serializer = CareerJobRelatedQuestionsFetching(client, many=True)
        if serializer:
            return Response({'message':'Job Related Question Fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Job Related Question','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def create(self, request):
        if(JobRelatedQuestions.objects.filter(jobId=request.data['jobId'] , questionId=request.data['questionId'])):
            return Response({'message':'Record Already Exists!','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
        request.data['created_by']=str(request.user.id)
        request.data['updated_by']=str(request.user.id)
        serializer = CareerJobRelatedQuestions(data=request.data)
        serializer.is_valid(raise_exception=True)
        # publish('product_created', serializer.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Job Related Question Created Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Job Related Question  Creation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request):
       
        clients = JobRelatedQuestions.objects.all().filter(jobId = request.data['jobId'], isActive = True)
        serializer = CareerJobRelatedQuestionsFetching(clients, many=True)
        if serializer:
            return Response({'message':'Job Related Question  Fetch Successfully','error':False,'code':200,'result':{'totalRecords':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong in Fetching Job Related Question ','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, pk=None):
        try:
           clients = JobRelatedQuestions.objects.get(id=pk)
           currentDate = datetime.datetime.today()
           request.data['created_at']=clients.created_at
           request.data['updated_at'] = currentDate
           request.data['created_by']=clients.created_by.id
           request.data['updated_by']=str(request.user.id)
           serializer = CareerJobRelatedQuestions(instance=clients, data=request.data)
           serializer.is_valid(raise_exception=True)
           if serializer.is_valid():
               serializer.save()
               return Response({'message':'Job Related Question  Updated Successfully','error':False,'code':200,'result':{'totalFields':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
           else:
               return Response({'message':'Some thing went Wrong in Job Related Question  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        
        except:
            return Response({'message':'Some thing went Wrong in User Role  Updation','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request):
        try:
           user = JobRelatedQuestions.objects.filter(jobId=request.data['jobId'])
           for i in user:
               print(i.isActive)
               i.isActive = False
               i.save()
            
           return Response({'message':'Job Related Questions Deleted SuccessFully','error':False,'code':204},status=status.HTTP_204_NO_CONTENT)

           
        except:
            return Response({'message':'Error Role  Deleted Error','error':True,'code':404},status=status.HTTP_400_BAD_REQUEST)
