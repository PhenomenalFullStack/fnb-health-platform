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
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://172.26.164.11:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('✅ Login successful!');
        
        // Show success animation
        Alert.alert(
          "Welcome to MediAI",
          "Login successful!\n\nYou are now being redirected to your dashboard.",
          [
            { 
              text: "Continue", 
              onPress: () => navigation.navigate('Dashboard') 
            }
          ]
        );
      } else {
        const data = await response.json();
        const errorMsg = data.detail || 'Invalid credentials. Please try again.';
        setMessage('❌ ' + errorMsg);
        Alert.alert("Login Failed", errorMsg);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Network Error. Please check your connection and try again.');
      Alert.alert(
        "Connection Error",
        "Unable to connect to the server. Please check your internet connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Reset Password",
      "A password reset link will be sent to your registered email.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Send Link", onPress: () => console.log("Reset link sent") }
      ]
    );
  };

  const handleQuickDemo = () => {
    Alert.alert(
      "Demo Mode",
      "Would you like to try the demo with sample credentials?",
      [
        { text: "No, thanks", style: "cancel" },
        { 
          text: "Use Demo", 
          onPress: () => {
            setFormData({
              username: 'john_doe',
              password: 'SecurePass123!'
            });
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
          {/* Logo and Welcome Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons 
                name="medical-bag" 
                size={50} 
                color="#2D9CDB" 
              />
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoTitle}>MediAI</Text>
                <Text style={styles.logoSubtitle}>Medical Intelligence Platform</Text>
              </View>
            </View>
            
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to access your medical dashboard
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons 
                  name="account-outline" 
                  size={18} 
                  color="#64748B" 
                />{' '}
                Username or Email
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.username && styles.inputError
              ]}>
                <TextInput
                  placeholder="Enter your username or email"
                  style={styles.input}
                  onChangeText={(text) => handleChange('username', text)}
                  value={formData.username}
                  autoCapitalize="none"
                  editable={!isLoading}
                />
              </View>
              {errors.username ? (
                <Text style={styles.errorText}>{errors.username}</Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <MaterialCommunityIcons 
                  name="lock-outline" 
                  size={18} 
                  color="#64748B" 
                />{' '}
                Password
              </Text>
              <View style={[
                styles.inputWrapper,
                errors.password && styles.inputError
              ]}>
                <TextInput
                  placeholder="Enter your password"
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
              {errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Demo Button */}
            <TouchableOpacity 
              style={styles.demoButton}
              onPress={handleQuickDemo}
              disabled={isLoading}
            >
              <Text style={styles.demoButtonText}>
                <Ionicons name="play-circle-outline" size={16} color="#2D9CDB" />{' '}
                Try Demo Mode
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                disabled={isLoading}
              >
                <Text style={styles.registerLink}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
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

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By signing in, you agree to our{' '}
              <Text style={styles.footerLink}>Terms of Service</Text> and{' '}
              <Text style={styles.footerLink}>Privacy Policy</Text>
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
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoTextContainer: {
    marginLeft: 12,
  },
  logoTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#2D9CDB',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  demoButton: {
    borderWidth: 1.5,
    borderColor: '#2D9CDB',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  demoButtonText: {
    color: '#2D9CDB',
    fontSize: 14,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#94A3B8',
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#64748B',
    fontSize: 15,
  },
  registerLink: {
    color: '#2D9CDB',
    fontSize: 15,
    fontWeight: '600',
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
  footer: {
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  footerLink: {
    color: '#2D9CDB',
    fontWeight: '500',
  },
});