import React from 'react';
import './Feedback.css';

function Feedback() {
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      let value = e.target.value
      const cursorPosition = e.target.selectionStart;
      let i = cursorPosition
      while(value[i-1] != '\n' && i-1>=0){
        i--
      }
      const newValue = `${value.substring(0, i)}\t${value.substring(i)}`;
      e.target.value= newValue
      setTimeout(function(){ e.target.selectionStart = e.target.selectionEnd = cursorPosition+1; }, 0);
    }
  };
  return (
    <div className="feedback">
    

      {/* Larger Grey Container with Side-by-Side Text Areas */}
      <div className="large-grey-container">
        <textarea className="big-text-box" placeholder="Code" onKeyDown={handleKeyDown}></textarea>
        <textarea className="big-text-box" placeholder="Explanations" onKeyDown={handleKeyDown}></textarea>
        <textarea className="big-text-box" placeholder="Screen" onKeyDown={handleKeyDown}></textarea>
      </div>
    </div>
  );
}

export default Feedback;