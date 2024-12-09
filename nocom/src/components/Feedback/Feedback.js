import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Feedback.css";
import InputBox from "../InputBox";

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
      {/* Larger Grey Container with Side-by-Side Text Areas */}
      <div className="large-grey-container">
          <InputBox className="big-text-box" value={code}/>
          <InputBox className="big-text-box" value={explanation} />
          <InputBox className="big-text-box" placeholder="Screen" />
      </div>
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>
    </div>
  );
}

export default Feedback;
