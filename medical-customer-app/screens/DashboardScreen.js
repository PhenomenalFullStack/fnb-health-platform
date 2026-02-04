import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function DashboardScreen({ navigation, route }) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Logout",
        onPress: () => navigation.reset({
          index: 0,
          routes: [{ name: 'Login', params: { logoutMessage: "👋 You've been logged out successfully." } }],
        })
      }
    ]);
  };

  const mainFeatures = [
    { 
      id: 1, 
      title: "Start Diagnosis", 
      icon: "stethoscope", 
      color: "#2D9CDB",
      subtitle: "AI Symptom Analysis",
      onPress: () => navigation.navigate('StartDiagnosis')
    },
    { 
      id: 2, 
      title: "Upload Biometrics", 
      icon: "heart-pulse", 
      color: "#27AE60",
      subtitle: "X-ray/CNN Analysis",
      onPress: () => navigation.navigate('Diagnosis') 
    },
    { 
      id: 3, 
      title: "Diagnosis History", 
      icon: "history", 
      color: "#9B51E0",
      subtitle: "Past Reports & Records",
      onPress: () => navigation.navigate('DiagnosisResults')
    },
    { 
      id: 4, 
      title: "Medical Documents", 
      icon: "file-document", 
      color: "#F2994A",
      subtitle: "PDF & Image Upload",
      onPress: () => navigation.navigate('MedicalDocuments')
    },
    { 
      id: 5, 
      title: "My Doctor", 
      icon: "doctor", 
      color: "#EB5757",
      subtitle: "Specialist Profile",
      onPress: () => navigation.navigate('MyDoctor') 
    },
    { 
      id: 6, 
      title: "Health Tips", 
      icon: "bell-ring", 
      color: "#56CCF2",
      subtitle: "AI Recommendations",
      onPress: () => navigation.navigate('HealthTips')
    },
  ];

    const stats = [
    { 
      label: "Active Diagnoses", 
      value: "3", 
      icon: "clipboard-pulse",
      onPress: () => navigation.navigate('ActiveDiagnoses')
    },
    { 
      label: "Pending Tests", 
      value: "1", 
      icon: "test-tube",
      onPress: () => navigation.navigate('PendingTests')
    },
    { 
      label: "Doctor Visits", 
      value: "2", 
      icon: "calendar-heart",
      onPress: () => navigation.navigate('DoctorVisits')
    },
    { 
      label: "Medications", 
      value: "5", 
      icon: "pill",
      onPress: () => navigation.navigate('Medications')
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Sarah Chen</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</Text>
          </View>

          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('PatientProfile')}
          >
            <FontAwesome5 name="user-md" size={24} color="#2D9CDB" />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.statCard}
                onPress={stat.onPress}
              >
                <MaterialCommunityIcons 
                  name={stat.icon} 
                  size={22} 
                  color="#2D9CDB" 
                  style={styles.statIcon}
                />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.featuresGrid}>
          {mainFeatures.map((feature) => (
            <TouchableOpacity 
              key={feature.id} 
              style={styles.featureCard}
              onPress={feature.onPress}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${feature.color}15` }]}>
                <MaterialCommunityIcons 
                  name={feature.icon} 
                  size={28} 
                  color={feature.color} 
                />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Support Section */}
        <View style={styles.supportContainer}>
          <View style={styles.supportHeader}>
            <MaterialCommunityIcons name="headset" size={24} color="#2D9CDB" />
            <Text style={styles.supportTitle}>Need Help?</Text>
          </View>
          <TouchableOpacity 
            style={styles.supportButton}
            onPress={() => Alert.alert("Support", "Contact support or report a bug")}
          >
            <Text style={styles.supportButtonText}>Contact Support</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#EB5757" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Optional: logout success message */}
        {route.params?.logoutMessage && (
          <Text style={styles.logoutMsg}>{route.params.logoutMessage}</Text>
        )}
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
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#94A3B8',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
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
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  supportContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
  },
  supportButton: {
    backgroundColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoutText: {
    color: '#EB5757',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutMsg: {
    textAlign: 'center',
    color: '#27AE60',
    fontSize: 14,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});