import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function MyDoctorScreen({ navigation }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('');
  const [bookReason, setBookReason] = useState('');

  // Dummy doctors data with icon-based avatars
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      specialty: 'Cardiologist',
      hospital: 'City Heart Center',
      rating: 4.9,
      reviews: 128,
      experience: '12 years',
      nextAvailable: 'Tomorrow, 2 PM',
      price: '$150',
      avatarIcon: 'heart',
      avatarColor: '#FF6B6B',
      about: 'Specializes in preventive cardiology and heart disease management. Board certified with extensive experience in cardiac interventions.',
      education: 'MD, Harvard Medical School',
      languages: ['English', 'Mandarin'],
      availability: ['Mon, Wed, Fri: 9 AM - 5 PM', 'Tue, Thu: 10 AM - 6 PM'],
      contact: {
        phone: '+1 (555) 123-4567',
        email: 'dr.chen@cityheart.com',
      },
    },
    {
      id: '2',
      name: 'Dr. Marcus Johnson',
      specialty: 'Dermatologist',
      hospital: 'Skin Health Institute',
      rating: 4.8,
      reviews: 94,
      experience: '8 years',
      nextAvailable: 'Today, 4 PM',
      price: '$120',
      avatarIcon: 'skin',
      avatarColor: '#4ECDC4',
      about: 'Expert in cosmetic dermatology, skin cancer screenings, and acne treatment. Focuses on personalized skincare regimens.',
      education: 'MD, Johns Hopkins University',
      languages: ['English', 'Spanish'],
      availability: ['Mon-Fri: 8 AM - 6 PM', 'Sat: 9 AM - 1 PM'],
      contact: {
        phone: '+1 (555) 987-6543',
        email: 'dr.johnson@skinhealth.com',
      },
    },
    {
      id: '3',
      name: 'Dr. Priya Patel',
      specialty: 'Neurologist',
      hospital: 'Neuro Care Center',
      rating: 4.9,
      reviews: 156,
      experience: '15 years',
      nextAvailable: 'Wednesday, 11 AM',
      price: '$180',
      avatarIcon: 'brain',
      avatarColor: '#45B7D1',
      about: 'Specializes in migraine management, epilepsy, and neurodegenerative disorders. Published researcher in neurology journals.',
      education: 'MD, Stanford University',
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: ['Tue, Thu: 9 AM - 7 PM', 'Wed, Fri: 10 AM - 6 PM'],
      contact: {
        phone: '+1 (555) 456-7890',
        email: 'dr.patel@neurocare.com',
      },
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgeon',
      hospital: 'Bone & Joint Clinic',
      rating: 4.7,
      reviews: 203,
      experience: '18 years',
      nextAvailable: 'Friday, 3 PM',
      price: '$200',
      avatarIcon: 'bone',
      avatarColor: '#FFEAA7',
      about: 'Expert in joint replacements, sports injuries, and spinal surgery. Uses minimally invasive techniques for faster recovery.',
      education: 'MD, Mayo Clinic',
      languages: ['English', 'French'],
      availability: ['Mon, Wed, Fri: 7 AM - 3 PM', 'Tue, Thu: 1 PM - 9 PM'],
      contact: {
        phone: '+1 (555) 789-0123',
        email: 'dr.wilson@bonejoint.com',
      },
    },
    {
      id: '5',
      name: 'Dr. Maria Rodriguez',
      specialty: 'Pediatrician',
      hospital: 'Children\'s Wellness Center',
      rating: 4.9,
      reviews: 312,
      experience: '10 years',
      nextAvailable: 'Monday, 10 AM',
      price: '$100',
      avatarIcon: 'baby-face',
      avatarColor: '#96CEB4',
      about: 'Specializes in childhood development, vaccinations, and common pediatric illnesses. Believes in preventive care for children.',
      education: 'MD, Boston Children\'s Hospital',
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: ['Mon-Fri: 8 AM - 5 PM', 'Sat: 9 AM - 12 PM'],
      contact: {
        phone: '+1 (555) 234-5678',
        email: 'dr.rodriguez@childrenswellness.com',
      },
    },
    {
      id: '6',
      name: 'Dr. Kevin Lee',
      specialty: 'Psychiatrist',
      hospital: 'Mental Wellness Institute',
      rating: 4.8,
      reviews: 87,
      experience: '9 years',
      nextAvailable: 'Thursday, 2 PM',
      price: '$160',
      avatarIcon: 'brain',
      avatarColor: '#DDA0DD',
      about: 'Specializes in anxiety disorders, depression, and stress management. Uses cognitive behavioral therapy and medication management.',
      education: 'MD, Yale University',
      languages: ['English', 'Korean'],
      availability: ['Mon, Wed, Fri: 10 AM - 6 PM', 'Tue, Thu: 12 PM - 8 PM'],
      contact: {
        phone: '+1 (555) 345-6789',
        email: 'dr.lee@mentalwellness.com',
      },
    },
  ];

  const specialties = [
    { id: 'all', label: 'All Specialties', icon: 'stethoscope' },
    { id: 'cardiologist', label: 'Cardiology', icon: 'heart' },
    { id: 'dermatologist', label: 'Dermatology', icon: 'skin' },
    { id: 'neurologist', label: 'Neurology', icon: 'brain' },
    { id: 'orthopedic', label: 'Orthopedics', icon: 'bone' },
    { id: 'pediatrician', label: 'Pediatrics', icon: 'baby-face' },
    { id: 'psychiatrist', label: 'Psychiatry', icon: 'brain' },
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const filteredDoctors = doctors.filter(doctor => 
    selectedSpecialty === 'all' || 
    doctor.specialty.toLowerCase().includes(selectedSpecialty)
  );

  const getSpecialtyColor = (specialty) => {
    switch (specialty.toLowerCase()) {
      case 'cardiologist': return '#FF6B6B';
      case 'dermatologist': return '#4ECDC4';
      case 'neurologist': return '#45B7D1';
      case 'orthopedic surgeon': return '#FFEAA7';
      case 'pediatrician': return '#96CEB4';
      case 'psychiatrist': return '#DDA0DD';
      default: return '#2D9CDB';
    }
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= Math.floor(rating) ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  const BookAppointmentModal = () => (
    <Modal
      visible={showBookModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowBookModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Appointment</Text>
            <TouchableOpacity onPress={() => setShowBookModal(false)}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {selectedDoctor && (
              <>
                <View style={styles.doctorInfoModal}>
                  <View style={[styles.avatarModal, { backgroundColor: selectedDoctor.avatarColor }]}>
                    <MaterialCommunityIcons 
                      name={selectedDoctor.avatarIcon} 
                      size={30} 
                      color="#FFFFFF" 
                    />
                  </View>
                  <View style={styles.doctorDetailsModal}>
                    <Text style={styles.doctorNameModal}>{selectedDoctor.name}</Text>
                    <Text style={styles.doctorSpecialtyModal}>{selectedDoctor.specialty}</Text>
                  </View>
                </View>

                <View style={styles.bookingForm}>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Appointment Date</Text>
                    <View style={styles.dateOptions}>
                      {['Tomorrow', 'Wednesday', 'Friday', 'Next Week'].map((date) => (
                        <TouchableOpacity
                          key={date}
                          style={[
                            styles.dateOption,
                            bookDate === date && styles.dateOptionSelected
                          ]}
                          onPress={() => setBookDate(date)}
                        >
                          <Text style={[
                            styles.dateOptionText,
                            bookDate === date && styles.dateOptionTextSelected
                          ]}>
                            {date}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Preferred Time</Text>
                    <View style={styles.timeOptions}>
                      {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
                        <TouchableOpacity
                          key={time}
                          style={[
                            styles.timeOption,
                            bookTime === time && styles.timeOptionSelected
                          ]}
                          onPress={() => setBookTime(time)}
                        >
                          <Text style={[
                            styles.timeOptionText,
                            bookTime === time && styles.timeOptionTextSelected
                          ]}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Reason for Visit</Text>
                    <View style={styles.reasonOptions}>
                      {['Regular Checkup', 'Follow-up', 'New Symptoms', 'Test Results'].map((reason) => (
                        <TouchableOpacity
                          key={reason}
                          style={[
                            styles.reasonOption,
                            bookReason === reason && styles.reasonOptionSelected
                          ]}
                          onPress={() => setBookReason(reason)}
                        >
                          <MaterialCommunityIcons
                            name={
                              reason === 'Regular Checkup' ? 'clipboard-check' :
                              reason === 'Follow-up' ? 'clipboard-plus' :
                              reason === 'New Symptoms' ? 'alert-circle' :
                              'clipboard-text'
                            }
                            size={20}
                            color={bookReason === reason ? '#FFFFFF' : '#2D9CDB'}
                          />
                          <Text style={[
                            styles.reasonOptionText,
                            bookReason === reason && styles.reasonOptionTextSelected
                          ]}>
                            {reason}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Consultation Fee</Text>
                    <Text style={styles.priceValue}>{selectedDoctor.price}</Text>
                  </View>

                  <View style={styles.insuranceNote}>
                    <MaterialCommunityIcons name="shield-check" size={20} color="#27AE60" />
                    <Text style={styles.insuranceText}>
                      Most insurance plans accepted. Payment due at time of service.
                    </Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowBookModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => {
                if (!bookDate || !bookTime || !bookReason) {
                  Alert.alert('Missing Information', 'Please select date, time, and reason for appointment');
                  return;
                }
                setShowBookModal(false);
                Alert.alert(
                  'Appointment Booked!',
                  `Your appointment with ${selectedDoctor.name} is confirmed for ${bookDate} at ${bookTime}. A confirmation has been sent to your email.`
                );
                // Reset form
                setBookDate('');
                setBookTime('');
                setBookReason('');
              }}
            >
              <MaterialCommunityIcons name="calendar-check" size={20} color="#FFFFFF" />
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const DoctorDetailModal = () => (
    <Modal
      visible={!!selectedDoctor}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setSelectedDoctor(null)}
    >
      <View style={styles.detailModalOverlay}>
        <View style={styles.detailModalContent}>
          <ScrollView>
            {selectedDoctor && (
              <>
                <View style={styles.detailHeader}>
                  <View style={[styles.detailAvatar, { backgroundColor: selectedDoctor.avatarColor }]}>
                    <MaterialCommunityIcons 
                      name={selectedDoctor.avatarIcon} 
                      size={40} 
                      color="#FFFFFF" 
                    />
                  </View>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setSelectedDoctor(null)}
                  >
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailBody}>
                  <Text style={styles.detailName}>{selectedDoctor.name}</Text>
                  <Text style={styles.detailSpecialty}>{selectedDoctor.specialty}</Text>
                  
                  <View style={styles.detailRating}>
                    {renderStars(selectedDoctor.rating)}
                    <Text style={styles.detailReviews}>({selectedDoctor.reviews} reviews)</Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>About</Text>
                    <Text style={styles.detailText}>{selectedDoctor.about}</Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>Education</Text>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="school" size={20} color="#2D9CDB" />
                      <Text style={styles.detailItemText}>{selectedDoctor.education}</Text>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>Hospital</Text>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="hospital" size={20} color="#2D9CDB" />
                      <Text style={styles.detailItemText}>{selectedDoctor.hospital}</Text>
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>Languages</Text>
                    <View style={styles.languagesContainer}>
                      {selectedDoctor.languages.map((lang) => (
                        <View key={lang} style={styles.languageTag}>
                          <MaterialCommunityIcons name="translate" size={14} color="#FFFFFF" />
                          <Text style={styles.languageText}>{lang}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>Availability</Text>
                    {selectedDoctor.availability.map((slot, index) => (
                      <View key={index} style={styles.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={20} color="#2D9CDB" />
                        <Text style={styles.detailItemText}>{slot}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>Contact</Text>
                    <View style={styles.contactButtons}>
                      <TouchableOpacity 
                        style={styles.contactButton}
                        onPress={() => Linking.openURL(`tel:${selectedDoctor.contact.phone}`)}
                      >
                        <MaterialCommunityIcons name="phone" size={20} color="#2D9CDB" />
                        <Text style={styles.contactButtonText}>Call</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.contactButton}
                        onPress={() => Linking.openURL(`mailto:${selectedDoctor.contact.email}`)}
                      >
                        <MaterialCommunityIcons name="email" size={20} color="#2D9CDB" />
                        <Text style={styles.contactButtonText}>Email</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.detailFooter}>
            <TouchableOpacity 
              style={styles.detailActionButton}
              onPress={() => {
                setSelectedDoctor(null);
                setShowBookModal(true);
              }}
            >
              <MaterialCommunityIcons name="calendar-plus" size={20} color="#FFFFFF" />
              <Text style={styles.detailActionText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#2D9CDB" />
          </TouchableOpacity>
          <Text style={styles.title}>My Doctors</Text>
          <Text style={styles.subtitle}>
            Connect with top medical specialists
          </Text>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors..."
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Specialties */}
        <Text style={styles.sectionTitle}>Specialties</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.specialtiesScroll}>
          <View style={styles.specialtiesContainer}>
            {specialties.map((specialty) => (
              <TouchableOpacity
                key={specialty.id}
                style={[
                  styles.specialtyButton,
                  selectedSpecialty === specialty.id && styles.specialtyButtonSelected
                ]}
                onPress={() => setSelectedSpecialty(specialty.id)}
              >
                <View style={[
                  styles.specialtyIcon,
                  { backgroundColor: selectedSpecialty === specialty.id ? getSpecialtyColor(specialty.label) : '#F1F5F9' }
                ]}>
                  <MaterialCommunityIcons
                    name={specialty.icon}
                    size={20}
                    color={selectedSpecialty === specialty.id ? '#FFFFFF' : getSpecialtyColor(specialty.label)}
                  />
                </View>
                <Text style={[
                  styles.specialtyLabel,
                  selectedSpecialty === specialty.id && styles.specialtyLabelSelected
                ]}>
                  {specialty.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Doctors Grid */}
        <View style={styles.doctorsHeader}>
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          <Text style={styles.doctorsCount}>{filteredDoctors.length} doctors</Text>
        </View>

        <View style={styles.doctorsGrid}>
          {filteredDoctors.map((doctor, index) => (
            <View 
              key={doctor.id} 
              style={[
                styles.doctorCardContainer,
                index % 2 === 0 ? styles.cardLeft : styles.cardRight
              ]}
            >
              <TouchableOpacity
                style={styles.doctorCard}
                onPress={() => setSelectedDoctor(doctor)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.avatar, { backgroundColor: doctor.avatarColor }]}>
                    <MaterialCommunityIcons 
                      name={doctor.avatarIcon} 
                      size={24} 
                      color="#FFFFFF" 
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.doctorName} numberOfLines={1}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                    <View style={styles.ratingContainer}>
                      {renderStars(doctor.rating)}
                    </View>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.doctorDetail}>
                    <MaterialCommunityIcons name="hospital" size={14} color="#64748B" />
                    <Text style={styles.doctorDetailText} numberOfLines={1}>{doctor.hospital}</Text>
                  </View>
                  <View style={styles.doctorDetail}>
                    <MaterialCommunityIcons name="briefcase" size={14} color="#64748B" />
                    <Text style={styles.doctorDetailText}>{doctor.experience} exp</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.availability}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#27AE60" />
                    <Text style={styles.availabilityText} numberOfLines={1}>{doctor.nextAvailable}</Text>
                  </View>
                  <Text style={styles.price}>{doctor.price}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.bookButtonSmall}
                  onPress={(e) => {
                    e.stopPropagation();
                    setSelectedDoctor(doctor);
                    setShowBookModal(true);
                  }}
                >
                  <MaterialCommunityIcons name="calendar" size={14} color="#FFFFFF" />
                  <Text style={styles.bookButtonTextSmall}>Book</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modals */}
      <DoctorDetailModal />
      <BookAppointmentModal />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction}>
          <MaterialCommunityIcons name="message-text" size={24} color="#2D9CDB" />
          <Text style={styles.quickActionText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction}>
          <MaterialCommunityIcons name="calendar" size={24} color="#2D9CDB" />
          <Text style={styles.quickActionText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction}>
          <MaterialCommunityIcons name="history" size={24} color="#2D9CDB" />
          <Text style={styles.quickActionText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 25,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  specialtiesScroll: {
    marginBottom: 5,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  specialtyButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  specialtyButtonSelected: {},
  specialtyIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialtyLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  specialtyLabelSelected: {
    color: '#1E293B',
    fontWeight: '600',
  },
  doctorsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 16,
  },
  doctorsCount: {
    fontSize: 14,
    color: '#64748B',
  },
  doctorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  doctorCardContainer: {
    width: '48%',
  },
  cardLeft: {},
  cardRight: {},
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    position: 'relative',
    minHeight: 240,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  cardInfo: {
    flex: 1,
    minWidth: 0,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -60, // Your fix for better alignment
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  cardBody: {
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  doctorDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  doctorDetailText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  availabilityText: {
    marginLeft: 4,
    fontSize: 11,
    color: '#27AE60',
    fontWeight: '500',
    flexShrink: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    flexShrink: 0,
  },
  bookButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D9CDB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  bookButtonTextSmall: {
    marginLeft: 4,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  quickActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
  },
  quickActionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#2D9CDB',
    fontWeight: '500',
  },
  // Detail Modal Styles
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailModalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  detailHeader: {
    height: 200,
    backgroundColor: '#2D9CDB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  detailAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  detailBody: {
    padding: 24,
  },
  detailName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  detailSpecialty: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 16,
  },
  detailRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  detailReviews: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  detailSection: {
    marginBottom: 24,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#64748B',
    flex: 1,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D9CDB',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  languageText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  contactButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F9FF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
  },
  contactButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#2D9CDB',
    fontWeight: '500',
  },
  detailFooter: {
    padding: 24,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  detailActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D9CDB',
    borderRadius: 12,
    padding: 18,
  },
  detailActionText: {
    marginLeft: 12,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Booking Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalBody: {
    padding: 24,
  },
  doctorInfoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarModal: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  doctorDetailsModal: {
    flex: 1,
  },
  doctorNameModal: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  doctorSpecialtyModal: {
    fontSize: 14,
    color: '#64748B',
  },
  bookingForm: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 12,
  },
  dateOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  dateOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateOptionSelected: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  dateOptionText: {
    fontSize: 14,
    color: '#64748B',
  },
  dateOptionTextSelected: {
    color: '#FFFFFF',
  },
  timeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeOptionSelected: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  timeOptionText: {
    fontSize: 14,
    color: '#64748B',
  },
  timeOptionTextSelected: {
    color: '#FFFFFF',
  },
  reasonOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  reasonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reasonOptionSelected: {
    backgroundColor: '#2D9CDB',
    borderColor: '#2D9CDB',
  },
  reasonOptionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  reasonOptionTextSelected: {
    color: '#FFFFFF',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F9FF',
    borderRadius: 12,
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#1E293B',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  insuranceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C6F6D5',
  },
  insuranceText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  bookButton: {
    flex: 2,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D9CDB',
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
});