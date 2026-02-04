from django.shortcuts import render


# Defines how the end points should behave.
# Functions Features.


# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import DoctorRegistrationSerializer
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes

from .serializers import CustomerRegistrationSerializer


# Handles Doctors registration.
class DoctorRegisterView(APIView):
    def post(self, request):
        serializer = DoctorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# JWT Token protection
class DoctorDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "message": f"Welcome, Dr. {request.user.username}!",
            "specialty": request.user.specialty,
            "email": request.user.email,
        })


# ///Dashboard///
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def doctor_profile(request):
    user = request.user
    serializer = DoctorRegistrationSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
def register_customer(request):
    serializer = CustomerRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
