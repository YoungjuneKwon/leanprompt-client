import { create } from 'zustand';
import { LeanPromptStore, LeanPromptSession, LeanPromptMessage } from '../types';

const createInitialSession = (): LeanPromptSession => ({
  messages: [],
  status: 'idle',
});

export const useLeanPromptStore = create<LeanPromptStore>((set, get) => ({
  sessions: {},
  connectionStatus: 'disconnected',
  connectionError: undefined,

  setSessionStatus: (path: string, status: LeanPromptSession['status']) =>
    set((state) => {
      const currentSession = state.sessions[path] || createInitialSession();
      return {
        sessions: {
          ...state.sessions,
          [path]: {
            ...currentSession,
            status,
          },
        },
      };
    }),

  addMessage: (path: string, message: LeanPromptMessage) =>
    set((state) => {
      const currentSession = state.sessions[path] || createInitialSession();
      return {
        sessions: {
          ...state.sessions,
          [path]: {
            ...currentSession,
            messages: [...(currentSession.messages || []), { ...message, timestamp: Date.now() }],
          },
        },
      };
    }),

  setSessionError: (path: string, error: string) =>
    set((state) => {
      const currentSession = state.sessions[path] || createInitialSession();
      return {
        sessions: {
          ...state.sessions,
          [path]: {
            ...currentSession,
            status: 'error',
            error,
          },
        },
      };
    }),

  clearSession: (path: string) =>
    set((state) => ({
      sessions: {
        ...state.sessions,
        [path]: createInitialSession(),
      },
    })),

  setConnectionStatus: (status: LeanPromptStore['connectionStatus']) =>
    set({ connectionStatus: status, connectionError: undefined }),

  setConnectionError: (error?: string) =>
    set({ connectionStatus: 'error', connectionError: error }),
}));