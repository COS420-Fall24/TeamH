import React from "react";
import { useLocation } from "react-router-dom";
import "./Feedback.css";
import InputBox from "../InputBox";

function Feedback() {
  const location = useLocation();
  const { response } = location.state || {};

  return (
    <div className="feedback">
      {/* Larger Grey Container with Side-by-Side Text Areas */}
      <div className="large-grey-container">
        <InputBox className="big-text-box" placeholder="Code" />
        <InputBox className="big-text-box" placeholder="Explanation" />
        <InputBox className="big-text-box" placeholder="Screen" />
      </div>
      {response && (
        <div className="output-container">
          <h2>Explanation</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Feedback;
