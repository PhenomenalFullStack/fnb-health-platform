import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Switch,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function MedicationsScreen({ navigation }) {
  // Dummy data for medications
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      purpose: 'Bronchitis infection',
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      remaining: 15,
      total: 30,
      active: true,
      time: 'Morning, Afternoon, Night',
      withFood: true,
      doctor: 'Dr. Sarah Johnson',
      notes: 'Take with plenty of water',
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      purpose: 'Blood pressure',
      startDate: '2023-12-01',
      endDate: 'Ongoing',
      remaining: 60,
      total: 90,
      active: true,
      time: 'Morning',
      withFood: false,
      doctor: 'Dr. Michael Chen',
      notes: 'Monitor blood pressure weekly',
    },
    {
      id: 3,
      name: 'Metformin',
      dosage: '1000mg',
      frequency: 'Twice daily',
      purpose: 'Diabetes management',
      startDate: '2023-11-15',
      endDate: 'Ongoing',
      remaining: 45,
      total: 90,
      active: true,
      time: 'Morning, Evening',
      withFood: true,
      doctor: 'Dr. Lisa Wang',
      notes: 'Take with meals',
    },
    {
      id: 4,
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      purpose: 'Pain relief',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      remaining: 8,
      total: 20,
      active: true,
      time: 'When needed',
      withFood: true,
      doctor: 'Dr. Sarah Johnson',
      notes: 'Maximum 3 times daily',
    },
  ]);

  const toggleMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, active: !med.active } : med
    ));
  };

  const handleRefill = (medId) => {
    Alert.alert(
      'Request Refill',
      'Request a refill for this medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Request', 
          onPress: () => {
            Alert.alert('Success', 'Refill request sent to pharmacy');
          }
        }
      ]
    );
  };

  const getRemainingColor = (remaining, total) => {
    const percentage = (remaining / total) * 100;
    if (percentage > 50) return '#27AE60';
    if (percentage > 25) return '#F2994A';
    return '#EB5757';
  };

  const calculateProgress = (remaining, total) => {
    return (remaining / total) * 100;
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
            <Text style={styles.title}>Medications</Text>
            <Text style={styles.subtitle}>{medications.length} active prescriptions</Text>
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="pill" size={24} color="#2D9CDB" />
            <Text style={styles.summaryNumber}>4</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="clock-alert" size={24} color="#F2994A" />
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Due Soon</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#27AE60" />
            <Text style={styles.summaryNumber}>0</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* Medication Cards */}
        {medications.map((med) => (
          <View key={med.id} style={styles.medCard}>
            <View style={styles.medHeader}>
              <View style={styles.medTitleRow}>
                <MaterialCommunityIcons name="pill" size={24} color="#2D9CDB" />
                <View style={styles.medNameContainer}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDosage}>{med.dosage}</Text>
                </View>
              </View>
              <Switch
                value={med.active}
                onValueChange={() => toggleMedication(med.id)}
                trackColor={{ false: '#E2E8F0', true: '#27AE60' }}
              />
            </View>

            <View style={styles.medInfo}>
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#94A3B8" />
                <Text style={styles.infoText}>Frequency: {med.frequency}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="calendar" size={16} color="#94A3B8" />
                <Text style={styles.infoText}>Time: {med.time}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="food" size={16} color="#94A3B8" />
                <Text style={styles.infoText}>
                  Take {med.withFood ? 'with food' : 'on empty stomach'}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="doctor" size={16} color="#94A3B8" />
                <Text style={styles.infoText}>Prescribed by: {med.doctor}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="note-text" size={16} color="#94A3B8" />
                <Text style={styles.infoText}>{med.notes}</Text>
              </View>
            </View>

            {/* Remaining Pills */}
            <View style={styles.remainingContainer}>
              <View style={styles.remainingHeader}>
                <Text style={styles.remainingTitle}>Remaining Pills</Text>
                <Text style={[
                  styles.remainingCount,
                  { color: getRemainingColor(med.remaining, med.total) }
                ]}>
                  {med.remaining}/{med.total}
                </Text>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${calculateProgress(med.remaining, med.total)}%`,
                      backgroundColor: getRemainingColor(med.remaining, med.total)
                    }
                  ]}
                />
              </View>
              
              <Text style={styles.remainingText}>
                {med.remaining <= 7 ? 'Refill needed soon!' : 'Adequate supply'}
              </Text>
            </View>

            <View style={styles.medActions}>
              <TouchableOpacity 
                style={styles.refillButton}
                onPress={() => handleRefill(med.id)}
              >
                <MaterialCommunityIcons name="reload" size={18} color="#2D9CDB" />
                <Text style={styles.refillButtonText}>Request Refill</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={() => Alert.alert('Medication Info', `Detailed information for ${med.name}`)}
              >
                <MaterialCommunityIcons name="information" size={18} color="#FFFFFF" />
                <Text style={styles.infoButtonText}>More Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add Medication Button */}
        <TouchableOpacity style={styles.addButton}>
          <MaterialCommunityIcons name="plus-circle" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Medication</Text>
        </TouchableOpacity>

        {/* Medication Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Medication Tips</Text>
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
            <Text style={styles.tipText}>Take medications at the same time each day</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
            <Text style={styles.tipText}>Never stop taking medication without consulting your doctor</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
            <Text style={styles.tipText}>Store medications in a cool, dry place</Text>
          </View>
          <View style={styles.tipItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
            <Text style={styles.tipText}>Keep a list of all medications and share with doctors</Text>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons name="information" size={24} color="#2D9CDB" />
          <Text style={styles.helpText}>
            Set medication reminders in your phone's calendar to ensure you never miss a dose.
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
  medCard: {
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
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  medTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medNameContainer: {
    marginLeft: 12,
  },
  medName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  medDosage: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  medInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    color: '#64748B',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  remainingContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  remainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  remainingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  remainingCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  remainingText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  medActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  refillButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F1F9FF',
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refillButtonText: {
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  infoButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoButtonText: {
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
  tipsContainer: {
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    marginLeft: 12,
    color: '#27AE60',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
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
