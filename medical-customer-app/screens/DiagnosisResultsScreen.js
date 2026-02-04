import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function DiagnosisResultsScreen({ navigation, route }) {
  const { diagnosis, symptoms, duration, severity, demographics } = route.params || {};
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return '#27AE60';
      case 'medium': return '#F2994A';
      case 'high': return '#EB5757';
      default: return '#64748B';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2D9CDB" />
        </TouchableOpacity>
        <Text style={styles.title}>Diagnosis Results</Text>
        <Text style={styles.subtitle}>
          AI Analysis Complete
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <MaterialCommunityIcons name="clipboard-check" size={28} color="#2D9CDB" />
          <Text style={styles.summaryTitle}>Analysis Summary</Text>
        </View>
        <Text style={styles.summaryText}>
          Based on your symptoms, here are the potential conditions identified by our AI system.
        </Text>
      </View>

      {/* Conditions */}
      {diagnosis?.conditions?.map((condition, index) => (
        <View key={index} style={styles.conditionCard}>
          <View style={styles.conditionHeader}>
            <Text style={styles.conditionName}>{condition.name}</Text>
            <View style={[
              styles.confidenceBadge,
              { backgroundColor: getSeverityColor(condition.severity) }
            ]}>
              <Text style={styles.confidenceText}>
                {(condition.confidence * 100).toFixed(1)}% confidence
              </Text>
            </View>
          </View>
          <View style={styles.severityRow}>
            <View style={[
              styles.severityIndicator,
              { backgroundColor: getSeverityColor(condition.severity) }
            ]}>
              <Text style={styles.severityIndicatorText}>
                {condition.severity.toUpperCase()} SEVERITY
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* Recommendations */}
      {diagnosis?.recommendations && (
        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Recommendations</Text>
          {diagnosis.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationItem}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
              <Text style={styles.recommendationText}>{rec}</Text>
            </View>
          ))}
        </View>
      )}

      {/* AI Notes */}
      {diagnosis?.aiNotes && (
        <View style={styles.notesCard}>
          <MaterialCommunityIcons name="robot" size={24} color="#2D9CDB" />
          <Text style={styles.notesText}>{diagnosis.aiNotes}</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <MaterialCommunityIcons name="home" size={20} color="#2D9CDB" />
          <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Diagnosis')}
        >
          <MaterialCommunityIcons name="camera" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  summaryCard: {
    backgroundColor: '#F1F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
  conditionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  conditionName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  confidenceBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  severityRow: {
    marginBottom: 8,
  },
  severityIndicator: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  severityIndicatorText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  recommendationsCard: {
    backgroundColor: '#F0FFF4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationText: {
    flex: 1,
    marginLeft: 12,
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
  },
  notesCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  notesText: {
    flex: 1,
    marginLeft: 12,
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F1F9FF',
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    marginLeft: 8,
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 14,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2D9CDB',
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});