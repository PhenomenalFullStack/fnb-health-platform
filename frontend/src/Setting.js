import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Setting.css';
import { 
  FaUser,
  FaBell,
  FaLock,
  FaCreditCard,
  FaShieldAlt,
  FaPalette,
  FaLanguage,
  FaSync,
  FaMoon,
  FaSun,
  FaSave,
  FaTimes,
  FaCamera,
  FaTrash,
  FaKey,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStethoscope,
  FaHospital,
  FaFileMedical,
  FaUserMd, 
  FaCalendarCheck,
  FaUsers,
  FaComments,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes as FaClose
} from 'react-icons/fa';

function Settings() {
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Doctor profile data
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    yearsOfExperience: '',
    hospital: '',
    address: '',
    bio: '',
    consultationFee: '',
    languages: ['English'],
    availableHours: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: { start: '', end: '' }
    }
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    patientMessages: true,
    reportUpdates: true,
    paymentNotifications: true,
    systemUpdates: true,
    marketingEmails: false,
    emergencyAlerts: true
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordLastChanged: '2024-01-15',
    activeSessions: [
      { id: 1, device: 'Chrome on Windows', location: 'New York, USA', lastActive: '2 hours ago' },
      { id: 2, device: 'Safari on iPhone', location: 'New York, USA', lastActive: '5 minutes ago' }
    ]
  });

  // Payment settings
  const [payment, setPayment] = useState({
    paymentMethod: 'stripe',
    stripeConnected: true,
    bankAccount: {
      bankName: 'Chase Bank',
      accountNumber: '**** **** **** 1234',
      routingNumber: '*****'
    },
    taxId: 'XX-XXXXXXX',
    payoutSchedule: 'weekly',
    nextPayout: '2024-02-01',
    earningsThisMonth: 4850.75
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowPatientReviews: true,
    shareAnalytics: true,
    dataRetention: '6 months',
    exportData: false
  });

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async () => {
    const token = localStorage.getItem('access');
    
    try {
      const response = await fetch('http://localhost:8000/api/users/dashboard/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDoctor(data);
        
        // Initialize profile data with dummy data
        setProfileData({
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: data.email || 'sarah.johnson@example.com',
          phone: '+1 (555) 123-4567',
          specialty: data.specialty || 'General Physician',
          licenseNumber: 'MD-123456',
          yearsOfExperience: '12',
          hospital: 'City Medical Center',
          address: '123 Medical St, Suite 405, New York, NY 10001',
          bio: 'Board-certified physician with 12+ years of experience in general medicine. Special interest in preventive care and chronic disease management.',
          consultationFee: '150',
          languages: ['English', 'Spanish'],
          availableHours: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '17:00' },
            saturday: { start: '10:00', end: '14:00' },
            sunday: { start: '', end: '' }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
    }
  };

  const handleInputChange = (section, field, value) => {
    switch(section) {
      case 'profile':
        setProfileData(prev => ({ ...prev, [field]: value }));
        break;
      case 'notifications':
        setNotifications(prev => ({ ...prev, [field]: value }));
        break;
      case 'security':
        setSecurity(prev => ({ ...prev, [field]: value }));
        break;
      case 'payment':
        setPayment(prev => ({ ...prev, [field]: value }));
        break;
      case 'privacy':
        setPrivacy(prev => ({ ...prev, [field]: value }));
        break;
      default:
        break;
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
  };

  const handleDisconnectStripe = () => {
    if (window.confirm('Are you sure you want to disconnect your Stripe account?')) {
      setPayment(prev => ({ ...prev, stripeConnected: false }));
    }
  };

  const handleTerminateSession = (sessionId) => {
    setSecurity(prev => ({
      ...prev,
      activeSessions: prev.activeSessions.filter(session => session.id !== sessionId)
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleExportData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Your data export has been initiated. You will receive an email with download link.');
    }, 2000);
  };

  const toggleNotification = (field) => {
    setNotifications(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="settings-section">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar-large">
            <FaUser />
          </div>
          <div className="avatar-actions">
            <button className="btn-icon">
              <FaCamera /> Change Photo
            </button>
            <button className="btn-icon btn-danger">
              <FaTrash /> Remove
            </button>
          </div>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <div className="input-with-icon">
            <FaEnvelope />
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-with-icon">
            <FaPhone />
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Specialty</label>
          <div className="input-with-icon">
            <FaStethoscope />
            <input
              type="text"
              value={profileData.specialty}
              onChange={(e) => handleInputChange('profile', 'specialty', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Medical License Number</label>
          <input
            type="text"
            value={profileData.licenseNumber}
            onChange={(e) => handleInputChange('profile', 'licenseNumber', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Years of Experience</label>
          <input
            type="number"
            value={profileData.yearsOfExperience}
            onChange={(e) => handleInputChange('profile', 'yearsOfExperience', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Hospital/Clinic</label>
          <div className="input-with-icon">
            <FaHospital />
            <input
              type="text"
              value={profileData.hospital}
              onChange={(e) => handleInputChange('profile', 'hospital', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Address</label>
          <div className="input-with-icon">
            <FaMapMarkerAlt />
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Professional Bio</label>
          <textarea
            rows="4"
            value={profileData.bio}
            onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
            placeholder="Tell patients about your experience, specialties, and approach..."
          />
        </div>
        
        <div className="form-group">
          <label>Consultation Fee</label>
          <div className="input-with-currency">
            <span className="currency">$</span>
            <input
              type="number"
              value={profileData.consultationFee}
              onChange={(e) => handleInputChange('profile', 'consultationFee', e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Languages Spoken</label>
          <div className="tags-input">
            {profileData.languages.map((language, index) => (
              <span key={index} className="tag">
                {language}
                <button onClick={() => {
                  const newLanguages = [...profileData.languages];
                  newLanguages.splice(index, 1);
                  handleInputChange('profile', 'languages', newLanguages);
                }}>×</button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add language and press Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  const newLanguages = [...profileData.languages, e.target.value.trim()];
                  handleInputChange('profile', 'languages', newLanguages);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="availability-section">
        <h3><FaCalendarAlt /> Availability Hours</h3>
        {Object.entries(profileData.availableHours).map(([day, hours]) => (
          <div key={day} className="availability-row">
            <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
            <div className="time-inputs">
              <input
                type="time"
                value={hours.start}
                onChange={(e) => {
                  const newHours = { ...profileData.availableHours };
                  newHours[day].start = e.target.value;
                  handleInputChange('profile', 'availableHours', newHours);
                }}
              />
              <span>to</span>
              <input
                type="time"
                value={hours.end}
                onChange={(e) => {
                  const newHours = { ...profileData.availableHours };
                  newHours[day].end = e.target.value;
                  handleInputChange('profile', 'availableHours', newHours);
                }}
              />
              <button 
                className="btn-icon"
                onClick={() => {
                  const newHours = { ...profileData.availableHours };
                  newHours[day] = { start: '', end: '' };
                  handleInputChange('profile', 'availableHours', newHours);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <h3>Notification Preferences</h3>
      <p className="section-description">
        Choose how you want to be notified about different activities.
      </p>
      
      <div className="notifications-list">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="notification-item">
            <div className="notification-info">
              <h4>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
              <p>
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'smsNotifications' && 'Receive SMS notifications'}
                {key === 'pushNotifications' && 'Push notifications on your devices'}
                {key === 'appointmentReminders' && 'Reminders for upcoming appointments'}
                {key === 'patientMessages' && 'Notifications for new patient messages'}
                {key === 'reportUpdates' && 'Updates on report analysis and AI diagnoses'}
                {key === 'paymentNotifications' && 'Notifications about payments and earnings'}
                {key === 'systemUpdates' && 'System updates and maintenance alerts'}
                {key === 'marketingEmails' && 'Marketing emails and promotional offers'}
                {key === 'emergencyAlerts' && 'Emergency alerts and critical updates'}
              </p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleNotification(key)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
      
      <div className="notification-frequency">
        <h4>Notification Frequency</h4>
        <div className="frequency-options">
          <label>
            <input type="radio" name="frequency" defaultChecked />
            <span>Real-time</span>
          </label>
          <label>
            <input type="radio" name="frequency" />
            <span>Daily Digest</span>
          </label>
          <label>
            <input type="radio" name="frequency" />
            <span>Weekly Summary</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <h3>Security Settings</h3>
      
      <div className="security-item">
        <div className="security-info">
          <h4><FaLock /> Two-Factor Authentication</h4>
          <p>Add an extra layer of security to your account</p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={security.twoFactorAuth}
            onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="security-item">
        <div className="security-info">
          <h4><FaBell /> Login Alerts</h4>
          <p>Get notified when your account is accessed from a new device</p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={security.loginAlerts}
            onChange={(e) => handleInputChange('security', 'loginAlerts', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="form-group">
        <label>Session Timeout (minutes)</label>
        <select
          value={security.sessionTimeout}
          onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
          <option value="120">2 hours</option>
          <option value="0">Never (not recommended)</option>
        </select>
      </div>
      
      <div className="password-section">
        <h4><FaKey /> Password</h4>
        <p>Last changed: {security.passwordLastChanged}</p>
        <button className="btn-primary" onClick={handleResetPassword}>
          Change Password
        </button>
      </div>
      
      <div className="sessions-section">
        <h4>Active Sessions</h4>
        {security.activeSessions.map(session => (
          <div key={session.id} className="session-item">
            <div className="session-info">
              <h5>{session.device}</h5>
              <p>{session.location} • Last active: {session.lastActive}</p>
            </div>
            {session.id !== 2 && (
              <button 
                className="btn-text"
                onClick={() => handleTerminateSession(session.id)}
              >
                Terminate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentTab = () => (
    <div className="settings-section">
      <h3>Payment Settings</h3>
      
      <div className="payment-method">
        <h4>Payment Method</h4>
        <div className="payment-options">
          <label className={payment.paymentMethod === 'stripe' ? 'selected' : ''}>
            <input
              type="radio"
              name="paymentMethod"
              checked={payment.paymentMethod === 'stripe'}
              onChange={() => handleInputChange('payment', 'paymentMethod', 'stripe')}
            />
            <div className="payment-card">
              <FaCreditCard />
              <span>Stripe</span>
              {payment.stripeConnected && <span className="connected">Connected</span>}
            </div>
          </label>
          
          <label className={payment.paymentMethod === 'bank' ? 'selected' : ''}>
            <input
              type="radio"
              name="paymentMethod"
              checked={payment.paymentMethod === 'bank'}
              onChange={() => handleInputChange('payment', 'paymentMethod', 'bank')}
            />
            <div className="payment-card">
              <FaHospital />
              <span>Bank Transfer</span>
            </div>
          </label>
          
          <label className={payment.paymentMethod === 'paypal' ? 'selected' : ''}>
            <input
              type="radio"
              name="paymentMethod"
              checked={payment.paymentMethod === 'paypal'}
              onChange={() => handleInputChange('payment', 'paymentMethod', 'paypal')}
            />
            <div className="payment-card">
              <FaCreditCard />
              <span>PayPal</span>
            </div>
          </label>
        </div>
        
        {payment.paymentMethod === 'stripe' && payment.stripeConnected && (
          <div className="stripe-info">
            <p>Your Stripe account is connected and ready to receive payments.</p>
            <button className="btn-text btn-danger" onClick={handleDisconnectStripe}>
              Disconnect Stripe
            </button>
          </div>
        )}
        
        {payment.paymentMethod === 'stripe' && !payment.stripeConnected && (
          <div className="connect-stripe">
            <p>Connect your Stripe account to receive payments from patients.</p>
            <button className="btn-primary">
              Connect Stripe Account
            </button>
          </div>
        )}
      </div>
      
      <div className="bank-details">
        <h4>Bank Account Details</h4>
        <div className="bank-info">
          <div className="info-item">
            <span>Bank Name</span>
            <strong>{payment.bankAccount.bankName}</strong>
          </div>
          <div className="info-item">
            <span>Account Number</span>
            <strong>{payment.bankAccount.accountNumber}</strong>
          </div>
          <div className="info-item">
            <span>Routing Number</span>
            <strong>{payment.bankAccount.routingNumber}</strong>
          </div>
          <div className="info-item">
            <span>Tax ID</span>
            <strong>{payment.taxId}</strong>
          </div>
        </div>
        <button className="btn-text">Edit Bank Details</button>
      </div>
      
      <div className="payout-settings">
        <h4>Payout Settings</h4>
        <div className="form-group">
          <label>Payout Schedule</label>
          <select
            value={payment.payoutSchedule}
            onChange={(e) => handleInputChange('payment', 'payoutSchedule', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Every 2 weeks</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <div className="earnings-info">
          <div className="info-item">
            <span>Next Payout</span>
            <strong>{payment.nextPayout}</strong>
          </div>
          <div className="info-item">
            <span>Earnings This Month</span>
            <strong className="earnings">{formatCurrency(payment.earningsThisMonth)}</strong>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="settings-section">
      <h3>Privacy Settings</h3>
      
      <div className="form-group">
        <label>Profile Visibility</label>
        <select
          value={privacy.profileVisibility}
          onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
        >
          <option value="public">Public (Anyone can view)</option>
          <option value="patients">Patients Only</option>
          <option value="private">Private (Only you)</option>
        </select>
      </div>
      
      <div className="privacy-item">
        <div className="privacy-info">
          <h4>Show Online Status</h4>
          <p>Allow patients to see when you're available for chat</p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={privacy.showOnlineStatus}
            onChange={(e) => handleInputChange('privacy', 'showOnlineStatus', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="privacy-item">
        <div className="privacy-info">
          <h4>Allow Patient Reviews</h4>
          <p>Allow patients to leave public reviews on your profile</p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={privacy.allowPatientReviews}
            onChange={(e) => handleInputChange('privacy', 'allowPatientReviews', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="privacy-item">
        <div className="privacy-info">
          <h4>Share Analytics Data</h4>
          <p>Help improve MediAI by sharing anonymous usage data</p>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={privacy.shareAnalytics}
            onChange={(e) => handleInputChange('privacy', 'shareAnalytics', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <div className="form-group">
        <label>Data Retention Period</label>
        <select
          value={privacy.dataRetention}
          onChange={(e) => handleInputChange('privacy', 'dataRetention', e.target.value)}
        >
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
          <option value="1 year">1 year</option>
          <option value="3 years">3 years</option>
          <option value="forever">Indefinitely</option>
        </select>
      </div>
      
      <div className="data-export">
        <h4>Data Export</h4>
        <p>Export all your data from MediAI in a portable format</p>
        <button 
          className="btn-primary"
          onClick={handleExportData}
          disabled={loading}
        >
          <FaFileMedical /> Export My Data
        </button>
      </div>
      
      <div className="danger-zone">
        <h4 className="danger-title">Danger Zone</h4>
        <div className="danger-actions">
          <button className="btn-danger">
            <FaTrash /> Delete Account
          </button>
          <p className="danger-note">
            Deleting your account will permanently remove all your data and cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="settings-section">
      <h3>Appearance Settings</h3>
      
      <div className="theme-section">
        <h4>Theme</h4>
        <div className="theme-options">
          <div 
            className={`theme-option ${!isDarkMode ? 'selected' : ''}`}
            onClick={() => setIsDarkMode(false)}
          >
            <div className="theme-preview light">
              <FaSun />
            </div>
            <span>Light Mode</span>
          </div>
          
          <div 
            className={`theme-option ${isDarkMode ? 'selected' : ''}`}
            onClick={() => setIsDarkMode(true)}
          >
            <div className="theme-preview dark">
              <FaMoon />
            </div>
            <span>Dark Mode</span>
          </div>
          
          <div className="theme-option">
            <div className="theme-preview auto">
              <FaSync />
            </div>
            <span>Auto</span>
          </div>
        </div>
      </div>
      
      <div className="font-section">
        <h4>Font Size</h4>
        <div className="slider-container">
          <input
            type="range"
            min="12"
            max="20"
            defaultValue="16"
            className="font-slider"
          />
          <div className="slider-labels">
            <span>Small</span>
            <span>Medium</span>
            <span>Large</span>
          </div>
        </div>
      </div>
      
      <div className="language-section">
        <h4><FaLanguage /> Language</h4>
        <select defaultValue="en">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="doctor-dashboard">
      {/* Top Navigation */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaClose /> : <FaBars />}
          </button>
          <h1 className="logo">MediAI <span className="logo-sub">Doctor Portal</span></h1>
          <div className="welcome-section">
            <h2>Welcome, <span className="doctor-name">{doctor.message}</span></h2>
            <p className="specialty">{doctor.specialty}</p>
          </div>
        </div>
        
        <div className="header-right">
          <button className="notification-btn">
            <FaBell />
            <span className="notification-count">3</span>
          </button>
          
          <div className="user-profile">
            <div className="profile-avatar">
              <FaUserMd />
            </div>
            <div className="profile-info">
              <span className="profile-name">{doctor.message}</span>
              <span className="profile-email">{doctor.email}</span>
            </div>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="dashboard-layout">
        {/* Left Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <Link to="/dashboard" className="nav-item">
              <FaStethoscope />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/patients" className="nav-item">
              <FaUsers />
              <span>My Patients</span>
            </Link>
            
            <Link to="/Report" className="nav-item">
              <FaFileMedical />
              <span>Analyze Reports</span>
            </Link>
            
            <Link to="/appointments" className="nav-item">
              <FaCalendarCheck />
              <span>Appointments</span>
            </Link>
            
            <Link to="/chat" className="nav-item">
              <FaComments />
              <span>Patient Chat</span>
            </Link>
            
            <Link to="/history" className="nav-item">
              <FaHistory />
              <span>History</span>
            </Link>
            
            <Link to="/settings" className="nav-item active">
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>
          
          <div className="sidebar-help">
            <h3>Settings Help</h3>
            <p>Configure your preferences here</p>
            <button className="support-btn">Need Help?</button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Main Content */}
        <main className="settings-main-content">
          <div className={`settings-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="settings-container">
              <header className="settings-header">
                <h1><FaUser /> Settings</h1>
                <p>Manage your account preferences and settings</p>
              </header>
              
              <div className="settings-layout">
                {/* Settings Sidebar */}
                <aside className="settings-sidebar">
                  <nav className="settings-nav">
                    <button 
                      className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <FaUser /> Profile
                    </button>
                    
                    <button 
                      className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                      onClick={() => setActiveTab('notifications')}
                    >
                      <FaBell /> Notifications
                    </button>
                    
                    <button 
                      className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                      onClick={() => setActiveTab('security')}
                    >
                      <FaLock /> Security
                    </button>
                    
                    <button 
                      className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
                      onClick={() => setActiveTab('payment')}
                    >
                      <FaCreditCard /> Payment
                    </button>
                    
                    <button 
                      className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
                      onClick={() => setActiveTab('privacy')}
                    >
                      <FaShieldAlt /> Privacy
                    </button>
                    
                    <button 
                      className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
                      onClick={() => setActiveTab('appearance')}
                    >
                      <FaPalette /> Appearance
                    </button>
                  </nav>
                  
                  <div className="sidebar-help">
                    <h4>Need Help?</h4>
                    <p>Contact our support team</p>
                    <button className="btn-secondary">Contact Support</button>
                  </div>
                </aside>
                
                {/* Settings Content */}
                <main className="settings-content">
                  <div className="content-header">
                    <h2>
                      {activeTab === 'profile' && 'Profile Settings'}
                      {activeTab === 'notifications' && 'Notification Settings'}
                      {activeTab === 'security' && 'Security Settings'}
                      {activeTab === 'payment' && 'Payment Settings'}
                      {activeTab === 'privacy' && 'Privacy Settings'}
                      {activeTab === 'appearance' && 'Appearance Settings'}
                    </h2>
                    
                    <div className="header-actions">
                      <button 
                        className="btn-secondary"
                        onClick={() => navigate('/dashboard')}
                      >
                        <FaTimes /> Cancel
                      </button>
                      
                      <button 
                        className="btn-primary"
                        onClick={handleSaveSettings}
                        disabled={loading}
                      >
                        <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                  
                  {/* Tab Content */}
                  {activeTab === 'profile' && renderProfileTab()}
                  {activeTab === 'notifications' && renderNotificationsTab()}
                  {activeTab === 'security' && renderSecurityTab()}
                  {activeTab === 'payment' && renderPaymentTab()}
                  {activeTab === 'privacy' && renderPrivacyTab()}
                  {activeTab === 'appearance' && renderAppearanceTab()}
                </main>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;