import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Appointments.css';
import { 
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaStethoscope,
  FaVideo,
  FaMapMarkerAlt,
  FaPhone,
  FaFilter,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaCalendarCheck,
  FaCalendarTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaFileMedical,
  FaComments,
  FaHistory,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes as FaTimesIcon
} from 'react-icons/fa';

function Appointments() {
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'today', 'past'
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [setSelectedAppointment] = useState(null);
  const [setShowEditModal] = useState(false);
  
  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentType: 'consultation',
    appointmentDate: '',
    appointmentTime: '',
    duration: '30',
    location: 'telehealth',
    notes: '',
    urgency: 'normal'
  });

  // Mock data for appointments
  const mockAppointments = [
    {
      id: 1,
      patientId: 101,
      patientName: 'John Doe',
      patientAge: 45,
      patientGender: 'Male',
      patientPhone: '+1 (555) 123-4567',
      patientEmail: 'john.doe@email.com',
      appointmentType: 'Follow-up',
      appointmentDate: '2024-02-20',
      appointmentTime: '10:30 AM',
      duration: 30,
      status: 'confirmed',
      location: 'telehealth',
      doctor: 'Dr. Sarah Chen',
      notes: 'Follow-up for bronchitis recovery',
      urgency: 'normal',
      createdAt: '2024-02-10',
      symptoms: ['Cough', 'Fever', 'Fatigue'],
      medicalHistory: ['Asthma', 'Hypertension']
    },
    {
      id: 2,
      patientId: 102,
      patientName: 'Sarah Miller',
      patientAge: 32,
      patientGender: 'Female',
      patientPhone: '+1 (555) 234-5678',
      patientEmail: 'sarah.miller@email.com',
      appointmentType: 'Initial Consultation',
      appointmentDate: '2024-02-20',
      appointmentTime: '2:00 PM',
      duration: 45,
      status: 'pending',
      location: 'in-person',
      doctor: 'Dr. Sarah Chen',
      notes: 'New patient with chest pain',
      urgency: 'high',
      createdAt: '2024-02-15',
      symptoms: ['Chest pain', 'Shortness of breath'],
      medicalHistory: ['None']
    },
    {
      id: 3,
      patientId: 103,
      patientName: 'Robert Johnson',
      patientAge: 58,
      patientGender: 'Male',
      patientPhone: '+1 (555) 345-6789',
      patientEmail: 'robert.j@email.com',
      appointmentType: 'Routine Check-up',
      appointmentDate: '2024-02-21',
      appointmentTime: '9:00 AM',
      duration: 30,
      status: 'confirmed',
      location: 'in-person',
      doctor: 'Dr. Sarah Chen',
      notes: 'Annual physical examination',
      urgency: 'normal',
      createdAt: '2024-01-20',
      symptoms: [],
      medicalHistory: ['Diabetes', 'High Cholesterol']
    },
    {
      id: 4,
      patientId: 104,
      patientName: 'Maria Garcia',
      patientAge: 28,
      patientGender: 'Female',
      patientPhone: '+1 (555) 456-7890',
      patientEmail: 'maria.g@email.com',
      appointmentType: 'Specialist Referral',
      appointmentDate: '2024-02-21',
      appointmentTime: '11:00 AM',
      duration: 60,
      status: 'confirmed',
      location: 'telehealth',
      doctor: 'Dr. Sarah Chen',
      notes: 'Referred to cardiologist',
      urgency: 'medium',
      createdAt: '2024-02-05',
      symptoms: ['Palpitations', 'Dizziness'],
      medicalHistory: ['Anxiety']
    },
    {
      id: 5,
      patientId: 105,
      patientName: 'David Wilson',
      patientAge: 65,
      patientGender: 'Male',
      patientPhone: '+1 (555) 567-8901',
      patientEmail: 'david.w@email.com',
      appointmentType: 'Medication Review',
      appointmentDate: '2024-02-22',
      appointmentTime: '3:30 PM',
      duration: 30,
      status: 'pending',
      location: 'telehealth',
      doctor: 'Dr. Sarah Chen',
      notes: 'Review of blood pressure medications',
      urgency: 'normal',
      createdAt: '2024-02-12',
      symptoms: [],
      medicalHistory: ['Hypertension', 'Arthritis']
    },
    {
      id: 6,
      patientId: 106,
      patientName: 'Lisa Taylor',
      patientAge: 41,
      patientGender: 'Female',
      patientPhone: '+1 (555) 678-9012',
      patientEmail: 'lisa.t@email.com',
      appointmentType: 'Emergency',
      appointmentDate: '2024-02-19',
      appointmentTime: '4:00 PM',
      duration: 45,
      status: 'completed',
      location: 'in-person',
      doctor: 'Dr. Sarah Chen',
      notes: 'Acute abdominal pain',
      urgency: 'high',
      createdAt: '2024-02-19',
      symptoms: ['Severe abdominal pain', 'Nausea'],
      medicalHistory: ['Appendectomy']
    },
    {
      id: 7,
      patientId: 107,
      patientName: 'Michael Brown',
      patientAge: 52,
      patientGender: 'Male',
      patientPhone: '+1 (555) 789-0123',
      patientEmail: 'michael.b@email.com',
      appointmentType: 'Lab Results Review',
      appointmentDate: '2024-02-23',
      appointmentTime: '1:00 PM',
      duration: 30,
      status: 'confirmed',
      location: 'telehealth',
      doctor: 'Dr. Sarah Chen',
      notes: 'Discuss blood test results',
      urgency: 'normal',
      createdAt: '2024-02-14',
      symptoms: [],
      medicalHistory: ['Diabetes', 'Obesity']
    },
    {
      id: 8,
      patientId: 108,
      patientName: 'Emma Clark',
      patientAge: 29,
      patientGender: 'Female',
      patientPhone: '+1 (555) 890-1234',
      patientEmail: 'emma.c@email.com',
      appointmentType: 'Pregnancy Check-up',
      appointmentDate: '2024-02-24',
      appointmentTime: '10:00 AM',
      duration: 45,
      status: 'confirmed',
      location: 'in-person',
      doctor: 'Dr. Sarah Chen',
      notes: 'Second trimester check-up',
      urgency: 'normal',
      createdAt: '2024-01-30',
      symptoms: [],
      medicalHistory: ['Healthy pregnancy']
    }
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

  useEffect(() => {
    // Filter appointments based on selected filter and search term
    let filtered = [...mockAppointments];
    
    // Apply filter
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(apt => apt.appointmentDate === today);
    } else if (filter === 'upcoming') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(apt => apt.appointmentDate >= today);
    } else if (filter === 'past') {
      const today = new Date().toISOString().split('T')[0];
      filtered = filtered.filter(apt => apt.appointmentDate < today);
    } else if (filter === 'confirmed') {
      filtered = filtered.filter(apt => apt.status === 'confirmed');
    } else if (filter === 'pending') {
      filtered = filtered.filter(apt => apt.status === 'pending');
    }
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.appointmentType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setAppointments(filtered);
  }, [filter, searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  const getAppointmentsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.appointmentDate === dateString);
  };

  const handleNewAppointmentSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send data to API
    console.log('New appointment:', newAppointment);
    alert('Appointment scheduled successfully!');
    setShowNewAppointmentModal(false);
    // Reset form
    setNewAppointment({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      appointmentType: 'consultation',
      appointmentDate: '',
      appointmentTime: '',
      duration: '30',
      location: 'telehealth',
      notes: '',
      urgency: 'normal'
    });
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      // Here you would normally delete from API
      console.log('Delete appointment:', appointmentId);
      alert('Appointment deleted successfully!');
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    // Here you would normally update status in API
    console.log(`Update appointment ${appointmentId} status to ${newStatus}`);
    alert('Appointment status updated!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#27AE60';
      case 'pending': return '#F2994A';
      case 'completed': return '#2D9CDB';
      case 'cancelled': return '#EB5757';
      default: return '#64748B';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return '#EB5757';
      case 'medium': return '#F2994A';
      case 'normal': return '#2D9CDB';
      default: return '#64748B';
    }
  };

  const getLocationIcon = (location) => {
    return location === 'telehealth' ? <FaVideo /> : <FaMapMarkerAlt />;
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!doctor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="doctor-dashboard">
      {/* Top Navigation */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimesIcon /> : <FaBars />}
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
            
            <Link to="/appointments" className="nav-item active">
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
            <h3>Appointment Stats</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <FaCalendarCheck />
                <span>3 Today</span>
              </div>
              <div className="sidebar-stat">
                <FaClock />
                <span>12 This Week</span>
              </div>
            </div>
            <button className="support-btn">Schedule New</button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="appointments-page">
            {/* Header */}
            <header className="appointments-headerr">
              <div className="header-left">
                <h1>
                  <FaCalendarAlt className="header-icon" />
                  Appointments
                </h1>
                <p className="header-subtitle">Manage your patient appointments</p>
              </div>
              
              <div className="header-right">
                <button 
                  className="btn-primary"
                  onClick={() => setShowNewAppointmentModal(true)}
                >
                  <FaPlus />
                  New Appointment
                </button>
              </div>
            </header>

            {/* Stats Summary */}
            <div className="appointments-stats">
              <div className="stat-card">
                <div className="stat-icon today">
                  <FaCalendarCheck />
                </div>
                <div className="stat-content">
                  <h3>3</h3>
                  <p>Today's Appointments</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon upcoming">
                  <FaClock />
                </div>
                <div className="stat-content">
                  <h3>12</h3>
                  <p>Upcoming This Week</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon telehealth">
                  <FaVideo />
                </div>
                <div className="stat-content">
                  <h3>5</h3>
                  <p>Telehealth Appointments</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon pending">
                  <FaCalendarTimes />
                </div>
                <div className="stat-content">
                  <h3>2</h3>
                  <p>Pending Confirmation</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="appointments-controls">
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                  onClick={() => setViewMode('calendar')}
                >
                  <FaCalendarAlt />
                  Calendar View
                </button>
                <button 
                  className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FaClock />
                  List View
                </button>
              </div>
              
              <div className="search-filter">
                <div className="search-box">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="filter-dropdown">
                  <FaFilter />
                  <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Appointments</option>
                    <option value="today">Today</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="appointments-main-content">
              {viewMode === 'calendar' ? (
                <div className="calendar-view">
                  {/* Date Navigation */}
                  <div className="date-navigation">
                    <button className="nav-btn" onClick={() => handleDateChange('prev')}>
                      <FaChevronLeft />
                      Previous Day
                    </button>
                    
                    <div className="current-date">
                      <h2>{selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</h2>
                    </div>
                    
                    <button className="nav-btn" onClick={() => handleDateChange('next')}>
                      Next Day
                      <FaChevronRight />
                    </button>
                  </div>
                  
                  {/* Time Slots */}
                  <div className="time-slots">
                    {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(time => {
                      const appointmentsAtTime = getAppointmentsForDate(selectedDate).filter(
                        apt => apt.appointmentTime.includes(time.split(' ')[0])
                      );
                      
                      return (
                        <div key={time} className="time-slot">
                          <div className="time-label">{time}</div>
                          <div className="appointments-container">
                            {appointmentsAtTime.map(apt => (
                              <div 
                                key={apt.id} 
                                className={`appointment-card ${apt.urgency}`}
                                onClick={() => handleEditAppointment(apt)}
                              >
                                <div className="appointment-time">{apt.appointmentTime}</div>
                                <div className="appointment-patient">{apt.patientName}</div>
                                <div className="appointment-type">{apt.appointmentType}</div>
                                <div className="appointment-location">
                                  {getLocationIcon(apt.location)}
                                  {apt.location === 'telehealth' ? 'Telehealth' : 'In-person'}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="list-view">
                  <div className="appointments-table-container">
                    <table className="appointments-table">
                      <thead>
                        <tr>
                          <th>Date & Time</th>
                          <th>Patient</th>
                          <th>Type</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Urgency</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map(appointment => (
                          <tr key={appointment.id} className="appointment-row">
                            <td>
                              <div className="datetime-cell">
                                <div className="datee">{formatDate(appointment.appointmentDate)}</div>
                                <div className="time">{appointment.appointmentTime}</div>
                                <div className="duration">{appointment.duration} mins</div>
                              </div>
                            </td>
                            <td>
                              <div className="patient-cell">
                                <div className="patient-name">{appointment.patientName}</div>
                                <div className="patient-details">
                                  {appointment.patientAge}y • {appointment.patientGender}
                                </div>
                                <div className="patient-contact">
                                  <FaPhone /> {appointment.patientPhone}
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`appointment-type-badge ${appointment.appointmentType.toLowerCase().replace(' ', '-')}`}>
                                {appointment.appointmentType}
                              </span>
                            </td>
                            <td>
                              <div className="location-cell">
                                {getLocationIcon(appointment.location)}
                                <span>{appointment.location === 'telehealth' ? 'Telehealth' : 'In-person'}</span>
                              </div>
                            </td>
                            <td>
                              <span 
                                className="status-badge" 
                                style={{ backgroundColor: getStatusColor(appointment.status) }}
                              >
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              <span 
                                className="urgency-badge" 
                                style={{ backgroundColor: getUrgencyColor(appointment.urgency) }}
                              >
                                {appointment.urgency.charAt(0).toUpperCase() + appointment.urgency.slice(1)}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="action-btn edit"
                                  onClick={() => handleEditAppointment(appointment)}
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  className="action-btn delete"
                                  onClick={() => handleDeleteAppointment(appointment.id)}
                                >
                                  <FaTrash />
                                </button>
                                {appointment.status === 'pending' && (
                                  <button 
                                    className="action-btn confirm"
                                    onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                  >
                                    <FaCheck />
                                  </button>
                                )}
                                {appointment.status === 'confirmed' && (
                                  <button 
                                    className="action-btn complete"
                                    onClick={() => handleStatusChange(appointment.id, 'completed')}
                                  >
                                    Complete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Upcoming Appointments Sidebar */}
              <aside className="appointments-sidebar">
                <h3>
                  <FaClock />
                  Upcoming This Week
                </h3>
                
                <div className="upcoming-list">
                  {appointments
                    .filter(apt => apt.status === 'confirmed' || apt.status === 'pending')
                    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
                    .slice(0, 5)
                    .map(apt => (
                      <div key={apt.id} className="upcoming-card">
                        <div className="upcoming-header">
                          <div className="upcoming-date">
                            <div className="day">{new Date(apt.appointmentDate).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                            <div className="date">{new Date(apt.appointmentDate).getDate()}</div>
                          </div>
                          <div className="upcoming-time">{apt.appointmentTime}</div>
                        </div>
                        
                        <div className="upcoming-patient">
                          <div className="patient-name">{apt.patientName}</div>
                          <div className="patient-type">{apt.appointmentType}</div>
                        </div>
                        
                        <div className="upcoming-actions">
                          {apt.location === 'telehealth' ? (
                            <button className="btn-join">
                              <FaVideo />
                              Join Call
                            </button>
                          ) : (
                            <button className="btn-start">
                              <FaStethoscope />
                              Start Appointment
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="sidebar-notes">
                  <h4>Appointment Notes</h4>
                  <ul>
                    <li>Remember to ask about medication adherence</li>
                    <li>Follow up on lab results for 3 patients</li>
                    <li>Schedule follow-up for post-op patients</li>
                  </ul>
                </div>
              </aside>
            </div>

            {/* New Appointment Modal */}
            {showNewAppointmentModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2>Schedule New Appointment</h2>
                    <button className="close-btn" onClick={() => setShowNewAppointmentModal(false)}>
                      <FaTimes />
                    </button>
                  </div>
                  
                  <form onSubmit={handleNewAppointmentSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Patient Name *</label>
                        <input
                          type="text"
                          value={newAppointment.patientName}
                          onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                          required
                          placeholder="Enter patient name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Patient Email</label>
                        <input
                          type="email"
                          value={newAppointment.patientEmail}
                          onChange={(e) => setNewAppointment({...newAppointment, patientEmail: e.target.value})}
                          placeholder="patient@email.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Patient Phone</label>
                        <input
                          type="tel"
                          value={newAppointment.patientPhone}
                          onChange={(e) => setNewAppointment({...newAppointment, patientPhone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Appointment Type</label>
                        <select
                          value={newAppointment.appointmentType}
                          onChange={(e) => setNewAppointment({...newAppointment, appointmentType: e.target.value})}
                        >
                          <option value="consultation">Consultation</option>
                          <option value="follow-up">Follow-up</option>
                          <option value="check-up">Check-up</option>
                          <option value="emergency">Emergency</option>
                          <option value="lab-results">Lab Results Review</option>
                          <option value="specialist">Specialist Referral</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="date"
                          value={newAppointment.appointmentDate}
                          onChange={(e) => setNewAppointment({...newAppointment, appointmentDate: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Time *</label>
                        <input
                          type="time"
                          value={newAppointment.appointmentTime}
                          onChange={(e) => setNewAppointment({...newAppointment, appointmentTime: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Duration (minutes)</label>
                        <select
                          value={newAppointment.duration}
                          onChange={(e) => setNewAppointment({...newAppointment, duration: e.target.value})}
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">60 minutes</option>
                          <option value="90">90 minutes</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Location</label>
                        <select
                          value={newAppointment.location}
                          onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                        >
                          <option value="telehealth">Telehealth</option>
                          <option value="in-person">In-person</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Urgency Level</label>
                        <select
                          value={newAppointment.urgency}
                          onChange={(e) => setNewAppointment({...newAppointment, urgency: e.target.value})}
                        >
                          <option value="normal">Normal</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Notes</label>
                        <textarea
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                          placeholder="Additional notes about the appointment..."
                          rows="3"
                        />
                      </div>
                    </div>
                    
                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setShowNewAppointmentModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Schedule Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Appointments;