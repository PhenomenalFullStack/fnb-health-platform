from rest_framework import serializers
from .models import CustomUser



# Convert the models to JSON and Vice Versa



class DoctorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'is_doctor', 'specialty']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # validate Doctor
        user = CustomUser.objects.create_user(**validated_data)
        return user
    

# Validate Patient
class CustomerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['is_customer'] = True
        return CustomUser.objects.create_user(**validated_data)
