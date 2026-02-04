import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function DiagnosisScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      // Request permissions first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Gallery permission is needed to select images');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const simulateAnalysis = () => {
    if (!image) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setLoading(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Analysis Complete',
        'AI has analyzed your image. This is a demo - real analysis will be added later.',
        [
          { 
            text: "View Results", 
            onPress: () => {
              // Navigate to results screen or show results here
              Alert.alert('Demo Results', 'Condition: Healthy\nConfidence: 95%');
            }
          },
          { text: "OK", style: "cancel" }
        ]
      );
    }, 2000);
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
        <Text style={styles.title}>Upload Biometrics</Text>
        <Text style={styles.subtitle}>
          Upload images for AI medical analysis
        </Text>
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialCommunityIcons name="camera-plus" size={60} color="#94A3B8" />
            <Text style={styles.placeholderText}>No image selected</Text>
            <Text style={styles.placeholderSubtext}>
              Take a photo or select from gallery
            </Text>
          </View>
        )}
      </View>

      {/* Image Selection Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.imageButton}
          onPress={pickImage}
        >
          <MaterialCommunityIcons name="image" size={24} color="#2D9CDB" />
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to get the best results:</Text>
        <View style={styles.instructionItem}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
          <Text style={styles.instructionText}>Take photo in good lighting</Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
          <Text style={styles.instructionText}>Focus on the affected area</Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
          <Text style={styles.instructionText}>Keep camera steady</Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#27AE60" />
          <Text style={styles.instructionText}>Avoid blurry images</Text>
        </View>
      </View>

      {/* Analyze Button */}
      <TouchableOpacity
        style={[styles.analyzeButton, (!image || loading) && styles.analyzeButtonDisabled]}
        onPress={simulateAnalysis}
        disabled={!image || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <MaterialCommunityIcons name="robot" size={24} color="#FFFFFF" />
            <Text style={styles.analyzeButtonText}>Analyze with AI</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Demo Notice */}
      <View style={styles.demoNotice}>
        <MaterialCommunityIcons name="information" size={20} color="#2D9CDB" />
        <Text style={styles.demoText}>
          This is where the user uploads the images for analyisis.
        </Text>
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
  imageContainer: {
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '500',
  },
  placeholderSubtext: {
    color: '#CBD5E1',
    fontSize: 14,
    marginTop: 4,
  },
  buttonRow: {
    marginBottom: 25,
  },
  imageButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonText: {
    marginLeft: 8,
    color: '#2D9CDB',
    fontWeight: '600',
    fontSize: 14,
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionText: {
    marginLeft: 12,
    color: '#64748B',
    fontSize: 14,
  },
  analyzeButton: {
    backgroundColor: '#27AE60',
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  demoNotice: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  demoText: {
    flex: 1,
    marginLeft: 12,
    color: '#1565C0',
    fontSize: 14,
    lineHeight: 20,
  },
});