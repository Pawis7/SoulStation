import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import { 
  ArrowLeft, 
  Camera, 
  Plus, 
  Heart, 
  MessageCircle,
  Share,
  Calendar,
  MapPin,
  Filter,
  Grid3X3,
  List,
  Search,
  Star,
  Smile,
  Sun,
  Moon
} from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

// Mock data para demo - esto se reemplazará con datos reales
const getMockMoments = () => [
  {
    id: 1,
    type: 'photo',
    title: 'Beautiful Sunset',
    description: 'Amazing sunset at the beach today. Feeling grateful for these peaceful moments.',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    date: new Date('2024-10-05T18:30:00'),
    location: 'Santa Monica Beach',
    mood: 'happy',
    tags: ['sunset', 'beach', 'peaceful'],
    likes: 12,
    comments: 3,
    isFavorite: true
  },
  {
    id: 2,
    type: 'note',
    title: 'Morning Reflection',
    description: 'Started the day with meditation and coffee. Setting intentions for a productive day ahead. Grateful for the small moments that bring joy.',
    date: new Date('2024-10-05T08:00:00'),
    mood: 'peaceful',
    tags: ['morning', 'meditation', 'gratitude'],
    likes: 8,
    comments: 1,
    isFavorite: false,
    backgroundColor: '#E8F4FD'
  },
  {
    id: 3,
    type: 'photo',
    title: 'Workout Complete!',
    description: 'Just finished an amazing gym session. Feeling strong and energized!',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    date: new Date('2024-10-04T19:15:00'),
    location: 'Fitness Center',
    mood: 'energetic',
    tags: ['workout', 'fitness', 'strength'],
    likes: 15,
    comments: 5,
    isFavorite: false
  },
  {
    id: 4,
    type: 'note',
    title: 'Recipe Discovery',
    description: 'Tried a new healthy recipe today - quinoa bowl with roasted vegetables. Delicious and nutritious! 🥗',
    date: new Date('2024-10-04T13:20:00'),
    mood: 'satisfied',
    tags: ['cooking', 'healthy', 'recipe'],
    likes: 6,
    comments: 2,
    isFavorite: true,
    backgroundColor: '#F0F8E8'
  },
  {
    id: 5,
    type: 'photo',
    title: 'Coffee Art',
    description: 'Perfect latte art to start the weekend. Simple pleasures make the best moments.',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    date: new Date('2024-10-03T09:45:00'),
    location: 'Local Café',
    mood: 'content',
    tags: ['coffee', 'weekend', 'art'],
    likes: 9,
    comments: 1,
    isFavorite: false
  },
  {
    id: 6,
    type: 'note',
    title: 'Evening Thoughts',
    description: 'Reflecting on the week that passed. Challenges faced, lessons learned, and moments of joy. Growth happens in the quiet spaces between.',
    date: new Date('2024-10-02T21:00:00'),
    mood: 'reflective',
    tags: ['reflection', 'growth', 'evening'],
    likes: 11,
    comments: 4,
    isFavorite: true,
    backgroundColor: '#FFF0E6'
  }
];

