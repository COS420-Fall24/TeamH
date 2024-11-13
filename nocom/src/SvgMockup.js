import React from 'react';
import ScreenSvg from './Screen.svg'; // Ensure the path is correct

const SvgMockup = () => {
  return (
    <div>
      <img src={ScreenSvg} alt="UI Mockup" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default SvgMockup;
