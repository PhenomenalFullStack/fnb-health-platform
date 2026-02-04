from django.db import models



# Defines Database Schemas for the database



# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # doc model
    is_doctor = models.BooleanField(default=False)
    specialty = models.CharField(max_length=100, blank=True, null=True)

    # patient model
    is_customer = models.BooleanField(default=False)

    def __str__(self):
        return self.username
