import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, Search, Trash2, MessageCircle, Calendar, Heart, User } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

export default function SavedChatsScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  
  const [savedChats, setSavedChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedChats();
  }, []);

  const loadSavedChats = async () => {
    try {
      setLoading(true);
      
      // Load personal chat messages
      const personalMessages = await AsyncStorage.getItem('personal_mental_chat_messages');
      const communityChats = await AsyncStorage.getItem('community_chats_data');
      
      let allChats = [];

      // Add personal chat if it has messages
      if (personalMessages) {
        const messages = JSON.parse(personalMessages);
        if (messages.length > 1) { // More than just welcome message
          const lastMessage = messages[messages.length - 1];
          allChats.push({
            id: 'personal',
            title: 'Personal Journal',
            type: 'personal',
            lastMessage: lastMessage.text || 'Image',
            timestamp: lastMessage.timestamp,
            messageCount: messages.length,
            icon: 'personal'
          });
        }
      }

      // Add community chats (mock saved conversations)
      const mockSavedCommunityChats = [
        {
          id: 'anxiety_saved_1',
          title: 'Anxiety Support Circle',
          type: 'community',
          lastMessage: 'Thank you all for the support yesterday...',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          messageCount: 45,
          participants: 12,
          icon: 'community'
        },
        {
          id: 'mindfulness_saved_1',
          title: 'Mindfulness Together',
          type: 'community',
          lastMessage: 'The meditation session was really helpful',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          messageCount: 28,
          participants: 8,
          icon: 'community'
        },
        {
          id: 'wellness_saved_1',
          title: 'Wellness Warriors',
          type: 'community',
          lastMessage: 'Good morning everyone! How are you feeling today?',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          messageCount: 67,
          participants: 15,
          icon: 'community'
        }
      ];

      allChats = [...allChats, ...mockSavedCommunityChats];

      // Sort by timestamp (newest first)
      allChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setSavedChats(allChats);
    } catch (error) {
      console.log('Error loading saved chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChats = savedChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const deleteSavedChat = (chatId) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this saved chat? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              if (chatId === 'personal') {
                await AsyncStorage.removeItem('personal_mental_chat_messages');
              }
              // For community chats, we would remove from saved list
              setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
            } catch (error) {
              console.log('Error deleting chat:', error);
            }
          }
        }
      ]
    );
  };

  const openChat = (chat) => {
    if (chat.type === 'personal') {
      router.push('/mental/personal-chat');
    } else {
      // For community chats, navigate to specific chat room
      router.push({
        pathname: '/mental/chat-room',
        params: { 
          chatId: chat.id,
          chatTitle: chat.title,
          participants: chat.participants || 0
        }
      });
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.chatItem, { backgroundColor: colors.background.card, borderColor: colors.border.light }]}
      onPress={() => openChat(item)}
    >
      <View style={styles.chatContent}>
        <View style={[
          styles.chatIcon,
          { backgroundColor: item.type === 'personal' ? colors.primary + '15' : colors.secondary + '15' }
        ]}>
          {item.type === 'personal' ? (
            <User size={20} color={colors.primary} strokeWidth={2} />
          ) : (
            <Heart size={20} color={colors.secondary} strokeWidth={2} />
          )}
        </View>
        
        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={[styles.chatTitle, { color: colors.text.primary }]}>{item.title}</Text>
            <Text style={[styles.chatTime, { color: colors.text.tertiary }]}>
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>
          
          <Text style={[styles.chatLastMessage, { color: colors.text.secondary }]} numberOfLines={2}>
            {item.lastMessage}
          </Text>
          
          <View style={styles.chatMeta}>
            <View style={styles.chatStats}>
              <MessageCircle size={14} color={colors.text.tertiary} strokeWidth={2} />
              <Text style={[styles.chatStatsText, { color: colors.text.tertiary }]}>
                {item.messageCount} messages
              </Text>
              {item.participants && (
                <>
                  <Text style={[styles.chatStatsText, { color: colors.text.tertiary }]}>•</Text>
                  <Text style={[styles.chatStatsText, { color: colors.text.tertiary }]}>
                    {item.participants} members
                  </Text>
                </>
              )}
            </View>
            
            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: colors.background.tertiary }]}
              onPress={() => deleteSavedChat(item.id)}
            >
              <Trash2 size={16} color={colors.text.secondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: colors.background.tertiary }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={colors.text.primary} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Saved Conversations</Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
              {savedChats.length} conversations saved
            </Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.background.tertiary, borderColor: colors.border.light }]}>
          <Search size={20} color={colors.text.tertiary} strokeWidth={2} />
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder="Search conversations..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      {loading ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>Loading saved conversations...</Text>
        </View>
      ) : filteredChats.length > 0 ? (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Calendar size={64} color={colors.text.tertiary} strokeWidth={1.5} />
          <Text style={[styles.emptyTitle, { color: colors.text.primary }]}>No Saved Conversations</Text>
          <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
            Your saved conversations will appear here. Start chatting in the community or personal journal to see them saved automatically.
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 44,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    padding: 16,
  },
  chatItem: {
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
  },
  chatContent: {
    padding: 16,
  },
  chatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  chatDetails: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  chatTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  chatLastMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  chatMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chatStatsText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});