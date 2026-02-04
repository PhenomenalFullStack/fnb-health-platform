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

export default function PendingTestsScreen({ navigation }) {
  // Dummy data for pending tests
  const pendingTests = [
    {
      id: 1,
      name: 'Complete Blood Count',
      type: 'Blood Test',
      orderedBy: 'Dr. Sarah Johnson',
      orderedDate: '2024-01-20',
      dueDate: '2024-01-30',
      status: 'Scheduled',
      location: 'City Lab Center',
      instructions: 'Fasting required for 8 hours',
      priority: 'High',
    },
    {
      id: 2,
      name: 'Chest X-Ray',
      type: 'Radiology',
      orderedBy: 'Dr. Michael Chen',
      orderedDate: '2024-01-18',
      dueDate: '2024-02-05',
      status: 'Pending Sample',
      location: 'Regional Hospital',
      instructions: 'No special preparation needed',
      priority: 'Medium',
    },
    {
      id: 3,
      name: 'Lipid Profile',
      type: 'Blood Test',
      orderedBy: 'Dr. Lisa Wang',
      orderedDate: '2024-01-15',
      dueDate: '2024-02-10',
      status: 'Sample Collected',
      location: 'City Lab Center',
      instructions: '12 hours fasting required',
      priority: 'Medium',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#EB5757';
      case 'medium': return '#F2994A';
      case 'low': return '#2D9CDB';
      default: return '#64748B';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return '#2D9CDB';
      case 'pending sample': return '#F2994A';
      case 'sample collected': return '#9B51E0';
      case 'in progress': return '#F2994A';
      case 'completed': return '#27AE60';
      default: return '#64748B';
    }
  };

  const handleReschedule = (testId) => {
    Alert.alert(
      'Reschedule Test',
      'Would you like to reschedule this test?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reschedule', onPress: () => console.log(`Reschedule test ${testId}`) }
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
            <Text style={styles.title}>Pending Tests</Text>
            <Text style={styles.subtitle}>{pendingTests.length} tests awaiting completion</Text>
          </View>
        </View>

        {/* Stats Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="clock" size={24} color="#F2994A" />
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Overdue</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="calendar" size={24} color="#2D9CDB" />
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>This Week</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <MaterialCommunityIcons name="check-circle" size={24} color="#27AE60" />
            <Text style={styles.summaryNumber}>0</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* Test Cards */}
        {pendingTests.map((test) => (
          <View key={test.id} style={styles.testCard}>
            <View style={styles.testHeader}>
              <View style={styles.testTitleRow}>
                <MaterialCommunityIcons name="test-tube" size={20} color="#2D9CDB" />
                <Text style={styles.testName}>{test.name}</Text>
              </View>
              <View style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(test.priority) }
              ]}>
                <Text style={styles.priorityText}>{test.priority}</Text>
              </View>
            </View>

            <View style={styles.testTypeRow}>
              <View style={[
                styles.typeBadge,
                { backgroundColor: test.type === 'Blood Test' ? '#FFF5F5' : '#F0FFF4' }
              ]}>
                <Text style={[
                  styles.typeText,
                  { color: test.type === 'Blood Test' ? '#EB5757' : '#27AE60' }
                ]}>
                  {test.type}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(test.status) }
              ]}>
                <Text style={styles.statusText}>{test.status}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="doctor" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Ordered by: {test.orderedBy}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Order date: {test.orderedDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar-clock" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Due date: {test.dueDate}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#94A3B8" />
              <Text style={styles.infoText}>Location: {test.location}</Text>
            </View>

            <View style={styles.instructionsContainer}>
              <MaterialCommunityIcons name="information" size={16} color="#2D9CDB" />
              <Text style={styles.instructionsText}>{test.instructions}</Text>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => Alert.alert('Directions', `Directions to ${test.location}`)}
              >
                <MaterialCommunityIcons name="directions" size={18} color="#2D9CDB" />
                <Text style={styles.secondaryButtonText}>Directions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => handleReschedule(test.id)}
              >
                <MaterialCommunityIcons name="calendar-edit" size={18} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="clipboard-text" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>View Test History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <MaterialCommunityIcons name="download" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Download Requisition</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.helpContainer}>
          <MaterialCommunityIcons name="information" size={24} color="#2D9CDB" />
          <Text style={styles.helpText}>
            Remember to bring your health card and test requisition form to your appointment.
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
  testCard: {
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
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  testTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  testName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  testTypeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
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
    flex: 1,
  },
  instructionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 20,
  },
  instructionsText: {
    marginLeft: 10,
    color: '#64748B',
    fontSize: 13,
    flex: 1,
    fontStyle: 'italic',
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#27AE60',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
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