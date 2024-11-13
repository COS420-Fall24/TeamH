import React from 'react';
import './App.css';
import InputBox from './InputBox';
import SvgMockup from './SvgMockup'; // Ensure this path matches the location of SvgMockup.js
import LoginWidget from './LoginWidget'; // Your existing login component

const App = () => {
  return (
    <div>
      <SvgMockup /> {/* Displays the Screen.svg */}
      <LoginWidget /> {/* Your login form or other content */}
    </div>
  );
};

export default App;
