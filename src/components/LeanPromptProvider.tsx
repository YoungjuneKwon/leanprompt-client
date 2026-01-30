import React, { createContext, useContext, ReactNode } from 'react';
import { LeanPromptConfig } from '../types';

interface LeanPromptContextValue {
  config: LeanPromptConfig;
}

const LeanPromptContext = createContext<LeanPromptContextValue | null>(null);

interface LeanPromptProviderProps {
  children: ReactNode;
  config: LeanPromptConfig;
}

export const LeanPromptProvider: React.FC<LeanPromptProviderProps> = ({
  children,
  config,
}) => {
  const value = { config };

  return (
    <LeanPromptContext.Provider value={value}>
      {children}
    </LeanPromptContext.Provider>
  );
};

export const useLeanPromptContext = (): LeanPromptContextValue => {
  const context = useContext(LeanPromptContext);
  if (!context) {
    throw new Error('useLeanPromptContext must be used within a LeanPromptProvider');
  }
  return context;
};