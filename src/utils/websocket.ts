import { WebSocketMessage, WebSocketResponse, LeanPromptConfig } from '../types';

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: Required<LeanPromptConfig>;
  private reconnectAttempts = 0;
  private reconnectTimer: number | null = null;
  private messageQueue: Map<string, WebSocketMessage[]> = new Map();
  private debounceTimers: Map<string, number> = new Map();
  private messageHandlers: Set<(response: WebSocketResponse) => void> = new Set();
  private connectionHandlers: Set<(status: 'disconnected' | 'connecting' | 'connected' | 'error') => void> = new Set();

  constructor(config: LeanPromptConfig) {
    this.config = {
      baseUrl: config.baseUrl.replace(/\/$/, ''), // Remove trailing slash
      clientId: config.clientId || `client-${Math.random().toString(36).substr(2, 9)}`,
      reconnectAttempts: config.reconnectAttempts || 5,
      reconnectDelay: config.reconnectDelay || 1000,
      debounceMs: config.debounceMs || 300,
    };
  }

  // ... (connect method stays same) ...

  private setConnectionStatus(status: 'disconnected' | 'connecting' | 'connected' | 'error') {
    this.connectionHandlers.forEach(handler => handler(status));
  }

  onMessage(handler: (response: WebSocketResponse) => void) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onConnectionChange(handler: (status: 'disconnected' | 'connecting' | 'connected' | 'error') => void) {
    this.connectionHandlers.add(handler);
    return () => this.connectionHandlers.delete(handler);
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      this.setConnectionStatus('connecting');
      
      const wsUrl = `${this.config.baseUrl}/ws/${this.config.clientId}`;
      console.log('Connecting to WebSocket:', wsUrl);
      this.ws = new WebSocket(wsUrl);

      const timeout = setTimeout(() => {
        console.error('Connection timeout');
        reject(new Error('Connection timeout'));
      }, 10000);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        clearTimeout(timeout);
        this.reconnectAttempts = 0;
        this.setConnectionStatus('connected');
        this.processMessageQueue();
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          console.log('WebSocket message received:', event.data);
          const response: WebSocketResponse = JSON.parse(event.data);
          
          // If the message doesn't have a path, we can't route it correctly
          // However, we'll pass it to all handlers and let them decide or
          // rely on the fact that currently handlers are global but logic is per-path
          this.messageHandlers.forEach(handler => handler(response));
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        clearTimeout(timeout);
        this.setConnectionStatus('disconnected');
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        clearTimeout(timeout);
        this.setConnectionStatus('error');
        // Don't reject here immediately as onclose might fire too?
        // Actually, reject is for the connect() promise.
        // If it's already connected, this promise is resolved.
        // If connecting, we should reject.
        if (this.getConnectionStatus() === 'connecting') {
           reject(error);
        }
      };
    });
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    // Clear all debounce timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.setConnectionStatus('disconnected');
  }

  send(path: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsMessage: WebSocketMessage = { path, message };
      
      // Add to message queue for this path
      if (!this.messageQueue.has(path)) {
        this.messageQueue.set(path, []);
      }
      this.messageQueue.get(path)!.push(wsMessage);

      // Debounce the sending
      this.debounceSend(path);
      resolve();
    });
  }

  private debounceSend(path: string) {
    // Clear existing timer for this path
    const existingTimer = this.debounceTimers.get(path);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Set new timer
    const timer = window.setTimeout(() => {
      this.processQueueForPath(path);
      this.debounceTimers.delete(path);
    }, this.config.debounceMs);

    this.debounceTimers.set(path, timer);
  }

  private processQueueForPath(path: string) {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      return;
    }

    const messages = this.messageQueue.get(path);
    if (!messages || messages.length === 0) {
      return;
    }

    // Send only the latest message for this path
    const latestMessage = messages[messages.length - 1];
    
    try {
      this.ws.send(JSON.stringify(latestMessage));
      // Clear the queue for this path after sending
      this.messageQueue.set(path, []);
    } catch (error) {
      console.error('Failed to send WebSocket message:', error);
    }
  }

  private processMessageQueue() {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      return;
    }

    // Process all paths in the queue
    Array.from(this.messageQueue.keys()).forEach(path => {
      this.processQueueForPath(path);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.config.reconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.config.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

this.reconnectTimer = window.setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.config.reconnectAttempts})`);
      this.connect().catch((error) => {
        console.error('Reconnection failed:', error);
      });
    }, delay);
  }



  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  getConnectionStatus(): 'disconnected' | 'connecting' | 'connected' | 'error' {
    if (this.ws?.readyState === WebSocket.OPEN) return 'connected';
    if (this.ws?.readyState === WebSocket.CONNECTING) return 'connecting';
    if (this.ws?.readyState === WebSocket.CLOSED) return 'disconnected';
    return 'error';
  }
}