export default function Moments() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  const [moments, setMoments] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [filter, setFilter] = useState('all'); // all, photos, notes, favorites
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMoments();
  }, []);

  const loadMoments = async () => {
    setIsLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setMoments(getMockMoments());
      setIsLoading(false);
    }, 1000);
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      happy: '😊',
      peaceful: '😌',
      energetic: '⚡',
      satisfied: '😋',
      content: '☕',
      reflective: '🤔',
      grateful: '🙏',
      excited: '🎉'
    };
    return moodEmojis[mood] || '😊';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      happy: colors.status.warning,
      peaceful: colors.primary,
      energetic: colors.status.error,
      satisfied: colors.status.success,
      content: '#8B4513',
      reflective: colors.accent,
      grateful: colors.status.success,
      excited: colors.status.warning
    };
    return moodColors[mood] || colors.text.secondary;
  };

  const getFilteredMoments = () => {
    switch (filter) {
      case 'photos':
        return moments.filter(m => m.type === 'photo');
      case 'notes':
        return moments.filter(m => m.type === 'note');
      case 'favorites':
        return moments.filter(m => m.isFavorite);
      default:
        return moments;
    }
  };

  const handleMomentPress = (moment) => {
    // Aquí navegaríamos a la vista detallada del momento
    router.push({
      pathname: '/(main)/moments/detail',
      params: { momentId: moment.id }
    });
  };

  const handleLike = (momentId) => {
    setMoments(prev => prev.map(moment => 
      moment.id === momentId 
        ? { ...moment, likes: moment.likes + 1 }
        : moment
    ));
  };

  const handleFavorite = (momentId) => {
    setMoments(prev => prev.map(moment => 
      moment.id === momentId 
        ? { ...moment, isFavorite: !moment.isFavorite }
        : moment
    ));
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const PhotoMomentCard = ({ moment }) => (
    <TouchableOpacity
      style={[styles.photoCard, { backgroundColor: colors.background.card }]}
      onPress={() => handleMomentPress(moment)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: moment.imageUrl }} style={styles.momentImage} />
      <View style={styles.photoOverlay}>
        <View style={styles.photoHeader}>
          <Text style={[styles.moodEmoji]}>{getMoodEmoji(moment.mood)}</Text>
          <TouchableOpacity onPress={() => handleFavorite(moment.id)}>
            <Star 
              size={16} 
              color={moment.isFavorite ? colors.status.warning : 'white'} 
              fill={moment.isFavorite ? colors.status.warning : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.photoContent}>
        <Text style={[styles.momentTitle, { color: colors.text.primary }]} numberOfLines={1}>
          {moment.title}
        </Text>
        <Text style={[styles.momentDate, { color: colors.text.tertiary }]}>
          {formatDate(moment.date)}
        </Text>
        <View style={styles.photoActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(moment.id)}
          >
            <Heart size={14} color={colors.status.error} />
            <Text style={[styles.actionText, { color: colors.text.secondary }]}>{moment.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={14} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text.secondary }]}>{moment.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const NoteMomentCard = ({ moment }) => (
    <TouchableOpacity
      style={[
        styles.noteCard, 
        { 
          backgroundColor: moment.backgroundColor || colors.background.card,
          borderLeftColor: getMoodColor(moment.mood)
        }
      ]}
      onPress={() => handleMomentPress(moment)}
      activeOpacity={0.8}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteTitleContainer}>
          <Text style={[styles.moodEmoji]}>{getMoodEmoji(moment.mood)}</Text>
          <Text style={[styles.momentTitle, { color: colors.text.primary }]} numberOfLines={1}>
            {moment.title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleFavorite(moment.id)}>
          <Star 
            size={16} 
            color={moment.isFavorite ? colors.status.warning : colors.text.tertiary} 
            fill={moment.isFavorite ? colors.status.warning : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.noteDescription, { color: colors.text.secondary }]} numberOfLines={3}>
        {moment.description}
      </Text>
      
      <View style={styles.noteFooter}>
        <Text style={[styles.momentDate, { color: colors.text.tertiary }]}>
          {formatDate(moment.date)}
        </Text>
        <View style={styles.photoActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(moment.id)}
          >
            <Heart size={14} color={colors.status.error} />
            <Text style={[styles.actionText, { color: colors.text.secondary }]}>{moment.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={14} color={colors.primary} />
            <Text style={[styles.actionText, { color: colors.text.secondary }]}>{moment.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredMoments = getFilteredMoments();

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
          <Text style={[styles.title, { color: colors.text.primary }]}>Moments</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Capture life's beauty ✨</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(main)/moments/create')}
        >
          <Plus size={20} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Filters and View Mode */}
      <View style={[styles.controls, { backgroundColor: colors.background.card }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          {[
            { key: 'all', label: 'All', icon: Grid3X3 },
            { key: 'photos', label: 'Photos', icon: Camera },
            { key: 'notes', label: 'Notes', icon: MessageCircle },
            { key: 'favorites', label: 'Favorites', icon: Star }
          ].map(filterOption => (
            <TouchableOpacity
              key={filterOption.key}
              style={[
                styles.filterButton,
                {
                  backgroundColor: filter === filterOption.key ? colors.primary + '20' : 'transparent',
                  borderColor: filter === filterOption.key ? colors.primary : colors.border.light
                }
              ]}
              onPress={() => setFilter(filterOption.key)}
            >
              <filterOption.icon 
                size={16} 
                color={filter === filterOption.key ? colors.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.filterText,
                { color: filter === filterOption.key ? colors.primary : colors.text.secondary }
              ]}>
                {filterOption.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              { backgroundColor: viewMode === 'grid' ? colors.primary + '20' : 'transparent' }
            ]}
            onPress={() => setViewMode('grid')}
          >
            <Grid3X3 size={18} color={viewMode === 'grid' ? colors.primary : colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              { backgroundColor: viewMode === 'list' ? colors.primary + '20' : 'transparent' }
            ]}
            onPress={() => setViewMode('list')}
          >
            <List size={18} color={viewMode === 'list' ? colors.primary : colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {isLoading ? (
          <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
            Loading your moments... ✨
          </Text>
        ) : filteredMoments.length === 0 ? (
          <View style={styles.emptyState}>
            <Camera size={48} color={colors.text.tertiary} strokeWidth={1.5} />
            <Text style={[styles.emptyTitle, { color: colors.text.secondary }]}>No moments yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text.tertiary }]}>
              Start capturing your special moments
            </Text>
            <TouchableOpacity 
              style={[styles.createFirstButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(main)/moments/create')}
            >
              <Plus size={20} color="white" />
              <Text style={styles.createFirstText}>Create First Moment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={viewMode === 'grid' ? styles.momentsGrid : styles.momentsList}>
            {filteredMoments.map((moment) => (
              <View key={moment.id} style={viewMode === 'grid' ? styles.gridItem : styles.listItem}>
                {moment.type === 'photo' ? (
                  <PhotoMomentCard moment={moment} />
                ) : (
                  <NoteMomentCard moment={moment} />
                )}
              </View>
            ))}
          </View>
        )}
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
    paddingTop: 50,
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  filtersContainer: {
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  viewModeContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  viewModeButton: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  createFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  createFirstText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  momentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  momentsList: {
    gap: 16,
  },
  gridItem: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  listItem: {
    width: '100%',
  },
  photoCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  momentImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  photoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 18,
  },
  photoContent: {
    padding: 12,
  },
  momentTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  momentDate: {
    fontSize: 12,
    marginBottom: 8,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  noteCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  noteDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});