import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { FaStethoscope, FaEye, FaEyeSlash, FaUserMd, FaLock, FaShieldAlt } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        
        if (rememberMe) {
          localStorage.setItem('rememberedUser', username);
        } else {
          localStorage.removeItem('rememberedUser');
        }
        
        setMessage('🎉 Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage(`❌ ${data.detail || 'Invalid credentials. Please try again.'}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please check your connection and try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUsername('John_Doe');
    setPassword('SecurePass123!');
  };

  return (
    <div className="login-container">
      {/* Background Decoration */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Left Panel - Branding */}
      <div className="login-left-panel">
        <div className="brand-container">
          <div className="logo">
            <FaStethoscope className="logo-icon" />
            <h1 className="logo-text">Medi<span className="logo-highlight">AI</span></h1>
          </div>
          <h2 className="brand-tagline">Doctor Admin Portal</h2>
          <p className="brand-description">
            Advanced AI-powered medical diagnostics platform for healthcare professionals.
            Manage patient cases, review AI diagnoses, and provide expert consultations.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <FaShieldAlt className="feature-icon" />
              <span>HIPAA Compliant & Secure</span>
            </div>
            <div className="feature-item">
              <FaUserMd className="feature-icon" />
              <span>Real-time Patient Monitoring</span>
            </div>
            <div className="feature-item">
              <FaStethoscope className="feature-icon" />
              <span>AI-Powered Diagnostics</span>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Doctors</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Patients</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">50k+</div>
              <div className="stat-label">Diagnoses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-right-panel">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back, Doctor</h2>
            <p className="login-subtitle">Sign in to your medical dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">
                <FaUserMd className="input-icon" />
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="input-icon" />
                Password
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input password-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-togglerrr"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            {messages && (
              <div className={`messages ${messages.includes('🎉') ? 'message-successs' : 'message-errorr'}`}>
                {messages}
              </div>
            )}

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <FaUserMd className="button-icon" />
                  Sign In
                </>
              )}
            </button>

            <div className="demo-section">
              <button 
                type="button" 
                className="demo-button"
                onClick={handleDemoLogin}
              >
                Try Demo Account
              </button>
              <p className="demo-note">
                John_Doe / SecurePass123!
              </p>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            <div className="register-section">
              <p className="register-text">
                New to MediAI?{' '}
                <Link to="/register" className="register-link">
                  Create Doctor Account
                </Link>
              </p>
            </div>
          </form>

          <div className="login-footer">
            <div className="security-info">
              <FaShieldAlt className="security-icon" />
              <span>Your data is protected with 256-bit encryption</span>
            </div>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="link-divider">•</span>
              <Link to="/terms">Terms of Service</Link>
              <span className="link-divider">•</span>
              <Link to="/support">Support</Link>
            </div>
            <p className="copyright">© 2024 MediAI Medical Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;