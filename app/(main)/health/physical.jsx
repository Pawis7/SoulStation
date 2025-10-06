import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { 
  ArrowLeft, 
  Heart, 
  Thermometer, 
  Scale, 
  Activity,
  Droplets,
  Timer,
  Target,
  TrendingUp,
  RefreshCw,
  Plus,
  Play,
  Info
} from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';
import { vitalSignsService, getVitalRecommendation } from '../../../src/services/vitalSignsService';

const { width } = Dimensions.get('window');

// Ejercicios organizados por grupos musculares
const exerciseGroups = [
  {
    id: 1,
    name: 'Chest',
    icon: '💪',
    color: '#FF6B6B',
    exercises: [
      { name: 'Push-ups', duration: '3 sets x 12 reps', difficulty: 'Beginner' },
      { name: 'Chest Press', duration: '3 sets x 10 reps', difficulty: 'Intermediate' },
      { name: 'Chest Fly', duration: '3 sets x 12 reps', difficulty: 'Intermediate' },
      { name: 'Incline Push-ups', duration: '3 sets x 8 reps', difficulty: 'Advanced' }
    ]
  },
  {
    id: 2,
    name: 'Back',
    icon: '🦵',
    color: '#4ECDC4',
    exercises: [
      { name: 'Pull-ups', duration: '3 sets x 8 reps', difficulty: 'Advanced' },
      { name: 'Lat Pulldown', duration: '3 sets x 10 reps', difficulty: 'Intermediate' },
      { name: 'Rowing', duration: '3 sets x 12 reps', difficulty: 'Beginner' },
      { name: 'Deadlift', duration: '3 sets x 8 reps', difficulty: 'Advanced' }
    ]
  },
  {
    id: 3,
    name: 'Legs',
    icon: '🦵',
    color: '#45B7D1',
    exercises: [
      { name: 'Squats', duration: '3 sets x 15 reps', difficulty: 'Beginner' },
      { name: 'Lunges', duration: '3 sets x 12 reps', difficulty: 'Beginner' },
      { name: 'Leg Press', duration: '3 sets x 15 reps', difficulty: 'Intermediate' },
      { name: 'Bulgarian Split Squats', duration: '3 sets x 10 reps', difficulty: 'Advanced' }
    ]
  },
  {
    id: 4,
    name: 'Arms',
    icon: '💪',
    color: '#F7DC6F',
    exercises: [
      { name: 'Bicep Curls', duration: '3 sets x 12 reps', difficulty: 'Beginner' },
      { name: 'Tricep Dips', duration: '3 sets x 10 reps', difficulty: 'Intermediate' },
      { name: 'Hammer Curls', duration: '3 sets x 12 reps', difficulty: 'Intermediate' },
      { name: 'Overhead Press', duration: '3 sets x 8 reps', difficulty: 'Advanced' }
    ]
  },
  {
    id: 5,
    name: 'Core',
    icon: '🏋️',
    color: '#BB8FCE',
    exercises: [
      { name: 'Plank', duration: '3 sets x 30 sec', difficulty: 'Beginner' },
      { name: 'Crunches', duration: '3 sets x 20 reps', difficulty: 'Beginner' },
      { name: 'Russian Twists', duration: '3 sets x 15 reps', difficulty: 'Intermediate' },
      { name: 'Mountain Climbers', duration: '3 sets x 30 sec', difficulty: 'Advanced' }
    ]
  },
  {
    id: 6,
    name: 'Cardio',
    icon: '❤️',
    color: '#FF8A80',
    exercises: [
      { name: 'Walking', duration: '30 minutes', difficulty: 'Beginner' },
      { name: 'Jogging', duration: '20 minutes', difficulty: 'Intermediate' },
      { name: 'HIIT Training', duration: '15 minutes', difficulty: 'Advanced' },
      { name: 'Cycling', duration: '25 minutes', difficulty: 'Intermediate' }
    ]
  }
];

