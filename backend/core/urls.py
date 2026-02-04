"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include



# URLs route



# Added for the JWT tokens
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Views from the users app
from users.views import DoctorRegisterView, doctor_profile, DoctorDashboardView

# 
from users.views import register_customer

urlpatterns = [
    path('admin/', admin.site.urls),

    # Include other app URLs
    path('api/users/', include('users.urls')),

    # Directly routed views
    path('api/users/register/', DoctorRegisterView.as_view(), name='register'),
    path('api/users/profile/', doctor_profile, name='doctor-profile'),
    path('api/users/dashboard/', DoctorDashboardView.as_view(), name='doctor-dashboard'),

    # JWT endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    # Mobile endpoint
    path('api/customers/register/', register_customer),
]

