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
  Alert,
  Keyboard,
  Dimensions
} from 'react-native';
import { Send, Bot, User, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../src/context/ThemeContext';
import { chatService, CHAT_CONFIG } from '../../src/services/chatService';
import { router } from 'expo-router';

export default function ChatScreen() {
  const { currentTheme } = useTheme();
  const colors = currentTheme.colors;
  const scrollViewRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [screenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    initializeChat();

    // Listeners dinámicos para el teclado
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const initializeChat = async () => {
    try {
      // Crear nueva conversación
      const conversationResult = await chatService.createConversation();
      if (conversationResult.success) {
        setConversationId(conversationResult.data.conversationId);
      }

      // Cargar historial o mensaje de bienvenida
      const historyResult = await chatService.getConversationHistory();
      if (historyResult.success && historyResult.data.length > 0) {
        setMessages(historyResult.data);
      } else {
        // Mensaje de bienvenida por defecto
        setMessages([{
          id: 1,
          text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
          isBot: true,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
      Alert.alert('Error', 'No se pudo inicializar el chat. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    // Validar mensaje
    const validation = chatService.validateMessage(inputText);
    if (!validation.isValid) {
      Alert.alert('Error', validation.error);
      return;
    }

    const messageText = validation.message;
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Enviar mensaje al chatbot
      const response = await chatService.sendMessage(messageText, conversationId);
      
      if (response.success) {
        const botMessage = {
          id: response.data.id,
          text: response.data.text,
          isBot: true,
          timestamp: response.data.timestamp
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Si hay error pero tenemos respuesta de fallback
        if (response.fallbackResponse && response.fallbackResponse.success) {
          const fallbackMessage = {
            id: response.fallbackResponse.data.id,
            text: response.fallbackResponse.data.text,
            isBot: true,
            timestamp: response.fallbackResponse.data.timestamp
          };
          setMessages(prev => [...prev, fallbackMessage]);
        } else {
          throw new Error(response.error || 'Error desconocido');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Lo siento, hubo un problema al procesar tu mensaje. Por favor, inténtalo de nuevo.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>Cargando chat...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Asistente Virtual</Text>
          <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>En línea</Text>
        </View>
        <View style={[styles.botAvatar, { backgroundColor: colors.primary + '15' }]}>
          <Bot size={24} color={colors.primary} strokeWidth={2} />
        </View>
      </View>

      {/* Chat Container */}
      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 80 : 80 }
          ]}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper
              ]}
            >
              <View style={styles.messageRow}>
                {message.isBot && (
                  <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '15' }]}>
                    <Bot size={16} color={colors.primary} strokeWidth={2} />
                  </View>
                )}
                
                <View
                  style={[
                    styles.messageBubble,
                    message.isBot 
                      ? { backgroundColor: colors.background.card }
                      : { backgroundColor: colors.primary }
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      { color: message.isBot ? colors.text.primary : '#FFFFFF' }
                    ]}
                  >
                    {message.text}
                  </Text>
                  <Text
                    style={[
                      styles.timestamp,
                      { color: message.isBot ? colors.text.tertiary : '#FFFFFF99' }
                    ]}
                  >
                    {formatTime(message.timestamp)}
                  </Text>
                </View>

                {!message.isBot && (
                  <View style={[styles.avatarContainer, { backgroundColor: colors.secondary + '15' }]}>
                    <User size={16} color={colors.secondary} strokeWidth={2} />
                  </View>
                )}
              </View>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageWrapper, styles.botMessageWrapper]}>
              <View style={styles.messageRow}>
                <View style={[styles.avatarContainer, { backgroundColor: colors.primary + '15' }]}>
                  <Bot size={16} color={colors.primary} strokeWidth={2} />
                </View>
                <View style={[styles.messageBubble, { backgroundColor: colors.background.card }]}>
                  <View style={styles.typingIndicator}>
                    <View style={[styles.typingDot, { backgroundColor: colors.text.tertiary }]} />
                    <View style={[styles.typingDot, { backgroundColor: colors.text.tertiary }]} />
                    <View style={[styles.typingDot, { backgroundColor: colors.text.tertiary }]} />
                  </View>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[
          styles.inputContainer, 
          { 
            backgroundColor: colors.background.card, 
            borderTopColor: colors.border.light,
            bottom: keyboardHeight > 0 ? keyboardHeight : 0,
          }
        ]}>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: colors.background.tertiary,
                color: colors.text.primary,
                borderColor: colors.border.medium
              }
            ]}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={colors.text.tertiary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={CHAT_CONFIG.maxMessageLength}
            editable={!isTyping}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              { backgroundColor: inputText.trim() ? colors.primary : colors.background.tertiary }
            ]}
            onPress={handleSend}
            disabled={inputText.trim() === '' || isTyping}
            activeOpacity={0.7}
          >
            <Send 
              size={20} 
              color={inputText.trim() ? '#FFFFFF' : colors.text.tertiary} 
              strokeWidth={2} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 16, // Se ajusta dinámicamente en el componente
  },
  messageWrapper: {
    marginBottom: 16,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  avatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 2,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 10,
    fontSize: 15,
    maxHeight: 100,
    marginRight: 8,
    borderWidth: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});