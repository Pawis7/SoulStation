import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, Play, Clock, Target, Info } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function ExerciseDetail({ route }) {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  // En una implementación real, esto vendría de route.params
  const exercise = route?.params?.exercise || {
    name: 'Push-ups',
    duration: '3 sets x 12 reps',
    difficulty: 'Beginner',
    muscleGroup: 'Chest',
    description: 'A fundamental upper body exercise that targets the chest, shoulders, and triceps.',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep core engaged throughout the movement'
    ],
    tips: [
      'Keep your body in a straight line',
      'Don\'t let your hips sag or pike up',
      'Breathe out as you push up',
      'Start with modified push-ups if needed'
    ],
    benefits: [
      'Builds upper body strength',
      'Improves core stability',
      'Enhances functional movement',
      'Requires no equipment'
    ]
  };

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
          <Text style={[styles.title, { color: colors.text.primary }]}>{exercise.name}</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{exercise.muscleGroup}</Text>
        </View>
        
        <TouchableOpacity style={[styles.startButton, { backgroundColor: colors.primary }]}>
          <Play size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Info */}
        <View style={[styles.quickInfo, { backgroundColor: colors.background.card }]}>
          <View style={styles.infoItem}>
            <Clock size={20} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.text.primary }]}>{exercise.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Target size={20} color={colors.status.warning} />
            <Text style={[styles.infoText, { color: colors.text.primary }]}>{exercise.difficulty}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Description</Text>
          <Text style={[styles.description, { color: colors.text.secondary }]}>
            {exercise.description}
          </Text>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Instructions</Text>
          {exercise.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.instructionText, { color: colors.text.secondary }]}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Tips</Text>
          {exercise.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={[styles.tipBullet, { color: colors.status.success }]}>💡</Text>
              <Text style={[styles.tipText, { color: colors.text.secondary }]}>
                {tip}
              </Text>
            </View>
          ))}
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Benefits</Text>
          {exercise.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Text style={[styles.benefitBullet, { color: colors.status.success }]}>✓</Text>
              <Text style={[styles.benefitText, { color: colors.text.secondary }]}>
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={[styles.bottomAction, { backgroundColor: colors.background.card }]}>
        <TouchableOpacity 
          style={[styles.startWorkoutButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // Aquí iría la lógica para iniciar el workout
            console.log('Starting workout:', exercise.name);
          }}
        >
          <Play size={20} color="white" strokeWidth={2} />
          <Text style={styles.startWorkoutText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 15,
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
  startButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  benefitBullet: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomAction: {
    padding: 20,
    paddingBottom: 40,
  },
  startWorkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  startWorkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});