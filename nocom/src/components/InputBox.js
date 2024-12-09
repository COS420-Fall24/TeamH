import React, { useState } from "react";
import "./InputBox.css";

function InputBox(props) {
  const [value, setValue] = useState(props.value);
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      let value = e.target.value;
      const cursorPosition = e.target.selectionStart;
      let i = cursorPosition;
      while (value[i - 1] != "\n" && i - 1 >= 0) {
        i--;
      }
      const newValue = `${value.substring(0, i)}\t${value.substring(i)}`;
      setValue(newValue);
      setTimeout(function () {
        e.target.selectionStart = e.target.selectionEnd = cursorPosition + 1;
      }, 0);
    }
  };
  return (
    <textarea
      value={value}
      name={props.name}
      className={props.className}
      placeholder={props.placeholder}
      onKeyDown={handleKeyDown}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
export default InputBox;
