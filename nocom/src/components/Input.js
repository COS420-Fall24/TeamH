import React, { useState } from "react";
import "./Input.css";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import OpenAI from "openai";

function Input() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { Code, Context } = formJson;

    if (!Code.trim()) {
      setError("Code input cannot be empty.");
      return;
    }

    try {
      setError(null);

      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        throw new Error("OpenAI API key is not configured");
      }

      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a coding expert who provides clear explanations and suggests relevant links for further learning.",
          },
          {
            role: "user",
            content: `Please analyze this code and:
1. Break it down into logical sections.
2. Explain what each section does.
3. Highlight any important programming concepts.
4. Provide a summary of the overall functionality.
5. Suggest relevant links for further reading.

Code to analyze:
${Code}

Additional context:
${Context}

Please format the response with clear headings, and place the links under a separate heading "Suggested Links".`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const aiResponse = completion.choices[0].message.content;

      // Split response into explanation and links
      const linksRegex = /### Suggested Links:[\s\S]*$/;
      const linksMatch = aiResponse.match(linksRegex);

      const links = linksMatch
        ? linksMatch[0].replace("### Suggested Links:", "").trim()
        : "No links provided";

      const explanation = aiResponse.replace(linksRegex, "").trim();

      navigate("/feedback", {
        state: {
          code: Code,
          context: Context,
          explanation: explanation || "No explanation provided",
          links: links || "No links provided",
        },
      });
    } catch (error) {
      console.error("OpenAI API Error:", error);
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="inputbox">
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            <InputBox name="Code" className="inp" placeholder="Enter your code here" />
          </label>
          <label>
            <InputBox name="Context" className="con" placeholder="Enter additional context here" />
          </label>
        </div>
        <button type="submit" className="breakdown-button">
          BreakDown
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Input;
