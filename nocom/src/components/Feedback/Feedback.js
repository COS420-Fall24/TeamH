import React from "react";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";
import "./Feedback.css";

function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { code, explanation, links } = location.state || {};

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

  return (
    <div className="feedback">
      <h1>Feedback</h1>
      <div className="large-grey-container">
        {/* Code Section */}
        <div className="scrollable-box">
          <h2>Code</h2>
          <pre>{code || "No code provided"}</pre>
        </div>

        {/* Explanation Section */}
        <div className="scrollable-box">
          <h2>Explanation</h2>
          <pre>{explanation || "No explanation provided"}</pre>
        </div>

        {/* Links Section */}
        <div className="scrollable-box links-box">
          <h2>Links</h2>
          {parsedLinks.length > 0 ? (
            <ul>
              {parsedLinks.map((link, index) => (
                <li key={index}>
                  {link.text}:{" "}
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No links provided</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>
=======
import "./Feedback.css";
import InputBox from "../InputBox";

function Feedback() {
  return (
    <div className="feedback">
      {/* Larger Grey Container with Side-by-Side Text Areas */}
      <div className="large-grey-container">
        <InputBox className="big-text-box" placeholder="Code" />
        <InputBox className="big-text-box" placeholder="Explanation" />
        <InputBox className="big-text-box" placeholder="Screen" />
      </div>
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
    </div>
  );
}

export default Feedback;
