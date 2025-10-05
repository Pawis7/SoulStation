import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle,
  Share,
  Star,
  MapPin,
  Calendar,
  Tag,
  Edit,
  Trash2,
  Camera,
  MoreHorizontal
} from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Mock data para demo
const getMockMomentDetail = (id) => ({
  id: 1,
  type: 'photo',
  title: 'Beautiful Sunset',
  description: 'Amazing sunset at the beach today. Feeling grateful for these peaceful moments. The colors were absolutely breathtaking and reminded me of why I love living by the coast.',
  imageUrl: 'https://picsum.photos/800/600?random=1',
  date: new Date('2024-10-05T18:30:00'),
  location: 'Santa Monica Beach, CA',
  mood: 'happy',
  tags: ['sunset', 'beach', 'peaceful', 'gratitude'],
  likes: 12,
  comments: [
    {
      id: 1,
      author: 'Sarah M.',
      text: 'Absolutely gorgeous! Makes me want to visit the beach right now.',
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Mike R.',
      text: 'Beautiful capture! The lighting is perfect.',
      time: '4 hours ago'
    },
    {
      id: 3,
      author: 'Emma L.',
      text: '🌅 Love this so much!',
      time: '6 hours ago'
    }
  ],
  isFavorite: true,
  isLiked: false
});

export default function MomentDetail({ route }) {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  const momentId = route?.params?.momentId || 1;
  const [moment, setMoment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMomentDetail();
  }, [momentId]);

  const loadMomentDetail = async () => {
    setIsLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setMoment(getMockMomentDetail(momentId));
      setIsLoading(false);
    }, 800);
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

  const handleLike = () => {
    setMoment(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleFavorite = () => {
    setMoment(prev => ({
      ...prev,
      isFavorite: !prev.isFavorite
    }));
  };

  const handleShare = () => {
    // Handle share functionality without alert
    console.log('Share moment');
    // Could implement native share functionality here
  };

  const handleEdit = () => {
    router.push({
      pathname: '/(main)/moments/edit',
      params: { momentId: moment.id }
    });
  };

  const handleDelete = () => {
    // Handle delete directly without confirmation alert
    router.back();
    console.log('Moment deleted');
    // Aquí iría la lógica para eliminar el momento
  };

  const formatFullDate = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
          Loading moment... ✨
        </Text>
      </View>
    );
  }

  if (!moment) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: colors.background.secondary }]}>
        <Text style={[styles.errorText, { color: colors.status.error }]}>
          Moment not found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card }]}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Moment</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            // Handle options menu - could implement a bottom sheet or dropdown menu
            console.log('Options menu pressed');
            // For now, directly trigger edit action
            handleEdit();
          }}
        >
          <MoreHorizontal size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Image (if photo type) */}
        {moment.type === 'photo' && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: moment.imageUrl }} style={styles.momentImage} />
            <View style={styles.imageOverlay}>
              <View style={styles.moodContainer}>
                <Text style={styles.moodEmoji}>{getMoodEmoji(moment.mood)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Content */}
        <View style={styles.contentSection}>
          {/* Title and Description */}
          <View style={[styles.mainContent, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.momentTitle, { color: colors.text.primary }]}>
              {moment.title}
            </Text>
            <Text style={[styles.momentDescription, { color: colors.text.secondary }]}>
              {moment.description}
            </Text>
          </View>

          {/* Metadata */}
          <View style={[styles.metadata, { backgroundColor: colors.background.card }]}>
            <View style={styles.metadataItem}>
              <Calendar size={16} color={colors.text.tertiary} />
              <Text style={[styles.metadataText, { color: colors.text.secondary }]}>
                {formatFullDate(moment.date)}
              </Text>
            </View>
            
            {moment.location && (
              <View style={styles.metadataItem}>
                <MapPin size={16} color={colors.text.tertiary} />
                <Text style={[styles.metadataText, { color: colors.text.secondary }]}>
                  {moment.location}
                </Text>
              </View>
            )}
          </View>

          {/* Tags */}
          {moment.tags && moment.tags.length > 0 && (
            <View style={[styles.tagsContainer, { backgroundColor: colors.background.card }]}>
              <View style={styles.tagsHeader}>
                <Tag size={16} color={colors.text.tertiary} />
                <Text style={[styles.tagsTitle, { color: colors.text.secondary }]}>Tags</Text>
              </View>
              <View style={styles.tagsGrid}>
                {moment.tags.map((tag, index) => (
                  <View key={index} style={[styles.tag, { backgroundColor: colors.primary + '15' }]}>
                    <Text style={[styles.tagText, { color: colors.primary }]}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Actions */}
          <View style={[styles.actions, { backgroundColor: colors.background.card }]}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleLike}
            >
              <Heart 
                size={20} 
                color={moment.isLiked ? colors.status.error : colors.text.secondary}
                fill={moment.isLiked ? colors.status.error : 'transparent'}
              />
              <Text style={[
                styles.actionText, 
                { color: moment.isLiked ? colors.status.error : colors.text.secondary }
              ]}>
                {moment.likes} {moment.likes === 1 ? 'Like' : 'Likes'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => console.log('Add comment')}
            >
              <MessageCircle size={20} color={colors.text.secondary} />
              <Text style={[styles.actionText, { color: colors.text.secondary }]}>
                {moment.comments.length} {moment.comments.length === 1 ? 'Comment' : 'Comments'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleFavorite}
            >
              <Star 
                size={20} 
                color={moment.isFavorite ? colors.status.warning : colors.text.secondary}
                fill={moment.isFavorite ? colors.status.warning : 'transparent'}
              />
              <Text style={[
                styles.actionText,
                { color: moment.isFavorite ? colors.status.warning : colors.text.secondary }
              ]}>
                {moment.isFavorite ? 'Favorited' : 'Favorite'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share size={20} color={colors.text.secondary} />
              <Text style={[styles.actionText, { color: colors.text.secondary }]}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Comments */}
          <View style={[styles.comments, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.commentsTitle, { color: colors.text.primary }]}>
              Comments ({moment.comments.length})
            </Text>
            {moment.comments.map((comment) => (
              <View key={comment.id} style={styles.comment}>
                <Text style={[styles.commentAuthor, { color: colors.text.primary }]}>
                  {comment.author}
                </Text>
                <Text style={[styles.commentText, { color: colors.text.secondary }]}>
                  {comment.text}
                </Text>
                <Text style={[styles.commentTime, { color: colors.text.tertiary }]}>
                  {comment.time}
                </Text>
              </View>
            ))}
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
  headerButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  momentImage: {
    width,
    height: width * 0.75,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  moodEmoji: {
    fontSize: 20,
  },
  contentSection: {
    padding: 20,
    gap: 16,
  },
  mainContent: {
    padding: 20,
    borderRadius: 16,
  },
  momentTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  momentDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  metadata: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    fontSize: 14,
    marginLeft: 8,
  },
  tagsContainer: {
    padding: 16,
    borderRadius: 12,
  },
  tagsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 16,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  comments: {
    padding: 20,
    borderRadius: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  comment: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '500',
  },
});