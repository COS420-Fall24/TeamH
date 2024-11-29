import React, { useState } from "react";
import "./Input.css";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import ollama from 'ollama/browser'; // Import the browser module

function Input() {
  const navigate = useNavigate();
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const { Code, Context } = formJson;

    try {
      // Call the Ollama API
      const res = await ollama.chat({
        model: 'llama3.2', // Ensure this model name is correct or update it
        messages: [{ role: 'user', content: `Explain the following code as a tutor at MIT:\n\nContext: ${Context}\n\nCode:\n${Code}` }],
      });
      setResponse(res.message.content);

      // Navigate to the Feedback/Explanations screen with state
      navigate("/feedback", { state: { response: res.message.content } });
    } catch (error) {
      console.error("Error calling Ollama API:", error);
      alert("Error calling Ollama API. Please ensure the model name is correct and try again.");
    }
  };

  return (
    <div className="inputbox">
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            <InputBox name="Code" className="inp" />
          </label>
          <label>
            <InputBox name="Context" className="con" />
          </label>
        </div>
        <button type="submit" className="breakdown-button">
          BreakDown
        </button>
      </form>
      {response && <div className="output-container"><p>{response}</p></div>}
    </div>
  );
}

export default Input;
