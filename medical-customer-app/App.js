import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

// Profile
import PatientProfileScreen from './screens/PatientProfileScreen';

// Health Overview
import ActiveDiagnosesScreen from './screens/ActiveDiagnosesScreen';
import PendingTestsScreen from './screens/PendingTestsScreen';
import DoctorVisitsScreen from './screens/DoctorVisitsScreen';
import MedicationsScreen from './screens/MedicationsScreen';

// Quick Actions
import DiagnosisScreen from './screens/DiagnosisScreen';
import StartDiagnosisScreen from './screens/StartDiagnosisScreen';
import DiagnosisResultsScreen from './screens/DiagnosisResultsScreen';
import MedicalDocumentsScreen from './screens/MedicalDocumentsScreen';
import MyDoctorScreen from './screens/MyDoctorScreen';
import HealthTipsScreen from './screens/HealthTipsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />

        {/* Profile */}
        <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />

        {/* Health Overview */}
        <Stack.Screen name="ActiveDiagnoses" component={ActiveDiagnosesScreen} /> 
        <Stack.Screen name="PendingTests" component={PendingTestsScreen} /> 
        <Stack.Screen name="DoctorVisits" component={DoctorVisitsScreen} /> 
        <Stack.Screen name="Medications" component={MedicationsScreen} /> 

        {/* Quick Actions */}
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} /> 
        <Stack.Screen name="StartDiagnosis" component={StartDiagnosisScreen} /> 
        <Stack.Screen name="DiagnosisResults" component={DiagnosisResultsScreen} /> 
        <Stack.Screen name="MedicalDocuments" component={MedicalDocumentsScreen} /> 
        <Stack.Screen name="MyDoctor" component={MyDoctorScreen} /> 
        <Stack.Screen name="HealthTips" component={HealthTipsScreen} /> 


      </Stack.Navigator>
    </NavigationContainer>
  );
}