// src/components/OllamaChat.js
import React, { useState } from 'react';
import ollama from 'ollama';

const OllamaChat = () => {
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await ollama.chat({
      model: 'llama3.1',
      messages: [{ role: 'user', content: 'Why is the sky blue?' }],
    });
    setResponse(res.message.content);
  };

  return (
    <div>
      <button onClick={handleChat}>Ask Ollama</button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default OllamaChat;