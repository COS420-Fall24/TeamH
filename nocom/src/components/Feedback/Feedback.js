import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Feedback.css";
import InputBox from "../InputBox";
import { OpenAI } from "openai";

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { code, explanation, chat, links } = location.state || {};

  if (!code && !explanation && !links) {
    return (
      <div className="feedback">
        <p>No feedback data available. Please go back and provide input.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  // Parse links into an array of { text, url }
  const parseLinks = (links) => {
    return links
      .split("\n")
      .map((line) => {
        const match = line.match(/\[(.*?)\]\((.*?)\)/); // Match markdown-style links
        if (match) {
          return { text: match[1], url: match[2] };
        }
        return null; // Exclude lines without links
      })
      .filter(Boolean); // Remove null entries
  };

  const parsedLinks = links !== "No links provided" ? parseLinks(links) : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { Code, Explination, Chat } = formJson;
    if (!Code.trim()) {
      setError("Chat input cannot be empty.");
      return;
    }

    try {
      setError(null);
      let apikey = prompt("Enter OpenAI API key:");

      const openai = new OpenAI({
        apiKey: apikey,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a coding expert who provides clear explanations",
          },
          {
            role: "user",
            content: `You have previoulsy given this explination to user:
            ${Explination},
            Based on this Code:
            ${Code},
            This is your previous chat history with the user:
            ${chat}
            Please anwser this question user newest question:
            ${Chat}`,
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

      const newchat = chat + "\n\n"+ Chat + "\n\n" + aiResponse.replace(linksRegex, "").trim();

      navigate("/feedback", {
        state: {
          code: Code,
          explanation: Explination || "No explanation provided",
          chat: newchat,
          links: links || "No links provided",
        },  
      });
      window.location.reload();
    } catch (error) {
      console.error("OpenAI API Error:", error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="feedback">
      <form method="post" onSubmit={handleSubmit} aria-label="feedback form">
      <div className="large-grey-container">
        <label className="big-text-box" >
          <InputBox name="Code" className="big-text-box" value={code}/>
        </label>
        <label className="big-text-box" >
          <InputBox name="Explination" className="big-text-box" value={explanation} />
        </label>
        <label className="big-text-box" >
          <InputBox name="Chat" className="big-text-box" placeholder={chat} />
        </label>
      </div>
        <button type="submit" className="back-button">
          Re-Explain
        </button>
      </form>
      {error && <div className="error" data-testid="error-message">{error}</div>}
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>
      {parsedLinks.map((link, index) => (
        <a key={index} href={link.url}>{link.text}</a>
      ))}
    </div>
  );
}

export default Feedback;
