import React, { useState } from 'react';
import "./InputBox.css"

function InputBox(props) {
  const [value, setValue] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      let i = cursorPosition
      while(value[i-1] != '\n' && i-1>=0){
        i--
      }
      const newValue = `${value.substring(0, i)}\t${value.substring(i)}`;
      setValue(newValue);
      setTimeout(function(){ e.target.selectionStart = e.target.selectionEnd = cursorPosition+1; }, 0);
    }
  };
  return (
    <textarea name={props.name} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
  );
}
export default InputBox;