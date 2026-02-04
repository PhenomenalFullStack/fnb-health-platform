import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  CheckBox
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 6) strength += 1;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Phone number validation (optional but validate if provided)
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#E2E8F0';
    if (passwordStrength <= 2) return '#EB5757';
    if (passwordStrength <= 4) return '#F2994A';
    return '#27AE60';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Enter a password';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://172.26.164.11:8000/api/customers/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phoneNumber,
        })
      });

      if (response.ok) {
        setMessage('✅ Registration successful!');
        
        Alert.alert(
          "Registration Complete",
          "Your account has been created successfully!\n\nPlease check your email to verify your account.",
          [
            { 
              text: "Proceed to Login", 
              onPress: () => navigation.navigate('Login', {
                registrationSuccess: true,
                username: formData.username
              })
            }
          ]
        );
      } else {
        const data = await response.json();
        let errorMsg = 'Registration failed. Please try again.';
        
        if (data.username) {
          errorMsg = `Username: ${data.username.join(' ')}`;
        } else if (data.email) {
          errorMsg = `Email: ${data.email.join(' ')}`;
        } else if (data.password) {
          errorMsg = `Password: ${data.password.join(' ')}`;
        } else if (data.detail) {
          errorMsg = data.detail;
        }
        
        setMessage('❌ ' + errorMsg);
        Alert.alert("Registration Failed", errorMsg);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Network Error. Please check your connection.');
      Alert.alert(
        "Connection Error",
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    Alert.alert(
      "Demo Registration",
      "Fill form with demo data?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Fill Form", 
          onPress: () => {
            setFormData({
              username: 'john_doe',
              email: 'john.doe@example.com',
              password: 'SecurePass123!',
              confirmPassword: 'SecurePass123!',
              firstName: 'John',
              lastName: 'Doe',
              phoneNumber: '+1234567890',
            });
            setAgreedToTerms(true);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#2D9CDB" />
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons 
                name="account-plus" 
                size={44} 
                color="#2D9CDB" 
              />
              <Text style={styles.logoTitle}>Create Account</Text>
              <Text style={styles.logoSubtitle}>Join MediAI Medical Platform</Text>
            </View>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            {/* Name Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>
                  <FontAwesome5 name="user" size={14} color="#64748B" />{' '}
                  First Name
                </Text>
                <View style={[
                  styles.inputWrapper,
                  errors.firstName && styles.inputError
                ]}>
                  <TextInput
                    placeholder="John"
                    style={styles.input}
                    onChangeText={(text) => handleChange('firstName', text)}
                    value={formData.firstName}
                    editable={!isLoading}
                  />
                </View>
                {errors.firstName ? (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                ) : null}
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <View style={[
                  styles.inputWrapper,
                  errors.lastName && styles.inputError
                ]}>
                  <TextInput
                    placeholder="Doe"
                    style={styles.input}
                    onChangeText={(text) => handleChange('lastName', text)}
                    value={formData.lastName}
                    editable={!isLoading}
                  />
                </View>
                {errors.lastName ? (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                ) : null}
              </View>
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons name="account-outline" size={16} color="#64748B" />{' '}
                Username
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.username && styles.inputError
              ]}>
                <TextInput
                  placeholder="Choose a username"
                  style={styles.input}
                  onChangeText={(text) => handleChange('username', text)}
                  value={formData.username}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              {errors.username ? (
                <Text style={styles.errorText}>{errors.username}</Text>
              ) : (
                <Text style={styles.helperText}>3-30 characters, letters and numbers only</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons name="email-outline" size={16} color="#64748B" />{' '}
                Email Address
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.email && styles.inputError
              ]}>
                <TextInput
                  placeholder="your.email@example.com"
                  style={styles.input}
                  onChangeText={(text) => handleChange('email', text)}
                  value={formData.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              {errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : (
                <Text style={styles.helperText}>We'll send a verification email</Text>
              )}
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons name="phone-outline" size={16} color="#64748B" />{' '}
                Phone Number (Optional)
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.phoneNumber && styles.inputError
              ]}>
                <TextInput
                  placeholder="+1 (123) 456-7890"
                  style={styles.input}
                  onChangeText={(text) => handleChange('phoneNumber', text)}
                  value={formData.phoneNumber}
                  keyboardType="phone-pad"
                  editable={!isLoading}
                />
              </View>
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Security</Text>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons name="lock-outline" size={16} color="#64748B" />{' '}
                Password
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.password && styles.inputError
              ]}>
                <TextInput
                  placeholder="Create a strong password"
                  style={[styles.input, styles.passwordInput]}
                  onChangeText={(text) => handleChange('password', text)}
                  value={formData.password}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={22} 
                    color="#94A3B8" 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <View style={styles.passwordStrengthContainer}>
                  <View style={styles.strengthBar}>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <View
                        key={index}
                        style={[
                          styles.strengthSegment,
                          {
                            backgroundColor: index <= passwordStrength 
                              ? getPasswordStrengthColor() 
                              : '#E2E8F0'
                          }
                        ]}
                      />
                    ))}
                  </View>
                  <Text style={[
                    styles.strengthText,
                    { color: getPasswordStrengthColor() }
                  ]}>
                    {getPasswordStrengthText()}
                  </Text>
                </View>
              )}
              
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <Text style={styles.helperText}>
                  • At least 8 characters{'\n'}
                  • One uppercase letter{'\n'}
                  • One number
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons name="lock-check-outline" size={16} color="#64748B" />{' '}
                Confirm Password
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.confirmPassword && styles.inputError
              ]}>
                <TextInput
                  placeholder="Re-enter your password"
                  style={[styles.input, styles.passwordInput]}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                  value={formData.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={22} 
                    color="#94A3B8" 
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Terms Agreement */}
            <TouchableOpacity 
              style={styles.termsContainer}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
              disabled={isLoading}
            >
              <View style={[
                styles.checkbox,
                agreedToTerms && styles.checkboxChecked
              ]}>
                {agreedToTerms && (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            {errors.terms && (
              <Text style={styles.errorText}>{errors.terms}</Text>
            )}

            {/* Register Button */}
            <TouchableOpacity 
              style={[
                styles.registerButton,
                (!agreedToTerms || isLoading) && styles.registerButtonDisabled
              ]}
              onPress={handleRegister}
              disabled={!agreedToTerms || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <MaterialCommunityIcons name="account-check" size={20} color="#FFFFFF" />
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Demo Fill Button */}
            <TouchableOpacity 
              style={styles.demoButton}
              onPress={handleQuickFill}
              disabled={isLoading}
            >
              <Text style={styles.demoButtonText}>
                <Ionicons name="flash-outline" size={16} color="#2D9CDB" />{' '}
                Fill with Demo Data
              </Text>
            </TouchableOpacity>
          </View>

          {/* Message Display */}
          {message ? (
            <View style={[
              styles.messageContainer,
              message.includes('✅') ? styles.successMessage : styles.errorMessage
            ]}>
              <Ionicons 
                name={message.includes('✅') ? "checkmark-circle" : "alert-circle"} 
                size={20} 
                color={message.includes('✅') ? "#27AE60" : "#EB5757"} 
              />
              <Text style={styles.messageText}>
                {message.replace('✅', '').replace('❌', '')}
              </Text>
            </View>
          ) : null}

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
              disabled={isLoading}
            >
              <Text style={styles.loginLink}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Security Footer */}
          <View style={styles.securityFooter}>
            <MaterialCommunityIcons name="shield-check" size={18} color="#27AE60" />
            <Text style={styles.securityText}>
              Your data is secured with 256-bit encryption and HIPAA compliance
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 30,
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
  logoContainer: {
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 14,
  },
  passwordInput: {
    paddingRight: 40,
  },
  inputError: {
    borderColor: '#EB5757',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  errorText: {
    color: '#EB5757',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
  helperText: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    lineHeight: 16,
  },
  passwordStrengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 12,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    marginRight: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  termsText: {
    flex: 1,
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: '#2D9CDB',
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  demoButton: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  successMessage: {
    backgroundColor: '#F0FFF4',
    borderColor: '#C6F6D5',
  },
  errorMessage: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FED7D7',
  },
  messageText: {
    flex: 1,
    marginLeft: 12,
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#64748B',
    fontSize: 15,
  },
  loginLink: {
    color: '#2D9CDB',
    fontSize: 15,
    fontWeight: '600',
  },
  securityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F1F9FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D6E9FF',
  },
  securityText: {
    flex: 1,
    marginLeft: 10,
    color: '#2D9CDB',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});