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

    // Log form data
    console.log("Form Data:", formData);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log("Form JSON:", formJson);

    const { Code, Context } = formJson;

    // Log extracted values
    console.log("Code:", Code);
    console.log("Context:", Context);

    // Call the Ollama API
    const res = await ollama.chat({
      model: 'llama3.2', // Ensure this model name is correct or update it
      messages: [{ role: 'user', content: `You are an application designed for Helping beginner programmers learn to read code.:\n\nThe context provided by the user is: ${Context}\n\The code is:\n${Code}` }],
    });

    // Log API response
    console.log("API Response:", res);

    setResponse(res.message.content);

    // Navigate to the Feedback/Explanations screen with state
    navigate("/feedback", { state: { response: res.message.content } });
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
