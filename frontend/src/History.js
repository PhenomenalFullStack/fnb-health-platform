import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
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
  FaFilter, 
  FaCalendarAlt,
  FaCommentDots,
  FaClipboardCheck,
  FaDownload,
  FaEye,
  FaPrint,
  FaSort,
  FaTimes,
  FaBars
} from 'react-icons/fa';
import './History.css';

function History() {
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [historyData, setHistoryData] = useState({
    diagnosisHistory: [],
    consultationHistory: [],
    reviewHistory: [],
    prescriptionHistory: []
  });
  const navigate = useNavigate();

  // Mock data for history
  const mockHistoryData = {
    diagnosisHistory: [
      {
        id: 1,
        patient: 'John Doe',
        age: 45,
        condition: 'Skin Rash',
        date: '2024-01-20',
        time: '10:30 AM',
        status: 'Reviewed',
        aiConfidence: 0.92,
        doctorNotes: 'Confirmed diagnosis, prescribed topical cream.',
        images: 2,
        type: 'diagnosis'
      },
      {
        id: 2,
        patient: 'Sarah Miller',
        age: 32,
        condition: 'Eye Infection',
        date: '2024-01-19',
        time: '2:15 PM',
        status: 'Pending Review',
        aiConfidence: 0.87,
        doctorNotes: '',
        images: 1,
        type: 'diagnosis'
      },
      {
        id: 3,
        patient: 'Robert Chen',
        age: 58,
        condition: 'Psoriasis',
        date: '2024-01-18',
        time: '9:45 AM',
        status: 'Reviewed',
        aiConfidence: 0.95,
        doctorNotes: 'Chronic condition, recommended specialist referral.',
        images: 3,
        type: 'diagnosis'
      },
      {
        id: 4,
        patient: 'Maria Garcia',
        age: 29,
        condition: 'Acne',
        date: '2024-01-17',
        time: '4:20 PM',
        status: 'Reviewed',
        aiConfidence: 0.89,
        doctorNotes: 'Mild case, prescribed benzoyl peroxide.',
        images: 4,
        type: 'diagnosis'
      }
    ],
    consultationHistory: [
      {
        id: 101,
        patient: 'Emma Wilson',
        type: 'Telehealth',
        duration: '30 mins',
        date: '2024-01-20',
        time: '11:00 AM',
        purpose: 'Follow-up: Skin Condition',
        notes: 'Patient reported improvement. Continue medication.',
        status: 'Completed',
        recording: true
      },
      {
        id: 102,
        patient: 'James Brown',
        type: 'In-person',
        duration: '45 mins',
        date: '2024-01-19',
        time: '3:30 PM',
        purpose: 'Initial Consultation',
        notes: 'New patient with multiple concerns.',
        status: 'Completed',
        recording: false
      }
    ],
    reviewHistory: [
      {
        id: 201,
        patient: 'Tom Clark',
        diagnosis: 'Back Pain',
        reviewType: 'AI Diagnosis Review',
        date: '2024-01-20',
        time: '9:15 AM',
        duration: '15 mins',
        action: 'Confirmed Diagnosis',
        notes: 'Agreed with AI diagnosis, added physical therapy recommendation.'
      },
      {
        id: 202,
        patient: 'Lisa Taylor',
        diagnosis: 'Chest Pain',
        reviewType: 'Second Opinion',
        date: '2024-01-19',
        time: '1:45 PM',
        duration: '25 mins',
        action: 'Referred to Cardiologist',
        notes: 'Referred for ECG and further testing.'
      }
    ],
    prescriptionHistory: [
      {
        id: 301,
        patient: 'John Doe',
        medication: 'Amoxicillin 500mg',
        dosage: '3 times daily',
        duration: '10 days',
        date: '2024-01-20',
        status: 'Active',
        refills: 0,
        notes: 'For skin infection'
      },
      {
        id: 302,
        patient: 'Sarah Miller',
        medication: 'Artificial Tears',
        dosage: 'As needed',
        duration: '30 days',
        date: '2024-01-19',
        status: 'Active',
        refills: 2,
        notes: 'For dry eyes'
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setHistoryData(mockHistoryData);
  }, []);

  const tabs = [
    { id: 'all', label: 'All History', count: 10 },
    { id: 'diagnosis', label: 'Diagnoses', count: 4 },
    { id: 'consultation', label: 'Consultations', count: 2 },
    { id: 'review', label: 'Reviews', count: 2 },
    { id: 'prescription', label: 'Prescriptions', count: 2 }
  ];

  const dateFilters = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' }
  ];

  const sortOptions = [
    { id: 'date', label: 'Date (Newest)' },
    { id: 'date-old', label: 'Date (Oldest)' },
    { id: 'patient', label: 'Patient Name' },
    { id: 'status', label: 'Status' }
  ];

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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'reviewed':
      case 'completed':
      case 'active':
        return '#27AE60';
      case 'pending review':
        return '#F2994A';
      case 'cancelled':
      case 'expired':
        return '#EB5757';
      default:
        return '#64748B';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'diagnosis':
        return <FaFileMedical className="history-icon diagnosis" />;
      case 'consultation':
        return <FaCommentDots className="history-icon consultation" />;
      case 'review':
        return <FaClipboardCheck className="history-icon review" />;
      case 'prescription':
        return <FaFileMedical className="history-icon prescription" />;
      default:
        return <FaFileMedical className="history-icon default" />;
    }
  };

  const getFilteredData = () => {
    let data = [];
    
    if (activeTab === 'all') {
      data = [
        ...historyData.diagnosisHistory.map(item => ({ ...item, category: 'diagnosis' })),
        ...historyData.consultationHistory.map(item => ({ ...item, category: 'consultation' })),
        ...historyData.reviewHistory.map(item => ({ ...item, category: 'review' })),
        ...historyData.prescriptionHistory.map(item => ({ ...item, category: 'prescription' }))
      ];
    } else if (activeTab === 'diagnosis') {
      data = historyData.diagnosisHistory.map(item => ({ ...item, category: 'diagnosis' }));
    } else if (activeTab === 'consultation') {
      data = historyData.consultationHistory.map(item => ({ ...item, category: 'consultation' }));
    } else if (activeTab === 'review') {
      data = historyData.reviewHistory.map(item => ({ ...item, category: 'review' }));
    } else if (activeTab === 'prescription') {
      data = historyData.prescriptionHistory.map(item => ({ ...item, category: 'prescription' }));
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter(item =>
        item.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.condition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.medication?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter (simplified)
    if (dateFilter !== 'all') {
      // In real app, implement actual date filtering
      data = data.filter(item => item.date === '2024-01-20'); // Mock filter
    }

    // Apply sorting
    data.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-old') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'patient') return a.patient?.localeCompare(b.patient);
      if (sortBy === 'status') return a.status?.localeCompare(b.status);
      return 0;
    });

    return data;
  };

  const handleViewDetails = (item) => {
    setSelectedPatient(item);
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here.');
  };

  const handlePrint = () => {
    alert('Print functionality would be implemented here.');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('all');
    setSortBy('date');
  };

  const filteredData = getFilteredData();

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
            
            <Link to="/history" className="nav-item active">
              <FaHistory />
              <span>History</span>
            </Link>
            
            <Link to="/settings" className="nav-item">
              <FaCog />
              <span>Settings</span>
            </Link>
          </nav>
          
          <div className="sidebar-help">
            <h3>History Stats</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <FaFileMedical />
                <span>{historyData.diagnosisHistory.length} Diagnoses</span>
              </div>
              <div className="sidebar-stat">
                <FaCommentDots />
                <span>{historyData.consultationHistory.length} Consultations</span>
              </div>
            </div>
            <button className="support-btn">View Reports</button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="history-content">
            {/* Header */}
            <header className="history-header">
              <div className="header-left">
                <div className="page-title">
                  <h1>Medical History</h1>
                  <p className="page-subtitle">View and manage patient history, diagnoses, and consultations</p>
                </div>
              </div>
              <div className="header-right">
                <button className="export-btn" onClick={handleExport}>
                  <FaDownload /> Export History
                </button>
                <button className="print-btn" onClick={handlePrint}>
                  <FaPrint /> Print Report
                </button>
              </div>
            </header>

            {/* Filters and Controls */}
            <div className="history-controls">
              <div className="search-container">
                <FaSearch className="searchh-ico" />
                <input
                  type="text"
                  placeholder="Search by patient name, condition, or medication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button className="clear-search" onClick={() => setSearchTerm('')}>
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="filter-container">
                <FaFilter className="filter-icon" />
                <select 
                  value={dateFilter} 
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="filter-select"
                >
                  {dateFilters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.label}</option>
                  ))}
                </select>
              </div>

              <div className="sort-container">
                <FaSort className="sort-icon" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>

              {(searchTerm || dateFilter !== 'all' || sortBy !== 'date') && (
                <button className="clear-filters" onClick={clearFilters}>
                  <FaTimes /> Clear Filters
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="history-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                  <span className="tab-count">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Stats Overview */}
            <div className="history-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaFileMedical />
                </div>
                <div className="stat-content">
                  <h3>{historyData.diagnosisHistory.length}</h3>
                  <p>Total Diagnoses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaCommentDots />
                </div>
                <div className="stat-content">
                  <h3>{historyData.consultationHistory.length}</h3>
                  <p>Consultations</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaClipboardCheck />
                </div>
                <div className="stat-content">
                  <h3>{historyData.reviewHistory.length}</h3>
                  <p>Reviews Completed</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaUserMd />
                </div>
                <div className="stat-content">
                  <h3>4</h3>
                  <p>Active Patients</p>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="history-list">
              {filteredData.length === 0 ? (
                <div className="empty-state">
                  <FaFileMedical className="empty-icon" />
                  <h3>No History Found</h3>
                  <p>No medical history matches your current filters.</p>
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="history-items">
                  {filteredData.map(item => (
                    <div key={item.id} className="history-item">
                      <div className="item-header">
                        <div className="item-type">
                          {getTypeIcon(item.category)}
                          <span className="type-label">{item.category?.charAt(0).toUpperCase() + item.category?.slice(1)}</span>
                        </div>
                        <div className="item-date">
                          <FaCalendarAlt />
                          <span>{item.date} • {item.time}</span>
                        </div>
                      </div>

                      <div className="item-content">
                        <div className="patient-info">
                          <h3>{item.patient}</h3>
                          {item.age && <span className="patient-age">{item.age} years</span>}
                        </div>

                        {item.condition && (
                          <div className="condition-info">
                            <strong>Condition:</strong> {item.condition}
                            {item.aiConfidence && (
                              <span className="confidence-badge">
                                AI Confidence: {(item.aiConfidence * 100).toFixed(0)}%
                              </span>
                            )}
                          </div>
                        )}

                        {item.diagnosis && (
                          <div className="condition-info">
                            <strong>Diagnosis:</strong> {item.diagnosis}
                          </div>
                        )}

                        {item.medication && (
                          <div className="medication-info">
                            <strong>Prescription:</strong> {item.medication}
                            <span className="dosage">{item.dosage} • {item.duration}</span>
                          </div>
                        )}

                        {item.purpose && (
                          <div className="consultation-info">
                            <strong>Purpose:</strong> {item.purpose}
                            {item.duration && <span className="duration">{item.duration}</span>}
                          </div>
                        )}

                        {item.status && (
                          <div className="status-container">
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(item.status) }}
                            >
                              {item.status}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="item-actions">
                        <button 
                          className="view-btn"
                          onClick={() => handleViewDetails(item)}
                        >
                          <FaEye /> View Details
                        </button>
                        
                        {item.images > 0 && (
                          <span className="images-count">
                            {item.images} image{item.images > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <h3>History Summary</h3>
              <div className="stats-grid">
                <div className="summary-card">
                  <h4>Most Common Condition</h4>
                  <p className="summary-value">Skin Rash</p>
                  <p className="summary-sub">3 cases this month</p>
                </div>
                <div className="summary-card">
                  <h4>Average Consultation Time</h4>
                  <p className="summary-value">27 mins</p>
                  <p className="summary-sub">Across all consultations</p>
                </div>
                <div className="summary-card">
                  <h4>AI Accuracy Rate</h4>
                  <p className="summary-value">94%</p>
                  <p className="summary-sub">Based on doctor reviews</p>
                </div>
                <div className="summary-card">
                  <h4>Patient Satisfaction</h4>
                  <p className="summary-value">4.8/5</p>
                  <p className="summary-sub">Average rating</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Patient History Details</h2>
              <button className="close-modal" onClick={() => setSelectedPatient(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="patient-details">
                <h3>{selectedPatient.patient}</h3>
                <div className="detail-row">
                  <strong>Date:</strong> {selectedPatient.date} at {selectedPatient.time}
                </div>
                
                {selectedPatient.condition && (
                  <div className="detail-row">
                    <strong>Condition:</strong> {selectedPatient.condition}
                  </div>
                )}

                {selectedPatient.diagnosis && (
                  <div className="detail-row">
                    <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
                  </div>
                )}

                {selectedPatient.medication && (
                  <div className="detail-row">
                    <strong>Medication:</strong> {selectedPatient.medication}
                  </div>
                )}

                {selectedPatient.purpose && (
                  <div className="detail-row">
                    <strong>Purpose:</strong> {selectedPatient.purpose}
                  </div>
                )}

                {selectedPatient.aiConfidence && (
                  <div className="detail-row">
                    <strong>AI Confidence:</strong> 
                    <div className="confidence-bar">
                      <div 
                        className="confidence-fill"
                        style={{ width: `${selectedPatient.aiConfidence * 100}%` }}
                      />
                      <span>{(selectedPatient.aiConfidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                )}

                {selectedPatient.doctorNotes && (
                  <div className="detail-row">
                    <strong>Doctor's Notes:</strong>
                    <p className="doctor-notes">{selectedPatient.doctorNotes}</p>
                  </div>
                )}

                {selectedPatient.notes && (
                  <div className="detail-row">
                    <strong>Notes:</strong>
                    <p>{selectedPatient.notes}</p>
                  </div>
                )}

                <div className="detail-row">
                  <strong>Status:</strong>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedPatient.status) }}
                  >
                    {selectedPatient.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedPatient(null)}>
                Close
              </button>
              <button className="btn-primary">
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;