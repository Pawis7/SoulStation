import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { 
  ArrowLeft, 
  BookOpen
} from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';

const motivationalQuotes = [
  "Your mental health is just as important as your physical health.",
  "Progress, not perfection, is the goal.",
  "It's okay to not be okay sometimes.",
  "You are stronger than you think.",
  "Every small step forward is progress.",
  "Your feelings are valid and important.",
  "Healing is not linear, and that's perfectly normal.",
  "You deserve to take up space in this world.",
  "Self-care isn't selfish, it's necessary.",
  "You are worthy of love and support.",
  "Your story isn't over yet.",
  "It's brave to ask for help when you need it.",
  "You have survived 100% of your worst days.",
  "Your mental health journey is unique to you.",
  "You are more resilient than you realize.",
  "Taking breaks is productive, not lazy.",
  "Your past does not define your future.",
  "You are enough, exactly as you are.",
  "Growth happens outside your comfort zone.",
  "You have the strength to overcome challenges."
];

// Mock personal chats data - simple como WhatsApp
const personalChats = [
  {
    id: 'personal-journal',
    name: "Personal Journal",
    lastMessage: "Your thoughts are safe here...",
    lastTime: "now",
    unread: 0,
    avatar: "📔",
    isPersonalJournal: true
  },
  {
    id: 1,
    name: "Dr. Sarah Martinez",
    lastMessage: "How have you been feeling?",
    lastTime: "2 min ago",
    unread: 1,
    avatar: "👩‍⚕️"
  },
  {
    id: 2,
    name: "Alex Chen",
    lastMessage: "Thanks for sharing yesterday",
    lastTime: "1 hour ago",
    unread: 0,
    avatar: "👨‍💼"
  },
  {
    id: 3,
    name: "Maya Williams",
    lastMessage: "Let's schedule our check-in",
    lastTime: "3 hours ago",
    unread: 2,
    avatar: "👩‍🏫"
  },
  {
    id: 4,
    name: "Jordan Smith",
    lastMessage: "I'm here if you need support",
    lastTime: "1 day ago",
    unread: 0,
    avatar: "👨‍⚕️"
  }
];

export default function MentalHealthMain() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    // Set random quote on load
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setCurrentQuote(motivationalQuotes[randomIndex]);
  }, []);

  const showResourcesAlert = () => {
    Alert.alert(
      "Mental Health Resources",
      "🧠 Mindfulness exercises\n🎯 Stress management techniques\n📱 Crisis helplines\n🏥 Professional support services\n📚 Educational materials\n🤝 Support groups",
      [{ text: "Close", style: "default" }]
    );
  };

  const openChat = (chat) => {
    if (chat.isPersonalJournal) {
      router.push('/(main)/mental/personal-chat');
    } else {
      router.push({
        pathname: '/(main)/mental/chat-room',
        params: {
          chatId: chat.id,
          chatTitle: chat.name,
          chatType: 'personal'
        }
      });
    }
  };

  const formatTime = (timeStr) => {
    return timeStr;
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
          <Text style={[styles.title, { color: colors.text.primary }]}>Mental Health</Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]}>Your wellness sanctuary ✨</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.resourcesButton, { backgroundColor: colors.primary }]}
          onPress={showResourcesAlert}
        >
          <BookOpen size={20} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Daily Quote */}
        <View style={styles.section}>
          <View style={[styles.quoteCard, { backgroundColor: colors.background.card }]}>
            <View style={[styles.quoteIconContainer, { backgroundColor: colors.primary + '15' }]}>
              <Text style={styles.quoteIcon}>💭</Text>
            </View>
            <Text style={[styles.quoteText, { color: colors.text.primary }]}>
              "{currentQuote}"
            </Text>
          </View>
        </View>

        {/* Chats List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Chats
          </Text>
          
          <View style={styles.chatsContainer}>
            {personalChats.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={[styles.chatItem, { backgroundColor: colors.background.card }]}
                onPress={() => openChat(chat)}
                activeOpacity={0.7}
              >
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarEmoji}>{chat.avatar}</Text>
                </View>
                
                <View style={styles.chatContent}>
                  <View style={styles.chatHeader}>
                    <Text style={[styles.chatName, { color: colors.text.primary }]} numberOfLines={1}>
                      {chat.name}
                    </Text>
                    <Text style={[styles.chatTime, { color: colors.text.tertiary }]}>
                      {chat.lastTime}
                    </Text>
                  </View>
                  
                  <View style={styles.chatFooter}>
                    <Text style={[styles.lastMessage, { color: colors.text.secondary }]} numberOfLines={1}>
                      {chat.lastMessage}
                    </Text>
                    {chat.unread > 0 && (
                      <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                        <Text style={styles.unreadText}>{chat.unread}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
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
  resourcesButton: {
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  // Quote Card Styles - Bonito y elegante
  quoteCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  quoteIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  quoteIcon: {
    fontSize: 28,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '500',
  },
  // Chat List Styles - Como WhatsApp
  chatsContainer: {
    gap: 2,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});