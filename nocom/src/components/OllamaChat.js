// src/components/OllamaChat.js
import React, { useState } from 'react';
import ollama from 'ollama/browser'; // Import the browser module

const OllamaChat = () => {
  const [code, setCode] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState('');

  const handleChat = async () => {
    const res = await ollama.chat({
      model: 'llama3.1',
      messages: [{ role: 'user', content: `You are an application designed for Helping beginner programmers learn to read code.:\n\nThe context provided by the user is: ${context}\n\The code is:\n${code}` }],
    });
    setResponse(res.message.content);
  };

  return (
    <div>
      <h2>Code Explanation</h2>
      <div>
        <label>Context:</label>
        <textarea value={context} onChange={(e) => setContext(e.target.value)} />
      </div>
      <div>
        <label>Code:</label>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      </div>
      <button onClick={handleChat}>Ask Ollama</button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default OllamaChat;