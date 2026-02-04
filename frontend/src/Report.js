import React from 'react';
import { Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import './ReportInsights.css'; 

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaStethoscope, 
  FaUserMd, 
  FaCalendarCheck,
  FaBell,
  FaUsers,
  FaFileMedical,
  FaComments,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes 
} from 'react-icons/fa';

export default function ReportInsights() {
  
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDashboard = async () => {
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
        }
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboard();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  // Dummy data for UI
  const diagnosisData = {
    labels: ['Eczema', 'Myopia', 'Dermatitis', 'Conjunctivitis', 'Acne', 'Cataracts', 'Gingivitis'],
    datasets: [
      {
        label: 'Diagnoses Count (Last 30 Days)',
        data: [12, 19, 7, 14, 9, 5, 8],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(201, 203, 207, 0.7)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Average Confidence Score',
        data: [0.76, 0.82, 0.79, 0.85, 0.88, 0.87, 0.90, 0.92, 0.94],
        fill: true,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.1)',
        tension: 0.4,
      },
      {
        label: 'User Satisfaction',
        data: [0.70, 0.75, 0.78, 0.82, 0.85, 0.84, 0.87, 0.89, 0.91],
        fill: false,
        borderColor: '#FF6384',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ['Skin Conditions', 'Eye Conditions', 'Oral Health', 'Respiratory', 'Other'],
    datasets: [
      {
        label: 'Diagnosis Categories',
        data: [45, 30, 15, 7, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        hoverOffset: 15,
      },
    ],
  };

  const performanceData = {
    labels: ['Skin Diagnosis', 'Eye Diagnosis', 'Oral Diagnosis', 'Speed', 'Accuracy', 'Ease of Use'],
    datasets: [
      {
        label: 'Current Performance',
        data: [92, 88, 85, 95, 90, 87],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Target Performance',
        data: [95, 92, 90, 97, 95, 92],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const usageData = {
    labels: ['00-02', '02-04', '04-06', '06-08', '08-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
    datasets: [
      {
        label: 'Daily Usage Pattern',
        data: [2, 1, 0, 3, 12, 25, 32, 28, 30, 22, 15, 8],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const regionalData = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Australia'],
    datasets: [
      {
        label: 'Active Users (Thousands)',
        data: [45, 38, 62, 22, 15, 8],
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
    ],
  };

  // KPI Cards Data
  const kpis = [
    { title: 'Total Diagnoses', value: '1,247', change: '+12%', icon: '📊', color: '#4CAF50' },
    { title: 'Accuracy Rate', value: '92.5%', change: '+3.2%', icon: '🎯', color: '#2196F3' },
    { title: 'Avg. Response Time', value: '2.4s', change: '-0.8s', icon: '⚡', color: '#FF9800' },
    { title: 'User Satisfaction', value: '4.7/5', change: '+0.3', icon: '⭐', color: '#9C27B0' },
  ];

  // Recent Activity Data
  const recentActivity = [
    { id: 1, action: 'Model Retrained', timestamp: '2 hours ago', details: 'Improved skin condition detection' },
    { id: 2, action: 'New Feature Added', timestamp: '1 day ago', details: 'Multi-language support implemented' },
    { id: 3, action: 'Performance Boost', timestamp: '3 days ago', details: 'Response time reduced by 15%' },
    { id: 4, action: 'Dataset Updated', timestamp: '1 week ago', details: 'Added 10K new medical images' },
  ];

  return (
    <div className="report-insights-container">
      {/* Top Header with Menu Button for Mobile */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
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

      {/* Main Content with Sidebar */}
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
            
            <Link to="/Report" className="nav-item active">
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
            
            <Link to="/settings" className="nav-item">
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>
          
          <div className="sidebar-help">
            <h3>Need Help?</h3>
            <p>24/7 Support available</p>
            <button className="support-btn">Contact Support</button>
          </div>
        </aside>

        {/* Main Content - Reports Section */}
        <main className="report-content">
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
          
          {/* Report Header */}
          <header className="page-header">
            <h1>📊 AI Diagnosis Insights & Analytics</h1>
            <p className="subtitle">Comprehensive overview of AI diagnostic performance and user engagement</p>
            <div className="date-range">
              <span>📅 Last Updated: {new Date().toLocaleDateString()}</span>
              <select defaultValue="last30days">
                <option value="last7days">Last 7 Days</option>
                <option value="last30days">Last 30 Days</option>
                <option value="last90days">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
              </select>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="kpi-grid">
            {kpis.map((kpi, index) => (
              <div key={index} className="kpi-card" style={{ borderTop: `4px solid ${kpi.color}` }}>
                <div className="kpi-icon" style={{ backgroundColor: kpi.color }}>
                  {kpi.icon}
                </div>
                <div className="kpi-content">
                  <h3>{kpi.title}</h3>
                  <div className="kpi-value">{kpi.value}</div>
                  <div className="kpi-change">
                    <span className={kpi.change.startsWith('+') ? 'positive' : 'negative'}>
                      {kpi.change}
                    </span>
                    <span> from last month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Grid */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-header">
                <h2>Diagnosis Distribution</h2>
                <span className="chart-subtitle">By condition type</span>
              </div>
              <div className="chart-container">
                <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="chart-footer">
                <p>Skin conditions represent the majority of diagnoses</p>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Monthly Performance Trends</h2>
                <span className="chart-subtitle">Confidence vs Satisfaction</span>
              </div>
              <div className="chart-container">
                <Line data={trendData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="chart-footer">
                <p>Both metrics showing positive upward trend</p>
              </div>
            </div>

            <div className="chart-card full-width">
              <div className="chart-header">
                <h2>Top Diagnoses (Last 30 Days)</h2>
                <span className="chart-subtitle">Most frequent AI diagnoses</span>
              </div>
              <div className="chart-container">
                <Bar 
                  data={diagnosisData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                  }} 
                />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Performance Radar</h2>
                <span className="chart-subtitle">Current vs Target</span>
              </div>
              <div className="chart-container">
                <Radar data={performanceData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Peak Usage Hours</h2>
                <span className="chart-subtitle">24-hour pattern</span>
              </div>
              <div className="chart-container">
                <Bar data={usageData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h2>Regional Distribution</h2>
                <span className="chart-subtitle">Active users by region</span>
              </div>
              <div className="chart-container">
                <Doughnut 
                  data={regionalData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    cutout: '70%',
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Additional Insights and Activity */}
          <div className="insights-grid">
            <div className="recent-activity">
              <h3>🔄 Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">📝</div>
                    <div className="activity-content">
                      <div className="activity-action">{activity.action}</div>
                      <div className="activity-details">{activity.details}</div>
                      <div className="activity-timestamp">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="suggestions">
              <h3>🧠 Suggested Insights to Explore</h3>
              <div className="suggestion-list">
                <div className="suggestion-item">
                  <div className="suggestion-icon">🔍</div>
                  <div className="suggestion-content">
                    <h4>Top 5 Misclassified Cases</h4>
                    <p>Analyze patterns in misdiagnoses for model improvement</p>
                  </div>
                </div>
                <div className="suggestion-item">
                  <div className="suggestion-icon">⏱️</div>
                  <div className="suggestion-content">
                    <h4>AI Decision Latency</h4>
                    <p>Track response times across different condition types</p>
                  </div>
                </div>
                <div className="suggestion-item">
                  <div className="suggestion-icon">👥</div>
                  <div className="suggestion-content">
                    <h4>Demographic Breakdown</h4>
                    <p>Analyze diagnosis patterns by age, gender, and location</p>
                  </div>
                </div>
                <div className="suggestion-item">
                  <div className="suggestion-icon">💊</div>
                  <div className="suggestion-content">
                    <h4>Treatment Success Rates</h4>
                    <p>Correlate AI recommendations with patient outcomes</p>
                  </div>
                </div>
                <div className="suggestion-item">
                  <div className="suggestion-icon">📱</div>
                  <div className="suggestion-content">
                    <h4>Device & Platform Analysis</h4>
                    <p>Compare accuracy across mobile vs desktop usage</p>
                  </div>
                </div>
                <div className="suggestion-item">
                  <div className="suggestion-icon">🔄</div>
                  <div className="suggestion-content">
                    <h4>Retention & Churn</h4>
                    <p>Identify patterns in user return rates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export and Actions */}
          <div className="actions-footer">
            <button className="export-btn">
              📥 Export Full Report (PDF)
            </button>
            <button className="export-btn">
              📊 Generate Custom Report
            </button>
            <button className="export-btn">
              🔔 Set Up Alerts
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}