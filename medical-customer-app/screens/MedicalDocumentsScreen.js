import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function MedicalDocumentsScreen({ navigation }) {
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [viewDocument, setViewDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: 'lab',
    description: '',
  });

  // Dummy documents data - NO IMAGE IMPORTS
  const initialDocuments = [
    {
      id: '1',
      title: 'Blood Test Results',
      type: 'pdf',
      category: 'lab',
      date: '2024-01-15',
      size: '2.4 MB',
      doctor: 'Dr. Johnson',
      icon: 'test-tube',
      color: '#4ECDC4',
    },
    {
      id: '2',
      title: 'X-Ray Scan - Chest',
      type: 'image',
      category: 'scan',
      date: '2024-01-10',
      size: '4.8 MB',
      doctor: 'Dr. Patel',
      icon: 'radiology-box',
      color: '#45B7D1',
    },
    {
      id: '3',
      title: 'Prescription - Antibiotics',
      type: 'pdf',
      category: 'prescription',
      date: '2024-01-05',
      size: '1.2 MB',
      doctor: 'Dr. Lee',
      icon: 'pill',
      color: '#FF6B6B',
    },
    {
      id: '4',
      title: 'MRI Scan - Brain',
      type: 'image',
      category: 'scan',
      date: '2023-12-20',
      size: '15.2 MB',
      doctor: 'Dr. Rodriguez',
      icon: 'brain',
      color: '#9B51E0',
    },
    {
      id: '5',
      title: 'Insurance Claim Form',
      type: 'pdf',
      category: 'insurance',
      date: '2023-12-15',
      size: '3.1 MB',
      icon: 'file-document',
      color: '#F7DC6F',
    },
    {
      id: '6',
      title: 'Vaccination Record',
      type: 'pdf',
      category: 'vaccination',
      date: '2023-12-01',
      size: '1.8 MB',
      doctor: 'Dr. Chen',
      icon: 'needle',
      color: '#96CEB4',
    },
    {
      id: '7',
      title: 'Ultrasound - Abdomen',
      type: 'image',
      category: 'scan',
      date: '2023-11-25',
      size: '8.5 MB',
      doctor: 'Dr. Wilson',
      icon: 'ultrasound',
      color: '#4ECDC4',
    },
    {
      id: '8',
      title: 'Medical History Summary',
      type: 'pdf',
      category: 'history',
      date: '2023-11-10',
      size: '5.3 MB',
      icon: 'history',
      color: '#DDA0DD',
    },
  ];

  useEffect(() => {
    setDocuments(initialDocuments);
  }, []);

  const categories = [
    { id: 'all', label: 'All Documents', icon: 'folder' },
    { id: 'lab', label: 'Lab Results', icon: 'test-tube' },
    { id: 'scan', label: 'Scans & Images', icon: 'radiology-box' },
    { id: 'prescription', label: 'Prescriptions', icon: 'pill' },
    { id: 'insurance', label: 'Insurance', icon: 'shield-check' },
    { id: 'vaccination', label: 'Vaccinations', icon: 'needle' },
    { id: 'history', label: 'Medical History', icon: 'history' },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        startUpload(result);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        startUpload({ uri: result.assets[0].uri, name: 'image.jpg' });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const startUpload = (file) => {
    if (!newDocument.title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for the document');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const finishUpload = (file) => {
    setTimeout(() => {
      const newDoc = {
        id: Date.now().toString(),
        title: newDocument.title,
        type: file.name.endsWith('.pdf') ? 'pdf' : 'image',
        category: newDocument.category,
        date: new Date().toISOString().split('T')[0],
        size: 'Uploading...',
        description: newDocument.description,
        icon: newDocument.category === 'lab' ? 'test-tube' : 
              newDocument.category === 'scan' ? 'radiology-box' :
              newDocument.category === 'prescription' ? 'pill' :
              newDocument.category === 'insurance' ? 'shield-check' :
              newDocument.category === 'vaccination' ? 'needle' : 'file-document',
        color: getCategoryColor(newDocument.category),
      };

      setDocuments([newDoc, ...documents]);
      setUploading(false);
      setUploadProgress(0);
      setShowUploadModal(false);
      setNewDocument({ title: '', category: 'lab', description: '' });

      Alert.alert('Success', 'Document uploaded successfully');
    }, 1000);
  };

  const deleteDocument = (id) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDocuments(documents.filter(doc => doc.id !== id));
            Alert.alert('Deleted', 'Document has been deleted');
          },
        },
      ]
    );
  };

  const shareDocument = (document) => {
    Alert.alert('Share Document', `Sharing ${document.title}...`, [
      { text: 'Email', onPress: () => console.log('Share via email') },
      { text: 'Doctor Portal', onPress: () => console.log('Share with doctor') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case 'lab': return '#4ECDC4';
      case 'scan': return '#45B7D1';
      case 'prescription': return '#FF6B6B';
      case 'insurance': return '#F7DC6F';
      case 'vaccination': return '#96CEB4';
      case 'history': return '#DDA0DD';
      default: return '#94A3B8';
    }
  };

  const renderDocumentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.documentCard}
      onPress={() => setViewDocument(item)}
    >
      <View style={styles.documentHeader}>
        <View style={[styles.docIconContainer, { backgroundColor: item.color || getCategoryColor(item.category) }]}>
          <MaterialCommunityIcons 
            name={item.icon || 'file-document'} 
            size={28} 
            color="#FFFFFF" 
          />
        </View>
        <View style={styles.docInfo}>
          <Text style={styles.docTitle} numberOfLines={1}>{item.title}</Text>
          <View style={styles.docMeta}>
            <View style={styles.docType}>
              <MaterialCommunityIcons 
                name={item.type === 'pdf' ? 'file-pdf' : 'image'} 
                size={14} 
                color="#64748B" 
              />
              <Text style={styles.docTypeText}>{item.type === 'pdf' ? 'PDF' : 'Image'}</Text>
            </View>
            <Text style={styles.docDate}>{item.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.docDetails}>
        {item.doctor && (
          <View style={styles.docDetailItem}>
            <MaterialCommunityIcons name="doctor" size={16} color="#2D9CDB" />
            <Text style={styles.docDetailText}>{item.doctor}</Text>
          </View>
        )}
        <View style={styles.docDetailItem}>
          <MaterialCommunityIcons name="file" size={16} color="#64748B" />
          <Text style={styles.docDetailText}>{item.size}</Text>
        </View>
      </View>

      <View style={styles.docActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => shareDocument(item)}
        >
          <MaterialCommunityIcons name="share-variant" size={20} color="#2D9CDB" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.dangerButton]}
          onPress={() => deleteDocument(item.id)}
        >
          <MaterialCommunityIcons name="delete" size={20} color="#EB5757" />
          <Text style={[styles.actionText, styles.dangerText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const UploadModal = () => (
    <Modal
      visible={showUploadModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowUploadModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upload Document</Text>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Document Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter document title"
                value={newDocument.title}
                onChangeText={(text) => setNewDocument({...newDocument, title: text})}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoryScroll}>
                  {categories.slice(1).map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryOption,
                        newDocument.category === cat.id && styles.categoryOptionSelected
                      ]}
                      onPress={() => setNewDocument({...newDocument, category: cat.id})}
                    >
                      <MaterialCommunityIcons
                        name={cat.icon}
                        size={20}
                        color={newDocument.category === cat.id ? '#FFFFFF' : getCategoryColor(cat.id)}
                      />
                      <Text style={[
                        styles.categoryOptionText,
                        newDocument.category === cat.id && styles.categoryOptionTextSelected
                      ]}>
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Add description or notes"
                value={newDocument.description}
                onChangeText={(text) => setNewDocument({...newDocument, description: text})}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.uploadOptions}>
              <Text style={styles.uploadTitle}>Choose File Type</Text>
              <View style={styles.uploadButtons}>
                <TouchableOpacity style={styles.uploadOption} onPress={pickDocument}>
                  <MaterialCommunityIcons name="file-pdf" size={40} color="#EB5757" />
                  <Text style={styles.uploadOptionText}>PDF/Document</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadOption} onPress={pickImage}>
                  <MaterialCommunityIcons name="image" size={40} color="#2D9CDB" />
                  <Text style={styles.uploadOptionText}>Image/Scan</Text>
                </TouchableOpacity>
              </View>
            </View>

            {uploading && (
              <View style={styles.uploadProgress}>
                <Text style={styles.progressText}>Uploading... {uploadProgress}%</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowUploadModal(false)}
              disabled={uploading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
              onPress={() => startUpload({ name: 'dummy.pdf' })}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <MaterialCommunityIcons name="cloud-upload" size={20} color="#FFFFFF" />
                  <Text style={styles.uploadButtonText}>Upload Document</Text>
                </>
              )}
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
          <Text style={styles.title}>Medical Documents</Text>
          <Text style={styles.subtitle}>
            Store and manage your medical records securely
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="file-document" size={24} color="#2D9CDB" />
            <Text style={styles.statNumber}>{documents.length}</Text>
            <Text style={styles.statLabel}>Total Documents</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="file-pdf" size={24} color="#EB5757" />
            <Text style={styles.statNumber}>
              {documents.filter(d => d.type === 'pdf').length}
            </Text>
            <Text style={styles.statLabel}>PDF Files</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="image" size={24} color="#2D9CDB" />
            <Text style={styles.statNumber}>
              {documents.filter(d => d.type === 'image').length}
            </Text>
            <Text style={styles.statLabel}>Images</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search documents..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View style={[
                  styles.categoryIcon,
                  { backgroundColor: selectedCategory === category.id ? getCategoryColor(category.id) : '#F1F5F9' }
                ]}>
                  <MaterialCommunityIcons
                    name={category.icon}
                    size={20}
                    color={selectedCategory === category.id ? '#FFFFFF' : getCategoryColor(category.id)}
                  />
                </View>
                <Text style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelSelected
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Documents List */}
        <View style={styles.documentsHeader}>
          <Text style={styles.sectionTitle}>Your Documents</Text>
          <Text style={styles.documentsCount}>{filteredDocuments.length} items</Text>
        </View>

        {filteredDocuments.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="file-document-outline" size={60} color="#CBD5E1" />
            <Text style={styles.emptyStateTitle}>No documents found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Try a different search term' : 'Upload your first document to get started'}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredDocuments}
            renderItem={renderDocumentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </ScrollView>

      {/* Upload FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowUploadModal(true)}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Upload Modal */}
      <UploadModal />

      {/* Document Preview Modal */}
      {viewDocument && (
        <Modal
          visible={!!viewDocument}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setViewDocument(null)}
        >
          <View style={styles.previewModal}>
            <View style={styles.previewContent}>
              <View style={styles.previewHeader}>
                <Text style={styles.previewTitle}>{viewDocument.title}</Text>
                <TouchableOpacity onPress={() => setViewDocument(null)}>
                  <Ionicons name="close" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>
              <View style={styles.previewBody}>
                <View style={styles.previewIcon}>
                  <MaterialCommunityIcons 
                    name={viewDocument.icon || 'file-document'} 
                    size={80} 
                    color={viewDocument.color || '#2D9CDB'} 
                  />
                </View>
                <Text style={styles.previewText}>
                  This is a preview of {viewDocument.title}. In a real app, 
                  you would see the actual document here.
                </Text>
              </View>
              <View style={styles.previewFooter}>
                <TouchableOpacity style={styles.previewButton}>
                  <MaterialCommunityIcons name="download" size={20} color="#2D9CDB" />
                  <Text style={styles.previewButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.previewButton, styles.previewPrimaryButton]}>
                  <MaterialCommunityIcons name="share" size={20} color="#FFFFFF" />
                  <Text style={styles.previewButtonText}>Share with Doctor</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
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
  categoriesContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryButtonSelected: {
    // Style for selected category
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  categoryLabelSelected: {
    color: '#1E293B',
    fontWeight: '600',
  },
  documentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 16,
  },
  documentsCount: {
    fontSize: 14,
    color: '#64748B',
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  docIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  docMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  docTypeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748B',
  },
  docDate: {
    fontSize: 12,
    color: '#64748B',
  },
  docDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  docDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  docDetailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#64748B',
  },
  docActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#2D9CDB',
    fontWeight: '500',
  },
  dangerButton: {
    // Style for delete button
  },
  dangerText: {
    color: '#EB5757',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2D9CDB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
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
  formGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  categoryOptionSelected: {
    backgroundColor: '#2D9CDB',
  },
  categoryOptionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  categoryOptionTextSelected: {
    color: '#FFFFFF',
  },
  uploadOptions: {
    marginTop: 16,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 16,
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  uploadOption: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    width: '45%',
  },
  uploadOptionText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  uploadProgress: {
    marginTop: 24,
  },
  progressText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2D9CDB',
    borderRadius: 4,
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
  uploadButton: {
    flex: 2,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D9CDB',
    borderRadius: 12,
  },
  uploadButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  // Preview Modal
  previewModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  previewContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F1F9FF',
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
    marginRight: 16,
  },
  previewBody: {
    padding: 40,
    alignItems: 'center',
  },
  previewIcon: {
    marginBottom: 24,
  },
  previewText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  previewFooter: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  previewPrimaryButton: {
    backgroundColor: '#2D9CDB',
  },
  previewButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2D9CDB',
    fontWeight: '500',
  },
});