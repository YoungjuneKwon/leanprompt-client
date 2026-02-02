import React, { useState, useMemo } from 'react';
import { LeanPromptProvider, useLeanPrompt } from './index';

export const ChatComponent: React.FC<{ path: string; title: string; description: string }> = ({
  path,
  title,
  description,
}) => {
  const [input, setInput] = useState('');
  const {
    messages,
    send,
    clear,
    isLoading,
    isStreaming,
    isConnected,
    connectionStatus,
    error,
  } = useLeanPrompt(path);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      send(input.trim());
      setInput('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <p>{description}</p>
      
      <div style={{ marginBottom: '10px' }}>
        <span style={{ 
          padding: '2px 8px', 
          borderRadius: '4px', 
          fontSize: '12px',
          backgroundColor: isConnected ? '#4CAF50' : '#f44336',
          color: 'white'
        }}>
          {connectionStatus}
        </span>
        {isStreaming && (
          <span style={{ 
            marginLeft: '5px',
            padding: '2px 8px', 
            borderRadius: '4px', 
            fontSize: '12px',
            backgroundColor: '#FF9800',
            color: 'white'
          }}>
            streaming...
          </span>
        )}
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '5px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          Error: {error}
        </div>
      )}

      <div style={{ height: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '10px', marginBottom: '10px', backgroundColor: '#fafafa' }}>
        {messages.length === 0 ? (
          <div style={{ color: '#666', fontStyle: 'italic' }}>No messages yet. Start a conversation!</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <strong style={{ color: msg.role === 'user' ? '#2196F3' : '#4CAF50' }}>
                {msg.role}:
              </strong>{' '}
              <span style={{ 
                fontFamily: msg.role === 'assistant' ? 'monospace' : 'inherit',
                backgroundColor: msg.role === 'assistant' ? '#f5f5f5' : 'transparent',
                padding: msg.role === 'assistant' ? '4px' : '0',
                borderRadius: '4px'
              }}>
                {msg.content}
              </span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isLoading ? "Processing..." : "Enter calculation..."}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading ? '#ccc' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? '...' : 'Send'}
        </button>
        <button
          type="button"
          onClick={clear}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export const DemoApp: React.FC = () => {
  // Configuration - baseUrl is optional and will auto-detect
  const config = useMemo(() => ({
    // baseUrl: 'ws://localhost:8000', // Uncomment to override auto-detection
    clientId: 'demo-client',
    reconnectAttempts: 5,
    reconnectDelay: 1000,
    debounceMs: 300,
  }), []);

  return (
    <LeanPromptProvider config={config}>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>LeanPrompt Client Demo</h1>
        <p>This demo tests WebSocket communication with LeanPrompt server.</p>
        
        <ChatComponent
          path="/calc/add"
          title="Add Calculator"
          description="Enter addition problems like '5 + 3' or '10 + 15'"
        />
        
        <ChatComponent
          path="/calc/multiply"
          title="Multiply Calculator"
          description="Enter multiplication problems like '4 * 6' or '8 * 7'"
        />
        
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
          <h3>Instructions:</h3>
          <ol>
            <li>Make sure the LeanPrompt server is running on localhost:8000</li>
            <li>Try sending messages like "5 + 3" to the Add Calculator</li>
            <li>Try sending messages like "4 * 6" to the Multiply Calculator</li>
            <li>Each path maintains its own conversation context</li>
            <li>Messages are debounced per path to avoid spam</li>
          </ol>
        </div>
      </div>
    </LeanPromptProvider>
  );
};

export default DemoApp;