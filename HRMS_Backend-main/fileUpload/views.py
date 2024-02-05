from email.policy import HTTP
from urllib import request
import ftplib
import paramiko
from rest_framework import viewsets, status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
# from storages.backends.sftpstorage import SFTPStorage
from fileUpload.models import File
# from django.core.files import File
from .serializers import FileSerializer
from django.http import JsonResponse
import fitz
from django.http import HttpResponse

import docx2txt
import PyPDF2
# HOSTNAME = '192.168.100.108'
# USERNAME = 'HRMS-DEV-VM\admin'
# PASSWORD = 'HRMSDev@456'
# ssh = paramiko.SSHClient()
# ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# ssh.connect(hostname=HOSTNAME,banner_timeout=200)
# ssh.connect(hostname=HOSTNAME, username= USERNAME, password= PASSWORD, port=21)
# sftp_client = ssh.open_sftp()
# print('this is sftp',dir(sftp_client))
# ssh.close()
# import spacy
# import nltk
# from pyresparser import ResumeParser



# def upload_cv(request):
#     if request.method == 'POST' and request.FILES['cv']:
#         cv_file = request.FILES['cv']
#         parsed_data = ResumeParser(cv_file).get_extracted_data()
#         # Extract the relevant information from parsed_data and do something with it
#         return Response({'parsed_data': parsed_data})


class console():
    def log(value=""):
        print(value)

class FileUploadView(viewsets.ViewSet):
    permission_classes= (AllowAny,)
    parser_class = (FileUploadParser,)
    serializer_class = FileSerializer
    






    def get_queryset(self):
        queryset = File.objects.all()
        return queryset

    def post(self, request, *args, **kwargs):
        # file = request.FILES['file']
        # # parse = docx2txt.process(file)
        # with fitz.open(file) as doc:
        #     text = ""
        #     for page in doc:
        #         text += page.get_text()
        # # Do something with the extracted text (e.g. save to database)
        # return Response(text)
        # pdf_reader = PyPDF2.PdfFileReader(pdf_reader)
        # print("kkkkkkkkkkk", pdf_reader)
        # return Response({'message':'File Uploaded Successfully'})
        # Import Module
        # 'hostname':'192.168.100.108',
        # 'username': 'HRMS-DEV-VM\admin',
        # 'password': 'HRMSDev@456',
        # Fill Required Information
        # try:
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            myprocess= docx2txt
            print('this is data', file_serializer.data['file'])
            
            return Response(
                
                {'message':'File Uploaded Successfully','error':False,'code':200,'result':{'items':file_serializer.data}},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {'message':'File Uploaded Successfully','error':True,'code':400,'result':{'items':file_serializer.errors}},
                status=status.HTTP_400_BAD_REQUEST
            )

    def put(self, request):
        imageid = self.request.POST.get('id')
    
        f_obj = File.objects.filter(id=imageid) #File is my model name
        file_serializer = FileSerializer(f_obj, data=request.data)
        print(file_serializer)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(
                file_serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                file_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def delete(self, request, pk):
        imageid = self.request.POST.get('id')
        print('this is runnign')
        f_obj = File.objects.filter(id=pk) #File is my model name
        if f_obj.exists():
            f_obj.delete()
            return Response(
                {
                    "Status": True,
                    "Message": "image deleted"
                }
            )
