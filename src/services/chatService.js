// Servicio de Chat para manejar la comunicación con la API del chatbot
export class ChatService {
  constructor() {
    this.baseUrl = 'http://10.213.43.179:8000'; // URL base de tu API
    this.isConnected = true;
  }

  // Enviar pregunta al chatbot
  async sendMessage(message, conversationId = null) {
    try {
      // Crear AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout
      
      try {
        const response = await fetch(`${this.baseUrl}/ask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: message.trim()
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Marcar como conectado si la respuesta es exitosa
        this.isConnected = true;
        
        return {
          success: true,
          data: {
            id: data.id || Date.now(),
            text: data.answer || data.response || data.message || data.text,
            timestamp: new Date(data.timestamp || Date.now()),
            conversationId: conversationId,
            isErrorResponse: false
          }
        };
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        // Marcar como desconectado
        this.isConnected = false;
        
        // Determinar tipo de error
        let errorMessage = "We're having a problem taking off 🚀 I can't connect to the server right now. Check your internet connection and try again.";
        
        if (fetchError.name === 'AbortError') {
          errorMessage = "We're having a problem taking off 🚀 The server is taking too long to respond. Try again in a moment.";
        } else if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('Network request failed')) {
          errorMessage = "We're having a problem taking off 🚀 No internet connection detected. Check your connection and try again.";
        }
        
        return {
          success: true,
          data: {
            id: Date.now(),
            text: errorMessage,
            timestamp: new Date(),
            conversationId: conversationId,
            isErrorResponse: true
          }
        };
      }
      
    } catch (error) {
      // Marcar como desconectado
      this.isConnected = false;
      
      // Respuesta de emergencia
      return {
        success: true,
        data: {
          id: Date.now(),
          text: "We're having a problem taking off 🚀 Something critical went wrong. Check your connection and try again.",
          timestamp: new Date(),
          conversationId: conversationId,
          isErrorResponse: true
        }
      };
    }
  }

  // Probar conexión con la API
  async testConnection() {
    try {
      // Crear AbortController para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
      
      const response = await fetch(`${this.baseUrl}/`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        this.isConnected = true;
        return { success: true, message: 'Connection successful' };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      this.isConnected = false;
      
      let friendlyMessage = 'Could not connect to server';
      if (error.name === 'AbortError') {
        friendlyMessage = 'Connection timeout';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('Network request failed')) {
        friendlyMessage = 'No internet connection';
      } else if (error.message.includes('timeout')) {
        friendlyMessage = 'Connection timeout';
      }
      
      return { 
        success: false, 
        error: friendlyMessage,
        details: error.message 
      };
    }
  }

  // Configurar conexión con la API
  setApiConnection(connected = true) {
    this.isConnected = connected;
  }

  // Cambiar URL base de la API
  setBaseUrl(url) {
    this.baseUrl = url;
  }

  // Validar mensaje antes de enviar
  validateMessage(message) {
    if (!message || typeof message !== 'string') {
      return { isValid: false, error: 'Message must be valid text.' };
    }

    const trimmed = message.trim();
    if (trimmed.length === 0) {
      return { isValid: false, error: 'Message cannot be empty.' };
    }

    if (trimmed.length > 1000) {
      return { isValid: false, error: 'Message is too long (maximum 1000 characters).' };
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