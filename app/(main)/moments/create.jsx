import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { 
  ArrowLeft, 
  Camera, 
  ImageIcon,
  MapPin,
  Tag,
  Smile,
  Save,
  X
} from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const moodOptions = [
  { key: 'happy', emoji: '😊', label: 'Happy' },
  { key: 'peaceful', emoji: '😌', label: 'Peaceful' },
  { key: 'energetic', emoji: '⚡', label: 'Energetic' },
  { key: 'satisfied', emoji: '😋', label: 'Satisfied' },
  { key: 'content', emoji: '☕', label: 'Content' },
  { key: 'reflective', emoji: '🤔', label: 'Reflective' },
  { key: 'grateful', emoji: '🙏', label: 'Grateful' },
  { key: 'excited', emoji: '🎉', label: 'Excited' }
];

export default function CreateMoment() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  const [momentType, setMomentType] = useState('note'); // 'photo' or 'note'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState('');
  const [selectedMood, setSelectedMood] = useState('happy');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const titleInputRef = useRef(null);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTakePhoto = () => {
    // Directly select a photo without showing alert
    selectPhoto('gallery');
  };

  const selectPhoto = (source) => {
    // Mock photo selection
    const mockPhotos = [
      'https://picsum.photos/800/600?random=10',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12'
    ];
    
    setSelectedImage(mockPhotos[Math.floor(Math.random() * mockPhotos.length)]);
    setMomentType('photo');
    
    if (!title) {
      setTitle('Beautiful Moment');
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      // Focus on title input without showing alert
      titleInputRef.current?.focus();
      return;
    }

    if (!description.trim()) {
      // Silently return without showing alert
      return;
    }

    setIsLoading(true);

    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      // Navigate directly to the created moment instead of showing alert
      router.replace({
        pathname: '/(main)/moments/detail',
        params: { momentId: Date.now() }
      });
    }, 1500);
  };

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
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
            Create Moment
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.saveButton,
            { backgroundColor: title && description ? colors.primary : colors.text.tertiary + '30' }
          ]}
          onPress={handleSave}
          disabled={!title || !description || isLoading}
        >
          <Save 
            size={20} 
            color={title && description ? '#fff' : colors.text.tertiary} 
            strokeWidth={2} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Type Selection */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Moment Type
          </Text>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeOption,
                momentType === 'photo' && { backgroundColor: colors.primary + '15' }
              ]}
              onPress={() => setMomentType('photo')}
            >
              <Camera 
                size={20} 
                color={momentType === 'photo' ? colors.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.typeText,
                { color: momentType === 'photo' ? colors.primary : colors.text.secondary }
              ]}>
                Photo
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.typeOption,
                momentType === 'note' && { backgroundColor: colors.primary + '15' }
              ]}
              onPress={() => setMomentType('note')}
            >
              <Tag 
                size={20} 
                color={momentType === 'note' ? colors.primary : colors.text.secondary} 
              />
              <Text style={[
                styles.typeText,
                { color: momentType === 'note' ? colors.primary : colors.text.secondary }
              ]}>
                Note
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Photo Section */}
        {momentType === 'photo' && (
          <View style={[styles.section, { backgroundColor: colors.background.card }]}>
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <X size={16} color="#fff" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.photoPlaceholder, { borderColor: colors.text.tertiary + '30' }]}
                onPress={handleTakePhoto}
              >
                <ImageIcon size={40} color={colors.text.tertiary} strokeWidth={1.5} />
                <Text style={[styles.photoPlaceholderText, { color: colors.text.tertiary }]}>
                  Tap to add photo
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Title */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Title *
          </Text>
          <TextInput
            ref={titleInputRef}
            style={[
              styles.titleInput,
              { 
                color: colors.text.primary,
                borderColor: colors.text.tertiary + '30'
              }
            ]}
            placeholder="Give your moment a beautiful title..."
            placeholderTextColor={colors.text.tertiary}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* Description */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Description *
          </Text>
          <TextInput
            style={[
              styles.descriptionInput,
              { 
                color: colors.text.primary,
                borderColor: colors.text.tertiary + '30'
              }
            ]}
            placeholder="Describe this moment, your feelings, or what made it special..."
            placeholderTextColor={colors.text.tertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={[styles.characterCount, { color: colors.text.tertiary }]}>
            {description.length}/500
          </Text>
        </View>

        {/* Mood */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            How are you feeling?
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodContainer}>
            {moodOptions.map((mood) => (
              <TouchableOpacity
                key={mood.key}
                style={[
                  styles.moodOption,
                  selectedMood === mood.key && { backgroundColor: colors.primary + '15' }
                ]}
                onPress={() => setSelectedMood(mood.key)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[
                  styles.moodLabel,
                  { color: selectedMood === mood.key ? colors.primary : colors.text.secondary }
                ]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Location */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Location
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={20} color={colors.text.tertiary} strokeWidth={1.5} />
            <TextInput
              style={[
                styles.locationInput,
                { color: colors.text.primary }
              ]}
              placeholder="Where did this happen?"
              placeholderTextColor={colors.text.tertiary}
              value={location}
              onChangeText={setLocation}
              maxLength={100}
            />
          </View>
        </View>

        {/* Tags */}
        <View style={[styles.section, { backgroundColor: colors.background.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Tags
          </Text>
          
          {/* Add Tag Input */}
          <View style={styles.tagInputContainer}>
            <TextInput
              style={[
                styles.tagInput,
                { 
                  color: colors.text.primary,
                  borderColor: colors.text.tertiary + '30'
                }
              ]}
              placeholder="Add a tag..."
              placeholderTextColor={colors.text.tertiary}
              value={currentTag}
              onChangeText={setCurrentTag}
              onSubmitEditing={handleAddTag}
              returnKeyType="done"
              maxLength={20}
            />
            <TouchableOpacity
              style={[
                styles.addTagButton,
                { backgroundColor: currentTag ? colors.primary : colors.text.tertiary + '30' }
              ]}
              onPress={handleAddTag}
              disabled={!currentTag.trim()}
            >
              <Text style={[
                styles.addTagText,
                { color: currentTag ? '#fff' : colors.text.tertiary }
              ]}>
                Add
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tags List */}
          {tags.length > 0 && (
            <View style={styles.tagsGrid}>
              {tags.map((tag, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: colors.primary + '15' }]}>
                  <Text style={[styles.tagText, { color: colors.primary }]}>#{tag}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveTag(tag)}
                    style={styles.removeTagButton}
                  >
                    <X size={12} color={colors.primary} strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={[styles.loadingContainer, { backgroundColor: colors.background.card }]}>
            <Text style={[styles.loadingText, { color: colors.text.primary }]}>
              Saving your moment... ✨
            </Text>
          </View>
        </View>
      )}
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
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  selectedImage: {
    width: width - 80,
    height: (width - 80) * 0.75,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 6,
  },
  photoPlaceholder: {
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  photoPlaceholderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  titleInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  descriptionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 120,
  },
  characterCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  moodContainer: {
    flexDirection: 'row',
  },
  moodOption: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 80,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tagInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addTagButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  addTagText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  removeTagButton: {
    padding: 2,
  },
  bottomPadding: {
    height: 50,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});