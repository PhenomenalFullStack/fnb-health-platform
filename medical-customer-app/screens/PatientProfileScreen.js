import React, { useState } from 'react';
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
  Switch,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function PatientProfileScreen({ navigation }) {
  // Dummy data for Sarah Chen
  const [patientData, setPatientData] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    age: 38,
    gender: 'Female',
    bloodType: 'A+',
    height: '165 cm',
    weight: '62 kg',
    bmi: '22.8',
    address: '123 Wellness Street, Health City, HC 10001',
    emergencyContact: {
      name: 'David Chen',
      relationship: 'Husband',
      phone: '+1 (555) 987-6543',
    },
    primaryDoctor: 'Dr. Sarah Johnson',
    insuranceProvider: 'HealthCare Plus',
    insuranceId: 'HCP-78901234',
    allergies: ['Penicillin', 'Peanuts', 'Dust Mites'],
    chronicConditions: ['Asthma', 'Seasonal Allergies'],
    medications: ['Lisinopril', 'Metformin', 'Albuterol'],
    lastCheckup: '2024-01-15',
    nextAppointment: '2024-02-20',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    medicationReminders: true,
    testResults: true,
    healthTips: true,
    emergencyAlerts: true,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEditField = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    setPatientData(prev => ({
      ...prev,
      [editField]: editValue
    }));
    setEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const getBloodTypeColor = (bloodType) => {
    switch(bloodType) {
      case 'A+': return '#E53935';
      case 'A-': return '#D32F2F';
      case 'B+': return '#1976D2';
      case 'B-': return '#1565C0';
      case 'O+': return '#388E3C';
      case 'O-': return '#2E7D32';
      case 'AB+': return '#7B1FA2';
      case 'AB-': return '#6A1B9A';
      default: return '#666';
    }
  };

  const getBMIColor = (bmi) => {
    const num = parseFloat(bmi);
    if (num < 18.5) return '#2D9CDB'; // Underweight
    if (num >= 18.5 && num <= 24.9) return '#27AE60'; // Normal
    if (num >= 25 && num <= 29.9) return '#F2994A'; // Overweight
    return '#EB5757'; // Obese
  };

  const getBMICategory = (bmi) => {
    const num = parseFloat(bmi);
    if (num < 18.5) return 'Underweight';
    if (num >= 18.5 && num <= 24.9) return 'Normal';
    if (num >= 25 && num <= 29.9) return 'Overweight';
    return 'Obese';
  };

  const formatFieldName = (field) => {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const renderInfoCard = (title, icon, content, isEditable = false) => (
    <View style={styles.infoCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <MaterialCommunityIcons name={icon} size={20} color="#2D9CDB" />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        {isEditable && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditField(title.toLowerCase().replace(/ /g, ''), content)}
          >
            <Ionicons name="pencil" size={16} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.cardContent}>{content}</Text>
    </View>
  );

  const renderListCard = (title, icon, items) => (
    <View style={styles.infoCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <MaterialCommunityIcons name={icon} size={20} color="#2D9CDB" />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <MaterialCommunityIcons name="circle-small" size={20} color="#2D9CDB" />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#2D9CDB" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user-md" size={40} color="#FFFFFF" />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#27AE60" />
            </View>
          </View>
          
          <Text style={styles.userName}>{patientData.name}</Text>
          <Text style={styles.userEmail}>{patientData.email}</Text>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{patientData.age}</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: getBMIColor(patientData.bmi) }]}>
                {patientData.bmi}
              </Text>
              <Text style={styles.statLabel}>BMI</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: getBloodTypeColor(patientData.bloodType) }]}>
                {patientData.bloodType}
              </Text>
              <Text style={styles.statLabel}>Blood Type</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {renderInfoCard('Full Name', 'account', patientData.name, true)}
          {renderInfoCard('Email', 'email', patientData.email, true)}
          {renderInfoCard('Phone', 'phone', patientData.phone, true)}
          {renderInfoCard('Date of Birth', 'calendar', patientData.dateOfBirth, true)}
          {renderInfoCard('Gender', 'gender-male-female', patientData.gender, true)}
          {renderInfoCard('Address', 'home', patientData.address, true)}
        </View>

        {/* Health Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Information</Text>
          <View style={styles.healthGrid}>
            <View style={styles.healthCard}>
              <MaterialCommunityIcons name="ruler" size={24} color="#2D9CDB" />
              <Text style={styles.healthValue}>{patientData.height}</Text>
              <Text style={styles.healthLabel}>Height</Text>
            </View>
            <View style={styles.healthCard}>
              <MaterialCommunityIcons name="scale" size={24} color="#2D9CDB" />
              <Text style={styles.healthValue}>{patientData.weight}</Text>
              <Text style={styles.healthLabel}>Weight</Text>
            </View>
            <View style={styles.healthCard}>
              <MaterialCommunityIcons name="heart-pulse" size={24} color={getBMIColor(patientData.bmi)} />
              <Text style={[styles.healthValue, { color: getBMIColor(patientData.bmi) }]}>
                {patientData.bmi}
              </Text>
              <Text style={styles.healthLabel}>BMI</Text>
              <Text style={[styles.healthCategory, { color: getBMIColor(patientData.bmi) }]}>
                {getBMICategory(patientData.bmi)}
              </Text>
            </View>
            <View style={styles.healthCard}>
              <MaterialCommunityIcons name="water" size={24} color={getBloodTypeColor(patientData.bloodType)} />
              <Text style={[styles.healthValue, { color: getBloodTypeColor(patientData.bloodType) }]}>
                {patientData.bloodType}
              </Text>
              <Text style={styles.healthLabel}>Blood Type</Text>
            </View>
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          {renderListCard('Allergies', 'allergy', patientData.allergies)}
          {renderListCard('Chronic Conditions', 'heart-pulse', patientData.chronicConditions)}
          {renderListCard('Current Medications', 'pill', patientData.medications)}
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.emergencyCard}>
            <MaterialCommunityIcons name="account-alert" size={24} color="#EB5757" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyName}>{patientData.emergencyContact.name}</Text>
              <Text style={styles.emergencyRelationship}>{patientData.emergencyContact.relationship}</Text>
              <View style={styles.emergencyPhone}>
                <MaterialCommunityIcons name="phone" size={16} color="#2D9CDB" />
                <Text style={styles.emergencyNumber}>{patientData.emergencyContact.phone}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Insurance Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insurance Information</Text>
          {renderInfoCard('Insurance Provider', 'shield-check', patientData.insuranceProvider)}
          {renderInfoCard('Insurance ID', 'card-account-details', patientData.insuranceId)}
          {renderInfoCard('Primary Doctor', 'doctor', patientData.primaryDoctor)}
        </View>

        {/* Appointments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointments</Text>
          <View style={styles.appointmentRow}>
            <View style={styles.appointmentCard}>
              <MaterialCommunityIcons name="calendar-check" size={20} color="#27AE60" />
              <Text style={styles.appointmentLabel}>Last Checkup</Text>
              <Text style={styles.appointmentDate}>{patientData.lastCheckup}</Text>
            </View>
            <View style={styles.appointmentCard}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color="#2D9CDB" />
              <Text style={styles.appointmentLabel}>Next Appointment</Text>
              <Text style={styles.appointmentDate}>{patientData.nextAppointment}</Text>
            </View>
          </View>
        </View>

        {/* Notifications Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.notificationCard}>
            {Object.entries(notifications).map(([key, value]) => (
              <View key={key} style={styles.notificationItem}>
                <View>
                  <Text style={styles.notificationLabel}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                  <Text style={styles.notificationDescription}>
                    {key === 'appointmentReminders' && 'Reminders for upcoming appointments'}
                    {key === 'medicationReminders' && 'Daily medication reminders'}
                    {key === 'testResults' && 'Notifications when test results are ready'}
                    {key === 'healthTips' && 'Weekly health and wellness tips'}
                    {key === 'emergencyAlerts' && 'Important health alerts and updates'}
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={() => toggleNotification(key)}
                  trackColor={{ false: '#E2E8F0', true: '#2D9CDB' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.secondaryAction}>
            <MaterialCommunityIcons name="download" size={20} color="#2D9CDB" />
            <Text style={styles.secondaryActionText}>Export Health Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryAction}>
            <MaterialCommunityIcons name="medical-bag" size={20} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>Medical ID Card</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton}>
          <MaterialCommunityIcons name="logout" size={20} color="#EB5757" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit {formatFieldName(editField)}</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter ${formatFieldName(editField).toLowerCase()}`}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalSaveButton}
                onPress={saveEdit}
              >
                <Text style={styles.modalSaveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingTop: 10,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2D9CDB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginLeft: 8,
  },
  editButton: {
    padding: 4,
  },
  cardContent: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  listContainer: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listText: {
    marginLeft: 8,
    color: '#1E293B',
    fontSize: 14,
    flex: 1,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  healthCard: {
    width: '50%',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  healthValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  healthLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  healthCategory: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  emergencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 16,
  },
  emergencyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  emergencyRelationship: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  emergencyPhone: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyNumber: {
    marginLeft: 8,
    color: '#2D9CDB',
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: '#2D9CDB',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  appointmentLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  notificationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 12,
    color: '#64748B',
    maxWidth: '80%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F1F9FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    marginLeft: 8,
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 14,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2D9CDB',
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 30,
  },
  signOutText: {
    marginLeft: 8,
    color: '#EB5757',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 14,
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 14,
    marginLeft: 8,
    alignItems: 'center',
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});