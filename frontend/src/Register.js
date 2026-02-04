import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faEnvelope, 
  faLock, 
  faUser, 
  faStethoscope, 
  faIdCard,
  faHospital,
  faPhone,
  faMapMarkerAlt,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    full_name: '',
    specialty: '',
    license_number: '',
    hospital: '',
    phone: '',
    address: '',
    years_experience: '',
  });

  const [errors, setErrors] = useState({});
  const [messag, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const specialties = [
    'Select Specialty',
    'Dermatologist',
    'Cardiologist',
    'Neurologist',
    'Orthopedic Surgeon',
    'Pediatrician',
    'Gynecologist',
    'Psychiatrist',
    'Radiologist',
    'General Physician',
    'Emergency Medicine',
    'Anesthesiologist',
    'Ophthalmologist',
    'ENT Specialist',
    'Urologist',
    'Gastroenterologist',
    'Endocrinologist',
    'Rheumatologist',
    'Oncologist',
    'Pulmonologist',
    'Nephrologist',
    'Hematologist',
    'Allergist',
    'Infectious Disease',
    'Plastic Surgeon'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.specialty || formData.specialty === 'Select Specialty') {
      newErrors.specialty = 'Please select a specialty';
    }

    if (!formData.license_number.trim()) {
      newErrors.license_number = 'Medical license number is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          full_name: formData.full_name,
          specialty: formData.specialty,
          license_number: formData.license_number,
          hospital: formData.hospital,
          phone: formData.phone,
          address: formData.address,
          years_experience: formData.years_experience,
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        let errorMsg = 'Registration failed. Please try again.';
        
        if (data.username) {
          errorMsg = `Username: ${data.username.join(' ')}`;
        } else if (data.email) {
          errorMsg = `Email: ${data.email.join(' ')}`;
        } else if (data.license_number) {
          errorMsg = `License: ${data.license_number.join(' ')}`;
        } else if (data.detail) {
          errorMsg = data.detail;
        }
        
        setMessage(`❌ ${errorMsg}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('❌ Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      username: 'John_Doe',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
      email: 'john.doe@medicalcenter.com',
      full_name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      license_number: 'MD-123456789',
      hospital: 'City Medical Center',
      phone: '+1 (555) 123-4567',
      address: '123 Medical Street, Health City, HC 10001',
      years_experience: '15',
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        {/* Left Panel - Hero/Info */}
        <div className="registration-left-panel">
          <div className="registration-hero">
            <div className="registration-logo">
              <FontAwesomeIcon icon={faUserMd} className="logo-icon" />
              <h1>MediAI</h1>
              <span className="logo-subtitle">Medical Intelligence Platform</span>
            </div>
            
            <div className="registration-hero-content">
              <h2>Join Our Medical Network</h2>
              <p className="hero-description">
                Register as a healthcare professional to access our AI-powered diagnostic platform, 
                connect with patients, and contribute to the future of medical care.
              </p>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <FontAwesomeIcon icon={faShieldAlt} className="benefit-icon" />
                  <div>
                    <h4>Secure Platform</h4>
                    <p>HIPAA compliant with end-to-end encryption</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <FontAwesomeIcon icon={faStethoscope} className="benefit-icon" />
                  <div>
                    <h4>AI-Assisted Diagnosis</h4>
                    <p>Access advanced AI tools for patient assessment</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <FontAwesomeIcon icon={faHospital} className="benefit-icon" />
                  <div>
                    <h4>Network Growth</h4>
                    <p>Connect with patients and colleagues nationwide</p>
                  </div>
                </div>
              </div>
              
              <div className="registration-stats">
                <div className="stat-item">
                  <span className="stat-number">1,500+</span>
                  <span className="stat-label">Doctors</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Patients</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="registration-right-panel">
          <div className="registration-form-container">
            <div className="form-header">
              <h2>Doctor Registration</h2>
              <p className="form-subtitle">
                Create your professional account to join our medical network
              </p>
            </div>



            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-grider">
                {/* Account Information */}
                <div className="form-sectioner">
                              {/* Demo Button */}
            <button 
              type="button" 
              className="demo-fill-button"
              onClick={handleDemoFill}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faUserMd} />
              Fill with Demo Data
            </button>
                  <h3 className="section-title">
                    <FontAwesomeIcon icon={faUser} />
                    Account Information
                  </h3>
                  
                  <div className="input-group">
                    <label htmlFor="username">
                      <FontAwesomeIcon icon={faUser} />
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      className={errors.username ? 'error' : ''}
                      disabled={loading}
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="password">
                        <FontAwesomeIcon icon={faLock} />
                        Password
                      </label>
                      <div className="password-wrapper">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleChange}
                          className={errors.password ? 'error' : ''}
                          disabled={loading}
                        />
                        <button 
                          type="button" 
                          className="password-togg"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                      <label htmlFor="confirmPassword">
                        <FontAwesomeIcon icon={faLock} />
                        Confirm
                      </label>
                      <div className="password-wrapper">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Re-enter your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={errors.confirmPassword ? 'error' : ''}
                          disabled={loading}
                        />
                        <button 
                          type="button" 
                          className="password-togg"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="email">
                      <FontAwesomeIcon icon={faEnvelope} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@medicalcenter.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      disabled={loading}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                {/* Professional Information */}
                <div className="form-sectioner">
                  <h3 className="section-title">
                    <FontAwesomeIcon icon={faUserMd} />
                    Professional Information
                  </h3>
                  
                  <div className="input-group">
                    <label htmlFor="full_name">
                      <FontAwesomeIcon icon={faUser} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      placeholder="Dr. John Doe"
                      value={formData.full_name}
                      onChange={handleChange}
                      className={errors.full_name ? 'error' : ''}
                      disabled={loading}
                    />
                    {errors.full_name && <span className="error-message">{errors.full_name}</span>}
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="specialty">
                        <FontAwesomeIcon icon={faStethoscope} />
                        Medical Specialty Type 
                      </label>
                      <select
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        className={errors.specialty ? 'error' : ''}
                        disabled={loading}
                      >
                        {specialties.map((specialty, index) => (
                          <option key={index} value={specialty === 'Select Specialty' ? '' : specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                      {errors.specialty && <span className="error-message">{errors.specialty}</span>}
                    </div>

                    <div className="input-group">
                      <label htmlFor="years_experience">
                        <FontAwesomeIcon icon={faUserMd} />
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="years_experience"
                        name="years_experience"
                        placeholder="e.g., 10"
                        min="0"
                        max="50"
                        value={formData.years_experience}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="license_number">
                      <FontAwesomeIcon icon={faIdCard} />
                      Medical License Number
                    </label>
                    <input
                      type="text"
                      id="license_number"
                      name="license_number"
                      placeholder="e.g., MD-123456789"
                      value={formData.license_number}
                      onChange={handleChange}
                      className={errors.license_number ? 'error' : ''}
                      disabled={loading}
                    />
                    {errors.license_number && <span className="error-message">{errors.license_number}</span>}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="form-sectioner">
                  <h3 className="section-title">
                    <FontAwesomeIcon icon={faHospital} />
                    Contact Information
                  </h3>
                  
                  <div className="input-row">
                    <div className="input-group">
                      <label htmlFor="hospital">
                        <FontAwesomeIcon icon={faHospital} />
                        Hospital/Clinic
                      </label>
                      <input
                        type="text"
                        id="hospital"
                        name="hospital"
                        placeholder="Your hospital or clinic name"
                        value={formData.hospital}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="phone">
                        <FontAwesomeIcon icon={faPhone} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                        disabled={loading}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="address">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Full hospital/clinic address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="terms-section">
                <div className="terms-checkbox">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required 
                    disabled={loading}
                  />
                  <label htmlFor="terms">
                    I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>. I confirm that I am a licensed 
                    medical professional and the information provided is accurate.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserMd} />
                    Complete Registration
                  </>
                )}
              </button>

              {/* Message Display */}
              {messag && (
                <div className={`messag ${messag.includes('✅') ? 'success' : 'error'}`}>
                  <FontAwesomeIcon icon={messag.includes('✅') ? 'check-circle' : 'exclamation-circle'} />
                  <span>{messag.replace('✅', '').replace('❌', '')}</span>
                </div>
              )}

              {/* Login Link */}
              <div className="login-link">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="login-link-text">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="registration-footer">
            <p>© 2024 MediAI Medical Platform. All rights reserved.</p>
            <div className="footer-links">
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/contact">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;