from django.shortcuts import render
from rest_framework import viewsets, status, filters
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
# from django.core.mail import send_mail
from django.conf import settings

from emailNotification.models import *
from emailNotification.serializers import *
from django.core.mail import EmailMessage
# Create your views here.


def send_email():
    email = EmailMessage(
        'Title',
        (ConsultSerializer.name, ConsultSerializer.describe),
        'settings.EMAIL_HOST_USER',
        [ConsultSerializer.email]
    )
    email.attach_file(ConsultSerializer.file)
    email.send()


class EmailSerializerViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)
    queryset = CandidateEmail.objects.all()
    serializer_class = ConsultSerializer

    # def sendEmail(self, request, *args, **kwargs):
    #     response = super(EmailSerializerViewSet, self).create(request, *args, **kwargs)
    #     send_email()  # sending mail
    #     return response
    def sendEmail(self, request):
        try:
            to = request.data['email']
            content = request.data['describe']
            subject = request.data['subject']
            
            email = EmailMessage(
                # subject
                subject,
                # message
                content,
                # from email
                'settings.EMAIL_HOST_USER',
                # to
                to,
                # fail_silently=False,
                )
            
            if request.FILES is not None and request.FILES != {}:
                file = request.FILES['file']
                email.attach(file.name, file.read(), 'text/plain')
                if(email.send()):
                    request.data['isSent'] = True
                    serializer = ConsultSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    # publish('product_created', serializer.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({'message': 'Email sent successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # email.send()
                # return Response({'message': 'Email send successfully without file'})
                request.data['isSent'] = True
                serializer = ConsultSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                # publish('product_created', serializer.data)
                if serializer.is_valid():
                    serializer.save()
                    email.send()
                    return Response({'message': 'Email sent successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)


    def draftEmail(self, request):
        # try:
            
            
           
            if request.FILES is not None and request.FILES != {}:
                file = request.FILES['file']
               
                request.data['isSent'] = False
                serializer = ConsultSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                # publish('product_created', serializer.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Email sent successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # email.send()
                # return Response({'message': 'Email send successfully without file'})
                request.data['isSent'] = False
                serializer = ConsultSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                # publish('product_created', serializer.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'message': 'Email draft successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
        # except:
        #     return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)
    def draftEmailSent(self, request):
            try:
                if request.data['id'] is None:
                    return Response({'message': 'Please put valid id', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)
                
                elif request.data['id'] is not None:
                    # return Response("this is running")
                    emailObj = CandidateEmail.objects.get(id=request.data['id'])
                    to = request.data['email']
                    content = request.data['describe']
                    subject = request.data['subject']
                    
                    email = EmailMessage(
                        # subject
                        subject,
                        # message
                        content,
                        # from email
                        'settings.EMAIL_HOST_USER',
                        # to
                        to,
                        # fail_silently=False,
                        )
                    
                    if request.FILES is not None and request.FILES != {}:
                        file = request.FILES['file']
                        email.attach(file.name, file.read(), 'text/plain')
                        if(email.send()):
                            emailObj.isSent = True
                            serializer = ConsultSerializer(instance = emailObj, data=request.data)
                            serializer.is_valid(raise_exception=True)
                            # publish('product_created', serializer.data)
                            if serializer.is_valid():
                                serializer.save()
                                return Response({'message': 'Email sent successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                            else:
                                return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        # email.send()
                        # return Response({'message': 'Email send successfully without file'})
                        emailObj.isSent = True
                        serializer = ConsultSerializer(instance = emailObj, data=request.data)
                        serializer.is_valid(raise_exception=True)
                        # publish('product_created', serializer.data)
                        if serializer.is_valid():
                            serializer.save()
                            email.send()
                            return Response({'message': 'Email sent successfully', 'error': False, 'code': 200, 'result': {'totalItems': len(serializer.data), 'items': serializer.data}}, status=status.HTTP_201_CREATED)
                        else:
                            return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
                            
                
            except:
                return Response({'message': 'Some thing went Wrong in Email', 'error': True, 'code': 400}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        if request.data is not None and request.data != {}:
            values = request.data['candidateId']
            serializer2 = []
            for i in values:
                careerjobs = CandidateEmail.objects.all().filter(candidateId= i, isSent = True )
                serializer = GettingConsultSerializer(careerjobs, many=True)
                serializer2.append(serializer.data)
            return Response({'message':'Candidate Emails Fetch Successfully','error':False,'code':200,'result':{'total Checks':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
        else:
           return Response({'message': 'Please put valid candidate id', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)


    def draftList(self, request):
            if request.data is not None and request.data != {}:
                values = request.data['candidateId']
                serializer2 = []
                for i in values:
                    careerjobs = CandidateEmail.objects.all().filter(candidateId= i, isSent = False )
                    serializer = GettingConsultSerializer(careerjobs, many=True)
                    serializer2.append(serializer.data)
                return Response({'message':'Candidate Draft Emails Fetch Successfully','error':False,'code':200,'result':{'total Checks':len(serializer2),'items':serializer2}}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Please put valid candidate id', 'error': True, 'code': 400, 'result': {'items': serializer.errors}}, status=status.HTTP_400_BAD_REQUEST)
