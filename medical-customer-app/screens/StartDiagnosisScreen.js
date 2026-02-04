import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function StartDiagnosisScreen({ navigation }) {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('moderate');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [demographics, setDemographics] = useState({
    age: '',
    gender: 'prefer-not-to-say',
    weight: '',
    height: '',
  });

  const commonSymptoms = [
    { id: 1, name: 'Fever', icon: 'thermometer' },
    { id: 2, name: 'Headache', icon: 'head' },
    { id: 3, name: 'Cough', icon: 'lungs' },
    { id: 4, name: 'Fatigue', icon: 'sleep' },
    { id: 5, name: 'Nausea', icon: 'stomach' },
    { id: 6, name: 'Dizziness', icon: 'rotate-3d' },
    { id: 7, name: 'Chest Pain', icon: 'heart' },
    { id: 8, name: 'Shortness of Breath', icon: 'weather-windy' },
    { id: 9, name: 'Muscle Aches', icon: 'arm-flex' },
    { id: 10, name: 'Sore Throat', icon: 'microphone' },
    { id: 11, name: 'Runny Nose', icon: 'nose' },
    { id: 12, name: 'Abdominal Pain', icon: 'stomach' },
  ];

  const severityOptions = [
    { id: 'mild', label: 'Mild', color: '#27AE60', icon: 'emoticon-happy-outline' },
    { id: 'moderate', label: 'Moderate', color: '#F2994A', icon: 'emoticon-neutral-outline' },
    { id: 'severe', label: 'Severe', color: '#EB5757', icon: 'emoticon-sad-outline' },
    { id: 'emergency', label: 'Emergency', color: '#D32F2F', icon: 'alert-circle' },
  ];

  const durationOptions = [
    'Few hours', '1-2 days', '3-7 days', '1-2 weeks', '1+ month', 'Chronic'
  ];

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0 && symptoms.trim() === '') {
      Alert.alert('No Symptoms', 'Please describe your symptoms or select from the list.');
      return;
    }

    setLoading(true);

    // Combine selected symptoms with typed symptoms
    const allSymptoms = [
      ...selectedSymptoms.map(s => s.name),
      ...symptoms.split(',').map(s => s.trim()).filter(s => s.length > 0)
    ];

    // Simulate AI analysis (2 seconds delay)
    setTimeout(() => {
      setLoading(false);
      
      const mockDiagnosis = {
        conditions: [
          { name: 'Common Cold', confidence: 0.85, severity: 'low' },
          { name: 'Influenza', confidence: 0.72, severity: 'medium' },
          { name: 'Sinus Infection', confidence: 0.65, severity: 'low' },
        ],
        recommendations: [
          'Rest and drink plenty of fluids',
          'Over-the-counter pain relievers if needed',
          'Monitor temperature every 4 hours',
          'See a doctor if symptoms worsen or persist beyond 7 days'
        ],
        emergency: false,
        aiNotes: 'Based on your symptoms, these are the most likely conditions. This is not a medical diagnosis - please consult with a healthcare professional.'
      };

      navigation.navigate('DiagnosisResults', {
        diagnosis: mockDiagnosis,
        symptoms: allSymptoms,
        duration,
        severity,
        demographics
      });
    }, 2000);
  };

  const quickDiagnosis = () => {
    Alert.alert(
      'Quick Diagnosis',
      'Would you like to try a demo with common symptoms?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Use Demo',
          onPress: () => {
            setSelectedSymptoms([commonSymptoms[0], commonSymptoms[2], commonSymptoms[3]]);
            setSymptoms('Mild headache, runny nose');
            setDuration('1-2 days');
            setSeverity('mild');
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#2D9CDB" />
          </TouchableOpacity>
          <Text style={styles.title}>Symptom Analysis</Text>
          <Text style={styles.subtitle}>
            Describe your symptoms for AI diagnosis
          </Text>
        </View>

        {/* Quick Demo Button */}
        <TouchableOpacity 
          style={styles.demoButton}
          onPress={quickDiagnosis}
        >
          <Ionicons name="flash-outline" size={20} color="#2D9CDB" />
          <Text style={styles.demoButtonText}>Try Quick Diagnosis Demo</Text>
        </TouchableOpacity>

        {/* Symptoms Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="clipboard-text" size={20} color="#2D9CDB" />
            {' '}Describe Your Symptoms
          </Text>
          <TextInput
            style={styles.symptomsInput}
            placeholder="Describe your symptoms in detail (e.g., fever, headache, cough)"
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Common Symptoms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="format-list-checks" size={20} color="#2D9CDB" />
            {' '}Common Symptoms
          </Text>
          <Text style={styles.sectionSubtitle}>Tap to select symptoms you're experiencing</Text>
          
          <View style={styles.symptomsGrid}>
            {commonSymptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomButton,
                  selectedSymptoms.includes(symptom) && styles.symptomButtonSelected
                ]}
                onPress={() => toggleSymptom(symptom)}
              >
                <MaterialCommunityIcons
                  name={symptom.icon}
                  size={20}
                  color={selectedSymptoms.includes(symptom) ? '#FFFFFF' : '#2D9CDB'}
                />
                <Text style={[
                  styles.symptomText,
                  selectedSymptoms.includes(symptom) && styles.symptomTextSelected
                ]}>
                  {symptom.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#2D9CDB" />
            {' '}Duration of Symptoms
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.durationScroll}
          >
            <View style={styles.durationContainer}>
              {durationOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.durationButton,
                    duration === option && styles.durationButtonSelected
                  ]}
                  onPress={() => setDuration(option)}
                >
                  <Text style={[
                    styles.durationText,
                    duration === option && styles.durationTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Severity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#2D9CDB" />
            {' '}Severity Level
          </Text>
          <View style={styles.severityContainer}>
            {severityOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.severityButton,
                  { borderColor: option.color },
                  severity === option.id && { backgroundColor: option.color }
                ]}
                onPress={() => setSeverity(option.id)}
              >
                <MaterialCommunityIcons
                  name={option.icon}
                  size={20}
                  color={severity === option.id ? '#FFFFFF' : option.color}
                />
                <Text style={[
                  styles.severityText,
                  { color: severity === option.id ? '#FFFFFF' : option.color }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="note-text" size={20} color="#2D9CDB" />
            {' '}Additional Information (Optional)
          </Text>
          <TextInput
            style={styles.additionalInput}
            placeholder="Any other relevant information (medications, allergies, medical history)"
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Demographic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <MaterialCommunityIcons name="account-details" size={20} color="#2D9CDB" />
            {' '}Demographic Information (Optional)
          </Text>
          
          <View style={styles.demographicsRow}>
            <View style={styles.demographicInputContainer}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.demographicInput}
                placeholder="e.g., 30"
                value={demographics.age}
                onChangeText={(text) => setDemographics({...demographics, age: text})}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.demographicInputContainer}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.demographicInput}
                placeholder="e.g., 70"
                value={demographics.weight}
                onChangeText={(text) => setDemographics({...demographics, weight: text})}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.demographicInputContainer}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.demographicInput}
                placeholder="e.g., 170"
                value={demographics.height}
                onChangeText={(text) => setDemographics({...demographics, height: text})}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          <View style={styles.genderContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderButtons}>
              {['male', 'female', 'prefer-not-to-say'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    demographics.gender === gender && styles.genderButtonSelected
                  ]}
                  onPress={() => setDemographics({...demographics, gender})}
                >
                  <Text style={[
                    styles.genderText,
                    demographics.gender === gender && styles.genderTextSelected
                  ]}>
                    {gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Prefer not to say'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Selected Symptoms Preview */}
        {selectedSymptoms.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedTitle}>Selected Symptoms:</Text>
            <View style={styles.selectedSymptoms}>
              {selectedSymptoms.map((symptom, index) => (
                <View key={index} style={styles.selectedSymptom}>
                  <MaterialCommunityIcons name="check-circle" size={16} color="#27AE60" />
                  <Text style={styles.selectedSymptomText}>{symptom.name}</Text>
                  <TouchableOpacity onPress={() => toggleSymptom(symptom)}>
                    <Ionicons name="close-circle" size={16} color="#EB5757" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Analyze Button */}
        <TouchableOpacity
          style={[styles.analyzeButton, loading && styles.analyzeButtonDisabled]}
          onPress={analyzeSymptoms}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <MaterialCommunityIcons name="robot" size={24} color="#FFFFFF" />
              <Text style={styles.analyzeButtonText}>Analyze Symptoms with AI</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <MaterialCommunityIcons name="shield-check" size={20} color="#94A3B8" />
          <Text style={styles.disclaimerText}>
            This AI diagnosis is for informational purposes only. Always consult a healthcare professional for medical advice.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
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
  demoButton: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  demoButtonText: {
    marginLeft: 8,
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  symptomsInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  symptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F9FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 6,
    borderWidth: 1,
    borderColor: '#D6E9FF',
  },
  symptomButtonSelected: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  symptomText: {
    marginLeft: 8,
    color: '#2D9CDB',
    fontWeight: '500',
    fontSize: 13,
  },
  symptomTextSelected: {
    color: '#FFFFFF',
  },
  durationScroll: {
    marginHorizontal: -20,
  },
  durationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  durationButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#F1F5F9',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  durationButtonSelected: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  durationText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  durationTextSelected: {
    color: '#FFFFFF',
  },
severityContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: -6,
},

severityButton: {
  width: '48%', 
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  marginHorizontal: '1%',
  marginVertical: 5,
  borderRadius: 12,
  borderWidth: 2,
  minHeight: 20,
},
severityText: {
  marginTop: 6, 
  fontSize: 12, 
  fontWeight: '600',
  textAlign: 'center',
},
  additionalInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  demographicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  demographicInputContainer: {
    flex: 1,
    marginHorizontal: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  demographicInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  genderContainer: {
    marginTop: 10,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  genderButtonSelected: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  genderText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#FFFFFF',
  },
  selectedContainer: {
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  selectedSymptoms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedSymptom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSymptomText: {
    marginLeft: 6,
    marginRight: 8,
    color: '#1E293B',
    fontSize: 13,
  },
  analyzeButton: {
    backgroundColor: '#2D9CDB',
    borderRadius: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 12,
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
  },
});