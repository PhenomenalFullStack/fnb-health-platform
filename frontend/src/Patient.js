import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaUserMd,
  FaBell,
  FaSignOutAlt,
  FaSearch,
  FaFilter,
  FaCalendar,
  FaEnvelope,
  FaPhone,
  FaStethoscope,
  FaPlus,
  FaDownload,
  FaEllipsisV,
  FaUser,
  FaUserInjured,
  FaHistory,
  FaFileMedical,
  FaChartLine,
  FaVenusMars,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './patient.css';

function Patients() {
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    newThisMonth: 0,
    pendingReviews: 0
  });
  const navigate = useNavigate();

  // Dummy patient data
  const dummyPatients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      bloodType: 'O+',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-20',
      status: 'Active',
      condition: 'Hypertension',
      severity: 'Moderate',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      address: '123 Main St, City, State 12345',
      emergencyContact: 'Jane Doe (Wife) +1 (555) 987-6543',
      allergies: ['Penicillin', 'Peanuts'],
      medications: ['Lisinopril 10mg', 'Metformin 500mg'],
      notes: 'Patient needs regular blood pressure monitoring.',
      avatarColor: '#2D9CDB'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      age: 32,
      gender: 'Female',
      bloodType: 'A+',
      lastVisit: '2024-01-20',
      nextAppointment: '2024-02-25',
      status: 'Active',
      condition: 'Diabetes Type 2',
      severity: 'Mild',
      phone: '+1 (555) 234-5678',
      email: 'sarah.m@example.com',
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: 'Mike Miller (Husband) +1 (555) 876-5432',
      allergies: ['Sulfa Drugs'],
      medications: ['Metformin 1000mg', 'Insulin Glargine'],
      notes: 'Well-controlled with current medication.',
      avatarColor: '#9B51E0'
    },
    {
      id: 3,
      name: 'Robert Chen',
      age: 58,
      gender: 'Male',
      bloodType: 'B+',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-02-15',
      status: 'Active',
      condition: 'Asthma',
      severity: 'Moderate',
      phone: '+1 (555) 345-6789',
      email: 'robert.c@example.com',
      address: '789 Pine Rd, City, State 12345',
      emergencyContact: 'Lisa Chen (Wife) +1 (555) 765-4321',
      allergies: ['Dust Mites', 'Pollen'],
      medications: ['Albuterol Inhaler', 'Fluticasone'],
      notes: 'Seasonal exacerbations expected.',
      avatarColor: '#F2994A'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      age: 29,
      gender: 'Female',
      bloodType: 'AB+',
      lastVisit: '2023-12-15',
      nextAppointment: '2024-03-01',
      status: 'Inactive',
      condition: 'Migraine',
      severity: 'Mild',
      phone: '+1 (555) 456-7890',
      email: 'maria.g@example.com',
      address: '101 Elm St, City, State 12345',
      emergencyContact: 'Carlos Garcia (Brother) +1 (555) 654-3210',
      allergies: ['None'],
      medications: ['Sumatriptan 50mg'],
      notes: 'Stress-related migraines.',
      avatarColor: '#27AE60'
    },
    {
      id: 5,
      name: 'David Wilson',
      age: 62,
      gender: 'Male',
      bloodType: 'O-',
      lastVisit: '2024-01-25',
      nextAppointment: '2024-03-10',
      status: 'Active',
      condition: 'Arthritis',
      severity: 'Severe',
      phone: '+1 (555) 567-8901',
      email: 'david.w@example.com',
      address: '202 Maple Dr, City, State 12345',
      emergencyContact: 'Susan Wilson (Wife) +1 (555) 543-2109',
      allergies: ['NSAIDs'],
      medications: ['Naproxen 500mg', 'Methotrexate'],
      notes: 'Requires regular pain management.',
      avatarColor: '#EB5757'
    },
    {
      id: 6,
      name: 'Emma Thompson',
      age: 38,
      gender: 'Female',
      bloodType: 'A-',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-02-28',
      status: 'Active',
      condition: 'Anxiety Disorder',
      severity: 'Moderate',
      phone: '+1 (555) 678-9012',
      email: 'emma.t@example.com',
      address: '303 Cedar Ln, City, State 12345',
      emergencyContact: 'James Thompson (Husband) +1 (555) 432-1098',
      allergies: ['None'],
      medications: ['Sertraline 100mg', 'Clonazepam'],
      notes: 'Responding well to therapy.',
      avatarColor: '#56CCF2'
    },
    {
      id: 7,
      name: 'Michael Brown',
      age: 41,
      gender: 'Male',
      bloodType: 'B+',
      lastVisit: '2023-11-30',
      nextAppointment: 'Pending',
      status: 'Inactive',
      condition: 'High Cholesterol',
      severity: 'Mild',
      phone: '+1 (555) 789-0123',
      email: 'michael.b@example.com',
      address: '404 Birch Ct, City, State 12345',
      emergencyContact: 'Emily Brown (Sister) +1 (555) 321-0987',
      allergies: ['Statins'],
      medications: ['Atorvastatin 20mg'],
      notes: 'Diet-controlled, good progress.',
      avatarColor: '#2D9CDB'
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      age: 51,
      gender: 'Female',
      bloodType: 'O+',
      lastVisit: '2024-01-18',
      nextAppointment: '2024-03-05',
      status: 'Active',
      condition: 'Hypothyroidism',
      severity: 'Mild',
      phone: '+1 (555) 890-1234',
      email: 'lisa.a@example.com',
      address: '505 Spruce Way, City, State 12345',
      emergencyContact: 'Peter Anderson (Husband) +1 (555) 210-9876',
      allergies: ['None'],
      medications: ['Levothyroxine 75mcg'],
      notes: 'Stable with current dosage.',
      avatarColor: '#9B51E0'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Patients' },
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
    { id: 'high-priority', label: 'High Priority' },
    { id: 'new', label: 'New This Month' }
  ];

  useEffect(() => {
    // Fetch doctor data
    const fetchDoctor = async () => {
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
        console.error('Error fetching doctor:', error);
      }
    };

    fetchDoctor();
    
    // Set patients and stats
    setPatients(dummyPatients);
    setFilteredPatients(dummyPatients);
    
    // Calculate stats
    const activeCount = dummyPatients.filter(p => p.status === 'Active').length;
    const newThisMonth = dummyPatients.filter(p => {
      const lastVisit = new Date(p.lastVisit);
      const now = new Date();
      return lastVisit.getMonth() === now.getMonth() && lastVisit.getFullYear() === now.getFullYear();
    }).length;
    
    setStats({
      total: dummyPatients.length,
      active: activeCount,
      newThisMonth: newThisMonth,
      pendingReviews: 3 // Hardcoded for now
    });
  }, []);

  useEffect(() => {
    let results = patients;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'active':
          results = results.filter(p => p.status === 'Active');
          break;
        case 'inactive':
          results = results.filter(p => p.status === 'Inactive');
          break;
        case 'high-priority':
          results = results.filter(p => p.severity === 'Severe');
          break;
        case 'new':
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          results = results.filter(p => {
            const lastVisit = new Date(p.lastVisit);
            return lastVisit.getMonth() === currentMonth && lastVisit.getFullYear() === currentYear;
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredPatients(results);
  }, [searchTerm, selectedFilter, patients]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild': return '#27AE60';
      case 'moderate': return '#F2994A';
      case 'severe': return '#EB5757';
      default: return '#64748B';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? '#27AE60' : '#64748B';
  };

  const exportPatientData = () => {
    alert('Patient data exported successfully');
  };

  const sendBulkMessage = () => {
    alert('Bulk message feature coming soon');
  };

  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading patients...</p>
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
            
            <Link to="/patients" className="nav-item active">
              <FaUserInjured />
              <span>My Patients</span>
            </Link>
            
            <Link to="/Report" className="nav-item">
              <FaFileMedical />
              <span>Analyze Reports</span>
            </Link>
            
            <Link to="/appointments" className="nav-item">
              <FaCalendar />
              <span>Appointments</span>
            </Link>
            
            <Link to="/chat" className="nav-item">
              <FaEnvelope />
              <span>Patient Chat</span>
            </Link>
            
            <Link to="/history" className="nav-item">
              <FaHistory />
              <span>History</span>
            </Link>
            
            <Link to="/settings" className="nav-item">
              <FaEllipsisV />
              <span>Settings</span>
            </Link>
          </nav>
          
          <div className="sidebar-help">
            <h3>Patient Stats</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <FaUserInjured />
                <span>{stats.total} Total</span>
              </div>
              <div className="sidebar-stat">
                <FaChartLine />
                <span>{stats.active} Active</span>
              </div>
            </div>
            <button className="support-btn">Add New Patient</button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Patient Management</h1>
              <p className="page-subtitle">Manage and monitor your patients' health records</p>
            </div>
            <div className="header-actions">
              <button className="btn-primary" onClick={sendBulkMessage}>
                <FaEnvelope /> Send Message
              </button>
              <button className="btn-secondary" onClick={exportPatientData}>
                <FaDownload /> Export Data
              </button>
              <button className="btn-success">
                <FaPlus /> New Patient
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <section className="stats-overview">
            <div className="stat-card">
              <div className="stat-icon total-patients">
                <FaUserInjured />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.total}</h3>
                <p className="stat-label">Total Patients</p>
                <span className="stat-change positive">↑ {stats.newThisMonth} new this month</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon active-patients">
                <FaChartLine />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.active}</h3>
                <p className="stat-label">Active Patients</p>
                <span className="stat-change positive">↑ 85% active rate</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon pending-reviews">
                <FaFileMedical />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.pendingReviews}</h3>
                <p className="stat-label">Pending Reviews</p>
                <span className="stat-change warning">Needs attention</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon new-patients">
                <FaUser />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.newThisMonth}</h3>
                <p className="stat-label">New This Month</p>
                <span className="stat-change positive">↑ 12% growth</span>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <div className="search-filter-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search patients by name, condition, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </div>
            
            <div className="filter-buttons">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(filter.id)}
                >
                  <FaFilter /> {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Patients Table */}
          <section className="patients-table-section">
            <div className="table-header">
              <h3 className="section-title">Patient List</h3>
              <span className="table-count">{filteredPatients.length} patients found</span>
            </div>
            
            <div className="patients-table">
              <div className="table-responsive">
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Condition</th>
                      <th>Last Visit</th>
                      <th>Next Appointment</th>
                      <th>Status</th>
                      <th>Severity</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map(patient => (
                      <tr key={patient.id} className="patient-row">
                        <td>
                          <div className="patient-info-cell">
                            <div 
                              className="patient-avatar"
                              style={{ backgroundColor: patient.avatarColor }}
                            >
                              <FaUser />
                            </div>
                            <div>
                              <h4 className="patient-name">{patient.name}</h4>
                              <p className="patient-details">
                                <FaVenusMars /> {patient.gender} • <FaBirthdayCake /> {patient.age} yrs • <span className="blood-type">{patient.bloodType}</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="condition-cell">
                            <FaStethoscope />
                            <span>{patient.condition}</span>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            <FaCalendar />
                            <span>{patient.lastVisit}</span>
                          </div>
                        </td>
                        <td>
                          <div className="date-cell">
                            <FaCalendar />
                            <span className={patient.nextAppointment === 'Pending' ? 'pending' : ''}>
                              {patient.nextAppointment}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(patient.status) }}
                          >
                            {patient.status}
                          </span>
                        </td>
                        <td>
                          <span 
                            className="severity-badge"
                            style={{ backgroundColor: getSeverityColor(patient.severity) }}
                          >
                            {patient.severity}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-view"
                              onClick={() => handleViewPatient(patient)}
                            >
                              View
                            </button>
                            <button className="btn-message">
                              <FaEnvelope />
                            </button>
                            <button className="btn-call">
                              <FaPhone />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Patient Cards (Alternative View) */}
          <section className="patients-cards-section">
            <h3 className="section-title">Patient Cards View</h3>
            <div className="patients-grid">
              {filteredPatients.slice(0, 4).map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="card-header">
                    <div 
                      className="patient-avatar-large"
                      style={{ backgroundColor: patient.avatarColor }}
                    >
                      <FaUser />
                    </div>
                    <div className="patient-header-info">
                      <h4>{patient.name}</h4>
                      <p>{patient.age} years • {patient.gender} • {patient.bloodType}</p>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <div className="patient-info-row">
                      <FaStethoscope />
                      <span>{patient.condition}</span>
                    </div>
                    <div className="patient-info-row">
                      <FaCalendar />
                      <span>Last: {patient.lastVisit}</span>
                    </div>
                    <div className="patient-info-row">
                      <FaCalendar />
                      <span>Next: {patient.nextAppointment}</span>
                    </div>
                    <div className="patient-info-row">
                      <FaMapMarkerAlt />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <div className="patient-status">
                      <span 
                        className="status-indicator"
                        style={{ backgroundColor: getStatusColor(patient.status) }}
                      ></span>
                      {patient.status}
                    </div>
                    <div className="card-actions">
                      <button className="btn-primary">View</button>
                      <button className="btn-secondary">Message</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Patient Detail Modal */}
          {showPatientDetails && selectedPatient && (
            <div className="patient-modal-overlay">
              <div className="patient-modal">
                <div className="modal-header">
                  <h2>Patient Details</h2>
                  <button 
                    className="close-modal"
                    onClick={() => setShowPatientDetails(false)}
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-content">
                  <div className="patient-profile-header">
                    <div 
                      className="modal-avatar"
                      style={{ backgroundColor: selectedPatient.avatarColor }}
                    >
                      <FaUser />
                    </div>
                    <div className="modal-patient-info">
                      <h3>{selectedPatient.name}</h3>
                      <p>{selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.bloodType}</p>
                      <div className="modal-status">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(selectedPatient.status) }}
                        >
                          {selectedPatient.status}
                        </span>
                        <span 
                          className="severity-badge"
                          style={{ backgroundColor: getSeverityColor(selectedPatient.severity) }}
                        >
                          {selectedPatient.severity} severity
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-grid">
                    <div className="modal-section">
                      <h4>Contact Information</h4>
                      <div className="info-item">
                        <FaPhone /> <span>{selectedPatient.phone}</span>
                      </div>
                      <div className="info-item">
                        <FaEnvelope /> <span>{selectedPatient.email}</span>
                      </div>
                      <div className="info-item">
                        <FaMapMarkerAlt /> <span>{selectedPatient.address}</span>
                      </div>
                      <div className="info-item">
                        <FaUser /> <span>Emergency: {selectedPatient.emergencyContact}</span>
                      </div>
                    </div>
                    
                    <div className="modal-section">
                      <h4>Medical Information</h4>
                      <div className="info-item">
                        <FaStethoscope /> <span>Condition: {selectedPatient.condition}</span>
                      </div>
                      <div className="info-item">
                        <FaFileMedical /> <span>Last Visit: {selectedPatient.lastVisit}</span>
                      </div>
                      <div className="info-item">
                        <FaCalendar /> <span>Next Appointment: {selectedPatient.nextAppointment}</span>
                      </div>
                    </div>
                    
                    <div className="modal-section">
                      <h4>Allergies</h4>
                      <div className="allergies-list">
                        {selectedPatient.allergies.map((allergy, index) => (
                          <span key={index} className="allergy-tag">{allergy}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="modal-section">
                      <h4>Current Medications</h4>
                      <div className="medications-list">
                        {selectedPatient.medications.map((med, index) => (
                          <div key={index} className="medication-item">{med}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-section full-width">
                    <h4>Doctor's Notes</h4>
                    <p className="doctor-notes">{selectedPatient.notes}</p>
                  </div>
                  
                  <div className="modal-actions">
                    <button className="btn-primary">Edit Patient</button>
                    <button className="btn-secondary">View Full History</button>
                    <button className="btn-success">Schedule Appointment</button>
                    <button className="btn-danger" onClick={() => setShowPatientDetails(false)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Patients;