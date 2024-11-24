import React, { useState } from 'react';
import "./InputBox.css"

function InputBox(props) {
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
    <textarea name={props.name} onKeyDown={handleKeyDown} />
  );
}
export default InputBox;