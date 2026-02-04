import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Share,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function HealthTipsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savedTips, setSavedTips] = useState([]);

  const categories = [
    { id: 'all', label: 'All Tips', icon: 'star', color: '#FFD700' },
    { id: 'nutrition', label: 'Nutrition', icon: 'food-apple', color: '#27AE60' },
    { id: 'exercise', label: 'Exercise', icon: 'run', color: '#2D9CDB' },
    { id: 'mental', label: 'Mental Health', icon: 'brain', color: '#9B51E0' },
    { id: 'sleep', label: 'Sleep', icon: 'sleep', color: '#4ECDC4' },
    { id: 'preventive', label: 'Preventive Care', icon: 'shield', color: '#F2994A' },
    { id: 'seasonal', label: 'Seasonal', icon: 'weather-sunny', color: '#FFEAA7' },
  ];

  // Dummy health tips data
  const healthTips = [
    {
      id: '1',
      title: 'Stay Hydrated Throughout the Day',
      category: 'nutrition',
      content: 'Drink at least 8 glasses of water daily. Proper hydration improves digestion, skin health, and energy levels. Carry a reusable water bottle to track your intake.',
      author: 'AI Health Assistant',
      readTime: '2 min read',
      date: 'Today',
      isNew: true,
      saved: false,
    },
    {
      id: '2',
      title: 'Morning Sunlight for Better Sleep',
      category: 'sleep',
      content: 'Get 15-30 minutes of morning sunlight within an hour of waking. This helps regulate your circadian rhythm and improves sleep quality at night.',
      author: 'Sleep Research AI',
      readTime: '1 min read',
      date: 'Today',
      isNew: true,
      saved: false,
    },
    {
      id: '3',
      title: 'Mindful Breathing for Stress',
      category: 'mental',
      content: 'Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times. This activates the parasympathetic nervous system and reduces stress.',
      author: 'Mental Wellness AI',
      readTime: '3 min read',
      date: 'Yesterday',
      isNew: false,
      saved: false,
    },
    {
      id: '4',
      title: 'Walk 30 Minutes Daily',
      category: 'exercise',
      content: 'A daily 30-minute walk can reduce heart disease risk by 30%, improve mood, and maintain healthy weight. Break it into 10-minute segments if needed.',
      author: 'Fitness AI',
      readTime: '2 min read',
      date: '2 days ago',
      isNew: false,
      saved: true,
    },
    {
      id: '5',
      title: 'Colorful Plate for Better Nutrition',
      category: 'nutrition',
      content: 'Aim for at least 3 different colors on your plate at each meal. Different colors indicate different nutrients and antioxidants your body needs.',
      author: 'Nutrition AI',
      readTime: '2 min read',
      date: '3 days ago',
      isNew: false,
      saved: true,
    },
    {
      id: '6',
      title: 'Digital Detox Before Bed',
      category: 'sleep',
      content: 'Avoid screens 1 hour before bedtime. Blue light suppresses melatonin production, disrupting sleep. Try reading a book or meditating instead.',
      author: 'Sleep Research AI',
      readTime: '2 min read',
      date: '4 days ago',
      isNew: false,
      saved: false,
    },
    {
      id: '7',
      title: 'Stretch Every Hour While Working',
      category: 'exercise',
      content: 'Set a reminder to stand up and stretch every hour. This prevents muscle stiffness, improves circulation, and reduces back pain from prolonged sitting.',
      author: 'Ergonomics AI',
      readTime: '1 min read',
      date: '1 week ago',
      isNew: false,
      saved: false,
    },
    {
      id: '8',
      title: 'Gratitude Journal for Mental Health',
      category: 'mental',
      content: 'Write down 3 things you\'re grateful for each day. This simple practice can increase happiness by 25% and reduce symptoms of depression.',
      author: 'Mental Wellness AI',
      readTime: '3 min read',
      date: '1 week ago',
      isNew: false,
      saved: true,
    },
    {
      id: '9',
      title: 'Annual Health Check-ups',
      category: 'preventive',
      content: 'Schedule annual comprehensive health screenings. Early detection of health issues leads to better outcomes and simpler treatments.',
      author: 'Preventive Care AI',
      readTime: '2 min read',
      date: '2 weeks ago',
      isNew: false,
      saved: false,
    },
    {
      id: '10',
      title: 'Stay Active in Winter',
      category: 'seasonal',
      content: 'During colder months, try indoor activities like yoga, dancing, or home workouts. Maintaining physical activity boosts immunity and mood.',
      author: 'Seasonal Health AI',
      readTime: '2 min read',
      date: '3 weeks ago',
      isNew: false,
      saved: false,
    },
  ];

  const filteredTips = selectedCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  const toggleSaveTip = (tipId) => {
    setSavedTips(prev => {
      if (prev.includes(tipId)) {
        return prev.filter(id => id !== tipId);
      } else {
        return [...prev, tipId];
      }
    });
  };

  const shareTip = async (tip) => {
    try {
      await Share.share({
        message: `Health Tip: ${tip.title}\n\n${tip.content}\n\nShared from MediAI Health App`,
        title: 'Health Tip from MediAI',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share tip');
    }
  };

  const generatePersonalizedTip = () => {
    const tips = [
      'Based on your activity data, try adding 5 more minutes to your daily walk.',
      'Your sleep patterns suggest trying to go to bed 30 minutes earlier tonight.',
      'Consider adding more leafy greens to your next meal for better nutrition.',
      'Take a 5-minute break to stretch and breathe deeply right now.',
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    
    Alert.alert(
      'Personalized Health Tip',
      randomTip,
      [
        { text: 'Dismiss', style: 'cancel' },
        { text: 'Save Tip', onPress: () => Alert.alert('Saved', 'Tip added to your saved tips') },
      ]
    );
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : 'star';
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : '#64748B';
  };

  const renderTipCard = (tip) => (
    <View key={tip.id} style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <View style={styles.categoryBadge}>
          <MaterialCommunityIcons 
            name={getCategoryIcon(tip.category)} 
            size={16} 
            color="#FFFFFF" 
          />
          <Text style={styles.categoryText}>
            {categories.find(c => c.id === tip.category)?.label}
          </Text>
        </View>
        <View style={styles.tipMeta}>
          {tip.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newText}>NEW</Text>
            </View>
          )}
          <Text style={styles.tipDate}>{tip.date}</Text>
        </View>
      </View>

      <Text style={styles.tipTitle}>{tip.title}</Text>
      <Text style={styles.tipContent}>{tip.content}</Text>

      <View style={styles.tipFooter}>
        <View style={styles.authorInfo}>
          <MaterialCommunityIcons name="robot" size={16} color="#2D9CDB" />
          <Text style={styles.authorName}>{tip.author}</Text>
          <Text style={styles.readTime}>{tip.readTime}</Text>
        </View>

        <View style={styles.tipActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => toggleSaveTip(tip.id)}
          >
            <Ionicons 
              name={savedTips.includes(tip.id) ? "bookmark" : "bookmark-outline"} 
              size={20} 
              color={savedTips.includes(tip.id) ? "#2D9CDB" : "#64748B"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => shareTip(tip)}
          >
            <Ionicons name="share-social-outline" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
          <Text style={styles.title}>Health Tips</Text>
          <Text style={styles.subtitle}>
            AI-generated health recommendations personalized for you
          </Text>
        </View>

        {/* Personalized Recommendation */}
        <TouchableOpacity 
          style={styles.personalizedCard}
          onPress={generatePersonalizedTip}
        >
          <View style={styles.personalizedHeader}>
            <MaterialCommunityIcons name="robot-happy" size={32} color="#2D9CDB" />
            <View style={styles.personalizedText}>
              <Text style={styles.personalizedTitle}>Get Personalized Tip</Text>
              <Text style={styles.personalizedSubtitle}>Based on your health data</Text>
            </View>
          </View>
          <View style={styles.personalizedFooter}>
            <Text style={styles.personalizedAction}>Tap to generate →</Text>
          </View>
        </TouchableOpacity>

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
                  { backgroundColor: selectedCategory === category.id ? category.color : '#F1F5F9' }
                ]}>
                  <MaterialCommunityIcons
                    name={category.icon}
                    size={24}
                    color={selectedCategory === category.id ? '#FFFFFF' : category.color}
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

        {/* Tips List */}
        <View style={styles.tipsHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'All Health Tips' : 
             categories.find(c => c.id === selectedCategory)?.label + ' Tips'}
          </Text>
          <Text style={styles.tipsCount}>{filteredTips.length} tips</Text>
        </View>

        {filteredTips.map(renderTipCard)}

        {/* AI Explanation */}
        <View style={styles.aiExplanation}>
          <MaterialCommunityIcons name="robot" size={24} color="#2D9CDB" />
          <View style={styles.explanationText}>
            <Text style={styles.explanationTitle}>How AI Generates Tips</Text>
            <Text style={styles.explanationContent}>
              Our AI analyzes millions of medical studies, user patterns, and health data 
              to provide personalized, evidence-based health recommendations. Tips are 
              regularly updated with the latest research.
            </Text>
          </View>
        </View>

        {/* Saved Tips Section */}
        {savedTips.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.sectionTitle}>Your Saved Tips</Text>
            <Text style={styles.savedCount}>{savedTips.length} saved</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.savedTipsContainer}>
                {healthTips
                  .filter(tip => savedTips.includes(tip.id))
                  .map(tip => (
                    <TouchableOpacity key={tip.id} style={styles.savedTipCard}>
                      <View style={[styles.savedCategory, { backgroundColor: getCategoryColor(tip.category) }]}>
                        <MaterialCommunityIcons 
                          name={getCategoryIcon(tip.category)} 
                          size={16} 
                          color="#FFFFFF" 
                        />
                      </View>
                      <Text style={styles.savedTipTitle} numberOfLines={2}>{tip.title}</Text>
                      <TouchableOpacity 
                        style={styles.unsaveButton}
                        onPress={() => toggleSaveTip(tip.id)}
                      >
                        <Ionicons name="bookmark" size={16} color="#EB5757" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Daily Reminder */}
      <TouchableOpacity style={styles.dailyReminder}>
        <MaterialCommunityIcons name="bell-ring" size={24} color="#FFFFFF" />
        <View style={styles.reminderText}>
          <Text style={styles.reminderTitle}>Daily Health Reminder</Text>
          <Text style={styles.reminderSubtitle}>Set up personalized health reminders</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </TouchableOpacity>
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
  personalizedCard: {
    backgroundColor: '#2D9CDB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  personalizedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  personalizedText: {
    marginLeft: 16,
  },
  personalizedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  personalizedSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  personalizedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personalizedAction: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
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
    // Selected state styles
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
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 16,
  },
  tipsCount: {
    fontSize: 14,
    color: '#64748B',
  },
  tipCard: {
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
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D9CDB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tipMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newBadge: {
    backgroundColor: '#27AE60',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  newText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tipDate: {
    fontSize: 12,
    color: '#64748B',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 24,
  },
  tipContent: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 16,
  },
  tipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    marginLeft: 6,
    marginRight: 12,
    fontSize: 14,
    color: '#2D9CDB',
  },
  readTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  tipActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
  },
  aiExplanation: {
    flexDirection: 'row',
    backgroundColor: '#F1F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D6E9FF',
  },
  explanationText: {
    flex: 1,
    marginLeft: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  explanationContent: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  savedSection: {
    marginBottom: 24,
  },
  savedCount: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  savedTipsContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  savedTipCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    position: 'relative',
  },
  savedCategory: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  savedTipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    flex: 1,
  },
  unsaveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  dailyReminder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D9CDB',
    padding: 20,
  },
  reminderText: {
    flex: 1,
    marginLeft: 12,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reminderSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});