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
import { Send, Heart, User, ArrowLeft, MoreVertical, Trash2, Camera, Mic } from 'lucide-react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function PersonalChatScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  const scrollViewRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [screenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    loadMessages();
    setupKeyboardListeners();
    
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

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

  const loadMessages = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('personal_mental_chat_messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Welcome message
        const welcomeMessage = {
          id: 1,
          text: "Welcome to your personal mental health journal. This is your safe space to express your thoughts and feelings. Everything you share here is private and saved only on your device. 💚",
          isUser: false,
          timestamp: new Date().toISOString(),
          type: 'text'
        };
        setMessages([welcomeMessage]);
        await AsyncStorage.setItem('personal_mental_chat_messages', JSON.stringify([welcomeMessage]));
      }
    } catch (error) {
      console.log('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('personal_mental_chat_messages', JSON.stringify(newMessages));
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
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText('');
    await saveMessages(updatedMessages);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Auto-response with supportive messages
    setTimeout(() => {
      sendSupportiveResponse(updatedMessages);
    }, 1500);
  };

  const sendSupportiveResponse = async (currentMessages) => {
    const supportiveResponses = [
      "Thank you for sharing your thoughts. Your feelings are valid and important. 💙",
      "I hear you. It takes courage to express what you're going through. 🌟",
      "Your mental health journey is unique, and every step forward matters. 🌱",
      "Remember, it's okay to feel what you're feeling. You're not alone in this. 🤗",
      "Take a moment to breathe. You're doing your best, and that's enough. 🌸",
      "Your self-awareness is a strength. Keep being kind to yourself. ✨"
    ];

    const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    
    const responseMessage = {
      id: Date.now() + 1,
      text: randomResponse,
      isUser: false,
      timestamp: new Date().toISOString(),
      type: 'text'
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
        timestamp: new Date().toISOString(),
        type: 'image'
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
      "Voice recording feature coming soon! This will allow you to record and save voice notes for your mental health journal.",
      [{ text: "OK", style: "default" }]
    );
  };

  const clearChat = () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear all messages? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: async () => {
            setMessages([]);
            await AsyncStorage.removeItem('personal_mental_chat_messages');
            loadMessages(); // Reload with welcome message
          }
        }
      ]
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
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Personal Journal</Text>
            <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>Your private space</Text>
          </View>
          <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: colors.background.tertiary }]}
            onPress={clearChat}
          >
            <Trash2 size={18} color={colors.text.secondary} strokeWidth={2} />
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
              message.isUser ? styles.userMessage : styles.botMessage
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.isUser 
                ? { backgroundColor: colors.primary } 
                : { backgroundColor: colors.background.card, borderColor: colors.border.light, borderWidth: 1 }
            ]}>
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
            
            <View style={[
              styles.messageIcon,
              { backgroundColor: message.isUser ? colors.primary + '15' : colors.secondary + '15' }
            ]}>
              {message.isUser ? (
                <User size={16} color={colors.primary} strokeWidth={2} />
              ) : (
                <Heart size={16} color={colors.secondary} strokeWidth={2} />
              )}
            </View>
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
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
  botMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginHorizontal: 8,
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
  messageIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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