from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import CandidateDropCv
from .serializers import CandidateDropCvSerializer


class CandidateDropCvViewSet(viewsets.ViewSet):
    def list(self, request):
        careerjobs = CandidateDropCv.objects.all()
        serializer = CandidateDropCvSerializer(careerjobs, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = CandidateDropCvSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Application submitted Successfully','error':False,'code':200,'result':{'totalItems':len(serializer.data),'items':serializer.data}}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Some thing went Wrong','error':True,'code':400,'result':{'items':serializer.errors}},status=status.HTTP_400_BAD_REQUEST)
       
        

    def retrieve(self, request, pk=None):
        candidateSumbitApp = CandidateDropCv.objects.get(id=pk)
        serializer = CandidateDropCvSerializer(candidateSumbitApp)
        return Response(serializer.data)

 