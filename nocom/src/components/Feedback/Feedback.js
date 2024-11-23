import React from 'react';
import './Feedback.css';

function Feedback() {
  return (
    <div className="feedback">
    

      {/* Larger Grey Container with Side-by-Side Text Areas */}
      <div className="large-grey-container">
        <textarea className="big-text-box" placeholder="Code"></textarea>
        <textarea className="big-text-box" placeholder="Explanations"></textarea>
        <textarea className="big-text-box" placeholder="Screen"></textarea>
      </div>
    </div>
  );
}

export default Feedback;