import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Send, Heart, User, ArrowLeft, Users, Camera, Mic, Info } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ChatRoomScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  const scrollViewRef = useRef(null);
  const { chatId, chatTitle, participants } = useLocalSearchParams();
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    loadChatMessages();
    setupKeyboardListeners();
    
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [chatId]);

  const setupKeyboardListeners = () => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription?.remove();
      hideSubscription?.remove();
    };
  };

  const loadChatMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem(`community_chat_${chatId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Load mock messages based on chat type
        const mockMessages = getMockMessages(chatId);
        setMessages(mockMessages);
        await AsyncStorage.setItem(`community_chat_${chatId}`, JSON.stringify(mockMessages));
      }
    } catch (error) {
      console.log('Error loading chat messages:', error);
    }
  };

  const getMockMessages = (chatId) => {
    const baseMessages = [
      {
        id: 1,
        text: "Hello! I'm glad you reached out today. How are you feeling?",
        isUser: false,
        username: chatTitle || "Support Professional",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        type: 'text',
        avatar: '👩‍⚕️'
      }
    ];

    // Personalized responses based on the professional type
    if (chatTitle?.includes('Dr.') || chatTitle?.includes('Sarah')) {
      return [
        ...baseMessages,
        {
          id: 2,
          text: "I've been thinking about what we discussed in our last session. How have you been practicing the breathing exercises?",
          isUser: false,
          username: chatTitle,
          timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          type: 'text',
          avatar: '👩‍⚕️'
        },
        {
          id: 3,
          text: "I've been trying them, especially when I feel anxious. They do help, but sometimes I forget to use them in the moment.",
          isUser: true,
          username: "You",
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          type: 'text',
          avatar: '👤'
        },
        {
          id: 4,
          text: "That's completely normal. Building new habits takes time. Would you like to set up some gentle reminders on your phone?",
          isUser: false,
          username: chatTitle,
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          type: 'text',
          avatar: '👩‍⚕️'
        }
      ];
    } else if (chatTitle?.includes('Alex')) {
      return [
        ...baseMessages,
        {
          id: 2,
          text: "I wanted to share a mindfulness technique that really helped me this week. Have you tried the 5-4-3-2-1 grounding method?",
          isUser: false,
          username: chatTitle,
          timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
          type: 'text',
          avatar: '👨‍💼'
        },
        {
          id: 3,
          text: "No, I haven't heard of that one. How does it work?",
          isUser: true,
          username: "You",
          timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          type: 'text',
          avatar: '👤'
        }
      ];
    } else {
      return [
        ...baseMessages,
        {
          id: 2,
          text: "Remember, every small step forward is progress. You're doing better than you think. 💙",
          isUser: false,
          username: chatTitle,
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
          type: 'text',
          avatar: '💙'
        }
      ];
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(`community_chat_${chatId}`, JSON.stringify(newMessages));
    } catch (error) {
      console.log('Error saving messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      username: "You",
      timestamp: new Date().toISOString(),
      type: 'text',
      avatar: '👤'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText('');
    await saveMessages(updatedMessages);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate professional response occasionally
    if (Math.random() > 0.6) {
      setTimeout(() => {
        simulateProfessionalResponse(updatedMessages);
      }, 2000 + Math.random() * 4000);
    }
  };

  const simulateProfessionalResponse = async (currentMessages) => {
    const responses = [
      { text: "Thank you for sharing that with me. Your feelings are completely valid and important.", username: chatTitle, avatar: '�‍⚕️' },
      { text: "I can hear that this is really difficult for you. You're being very brave by talking about it.", username: chatTitle, avatar: '👨‍⚕️' },
      { text: "That sounds challenging. Can you tell me more about how that makes you feel?", username: chatTitle, avatar: '👩‍⚕️' },
      { text: "You're making real progress, even when it doesn't feel like it. I'm proud of you for reaching out.", username: chatTitle, avatar: '👨‍�' },
      { text: "Let's explore that feeling together. What do you think might be helpful right now?", username: chatTitle, avatar: '👩‍🏫' },
      { text: "Remember, you're not alone in this journey. I'm here to support you every step of the way.", username: chatTitle, avatar: '👨‍⚕️' }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const responseMessage = {
      id: Date.now() + 1,
      text: randomResponse.text,
      isUser: false,
      username: randomResponse.username,
      timestamp: new Date().toISOString(),
      type: 'text',
      avatar: randomResponse.avatar
    };

    const newMessages = [...currentMessages, responseMessage];
    setMessages(newMessages);
    await saveMessages(newMessages);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageMessage = {
        id: Date.now(),
        text: "",
        imageUri: result.assets[0].uri,
        isUser: true,
        username: "You",
        timestamp: new Date().toISOString(),
        type: 'image',
        avatar: '👤'
      };

      const updatedMessages = [...messages, imageMessage];
      setMessages(updatedMessages);
      await saveMessages(updatedMessages);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const recordVoice = () => {
    Alert.alert(
      "Voice Message",
      "Voice recording feature coming soon! This will allow you to share voice messages with the community.",
      [{ text: "OK", style: "default" }]
    );
  };

  const showChatInfo = () => {
    Alert.alert(
      "Chat Information",
      `${chatTitle}\n\nThis is a private, secure conversation with a mental health professional. Your conversations are confidential and saved only on your device.\n\nIf you're experiencing a mental health emergency, please contact your local emergency services immediately.`,
      [{ text: "OK", style: "default" }]
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background.secondary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
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
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>{chatTitle}</Text>
            <View style={styles.onlineStatus}>
              <View style={[styles.onlineDot, { backgroundColor: colors.status.success }]} />
              <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
                Online now
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: colors.background.tertiary }]}
            onPress={showChatInfo}
          >
            <Info size={18} color={colors.text.secondary} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.otherMessage
            ]}
          >
            {!message.isUser && (
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: colors.background.card }]}>
                  <Text style={styles.avatarText}>{message.avatar}</Text>
                </View>
              </View>
            )}
            
            <View style={[
              styles.messageBubble,
              message.isUser 
                ? { backgroundColor: colors.primary } 
                : { backgroundColor: colors.background.card, borderColor: colors.border.light, borderWidth: 1 }
            ]}>
              {!message.isUser && (
                <Text style={[styles.username, { color: colors.secondary }]}>
                  {message.username}
                </Text>
              )}
              
              {message.type === 'image' && message.imageUri ? (
                <Image source={{ uri: message.imageUri }} style={styles.messageImage} />
              ) : null}
              
              {message.text ? (
                <Text style={[
                  styles.messageText,
                  { color: message.isUser ? '#FFFFFF' : colors.text.primary }
                ]}>
                  {message.text}
                </Text>
              ) : null}
              
              <Text style={[
                styles.messageTime,
                { color: message.isUser ? '#FFFFFF' : colors.text.tertiary }
              ]}>
                {formatTime(message.timestamp)}
              </Text>
            </View>
            
            {message.isUser && (
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: colors.primary + '15' }]}>
                  <User size={16} color={colors.primary} strokeWidth={2} />
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: colors.background.card,
          borderTopColor: colors.border.light,
          paddingBottom: keyboardHeight > 0 ? 10 : 20
        }
      ]}>
        <View style={styles.inputRow}>
          <TouchableOpacity
            style={[styles.attachButton, { backgroundColor: colors.background.tertiary }]}
            onPress={pickImage}
          >
            <Camera size={20} color={colors.text.secondary} strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.attachButton, { backgroundColor: colors.background.tertiary }]}
            onPress={recordVoice}
          >
            <Mic size={20} color={colors.text.secondary} strokeWidth={2} />
          </TouchableOpacity>
          
          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: colors.background.tertiary,
                color: colors.text.primary,
                borderColor: colors.border.light
              }
            ]}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Share your thoughts..."
            placeholderTextColor={colors.text.tertiary}
            multiline
            maxLength={1000}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              { 
                backgroundColor: inputText.trim() ? colors.primary : colors.background.tertiary,
                opacity: inputText.trim() ? 1 : 0.5
              }
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '400',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 18,
  },
  username: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  inputContainer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});