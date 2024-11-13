import React, { useState } from 'react';
import "./InputBox"

function InputBox() {
  const [value, setValue] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const newValue = value.substring(0, cursorPosition) + '\t' + value.substring(cursorPosition);
      setValue(newValue);
      e.target.selectionStart = e.target.selectionEnd = cursorPosition + 1;
    }
  };
  return (
    <div>
    <textarea value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  );
}
export default InputBox;