import React from "react";
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
    </div>
  );
}

export default Feedback;
