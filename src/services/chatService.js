// Servicio de Chat para manejar la comunicación con la API del chatbot
import { apiService } from './api';

export class ChatService {
  constructor() {
    this.baseUrl = '/chat'; // Configurar según tu API
    this.isConnected = false;
  }

  // Enviar mensaje al chatbot
  async sendMessage(message, conversationId = null) {
    try {
      const payload = {
        message: message.trim(),
        conversationId,
        timestamp: new Date().toISOString(),
      };

      // Por ahora simulamos la respuesta, reemplazar con llamada real a la API
      if (process.env.NODE_ENV === 'development' || !this.isConnected) {
        return this.simulateResponse(message);
      }

      const response = await apiService.post(`${this.baseUrl}/send`, payload);
      return {
        success: true,
        data: {
          id: response.id,
          text: response.message,
          timestamp: new Date(response.timestamp),
          conversationId: response.conversationId,
        }
      };
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        success: false,
        error: 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
        fallbackResponse: this.simulateResponse(message)
      };
    }
  }

  // Obtener historial de conversación
  async getConversationHistory(conversationId) {
    try {
      if (process.env.NODE_ENV === 'development' || !this.isConnected) {
        return this.getMockHistory();
      }

      const response = await apiService.get(`${this.baseUrl}/conversation/${conversationId}`);
      return {
        success: true,
        data: response.messages.map(msg => ({
          id: msg.id,
          text: msg.content,
          isBot: msg.sender === 'bot',
          timestamp: new Date(msg.timestamp),
        }))
      };
    } catch (error) {
      console.error('Error fetching conversation:', error);
      return {
        success: false,
        error: 'No se pudo cargar el historial.',
        data: this.getMockHistory().data
      };
    }
  }

  // Crear nueva conversación
  async createConversation() {
    try {
      if (process.env.NODE_ENV === 'development' || !this.isConnected) {
        return {
          success: true,
          data: { conversationId: `mock_${Date.now()}` }
        };
      }

      const response = await apiService.post(`${this.baseUrl}/conversation`);
      return {
        success: true,
        data: { conversationId: response.id }
      };
    } catch (error) {
      console.error('Error creating conversation:', error);
      return {
        success: false,
        error: 'No se pudo crear la conversación.',
        data: { conversationId: `fallback_${Date.now()}` }
      };
    }
  }

  // Simulador de respuestas para desarrollo
  simulateResponse(userMessage) {
    const responses = {
      // Respuestas específicas basadas en palabras clave
      'hola': '¡Hola! ¿En qué puedo ayudarte hoy?',
      'ayuda': 'Estoy aquí para ayudarte. ¿Qué necesitas saber?',
      'gracias': '¡De nada! ¿Hay algo más en lo que pueda ayudarte?',
      'adiós': '¡Hasta luego! No dudes en volver si necesitas ayuda.',
      'perfil': 'Puedes editar tu perfil desde la sección de configuración.',
      'configuración': 'En configuración puedes cambiar el tema, notificaciones y más.',
      'tema': 'Puedes cambiar el tema de la aplicación en configuración > Tema.',
      'notificaciones': 'Las notificaciones se pueden gestionar desde configuración.',
      // Respuestas generales
      default: [
        'Entiendo tu pregunta. Déjame ayudarte con eso.',
        '¡Excelente pregunta! Aquí está mi respuesta...',
        'Claro, puedo ayudarte con eso.',
        'Esa es una buena observación. Te explico...',
        'Permíteme buscar la mejor respuesta para ti.',
        'Interesante punto. Aquí tienes mi sugerencia...'
      ]
    };

    // Buscar respuesta específica
    const lowerMessage = userMessage.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return {
          success: true,
          data: {
            id: Date.now(),
            text: response,
            timestamp: new Date(),
          }
        };
      }
    }

    // Respuesta aleatoria por defecto
    const defaultResponses = responses.default;
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    
    return {
      success: true,
      data: {
        id: Date.now(),
        text: randomResponse,
        timestamp: new Date(),
      }
    };
  }

  // Historial mock para desarrollo
  getMockHistory() {
    return {
      success: true,
      data: [
        {
          id: 1,
          text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
          isBot: true,
          timestamp: new Date(Date.now() - 60000) // 1 minuto atrás
        }
      ]
    };
  }

  // Configurar conexión con la API
  setApiConnection(connected = true) {
    this.isConnected = connected;
  }

  // Validar mensaje antes de enviar
  validateMessage(message) {
    if (!message || typeof message !== 'string') {
      return { isValid: false, error: 'El mensaje debe ser un texto válido.' };
    }

    const trimmed = message.trim();
    if (trimmed.length === 0) {
      return { isValid: false, error: 'El mensaje no puede estar vacío.' };
    }

    if (trimmed.length > 1000) {
      return { isValid: false, error: 'El mensaje es demasiado largo (máximo 1000 caracteres).' };
    }

    return { isValid: true, message: trimmed };
  }
}

// Instancia singleton del servicio
export const chatService = new ChatService();

// Configuraciones del chat
export const CHAT_CONFIG = {
  maxMessageLength: 1000,
  typingDelay: 1000,
  reconnectAttempts: 3,
  reconnectDelay: 2000,
};