export default function PhysicalHealth() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  const [vitalSigns, setVitalSigns] = useState(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVitalSigns();
  }, []);

  const loadVitalSigns = async () => {
    try {
      setIsLoading(true);
      const data = await vitalSignsService.getVitalSigns();
      setVitalSigns(data);
    } catch (error) {
      console.error('Error loading vital signs:', error);
      // Silently handle error - no alert shown
    } finally {
      setIsLoading(false);
    }
  };

  const refreshVitalSigns = async () => {
    setIsRefreshing(true);
    try {
      const data = await vitalSignsService.getVitalSigns(true); // Force refresh
      setVitalSigns(data);
    } catch (error) {
      console.error('Error refreshing vital signs:', error);
      // Silently handle error - no alert shown
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return colors.status.success;
      case 'warning': return colors.status.warning;
      case 'danger': return colors.status.error;
      default: return colors.text.secondary;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return colors.status.success;
      case 'Intermediate': return colors.status.warning;
      case 'Advanced': return colors.status.error;
      default: return colors.text.secondary;
    }
  };

  const handleExercisePress = (exercise, groupName) => {
    // Navigate to exercise detail instead of showing alert
    // Could navigate to exercise detail screen here
  };

  const VitalSignCard = ({ title, data, icon: Icon }) => (
    <TouchableOpacity 
      style={[styles.vitalCard, { backgroundColor: colors.background.card }]}
      onPress={() => {
        // Handle vital sign tap - could navigate to detail view
      }}
      activeOpacity={0.7}
    >
      <View style={styles.vitalHeader}>
        <View style={[styles.vitalIcon, { backgroundColor: getStatusColor(data.status) + '20' }]}>
          <Icon size={20} color={getStatusColor(data.status)} strokeWidth={2} />
        </View>
        <View style={styles.vitalInfo}>
          <Text style={[styles.vitalTitle, { color: colors.text.secondary }]}>{title}</Text>
          <View style={styles.vitalValueContainer}>
            <Text style={[styles.vitalValue, { color: colors.text.primary }]}>
              {typeof data.value === 'number' ? data.value : `${data.systolic}/${data.diastolic}`}
            </Text>
            <Text style={[styles.vitalUnit, { color: colors.text.secondary }]}> {data.unit}</Text>
            <Text style={styles.trendIcon}>{getTrendIcon(data.trend)}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(data.status) + '15' }]}>
        <Text style={[styles.statusText, { color: getStatusColor(data.status) }]}>
          {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card }]}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.primary} strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: colors.text.primary }]}>Physical Health</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Monitor & Improve 💪</Text>
        </View>
        
        <TouchableOpacity 
          onPress={refreshVitalSigns}
          style={styles.refreshButton}
          disabled={isRefreshing}
        >
          <RefreshCw size={20} color={colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Vital Signs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Vital Signs
            </Text>
            <TouchableOpacity style={styles.infoButton}>
              <Info size={16} color={colors.text.tertiary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.vitalsGrid}>
            {isLoading ? (
              <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
                Loading vital signs... 📊
              </Text>
            ) : vitalSigns ? (
              <>
                <VitalSignCard title="Heart Rate" data={vitalSigns.heartRate} icon={Heart} />
                <VitalSignCard title="Blood Oxygen" data={vitalSigns.bloodOxygen} icon={Droplets} />
                <VitalSignCard title="Temperature" data={vitalSigns.temperature} icon={Thermometer} />
                <VitalSignCard title="Weight" data={vitalSigns.weight} icon={Scale} />
                <VitalSignCard title="Blood Pressure" data={vitalSigns.bloodPressure} icon={Activity} />
              </>
            ) : (
              <Text style={[styles.errorText, { color: colors.status.error }]}>
                Unable to load vital signs
              </Text>
            )}
          </View>
          
          {isRefreshing && (
            <Text style={[styles.refreshingText, { color: colors.text.secondary }]}>
              🔄 Updating vital signs...
            </Text>
          )}
        </View>

        {/* Exercise Groups Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Exercise Library
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary + '20' }]}>
              <Plus size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.muscleGroupsGrid}>
            {exerciseGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.muscleGroupCard,
                  { 
                    backgroundColor: colors.background.card,
                    borderColor: selectedMuscleGroup === group.id ? colors.primary : 'transparent'
                  }
                ]}
                onPress={() => setSelectedMuscleGroup(
                  selectedMuscleGroup === group.id ? null : group.id
                )}
                activeOpacity={0.7}
              >
                <View style={[styles.muscleGroupIcon, { backgroundColor: group.color + '20' }]}>
                  <Text style={styles.muscleGroupEmoji}>{group.icon}</Text>
                </View>
                <Text style={[styles.muscleGroupName, { color: colors.text.primary }]}>
                  {group.name}
                </Text>
                <Text style={[styles.exerciseCount, { color: colors.text.secondary }]}>
                  {group.exercises.length} exercises
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Exercise List */}
          {selectedMuscleGroup && (
            <View style={styles.exercisesList}>
              {exerciseGroups
                .find(group => group.id === selectedMuscleGroup)
                ?.exercises.map((exercise, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.exerciseCard, { backgroundColor: colors.background.card }]}
                    onPress={() => handleExercisePress(
                      exercise, 
                      exerciseGroups.find(group => group.id === selectedMuscleGroup)?.name
                    )}
                    activeOpacity={0.7}
                  >
                    <View style={styles.exerciseInfo}>
                      <Text style={[styles.exerciseName, { color: colors.text.primary }]}>
                        {exercise.name}
                      </Text>
                      <Text style={[styles.exerciseDuration, { color: colors.text.secondary }]}>
                        {exercise.duration}
                      </Text>
                    </View>
                    
                    <View style={styles.exerciseActions}>
                      <View style={[
                        styles.difficultyBadge, 
                        { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }
                      ]}>
                        <Text style={[
                          styles.difficultyText, 
                          { color: getDifficultyColor(exercise.difficulty) }
                        ]}>
                          {exercise.difficulty}
                        </Text>
                      </View>
                      
                      <TouchableOpacity style={[styles.playButton, { backgroundColor: colors.primary + '20' }]}>
                        <Play size={16} color={colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Quick Actions
          </Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.background.card }]}>
              <Target size={20} color={colors.primary} />
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>
                Set Goals
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.background.card }]}>
              <TrendingUp size={20} color={colors.status.success} />
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>
                View Progress
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.background.card }]}>
              <Timer size={20} color={colors.status.warning} />
              <Text style={[styles.quickActionText, { color: colors.text.primary }]}>
                Start Timer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  refreshButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoButton: {
    padding: 4,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vitalsGrid: {
    gap: 12,
  },
  vitalCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vitalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vitalInfo: {
    flex: 1,
  },
  vitalTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  vitalValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  vitalUnit: {
    fontSize: 16,
    fontWeight: '500',
  },
  trendIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  refreshingText: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 16,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    padding: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 20,
  },
  muscleGroupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  muscleGroupCard: {
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  muscleGroupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  muscleGroupEmoji: {
    fontSize: 24,
  },
  muscleGroupName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseCount: {
    fontSize: 12,
  },
  exercisesList: {
    gap: 8,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDuration: {
    fontSize: 14,
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});