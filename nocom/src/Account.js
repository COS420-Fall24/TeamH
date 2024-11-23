import React from 'react';
import './InputBox.css';

function InputBox({ className, onClick }) {
  const defaultProps = {
    image: 'https://assets.api.uizard.io/api/cdn/stream/9b130954-67eb-43a8-bd9b-2ef2890b017f.png',
  };

  return (
    <button
      className={`InputBox ${className}`} // Apply the passed className
      onClick={onClick} // Handle clicks
      style={{
        backgroundImage: `url(${defaultProps.image})`,
        cursor: 'pointer', // Ensure it looks clickable
      }}
    />
  );
}

export default InputBox;
