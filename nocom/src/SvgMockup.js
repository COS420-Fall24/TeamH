import React from 'react';

const Screen = (props) => {
    return (
      <div className="screen">
        <img src={MockupSvg} alt="UI Mockup" style={{ width: '100%', height: 'auto' }} />
        {props.children} {/* Render any other child components, like a login form */}
      </div>
    );
  };
  
  export default Screen;
  