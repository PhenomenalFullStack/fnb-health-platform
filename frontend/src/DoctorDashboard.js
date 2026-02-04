import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import { 
  FaStethoscope, 
  FaUserMd, 
  FaClipboardCheck, 
  FaCalendarCheck,
  FaChartLine,
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

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingReviews: 0,
    completedToday: 0,
    monthlyEarnings: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingCases, setPendingCases] = useState([]);
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
          
          // Mock data for dashboard (replace with actual API calls)
          setStats({
            totalPatients: 142,
            pendingReviews: 8,
            completedToday: 12,
            monthlyEarnings: 4850.75
          });

          setRecentActivities([
            { id: 1, type: 'review', patient: 'John Doe', time: '10:30 AM', status: 'completed' },
            { id: 2, type: 'consultation', patient: 'Sarah Miller', time: '11:45 AM', status: 'pending' },
            { id: 3, type: 'report', patient: 'Robert Chen', time: '9:15 AM', status: 'completed' },
            { id: 4, type: 'followup', patient: 'Maria Garcia', time: 'Yesterday', status: 'scheduled' },
          ]);

          setPendingCases([
            { id: 1, patient: 'Emma Wilson', condition: 'Skin Rash', priority: 'High', time: '2 hours ago' },
            { id: 2, patient: 'James Brown', condition: 'Eye Infection', priority: 'Medium', time: '5 hours ago' },
            { id: 3, patient: 'Lisa Taylor', condition: 'Chest Pain', priority: 'High', time: '1 day ago' },
            { id: 4, patient: 'Tom Clark', condition: 'Back Pain', priority: 'Low', time: '2 days ago' },
          ]);
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getPriorityColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return '#EB5757';
      case 'medium': return '#F2994A';
      case 'low': return '#2D9CDB';
      default: return '#64748B';
    }
  };

  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* Top Navigation */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="logo">MediAI <span className="logo-sub">Doctor Portal</span></h1>
          <div className="welcome-section">
            <h2>Welcome, <span className="doctor-name"> {doctor.message}</span></h2>
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
            <Link to="/dashboard" className="nav-item active">
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

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Stats Overview */}
          <section className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon total-patients">
                <FaUsers />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalPatients}</h3>
                <p className="stat-label">Total Patients</p>
                <span className="stat-change positive">↑ 12% this month</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon pending-reviews">
                <FaClipboardCheck />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.pendingReviews}</h3>
                <p className="stat-label">Pending Reviews</p>
                <span className="stat-change negative">Needs attention</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon completed-today">
                <FaCalendarCheck />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.completedToday}</h3>
                <p className="stat-label">Completed Today</p>
                <span className="stat-change positive">On track</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon monthly-earnings">
                <FaChartLine />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{formatCurrency(stats.monthlyEarnings)}</h3>
                <p className="stat-label">Monthly Earnings</p>
                <span className="stat-change positive">↑ 8% from last month</span>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/patients" className="action-card">
                <div className="action-icon">
                  <FaUsers />
                </div>
                <h3>View Patients</h3>
                <p>Access patient records and history</p>
              </Link>
              <Link to="/Report" className="action-card">
                <div className="action-icon">
                  <FaFileMedical />
                </div>
                <h3>Analyze Reports</h3>
                <p>Review AI diagnoses and provide feedback</p>
                <span className="action-badge">8 pending</span>
              </Link>
              <Link to="/appointments" className="action-card">
                <div className="action-icon">
                  <FaCalendarCheck />
                </div>
                <h3>Schedule</h3>
                <p>Manage appointments and availability</p>
              </Link>
              <Link to="/chat" className="action-card">
                <div className="action-icon">
                  <FaComments />
                </div>
                <h3>Chat with Patients</h3>
                <p>Real-time communication with patients</p>
              </Link>
            </div>
          </section>

          {/* Pending Cases & Recent Activity */}
          <section className="dashboard-details">
            {/* Pending Cases */}
            <div className="detail-section">
              <div className="section-header">
                <h3>Pending Cases</h3>
                <Link to="/Report" className="view-all">View All</Link>
              </div>
              <div className="cases-list">
                {pendingCases.map(caseItem => (
                  <div key={caseItem.id} className="case-item">
                    <div className="case-info">
                      <h4>{caseItem.patient}</h4>
                      <p className="case-condition">{caseItem.condition}</p>
                      <span className="case-time">{caseItem.time}</span>
                    </div>
                    <div 
                      className="case-priority" 
                      style={{ backgroundColor: getPriorityColor(caseItem.priority) }}
                    >
                      {caseItem.priority}
                    </div>
                    <button className="case-action">Review</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="detail-section">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <Link to="/history" className="view-all">View History</Link>
              </div>
              <div className="activity-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'review' && <FaClipboardCheck />}
                      {activity.type === 'consultation' && <FaComments />}
                      {activity.type === 'report' && <FaFileMedical />}
                      {activity.type === 'followup' && <FaCalendarCheck />}
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">
                        {activity.type === 'review' && 'Diagnosis Review'}
                        {activity.type === 'consultation' && 'Patient Consultation'}
                        {activity.type === 'report' && 'Medical Report'}
                        {activity.type === 'followup' && 'Follow-up Scheduled'}
                      </p>
                      <p className="activity-patient">{activity.patient}</p>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-time">{activity.time}</span>
                      <span className={`activity-status ${activity.status}`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section className="appointments-section">
            <h2 className="section-title">Today's Appointments</h2>
            <div className="appointments-list">
              <div className="appointment-card">
                <div className="appointment-time">
                  <span className="time">10:30 AM</span>
                  <span className="duration">30 min</span>
                </div>
                <div className="appointment-details">
                  <h4>John Doe</h4>
                  <p>Follow-up: Bronchitis Recovery</p>
                  <div className="appointment-tags">
                    <span className="tag telehealth">Telehealth</span>
                    <span className="tag confirmed">Confirmed</span>
                  </div>
                </div>
                <div className="appointment-actions">
                  <button className="btn-primary">Join Call</button>
                  <button className="btn-secondary">Reschedule</button>
                </div>
              </div>
              
              <div className="appointment-card">
                <div className="appointment-time">
                  <span className="time">2:00 PM</span>
                  <span className="duration">45 min</span>
                </div>
                <div className="appointment-details">
                  <h4>Sarah Miller</h4>
                  <p>New Patient Consultation</p>
                  <div className="appointment-tags">
                    <span className="tag in-person">In-person</span>
                    <span className="tag pending">Awaiting</span>
                  </div>
                </div>
                <div className="appointment-actions">
                  <button className="btn-primary">Start</button>
                  <button className="btn-secondary">Details</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;