import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  FaPaperPlane, 
  FaPaperclip, 
  FaVideo, 
  FaPhone, 
  FaInfoCircle,
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaCheckDouble,
  FaClock,
  FaEllipsisV,
  FaRegSmile,
  FaMicrophone,
  FaImage,
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
import './PatientChat.css';

function PatientChat() {
  const [doctor, setDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  // Dummy data for patients
  const dummyPatients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      condition: 'Diabetes Management',
      lastMessage: 'Just took my glucose reading - 120 mg/dL',
      time: '10:30 AM',
      unread: 3,
      status: 'online',
      avatarColor: '#2D9CDB'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      age: 32,
      condition: 'Pregnancy - 28 weeks',
      lastMessage: 'The morning sickness has improved',
      time: 'Yesterday',
      unread: 0,
      status: 'offline',
      avatarColor: '#9B51E0'
    },
    {
      id: 3,
      name: 'Robert Chen',
      age: 58,
      condition: 'Hypertension',
      lastMessage: 'Blood pressure: 130/85 today',
      time: '2 days ago',
      unread: 1,
      status: 'online',
      avatarColor: '#27AE60'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      age: 41,
      condition: 'Asthma',
      lastMessage: 'Using inhaler as prescribed',
      time: '3 days ago',
      unread: 0,
      status: 'offline',
      avatarColor: '#F2994A'
    },
    {
      id: 5,
      name: 'David Wilson',
      age: 67,
      condition: 'Post-surgery Recovery',
      lastMessage: 'Pain level is 2/10 today',
      time: '1 week ago',
      unread: 0,
      status: 'online',
      avatarColor: '#EB5757'
    },
    {
      id: 6,
      name: 'Emma Thompson',
      age: 29,
      condition: 'Migraine Management',
      lastMessage: 'Had one migraine episode this week',
      time: '1 week ago',
      unread: 0,
      status: 'offline',
      avatarColor: '#56CCF2'
    },
  ];

  // Dummy messages for each patient
  const dummyMessages = {
    1: [
      { id: 1, text: "Good morning Dr. Johnson, how are you?", sender: 'patient', time: '09:15 AM', status: 'read' },
      { id: 2, text: "I'm doing well, John. How are your glucose levels today?", sender: 'doctor', time: '09:20 AM', status: 'read' },
      { id: 3, text: "Just took my glucose reading - 120 mg/dL", sender: 'patient', time: '10:30 AM', status: 'read' },
      { id: 4, text: "That's excellent! Keep up the good work with your diet.", sender: 'doctor', time: '10:32 AM', status: 'read' },
      { id: 5, text: "Remember to take your metformin with breakfast", sender: 'doctor', time: '10:33 AM', status: 'delivered' },
      { id: 6, text: "Will do, thank you doctor!", sender: 'patient', time: '10:35 AM', status: 'read' },
    ],
    2: [
      { id: 1, text: "Hi Dr. Johnson, the morning sickness has improved", sender: 'patient', time: 'Yesterday 2:30 PM', status: 'read' },
      { id: 2, text: "That's great to hear Sarah. Any other symptoms?", sender: 'doctor', time: 'Yesterday 3:00 PM', status: 'read' },
    ],
    3: [
      { id: 1, text: "Blood pressure: 130/85 today", sender: 'patient', time: '2 days ago 8:00 AM', status: 'read' },
      { id: 2, text: "Good reading Robert. Continue with your medication.", sender: 'doctor', time: '2 days ago 9:00 AM', status: 'read' },
    ],
    4: [
      { id: 1, text: "Using inhaler as prescribed", sender: 'patient', time: '3 days ago 11:00 AM', status: 'read' },
      { id: 2, text: "Excellent Maria. Any breathing difficulties?", sender: 'doctor', time: '3 days ago 11:30 AM', status: 'read' },
    ]
  };

  useEffect(() => {
    // Initialize with dummy data
    setPatients(dummyPatients);
    
    // If patientId is provided in URL, select that patient
    if (patientId) {
      const patient = dummyPatients.find(p => p.id === parseInt(patientId));
      if (patient) {
        setSelectedPatient(patient);
        setMessages(dummyMessages[patient.id] || []);
      }
    } else if (dummyPatients.length > 0) {
      // Otherwise select first patient
      setSelectedPatient(dummyPatients[0]);
      setMessages(dummyMessages[1] || []);
    }
  }, [patientId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' && attachments.length === 0) return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'doctor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      attachments: attachments.length > 0 ? [...attachments] : []
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setAttachments([]);

    // Simulate patient response after 2 seconds
    if (selectedPatient) {
      setTimeout(() => {
        const responses = [
          "Thank you doctor, I'll do that.",
          "Understood, I'll follow your advice.",
          "Got it, thanks for the clarification.",
          "I appreciate your guidance.",
          "Will do, thank you!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          text: randomResponse,
          sender: 'patient',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }]);
      }, 2000);
    }
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setMessages(dummyMessages[patient.id] || []);
    // Clear any typing indicator
    setIsTyping(false);
  };

  const handleAttachment = (type) => {
    const newAttachment = {
      id: attachments.length + 1,
      type: type,
      name: type === 'image' ? 'medical_image.jpg' : 'prescription.pdf',
      size: type === 'image' ? '2.4 MB' : '1.8 MB'
    };
    setAttachments([...attachments, newAttachment]);
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter(att => att.id !== id));
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVoiceCall = () => {
    alert(`Starting voice call with ${selectedPatient?.name}`);
  };

  const handleVideoCall = () => {
    alert(`Starting video call with ${selectedPatient?.name}`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'read': return <FaCheckDouble className="status-icon read" />;
      case 'delivered': return <FaCheckDouble className="status-icon delivered" />;
      case 'sent': return <FaCheckDouble className="status-icon sent" />;
      default: return <FaClock className="status-icon sent" />;
    }
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
        {/* Left Sidebar - Navigation */}
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
            
            <Link to="/chat" className="nav-item active">
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
            <h3>Chat Status</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <FaUsers />
                <span>{patients.length} Patients</span>
              </div>
              <div className="sidebar-stat">
                <FaComments />
                <span>{patients.filter(p => p.unread > 0).length} Unread</span>
              </div>
            </div>
            <button className="support-btn">Chat Support</button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

        {/* Main Content - Chat Interface */}
        <main className="dashboard-main">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="header-left">
              <h1 className="page-title">Patient Chat</h1>
              <p className="page-subtitle">Secure and HIPAA compliant messaging</p>
            </div>
            <div className="header-right">
              <div className="doctor-info">
                <div className="doctor-avatar">
                  <FaUserCircle />
                </div>
                <div>
                  <p className="doctor-name">Dr. {doctor.message}</p>
                  <p className="doctor-status online">Online</p>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-container">
            {/* Patients List Sidebar */}
            <aside className="patients-sidebar">
              <div className="sidebar-header">
                <h2>Patients</h2>
                <div className="sidebar-actions">
                  <button className="action-btn" title="Filter">
                    <FaFilter />
                  </button>
                </div>
              </div>

              <div className="searchh-containerrr">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-inputtt"
                  
                />
               <FaSearch/>
              </div>

              <div className="patients-list">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    className={`patient-item ${selectedPatient?.id === patient.id ? 'active' : ''}`}
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <div className="patient-avatar" style={{ backgroundColor: patient.avatarColor }}>
                      <FaUserCircle />
                      <span className={`status-indicator ${patient.status}`}></span>
                    </div>
                    <div className="patient-info">
                      <div className="patient-header">
                        <h4>{patient.name}</h4>
                        <span className="message-time">{patient.time}</span>
                      </div>
                      <p className="patient-condition">{patient.condition}</p>
                      <p className="last-message">{patient.lastMessage}</p>
                    </div>
                    {patient.unread > 0 && (
                      <span className="unread-badge">{patient.unread}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="sidebar-footer">
                <div className="quick-stats">
                  <div className="stat">
                    <span className="stat-number">{patients.length}</span>
                    <span className="stat-label">Patients</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{patients.filter(p => p.status === 'online').length}</span>
                    <span className="stat-label">Online</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Chat Area */}
            <main className="chat-main">
              {selectedPatient ? (
                <>
                  {/* Chat Header Bar */}
                  <div className="chat-header-bar">
                    <div className="patient-chat-info">
                      <div className="patient-chat-avatar" style={{ backgroundColor: selectedPatient.avatarColor }}>
                        <FaUserCircle />
                        <span className={`status-indicator ${selectedPatient.status}`}></span>
                      </div>
                      <div className="patient-chat-details">
                        <h3>{selectedPatient.name}</h3>
                        <div className="patient-meta">
                          <span className="patient-age">Age: {selectedPatient.age}</span>
                          <span className="patient-condition">{selectedPatient.condition}</span>
                          {isTyping && <span className="typing-indicator">typing...</span>}
                        </div>
                      </div>
                    </div>
                    <div className="chat-actions">
                      <button className="chat-action-btn" onClick={handleVoiceCall} title="Voice Call">
                        <FaPhone />
                      </button>
                      <button className="chat-action-btn" onClick={handleVideoCall} title="Video Call">
                        <FaVideo />
                      </button>
                      <button className="chat-action-btn" title="Patient Info">
                        <FaInfoCircle />
                      </button>
                      <button className="chat-action-btn" title="More Options">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>

                  {/* Messages Container */}
                  <div className="messages-container">
                    <div className="messages-list">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`message ${message.sender}`}
                        >
                          <div className="message-content">
                            {message.attachments && message.attachments.map(att => (
                              <div key={att.id} className="attachment">
                                <div className="attachment-icon">
                                  {att.type === 'image' ? <FaImage /> : <FaPaperclip />}
                                </div>
                                <div className="attachment-info">
                                  <p className="attachment-name">{att.name}</p>
                                  <p className="attachment-size">{att.size}</p>
                                </div>
                              </div>
                            ))}
                            {message.text && <p className="message-text">{message.text}</p>}
                            <div className="message-meta">
                              <span className="message-time">{message.time}</span>
                              {message.sender === 'doctor' && getStatusIcon(message.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Attachments Preview */}
                    {attachments.length > 0 && (
                      <div className="attachments-preview">
                        <div className="attachments-header">
                          <span>Attachments ({attachments.length})</span>
                          <button onClick={() => setAttachments([])}>Clear All</button>
                        </div>
                        <div className="attachments-list">
                          {attachments.map(att => (
                            <div key={att.id} className="attachment-preview">
                              <div className="attachment-icon">
                                {att.type === 'image' ? <FaImage /> : <FaPaperclip />}
                              </div>
                              <div className="attachment-details">
                                <p>{att.name}</p>
                                <small>{att.size}</small>
                              </div>
                              <button onClick={() => removeAttachment(att.id)}>×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message Input */}
                    <form className="message-input-container" onSubmit={handleSendMessage}>
                      <div className="input-actions">
                        <button type="button" className="action-btn" onClick={() => handleAttachment('image')}>
                          <FaImage />
                        </button>
                        <button type="button" className="action-btn" onClick={() => handleAttachment('file')}>
                          <FaPaperclip />
                        </button>
                        <button type="button" className="action-btn">
                          <FaRegSmile />
                        </button>
                      </div>
                      <div className="message-input-wrapper">
                        <input
                          type="text"
                          placeholder="Type your message here..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="message-input"
                        />
                        <button type="button" className="voice-btn">
                          <FaMicrophone />
                        </button>
                      </div>
                      <button type="submit" className="send-btn" disabled={!newMessage.trim() && attachments.length === 0}>
                        <FaPaperPlane />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="no-chat-selected">
                  <div className="empty-state">
                    <FaUserCircle className="empty-icon" />
                    <h3>Select a Patient to Start Chatting</h3>
                    <p>Choose a patient from the list to begin your conversation</p>
                    <div className="empty-stats">
                      <div className="stat-card">
                        <span className="stat-number">{patients.length}</span>
                        <span className="stat-label">Total Patients</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">{patients.filter(p => p.unread > 0).length}</span>
                        <span className="stat-label">Unread Messages</span>
                      </div>
                      <div className="stat-card">
                        <span className="stat-number">{patients.filter(p => p.status === 'online').length}</span>
                        <span className="stat-label">Online Now</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>

          {/* Quick Tips */}
          <div className="chat-tips">
            <div className="tip">
              <FaInfoCircle />
              <p><strong>Tip:</strong> You can send images, PDFs, and other medical documents</p>
            </div>
            <div className="tip">
              <FaInfoCircle />
              <p><strong>Note:</strong> All conversations are encrypted and HIPAA compliant</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientChat;