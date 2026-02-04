import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function ActiveDiagnosesScreen({ navigation }) {
  // Dummy data for active diagnoses
  const activeDiagnoses = [
    {
      id: 1,
      condition: 'Acute Bronchitis',
      date: '2024-01-15',
      severity: 'Moderate',
      status: 'Active',
      doctor: 'Dr. Sarah Johnson',
      nextAppointment: '2024-01-30',
      symptoms: ['Cough', 'Fever', 'Shortness of breath'],
      image: null,
    },
    {
      id: 2,
      condition: 'Allergic Rhinitis',
      date: '2023-12-20',
      severity: 'Mild',
      status: 'Ongoing',
      doctor: 'Dr. Michael Chen',
      nextAppointment: '2024-02-15',
      symptoms: ['Runny nose', 'Sneezing', 'Itchy eyes'],
      image: null,
    },
    {
      id: 3,
      condition: 'Gastroesophageal Reflux',
      date: '2023-11-10',
      severity: 'Moderate',
      status: 'Under Treatment',
      doctor: 'Dr. Lisa Wang',
      nextAppointment: '2024-02-05',
      symptoms: ['Heartburn', 'Acid reflux', 'Chest pain'],
      image: null,
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild': return '#2D9CDB';
      case 'moderate': return '#F2994A';
      case 'severe': return '#EB5757';
      default: return '#64748B';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '#27AE60';
      case 'ongoing': return '#2D9CDB';
      case 'under treatment': return '#F2994A';
      default: return '#64748B';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#2D9CDB" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Active Diagnoses</Text>
            <Text style={styles.subtitle}>{activeDiagnoses.length} active conditions</Text>
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="clock" size={24} color="#2D9CDB" />
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Ongoing</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#F2994A" />
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Needs Follow-up</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#27AE60" />
            <Text style={styles.summaryNumber}>0</Text>
            <Text style={styles.summaryLabel}>Resolved</Text>
          </View>
        </View>

        {/* Diagnosis Cards */}
        {activeDiagnoses.map((diagnosis) => (
          <View key={diagnosis.id} style={styles.diagnosisCard}>
            <View style={styles.diagnosisHeader}>
              <View style={styles.conditionRow}>
                <MaterialCommunityIcons name="clipboard-pulse" size={20} color="#2D9CDB" />
                <Text style={styles.conditionName}>{diagnosis.condition}</Text>
              </View>
              <View style={[
                styles.severityBadge,
                { backgroundColor: getSeverityColor(diagnosis.severity) }
              ]}>
                <Text style={styles.severityText}>{diagnosis.severity}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Diagnosed: {diagnosis.date}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="doctor" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Doctor: {diagnosis.doctor}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar-check" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Next visit: {diagnosis.nextAppointment}</Text>
            </View>

            <View style={styles.symptomsContainer}>
              <Text style={styles.symptomsTitle}>Symptoms:</Text>
              <View style={styles.symptomsList}>
                {diagnosis.symptoms.map((symptom, index) => (
                  <View key={index} style={styles.symptomTag}>
                    <Text style={styles.symptomText}>{symptom}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.secondaryButton}>
                <MaterialCommunityIcons name="message-text" size={18} color="#2D9CDB" />
                <Text style={styles.secondaryButtonText}>Message Doctor</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.primaryButton}>
                <MaterialCommunityIcons name="calendar-plus" size={18} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add Diagnosis Button */}
        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus-circle" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Diagnosis</Text>
        </TouchableOpacity>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons name="information" size={24} color="#2D9CDB" />
          <Text style={styles.helpText}>
            Track your recovery progress and communicate with your healthcare provider regularly.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 25,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  diagnosisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  conditionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    color: '#64748B',
    fontSize: 14,
  },
  symptomsContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  symptomTag: {
    backgroundColor: '#F1F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  symptomText: {
    color: '#2D9CDB',
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F1F9FF',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#27AE60',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  helpContainer: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  helpText: {
    flex: 1,
    marginLeft: 12,
    color: '#1565C0',
    fontSize: 14,
    lineHeight: 20,
  },
});