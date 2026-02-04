from django.urls import path
from .views import DoctorRegisterView
from .views import DoctorDashboardView

urlpatterns = [
    path('register/', DoctorRegisterView.as_view(), name='doctor-register'),
]


# Protecting JWT 
urlpatterns = [
    path('register/', DoctorRegisterView.as_view(), name='doctor-register'),
    path('dashboard/', DoctorDashboardView.as_view(), name='doctor-dashboard'),
]
