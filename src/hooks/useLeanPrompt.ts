import { useEffect, useRef, useCallback } from 'react';
import { useLeanPromptStore } from '../store';
import { useLeanPromptContext } from '../components/LeanPromptProvider';
import { WebSocketManager } from '../utils/websocket';
import { LeanPromptMessage } from '../types';

// Global WebSocket manager instance
let globalWsManager: WebSocketManager | null = null;

export const useLeanPrompt = (path: string) => {
  const { config } = useLeanPromptContext();
  const wsManagerRef = useRef<WebSocketManager | null>(null);
  
  // Selectors for Zustand store
  const session = useLeanPromptStore((state) => state.sessions[path]);
  const connectionStatus = useLeanPromptStore((state) => state.connectionStatus);
  const connectionError = useLeanPromptStore((state) => state.connectionError);
  
  // Actions
  const setSessionStatus = useLeanPromptStore((state) => state.setSessionStatus);
  const addMessage = useLeanPromptStore((state) => state.addMessage);
  const setSessionError = useLeanPromptStore((state) => state.setSessionError);
  const clearSession = useLeanPromptStore((state) => state.clearSession);
  const setConnectionStatus = useLeanPromptStore((state) => state.setConnectionStatus);
  const setConnectionError = useLeanPromptStore((state) => state.setConnectionError);

  // Initialize or get global WebSocket manager
  const getWsManager = useCallback(() => {
    if (!globalWsManager) {
      globalWsManager = new WebSocketManager(config);
      
      // Set up global connection status handler (only needs to be done once per manager)
      globalWsManager.onConnectionChange((status) => {
        // We can update the store directly here since it's global state
        useLeanPromptStore.getState().setConnectionStatus(status);
      });
    }
    return globalWsManager;
  }, [config]);

  // Initialize connection on mount and setup listeners
  useEffect(() => {
    const wsManager = getWsManager();
    wsManagerRef.current = wsManager;
    
    if (!session) {
      // Initialize session if it doesn't exist
      setSessionStatus(path, 'idle');
    }
    
    // Connect if not already connected
    if (wsManager.getConnectionStatus() === 'disconnected' || wsManager.getConnectionStatus() === 'error') {
      wsManager.connect().catch((error) => {
        setConnectionError(error.message);
      });
    }

    // Register message handler for this specific path
    const unsubscribe = wsManager.onMessage((response) => {
      // If response has a path, only update if it matches our path
      if (response.path && response.path !== path) {
          return;
      }

      // If response has no path (e.g. global error), maybe we should handle it? 
      // Or if it matches our path explicitly.
      
      if (response.error) {
        setSessionError(path, response.error);
        setSessionStatus(path, 'error');
      } else if (response.response) {
        // Add assistant message
        addMessage(path, {
          role: 'assistant',
          content: response.response,
        });
        setSessionStatus(path, 'idle');
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [path, session, getWsManager, setSessionStatus, setConnectionError, addMessage, setSessionError]);

  const send = useCallback(
    async (message: string) => {
      const wsManager = getWsManager();
      
      try {
        // Set status to streaming
        setSessionStatus(path, 'streaming');
        
        // Add user message
        addMessage(path, {
          role: 'user',
          content: message,
        });
        
        // Send message via WebSocket
        await wsManager.send(path, message);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setSessionError(path, errorMessage);
        setSessionStatus(path, 'error');
      }
    },
    [path, getWsManager, setSessionStatus, addMessage, setSessionError]
  );

  const clear = useCallback(() => {
    clearSession(path);
  }, [path, clearSession]);

  return {
    messages: session?.messages || [],
    status: session?.status || 'idle',
    connectionStatus,
    connectionError,
    isConnected: connectionStatus === 'connected',
    isLoading: session?.status === 'connecting' || session?.status === 'streaming',
    isStreaming: session?.status === 'streaming',
    error: session?.error || connectionError,
    send,
    clear,
  };
};