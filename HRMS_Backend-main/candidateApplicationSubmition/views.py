from rest_framework.exceptions import AuthenticationFailed
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Q, Count
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, DjangoModelPermissions, AllowAny

import datetime
# import json
# import pyautogui
# import time
# pyautogui.FAILSAFE= False
# while True:
#     time.sleep(15)
#     for i in range(0, 100):
#         pyautogui.moveTo(0, i*5)
#     for i in range(0, 3):
#         pyautogui.press('shift')




class CandidateSerializerViewSet(viewsets.ViewSet):
    permission_classes=(IsAuthenticated,)
    def list(self, request):
        
        careerjobs = CandidateAppSubmit.objects.all()
        serializer = GettingCandidateSerializer(careerjobs, many=True)
        if serializer.is_valid:
            return Response({'message':'Candidates Fetching Successfully','error':False,'code':200, 'result':{'item Length':len(serializer.data ), 'items':serializer.data}},status=status.HTTP_200_OK)
        else:
             return Response({'message':'Error occured while fetching Candidates','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
                

  
    def create(self, request):
        # try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = CreateCandidateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Candidate Created Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #      return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
    def linkCandidateToJob(self, request):
        # try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = CandidateRelatedJobSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Candidate Created Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #      return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
           

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateAppSubmit.objects.get(id=pk)
        serializer = GettingCandidateSerializer(candidateSumbitApp)
        return Response({'message': 'Candidate Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)


class CandidateSerializerFromCandidatePortalViewSet(viewsets.ViewSet):
    permission_classes=(AllowAny,)
            
   
  
    def createCandidateOnPortal(self, request):
        # try:
            # request.data['created_by'] = str(request.user.id)
            # request.data['updated_by'] = str(request.user.id)
            serializer = CandidateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Candidate Created Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #      return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
    def candidateLinkToJob(self, request):
        # try:
            serializer = CandidateAppSubmitSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Application submitted Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #      return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
       
class CandidateRelatedJobSerializerViewSet(viewsets.ViewSet):
    permission_classes=(AllowAny,)
    def list(self, request):
        
        candidates = CandidateRelatedJob.objects.all()
        serializer = FetchCandidateAppSubmitSerializer(candidates, many=True)
        if serializer.is_valid:
            return Response({'message':'Candidates Fetching Successfully','error':False,'code':200, 'result':{'item Length':len(serializer.data ), 'items':serializer.data}},status=status.HTTP_200_OK)
        else:
             return Response({'message':'Error occured while fetching Candidates','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
                

    def listUnApproved(self, request):
        
        careerjobs = CandidateAppSubmit.objects.all()
        serializer = CandidateAppSubmitSerializer(careerjobs, many=True)
        if serializer.is_valid:
            return Response({'message':'Unapproved Candidates Fetching Successfully','error':False,'code':200, 'result':{'item Length':len(serializer.data ), 'items':serializer.data }},status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message':'Error occured while fetching Unapproved Candidates','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
                

    def create(self, request):
        # try:
            serializer = CandidateAppSubmitSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Application submitted Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #      return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateRelatedJob.objects.get(id=pk)
        serializer = CandidateAppSubmitSerializer(candidateSumbitApp)
        return Response({'message': 'Candidate Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)


class CandidateRelatedEvaluationSerializerViewSet(viewsets.ViewSet):
    permission_classes=(AllowAny,)
    def list(self, request):
        
        candidates = CandidateEvaluation.objects.all()
        serializer = CandidateEvaluationSerializer(candidates, many=True)
        if serializer.is_valid:
            return Response({'message':'Candidates Fetching Successfully','error':False,'code':200, 'result':{'item Length':len(serializer.data ), 'items':serializer.data}},status=status.HTTP_200_OK)
        else:
             return Response({'message':'Error occured while fetching Candidates','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
                

    def listUnApproved(self, request):
        
        careerjobs = CandidateEvaluation.objects.all()
        serializer = CandidateEvaluationSerializer(careerjobs, many=True)
        if serializer.is_valid:
            return Response({'message':'Unapproved Candidates Fetching Successfully','error':False,'code':200, 'result':{'item Length':len(serializer.data ), 'items':serializer.data }},status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'message':'Error occured while fetching Unapproved Candidates','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
                

    def create(self, request):
        # try:
            serializer = CandidateEvaluationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Application Evaluation Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        # except:
        #      return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateEvaluation.objects.get(id=pk)
        serializer = CandidateEvaluationSerializer(candidateSumbitApp)
        return Response({'message': 'Candidate Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)


class CandidateApplicationSubmitAnswerSerializerViewSet(viewsets.ViewSet):
    permission_classes=(AllowAny,)
    def list(self, request):
        careerjobs = Answer.objects.all()
        serializer = AnswerSerializer(careerjobs, many=True)
        return Response(serializer.data)

    def create(self, request):
        try:
            candidteAppId = request.data['candidteAppId']
            userId = request.data['userId']
            if Answer.objects.filter(id=candidteAppId, userId=userId).first():
                serializer = AnswerSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    candidateApp = AnswerSerializer.objects.get(id = candidteAppId)
                    candidateApp.isActive= True
                    candidateApp.save()
                    serializer.save()
                    return Response({'message':'Application submitted Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = Answer.objects.get(id=pk)
        serializer = AnswerSerializer(candidateSumbitApp)
        return Response(serializer.data)

class CommonValuesSerializerViewSet(viewsets.ViewSet):
    #common values used for tags no association with any tables
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['type']
            serializer2 = []
            for i in values:
                careerjobs = CommonValues.objects.all().filter(type= i )
                serializer = CommonValuesSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Common values by different checks fetch Successfully','error':False,'code':200,'result':{'total Checks':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            careerjobs = CommonValues.objects.all()
            serializer = CommonValuesSerializer(careerjobs, many=True)
            return Response({'message':'Common values fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
    
    def create(self, request):
        try:
            serializer = CommonValuesSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Application submitted Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CommonValues.objects.get(id=pk)
        serializer = CommonValuesSerializer(candidateSumbitApp)
        return Response(serializer.data)


class RecruiterCandidateNotesSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #recruiter can make notes for candidate
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 =[]
            for i in values:
                careerjobs = RecruiterCandidateNotes.objects.all().filter(candidateId= i, isActive=True )
                serializer = GetRecruiterCandidateNotesSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Notes by candidate id fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            careerjobs = RecruiterCandidateNotes.objects.all().filter(isActive=True)
            serializer = RecruiterCandidateNotesSerializer(careerjobs, many=True)
            return Response({'message':'All Notes fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
    
    def create(self, request):
        try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = RecruiterCandidateNotesSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Notes Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = RecruiterCandidateNotes.objects.get(id=pk)
        serializer = RecruiterCandidateNotesSerializer(candidateSumbitApp)
        return Response(serializer.data)
    def update(self, request, pk=None):
            try:
                clients = RecruiterCandidateNotes.objects.get(id=pk)
                currentDate = datetime.datetime.today()
                request.data['created_at'] = clients.created_at
                request.data['updated_at'] = currentDate
                request.data['created_by'] = clients.created_by.id
                request.data['updated_by'] = str(request.user.id)
                serializer = RecruiterCandidateNotesSerializer(
                    instance=clients, data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Recruiter Notes Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Recruiter Notes', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'message': 'Some thing went Wrong in Recruiter Notes', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

            try:
                clients = RecruiterCandidateNotes.objects.get(id=pk)
                if (clients.isActive == True):
                    currentDate = datetime.datetime.today()
                    clients.updated_at = currentDate
                    # clients.updated_by = str(request.user.id)
                    clients.isActive = False
                    clients.save()
                    # publish('product_deleted', pk)
                    return Response({'message': 'Recruiter Notes Information Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Recruiter Notes Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
            except:
                return Response({'message': 'Recruiter Notes Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class CalenderSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #recruiter can make notes for candidate
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 =[]
            for i in values:
                careerjobs = Calender.objects.all().filter(candidateId= i, isActive=True )
                serializer = GettingCalenderSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Candidate Calender fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            careerjobs = Calender.objects.all().filter(isActive=True)
            serializer = GettingCalenderSerializer(careerjobs, many=True)
            return Response({'message':'All Calender Records fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
    
    def create(self, request):
        try:
            request.data['created_by'] = str(request.user.id)
            request.data['updated_by'] = str(request.user.id)
            serializer = CalenderSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Calender Record Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = Calender.objects.get(id=pk)
        serializer = GettingCalenderSerializer(candidateSumbitApp)
        return Response(serializer.data)
    def update(self, request, pk=None):
            try:
                clients = Calender.objects.get(id=pk)
                currentDate = datetime.datetime.today()
                request.data['created_at'] = clients.created_at
                request.data['updated_at'] = currentDate
                request.data['created_by'] = clients.created_by.id
                request.data['updated_by'] = str(request.user.id)
                serializer = CalenderSerializer(
                    instance=clients, data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Calender updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Recruiter Notes', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'message': 'Some thing went Wrong in Recruiter Notes', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

            try:
                clients = Calender.objects.get(id=pk)
                if (clients.isActive == True):
                    currentDate = datetime.datetime.today()
                    clients.updated_at = currentDate
                    # clients.updated_by = str(request.user.id)
                    clients.isActive = False
                    clients.save()
                    # publish('product_deleted', pk)
                    return Response({'message': 'Candidate Calender Record Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Candidate Calender Record  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
            except:
                return Response({'message': 'Candidate Calender Record  Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class CoverLetterSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #recruiter can make notes for candidate
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 =[]
            for i in values:
                careerjobs = CoverLetter.objects.all().filter(candidateId= i , isActive=True )
                serializer = GettingCoverLeterSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Cover Letter fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            careerjobs = CoverLetter.objects.all().filter(isActive=True)
            serializer = GettingCoverLeterSerializer(careerjobs, many=True)
            return Response({'message':'All Cover Letter Records fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
    
    def create(self, request):
        try:
            if 'file' in request.FILES:
                request.data['descriptions'] = ''
                # request.data['isActive'] = True
                serializer = CoverLeterSerializer(data=request.data)
                # return Response(serializer)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                        serializer.save()
                        return Response({'message':'Cover Letter Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                        return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            elif 'descriptions' in request.data:
                # return Response('this is running')
                # request.data['isActive'] = True
                request.FILES['file'] = ''
                serializer = CoverLeterSerializer( data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                        serializer.save()
                        return Response({'message':'Cover Letter Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                        return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = Calender.objects.get(id=pk)
        serializer = GettingCalenderSerializer(candidateSumbitApp)
        return Response(serializer.data)
    def update(self, request, pk=None):
            try:
                clients = Calender.objects.get(id=pk)
                currentDate = datetime.datetime.today()
                request.data['created_at'] = clients.created_at
                request.data['updated_at'] = currentDate
                request.data['created_by'] = clients.created_by.id
                request.data['updated_by'] = str(request.user.id)
                serializer = CalenderSerializer(
                    instance=clients, data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Calender updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Recruiter Notes', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'message': 'Some thing went Wrong in Recruiter Notes', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

            try:
                clients = Calender.objects.get(id=pk)
                if (clients.isActive == True):
                    currentDate = datetime.datetime.today()
                    clients.updated_at = currentDate
                    # clients.updated_by = str(request.user.id)
                    clients.isActive = False
                    clients.save()
                    # publish('product_deleted', pk)
                    return Response({'message': 'Candidate Calender Record Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Candidate Calender Record  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
            except:
                return Response({'message': 'Candidate Calender Record  Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)



class OrganizationSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        client = Organization.objects.all()
        serializer = OrganizationSerializer(client, many=True)
        if serializer:
            return Response({'message': 'All Organization Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Organization', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request):
        request.data['created_by'] = str(request.user.id)
        request.data['updated_by'] = str(request.user.id)
        serializer = OrganizationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Organization Created Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Organization Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        clients = Organization.objects.get(id=pk)
        serializer = OrganizationSerializer(clients)
        if serializer:
            return Response({'message': 'Organization Fetch Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Some thing went Wrong in Fetching Organization', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            clients = Organization.objects.get(id=pk)
            serializer = OrganizationSerializer(
                instance=clients, data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Organization Updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Some thing went Wrong in Organization Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Some thing went Wrong in Organization Updation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

        try:
            clients = Organization.objects.get(id=pk)
            if (clients.isActive == True):
                currentDate = datetime.datetime.today()
                clients.updated_at = currentDate
                # clients.updated_by = str(request.user.id)
                clients.isActive = False
                clients.save()
                # publish('product_deleted', pk)
                return Response({'message': 'Organization Information Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'Organization Information Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'message': 'Organization Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)

class CandidateEducationSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #recruiter can make notes for candidate
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 =[]
            for i in values:
                careerjobs = CandidateEducations.objects.all().filter(candidateId= i, status=True )
                serializer = CandidateEducationsSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Cover Letter fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Please Enter Candidate Id','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
    
    def create(self, request):
        try:
            serializer = CandidateEducationsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Candidate Education Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
                
            else:
                return Response({'message': 'Some thing went Wrong in Education Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateEducations.objects.get(id=pk)
        serializer = CandidateEducationsSerializer(candidateSumbitApp)
        return Response(serializer.data)
    def update(self, request, pk=None):
            try:
                clients = CandidateEducations.objects.get(id=pk)
                serializer = CandidateEducationsSerializer(
                    instance=clients, data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Candidate Education updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Candidate Education', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'message': 'Some thing went Wrong in Candidate Education', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

            try:
                clients = CandidateEducations.objects.get(id=pk)
                if (clients.status == True):
                    clients.status = False
                    clients.save()
                    # publish('product_deleted', pk)
                    return Response({'message': 'Candidate Education Record Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Candidate Education Record  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
            except:
                return Response({'message': 'Candidate Education Record  Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


class CandidateCertificationSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #recruiter can make notes for candidate
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 =[]
            for i in values:
                careerjobs = CandidateCertificates.objects.all().filter(candidateId= i , staus=True )
                serializer = CandidateCertificatesSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Candidate Certificates fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Please Enter Candidate Id','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
    
    def create(self, request):
        try:
            serializer = CandidateCertificatesSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Candidate Certificate Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
                
            else:
                return Response({'message': 'Some thing went Wrong in  Candidate Certificate Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateCertificates.objects.get(id=pk)
        serializer = CandidateCertificatesSerializer(candidateSumbitApp)
        return Response(serializer.data)
    def update(self, request, pk=None):
            try:
                clients = CandidateCertificates.objects.get(id=pk)
                serializer = CandidateCertificatesSerializer(
                    instance=clients, data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Candidate Certificate updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Candidate Certificate', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'message': 'Some thing went Wrong in Candidate Certificate', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

            try:
                clients = CandidateCertificates.objects.get(id=pk)
                if (clients.status == True):
                    clients.status = False
                    clients.save()
                    # publish('product_deleted', pk)
                    return Response({'message': 'Candidate Certificate Record Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Candidate Certificate Record  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
            except:
                return Response({'message': 'Candidate Certificate Record  Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)



class CandidateExperienceSerializerViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    #recruiter can make notes for candidate
    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 =[]
            for i in values:
                careerjobs = CandidateExperience.objects.all().filter(candidateId= i, status=True )
                serializer = GettingCandidateExperienceSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Candidate Experience fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Please Enter Candidate Id','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
    
    def create(self, request):
        try:
            serializer = CandidateExperienceSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'Candidate Experience Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
                
            else:
                return Response({'message': 'Some thing went Wrong in  Candidate Experience Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

        except:
             return Response({'message':'Some thing went Wrong','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateExperience.objects.get(id=pk)
        serializer = GettingCandidateExperienceSerializer(candidateSumbitApp)
        return Response(serializer.data)
    
    
    def update(self, request, pk=None):
            try:
                clients = CandidateExperience.objects.get(id=pk)
                serializer = CandidateExperienceSerializer(
                    instance=clients, data=request.data)
                serializer.is_valid(raise_exception=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Candidate Experience updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Candidate Experience', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({'message': 'Some thing went Wrong in Candidate Experience', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):

            try:
                clients = CandidateExperience.objects.get(id=pk)
                if (clients.status == True):
                    clients.status = False
                    clients.save()
                    # publish('product_deleted', pk)
                    return Response({'message': 'Candidate Experience Record Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({'message': 'Candidate Experience Record  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
            except:
                return Response({'message': 'Candidate Experience Record  Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)


# class CandidateEducationSerializerViewSet(viewsets.ViewSet):
#     permission_classes = (IsAuthenticated,)
#     #candidate education can make notes for candidate
#     def list(self, request,  *args, **kwargs):
#         if request.data is not None and request.data != {}:
#             values = request.data['candidateId']
#             serializer2 =[]
#             for i in values:
#                 careerjobs = CandidateQualification.objects.all().filter(candidateId= i )
#                 serializer = GettingCandidateQualificationSerializer(careerjobs, many=True)
#                 serializer2.append(serializer.data)
#             return Response({'message':'Candidate Calender fetch Successfully','error':False,'code':200,'result':{'totalItems':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'message':'Please enter candidate Id','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)

#     def create(self, request):
#         # try:
#             if 'education' in request.data['type']:
#                 # request.data['created_by'] = str(request.user.id)
#                 # request.data['updated_by'] = str(request.user.id)
#                 serializer = CandidateEducationsSerializer(data=request.data)
#                 serializer.is_valid(raise_exception=True)
#                 if serializer.is_valid():
#                     serializer.save()
#                 else:
#                     return Response({'message': 'Some thing went Wrong in Education Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#                 serializer = CandidateEducations.objects.get(id=str(serializer.data['id']))
#                 request.data['certificateId'] = ''
#                 request.data['organizationId'] = ''
#                 request.data['educationId'] = serializer.id
#                 request.data['candidateId'] = str(serializer.candidateId)
#                 if serializer.id == '':
#                     return Response({'message':'Educaiton Id could not be null','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
#                 # if(CandidateEducation.objects.filter(educationId=request.data['educationId'])):
#                 #     return Response({'message':'Record Already Exists!','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
#                 serializer = CandidateQualificationSerializer( data=request.data)
#                 serializer.is_valid(raise_exception=True)
#                 if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message':'Candidate Education Record Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
#                 else:
#                     return Response({'message':'Some thing went Wrong while creating candidate education','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
       
#             elif 'certificate' in request.data['type']:
#                     serializer = CandidateCertificatesSerializer(data=request.data)
#                     serializer.is_valid(raise_exception=True)
#                     if serializer.is_valid():
#                         serializer.save()
#                     else:
#                         return Response({'message': 'Some thing went Wrong in Education Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#                     serializer = CandidateCertificates.objects.get(id=str(serializer.data['id']))
#                     request.data['certificateId'] = serializer.id
#                     request.data['organizationId'] = ''
#                     request.data['educationId'] = ''
#                     request.data['candidateId'] = str(serializer.candidateId)
#                     if serializer.id == '':
#                         return Response({'message':'Candidate Certificate Id could not be null','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
#                     # if(CandidateEducation.objects.filter(educationId=request.data['educationId'])):
#                     #     return Response({'message':'Record Already Exists!','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
#                     serializer = CandidateQualificationSerializer( data=request.data)
#                     serializer.is_valid(raise_exception=True)
#                     if serializer.is_valid():
#                         serializer.save()
#                         return Response({'message':'Candidate Certificate Record Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
#                     else:
#                         return Response({'message':'Some thing went Wrong while creating candidate Certificate','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
        
#             elif 'experience' in request.data['type']:
#                 serializer = CandidateExperienceSerializer(data=request.data)
#                 serializer.is_valid(raise_exception=True)
#                 if serializer.is_valid():
#                     serializer.save()
#                 else:
#                     return Response({'message': 'Some thing went Wrong in Candidate Experience Creation', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
#                 serializer = CandidateExperience.objects.get(id=str(serializer.data['id']))
#                 request.data['experienceId'] = serializer.id
#                 request.data['organizationId'] = ''
#                 request.data['educationId'] = ''
#                 request.data['candidateId'] = str(serializer.candidateId)
#                 if serializer.id == '':
#                     return Response({'message':'Candidate Experience Id could not be null','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
#                 # if(CandidateEducation.objects.filter(educationId=request.data['educationId'])):
#                 #     return Response({'message':'Record Already Exists!','error':True,'code':400},status=status.HTTP_400_BAD_REQUEST)
#                 serializer = CandidateQualificationSerializer( data=request.data)
#                 serializer.is_valid(raise_exception=True)
#                 if serializer.is_valid():
#                     serializer.save()
#                     return Response({'message':'Candidate Experience Record Added Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
#                 else:
#                     return Response({'message':'Some thing went Wrong while creating Candidate Experience','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
    
        # except:
        #      return Response({'message':'Some thing went Wrong in api','error':True,'code':400,'error':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
            
        

    # def retrieve(self, request, pk=None):
    #     candidateSumbitApp = CandidateEducations.objects.get(id=pk)
    #     serializer = GettingCandidateEducationSerializer(candidateSumbitApp)
    #     return Response(serializer.data)
    # # def update(self, request, pk=None):
    # #         try:
    # #             clients = CandidateEducation.objects.get(id=pk)
    # #             currentDate = datetime.datetime.today()
    # #             request.data['created_at'] = clients.created_at
    # #             request.data['updated_at'] = currentDate
    # #             request.data['created_by'] = clients.created_by.id
    # #             request.data['updated_by'] = str(request.user.id)
    # #             serializer = CandidateEducationSerializer(
    # #                 instance=clients, data=request.data)
    # #             serializer.is_valid(raise_exception=True)
    # #             if serializer.is_valid():
    # #                 serializer.save()
    # #                 return Response({'message': 'Candidate Education updated Successfully', 'error': False, 'code': 200, 'result': {'totalFields': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
    # #             else:
    # #                 return Response({'message': 'Some thing went Wrong in Candidate Education', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
    # #         except:
    # #             return Response({'message': 'Some thing went Wrong in Candidate Education', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)

    # def destroy(self, request, pk=None):

    #         try:
    #             clients = CandidateEducation.objects.get(id=pk)
    #             if (clients.isActive == True):
    #                 currentDate = datetime.datetime.today()
    #                 clients.updated_at = currentDate
    #                 # clients.updated_by = str(request.user.id)
    #                 clients.isActive = False
    #                 clients.save()
    #                 # publish('product_deleted', pk)
    #                 return Response({'message': 'Candidate Education Record Deleted Successfully', 'error': False, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
    #             else:
    #                 return Response({'message': 'Candidate Education Record  Already Deleted', 'error': True, 'code': 404}, status=status.HTTP_204_NO_CONTENT)
    #         except:
    #             return Response({'message': 'Candidate Education Record  Deleted Error', 'error': True, 'code': 200}, status=status.HTTP_204_NO_CONTENT)
