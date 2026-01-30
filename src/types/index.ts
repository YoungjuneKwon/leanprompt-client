export interface LeanPromptMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface LeanPromptSession {
  messages: LeanPromptMessage[];
  status: 'idle' | 'connecting' | 'streaming' | 'error' | 'connected';
  error?: string;
}

export interface LeanPromptStore {
  sessions: Record<string, LeanPromptSession>;
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  connectionError?: string;
  
  // Actions
  setSessionStatus: (path: string, status: LeanPromptSession['status']) => void;
  addMessage: (path: string, message: LeanPromptMessage) => void;
  setSessionError: (path: string, error: string) => void;
  clearSession: (path: string) => void;
  setConnectionStatus: (status: LeanPromptStore['connectionStatus']) => void;
  setConnectionError: (error?: string) => void;
}

export interface LeanPromptConfig {
  baseUrl: string;
  clientId?: string;
  reconnectAttempts?: number;
  reconnectDelay?: number;
  debounceMs?: number;
}

export interface WebSocketMessage {
  path: string;
  message: string;
}

export interface WebSocketResponse {
  response?: string;
  error?: string;
  path?: string;
}