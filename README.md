# LeanPrompt Client

A React client library for LeanPrompt WebSocket communication with state management via Zustand.

## Features

- WebSocket connection with automatic reconnection
- Path-based state management (context caching)
- Debounced message sending per path
- TypeScript support
- Zustand for state management
- Playwright E2E tests included

## Installation

```bash
npm install leanprompt-client
```

## Quick Start

```tsx
import React from 'react';
import { LeanPromptProvider, useLeanPrompt } from 'leanprompt-client';

const MyComponent = () => {
  const { messages, send, isLoading, isConnected } = useLeanPrompt('/calc/add');

  return (
    <div>
      <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
      <button onClick={() => send('5 + 3')} disabled={isLoading}>
        Send: 5 + 3
      </button>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LeanPromptProvider config={{
      // baseUrl is optional - will auto-detect from current page
      clientId: 'my-app'
    }}>
      <MyComponent />
    </LeanPromptProvider>
  );
};
```

## API Reference

### LeanPromptProvider

Wrap your app with this provider to enable LeanPrompt functionality.

```tsx
<LeanPromptProvider config={{
  // baseUrl: optional - auto-detects from current page (ws://host or wss://host)
  clientId: 'my-client',
  reconnectAttempts: 5,
  reconnectDelay: 1000,
  debounceMs: 300
}}>
  {/* Your app */}
</LeanPromptProvider>
```

#### Config Options

- `baseUrl`: WebSocket server URL (optional - auto-detects from current page protocol and host)
- `clientId`: Unique client identifier (auto-generated if not provided)
- `reconnectAttempts`: Number of reconnection attempts (default: 5)
- `reconnectDelay`: Delay between reconnections in ms (default: 1000)
- `debounceMs`: Debounce time for messages per path (default: 300)

**Auto-detection**: When `baseUrl` is not provided, the client automatically uses:
- `ws://current-host` for HTTP pages
- `wss://current-host` for HTTPS pages
- Falls back to `ws://localhost:3000` for server-side rendering

### useLeanPrompt Hook

The main hook for interacting with LeanPrompt.

```tsx
const {
  messages,           // Array of chat messages
  status,            // Current session status
  connectionStatus,  // WebSocket connection status
  isConnected,       // Boolean connection status
  isLoading,         // Loading state
  isStreaming,       // Currently streaming response
  error,             // Error message if any
  send,              // Function to send a message
  clear              // Function to clear session
} = useLeanPrompt('/calc/add');
```

## Message Structure

Each message has the following structure:

```typescript
interface LeanPromptMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}
```

## WebSocket Protocol

The client communicates with the LeanPrompt server using JSON messages:

### Send Message
```json
{
  "path": "/calc/add",
  "message": "5 + 3"
}
```

### Receive Response
```json
{
  "response": "{\"result\": 8}"
}
```

### Error Response
```json
{
  "error": "No route found for path: /unknown"
}
```

## Path-Based State Management

Each path maintains its own session state:

```tsx
const addChat = useLeanPrompt('/calc/add');
const multiplyChat = useLeanPrompt('/calc/multiply');

// These are completely separate conversations
addChat.send('5 + 3');
multiplyChat.send('4 * 6');
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Build library
npm run build
```

## Examples

See `src/demo.tsx` for a complete example that demonstrates:
- Multiple path-based conversations
- Real-time streaming
- Connection status
- Error handling
- Message debouncing