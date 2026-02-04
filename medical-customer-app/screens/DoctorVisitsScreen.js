import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function DoctorVisitsScreen({ navigation }) {
  // Dummy data for doctor visits
  const doctorVisits = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Physician',
      date: '2024-01-30',
      time: '10:30 AM',
      status: 'Upcoming',
      location: 'City Medical Center',
      address: '123 Medical St, Suite 405',
      purpose: 'Follow-up for bronchitis',
      notes: 'Bring recent test results',
      type: 'In-person',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: '2024-02-15',
      time: '2:00 PM',
      status: 'Scheduled',
      location: 'Heart Health Clinic',
      address: '456 Heart Ave, Floor 3',
      purpose: 'Annual heart check-up',
      notes: 'Fasting required for blood work',
      type: 'Telehealth',
    },
    {
      id: 3,
      doctor: 'Dr. Lisa Wang',
      specialty: 'Gastroenterologist',
      date: '2024-01-25',
      time: '9:00 AM',
      status: 'Completed',
      location: 'Digestive Health Center',
      address: '789 Wellness Blvd',
      purpose: 'GERD follow-up',
      notes: 'Continue prescribed medication',
      type: 'In-person',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming': return '#2D9CDB';
      case 'scheduled': return '#F2994A';
      case 'completed': return '#27AE60';
      case 'cancelled': return '#EB5757';
      default: return '#64748B';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'in-person': return '#2D9CDB';
      case 'telehealth': return '#9B51E0';
      case 'emergency': return '#EB5757';
      default: return '#64748B';
    }
  };

  const handleJoinCall = (visitId) => {
    Alert.alert(
      'Join Call',
      'Ready to join your telehealth appointment?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join Now', onPress: () => console.log(`Join call for visit ${visitId}`) }
      ]
    );
  };

  const handleCancel = (visitId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: () => console.log(`Cancel visit ${visitId}`)
        }
      ]
    );
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
            <Text style={styles.title}>Doctor Visits</Text>
            <Text style={styles.subtitle}>Manage your appointments</Text>
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="calendar-check" size={24} color="#27AE60" />
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="calendar-clock" size={24} color="#2D9CDB" />
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>Upcoming</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="calendar-remove" size={24} color="#EB5757" />
            <Text style={styles.summaryNumber}>0</Text>
            <Text style={styles.summaryLabel}>Cancelled</Text>
          </View>
        </View>

        {/* Next Appointment Card */}
        <View style={styles.nextAppointmentCard}>
          <View style={styles.nextAppointmentHeader}>
            <MaterialCommunityIcons name="calendar-star" size={24} color="#FFFFFF" />
            <Text style={styles.nextAppointmentTitle}>Next Appointment</Text>
          </View>
          <View style={styles.nextAppointmentContent}>
            <Text style={styles.nextDoctorName}>{doctorVisits[0].doctor}</Text>
            <Text style={styles.nextSpecialty}>{doctorVisits[0].specialty}</Text>
            <View style={styles.nextDateTime}>
              <MaterialCommunityIcons name="calendar" size={16} color="#2D9CDB" />
              <Text style={styles.nextDateText}>{doctorVisits[0].date} at {doctorVisits[0].time}</Text>
            </View>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
              <Ionicons name="arrow-forward" size={16} color="#2D9CDB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Visit Cards */}
        {doctorVisits.map((visit) => (
          <View key={visit.id} style={styles.visitCard}>
            <View style={styles.visitHeader}>
              <View>
                <Text style={styles.doctorName}>{visit.doctor}</Text>
                <Text style={styles.specialty}>{visit.specialty}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(visit.status) }
              ]}>
                <Text style={styles.statusText}>{visit.status}</Text>
              </View>
            </View>

            <View style={styles.visitDetails}>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="calendar" size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{visit.date} • {visit.time}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{visit.location}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="file-document" size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{visit.purpose}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="note-text" size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{visit.notes}</Text>
              </View>
            </View>

            <View style={styles.visitFooter}>
              <View style={[
                styles.typeBadge,
                { backgroundColor: getTypeColor(visit.type) }
              ]}>
                <Text style={styles.typeText}>{visit.type}</Text>
              </View>
              
              <View style={styles.visitActions}>
                {visit.type === 'Telehealth' && visit.status === 'Upcoming' && (
                  <TouchableOpacity 
                    style={styles.joinButton}
                    onPress={() => handleJoinCall(visit.id)}
                  >
                    <MaterialCommunityIcons name="video" size={18} color="#FFFFFF" />
                    <Text style={styles.joinButtonText}>Join Call</Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  style={styles.rescheduleButton}
                  onPress={() => Alert.alert('Reschedule', `Reschedule with ${visit.doctor}`)}
                >
                  <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => handleCancel(visit.id)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <TouchableOpacity style={styles.bookButton}>
          <MaterialCommunityIcons name="calendar-plus" size={24} color="#FFFFFF" />
          <Text style={styles.bookButtonText}>Book New Appointment</Text>
        </TouchableOpacity>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons name="information" size={24} color="#2D9CDB" />
          <Text style={styles.helpText}>
            Arrive 15 minutes early for in-person appointments. For telehealth, ensure stable internet connection.
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
  nextAppointmentCard: {
    backgroundColor: '#2D9CDB',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  nextAppointmentHeader: {
    backgroundColor: '#1A78C2',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextAppointmentTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  nextAppointmentContent: {
    padding: 20,
  },
  nextDoctorName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextSpecialty: {
    color: '#E3F2FD',
    fontSize: 16,
    marginBottom: 12,
  },
  nextDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextDateText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  visitCard: {
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
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#64748B',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  visitDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
    color: '#64748B',
    fontSize: 14,
    flex: 1,
  },
  visitFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  visitActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  joinButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#27AE60',
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: '#F1F9FF',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 13,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
    paddingVertical: 10,
    marginLeft: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#EB5757',
    fontWeight: '600',
    fontSize: 13,
  },
  bookButton: {
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
  bookButtonText: {
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