import React from 'react';
import './screen.css';

const Screen = (props) => {
  return (
    <div className="screen">
      {props.children} {/* Ensure this line is present to render children */}
    </div>
  );
};

export default Screen;
