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
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Send, Bot, User, ArrowLeft, MoreVertical, Trash2 } from 'lucide-react-native';
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [screenHeight] = useState(Dimensions.get('window').height);
  const [messageIdCounter, setMessageIdCounter] = useState(1000); // Contador para IDs únicos
  const [showMenu, setShowMenu] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown'); // 'connected', 'disconnected', 'unknown'
  const [isInitializing, setIsInitializing] = useState(true); // Para mostrar estado inicial

  const generateUniqueId = () => {
    setMessageIdCounter(prev => prev + 1);
    return `msg_${messageIdCounter}_${Date.now()}`;
  };

  // Verificar estado de conexión con la API
  const checkApiConnection = async () => {
    try {
      const result = await chatService.testConnection();
      const newStatus = result.success ? 'connected' : 'disconnected';
      
      // Solo actualizar si el estado cambió
      setApiStatus(prevStatus => {
        if (prevStatus !== newStatus) {
          return newStatus;
        }
        return prevStatus;
      });
      
      return result.success;
    } catch (error) {
      setApiStatus('disconnected');
      return false;
    }
  };

  // Función de guardado automático con AsyncStorage
  const autoSaveConversation = async (updatedMessages) => {
    try {
      if (!conversationId || updatedMessages.length === 0) {
        return;
      }
      
      
      const conversationData = {
        id: conversationId,
        messages: updatedMessages,
        timestamp: new Date().toISOString(),
        title: `Conversación del ${new Date().toLocaleDateString()}`,
        lastMessage: updatedMessages[updatedMessages.length - 1]?.text?.substring(0, 50) + '...'
      };
      
      // Guardar conversación específica
      await AsyncStorage.setItem(`conversation_${conversationId}`, JSON.stringify(conversationData));
      
      // Actualizar lista de conversaciones
      const existingConversations = await AsyncStorage.getItem('conversations_list');
      let conversationsList = existingConversations ? JSON.parse(existingConversations) : [];
      
      // Actualizar o agregar conversación
      const existingIndex = conversationsList.findIndex(conv => conv.id === conversationId);
      const conversationSummary = {
        id: conversationId,
        title: conversationData.title,
        lastMessage: conversationData.lastMessage,
        timestamp: conversationData.timestamp,
        messageCount: updatedMessages.length
      };
      
      if (existingIndex !== -1) {
        conversationsList[existingIndex] = conversationSummary;
      } else {
        conversationsList.unshift(conversationSummary);
      }
      
      await AsyncStorage.setItem('conversations_list', JSON.stringify(conversationsList));
    } catch (error) {
    }
  };

  // Cargar conversación desde AsyncStorage
  const loadConversation = async (convId) => {
    try {
      const savedConversation = await AsyncStorage.getItem(`conversation_${convId}`);
      if (savedConversation) {
        const conversationData = JSON.parse(savedConversation);
        return conversationData.messages || [];
      } else {
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    initializeChat();
    
    // Ejecutar diagnóstico para depuración
    setTimeout(() => {
      debugAsyncStorage();
    }, 2000); // Esperar 2 segundos después de la inicialización

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

  // Guardado automático cuando cambian los mensajes
  useEffect(() => {
    if (messages.length > 0 && conversationId) {
      autoSaveConversation(messages);
    }
  }, [messages, conversationId]);

  // Monitoreo periódico de la conexión API
  useEffect(() => {
    let connectionInterval;
    
    const startConnectionMonitoring = () => {
      // Verificación inicial
      checkApiConnection();
      
      // Configurar intervalo basado en el estado actual
      const setupInterval = (status) => {
        const intervalTime = status === 'disconnected' ? 10000 : 30000; // 10s si está offline, 30s si está online
        
        connectionInterval = setInterval(() => {
          checkApiConnection().then(isConnected => {
            // Si el estado cambió, reconfigurar el intervalo
            const currentStatus = isConnected ? 'connected' : 'disconnected';
            if (currentStatus !== status) {
              clearInterval(connectionInterval);
              setupInterval(currentStatus);
            }
          });
        }, intervalTime);
      };
      
      // Comenzar con verificación más frecuente
      setupInterval(apiStatus);
    };
    
    // Solo iniciar el monitoreo si no estamos inicializando
    if (!isInitializing) {
      startConnectionMonitoring();
    }
    
    return () => {
      if (connectionInterval) {
        clearInterval(connectionInterval);
      }
    };
  }, [isInitializing, apiStatus]);

  const initializeChat = async () => {
    try {
      // Usar una conversación persistente o crear una nueva
      let persistentConversationId = await AsyncStorage.getItem('current_conversation_id');
      
      if (!persistentConversationId) {
        // Crear nueva conversación si no existe
        persistentConversationId = `chat_${Date.now()}`;
        await AsyncStorage.setItem('current_conversation_id', persistentConversationId);
        
        // Agregar a la lista de conversaciones
        await updateConversationsList(persistentConversationId);
      } else {
      }
      
      setConversationId(persistentConversationId);

      // Intentar cargar historial guardado
      const savedMessages = await loadConversation(persistentConversationId);
      
      if (savedMessages.length > 0) {
        // Si hay mensajes guardados, cargarlos
        setMessages(savedMessages);
      } else {
        // Si no hay historial, mostrar mensaje de bienvenida
        const welcomeMessage = {
          id: generateUniqueId(),
          text: 'Hello! I am your virtual assistant. How can I help you today?',
          isBot: true,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
      
      // Probar conexión con API en segundo plano (no bloquea la UI)
      checkApiConnection();
      
    } catch (error) {
      // No mostrar alert, solo mensaje de bienvenida básico
      setMessages([{
        id: generateUniqueId(),
        text: 'Hello! I am your virtual assistant. How can I help you today?',
        isBot: true,
        timestamp: new Date()
      }]);
      setConversationId(`emergency_${Date.now()}`);
    } finally {
      setIsInitializing(false);
    }
  };

  // Actualizar lista de conversaciones
  // Función de depuración para verificar AsyncStorage
  const debugAsyncStorage = async () => {
    try {
      
      // Verificar conversación actual
      const currentConvId = await AsyncStorage.getItem('current_conversation_id');
      
      // Verificar lista de conversaciones
      const conversationsList = await AsyncStorage.getItem('conversation_list');
      if (conversationsList) {
        const conversations = JSON.parse(conversationsList);
        conversations.forEach((conv, index) => {
        });
      } else {
      }
      
      // Verificar conversación específica
      if (currentConvId) {
        const convData = await AsyncStorage.getItem(`conversation_${currentConvId}`);
        if (convData) {
          const parsed = JSON.parse(convData);
        } else {
          
        }
      }
      
      // Verificar todas las claves en AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();
      
    } catch (error) {
    }
  };

  const updateConversationsList = async (convId) => {
    try {
      const conversationsList = await AsyncStorage.getItem('conversation_list');
      let conversations = [];
      
      if (conversationsList) {
        conversations = JSON.parse(conversationsList);
      }
      
      // Verificar si la conversación ya existe en la lista
      const existingConversation = conversations.find(conv => conv.id === convId);
      
      if (!existingConversation) {
        // Agregar nueva conversación a la lista
        const newConversation = {
          id: convId,
          title: `Conversación ${conversations.length + 1}`,
          lastMessage: '',
          timestamp: new Date().toISOString()
        };
        conversations.unshift(newConversation);
        await AsyncStorage.setItem('conversation_list', JSON.stringify(conversations));
      } else {
      }
      
    } catch (error) {
    }
  };

  const handleSend = async () => {
    // Validar mensaje
    const validation = chatService.validateMessage(inputText);
    if (!validation.isValid) {
      // Silently return without showing alert
      return;
    }

    const messageText = validation.message;
    const userMessage = {
      id: generateUniqueId(),
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
      
      // Con el nuevo sistema, siempre deberíamos recibir success: true
      if (response.success) {
        // Actualizar estado de API basado en si es respuesta de error
        if (response.data.isErrorResponse) {
          setApiStatus('disconnected');
        } else {
          setApiStatus('connected');
        }
        
        const botMessage = {
          id: response.data.id || generateUniqueId(),
          text: response.data.text,
          isBot: true,
          timestamp: new Date(response.data.timestamp || Date.now()),
          isError: response.data.isErrorResponse || false
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Este caso no debería ocurrir con el nuevo sistema, pero por seguridad
        setApiStatus('disconnected');
        
        const errorMessage = {
          id: generateUniqueId(),
          text: "We're having a problem taking off 🚀 Something unexpected happened. Check your connection and try again.",
          isBot: true,
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      // Este catch ahora solo maneja errores realmente críticos
      setApiStatus('disconnected');
      
      const emergencyMessage = {
        id: generateUniqueId(),
        text: "We're having a problem taking off 🚀 Critical error. Check your connection and try again.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, emergencyMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleClearConversation = async () => {
    // Clear conversation directly without confirmation alert
    try {
      // Eliminar de AsyncStorage
      if (conversationId) {
        await AsyncStorage.removeItem(`conversation_${conversationId}`);
        
        // Actualizar lista de conversaciones
        const existingConversations = await AsyncStorage.getItem('conversations_list');
        if (existingConversations) {
          let conversationsList = JSON.parse(existingConversations);
          conversationsList = conversationsList.filter(conv => conv.id !== conversationId);
          await AsyncStorage.setItem('conversations_list', JSON.stringify(conversationsList));
        }
      }
      
      // Resetear el chat
      const newConversationId = `new_${Date.now()}`;
      setConversationId(newConversationId);
      setMessages([{
        id: generateUniqueId(),
        text: 'Hello! I am your virtual assistant. How can I help you today?',
        isBot: true,
        timestamp: new Date()
      }]);
      
      setShowMenu(false);
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
  };

  // Función para obtener estadísticas de conversaciones guardadas
  const getConversationStats = async () => {
    try {
      const conversationsList = await AsyncStorage.getItem('conversations_list');
      if (conversationsList) {
        const conversations = JSON.parse(conversationsList);
        console.log(`📊 Total de conversaciones guardadas: ${conversations.length}`);
        return conversations.length;
      }
      return 0;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return 0;
    }
  };

  const formatTime = (date) => {
    try {
      // Verificar si date es válido
      if (!date) {
        return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      }
      
      // Si date es un string, convertirlo a Date
      if (typeof date === 'string') {
        date = new Date(date);
      }
      
      // Si date es un número (timestamp), convertirlo a Date
      if (typeof date === 'number') {
        date = new Date(date);
      }
      
      // Verificar si es una fecha válida
      if (isNaN(date.getTime())) {
        return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      }
      
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error formateando fecha:', error);
      // Retornar hora actual como fallback
      return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border.light }]}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeft size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          
          <View style={styles.headerTextContainer}>
            <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Virtual Assistant</Text>
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusDot, 
                { backgroundColor: 
                  isInitializing ? colors.text.tertiary :
                  apiStatus === 'connected' ? colors.status.success :
                  apiStatus === 'disconnected' ? colors.status.error :
                  colors.text.tertiary
                }
              ]} />
              <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
                {isInitializing ? 'Starting...' :
                 apiStatus === 'connected' ? 'Online' : 
                 apiStatus === 'disconnected' ? 'Offline' : 
                 'Connecting...'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => setShowMenu(true)}
        >
          <MoreVertical size={24} color={colors.text.primary} strokeWidth={2} />
        </TouchableOpacity>
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
              }
            ]}
            placeholder="Type a message..."
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

      {/* Menú de opciones - Dropdown */}
      {showMenu && (
        <TouchableOpacity 
          style={styles.menuOverlay} 
          activeOpacity={1} 
          onPress={() => setShowMenu(false)}
        >
          <View style={[styles.dropdownMenu, { backgroundColor: colors.background.card }]}>
            <TouchableOpacity 
              style={[styles.dropdownItem, { backgroundColor: 'transparent' }]} 
              onPress={handleClearConversation}
              activeOpacity={0.7}
            >
              <Trash2 size={18} color={colors.status.error} strokeWidth={2} />
              <Text style={[styles.dropdownText, { color: colors.status.error }]}>
                Delete Conversation
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  menuButton: {
    padding: 8,
    marginLeft: 8,
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
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 15,
    minWidth: 180,
    borderRadius: 10,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
});