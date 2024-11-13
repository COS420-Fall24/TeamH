import React from 'react';
import './App.css';
import InputBox from './InputBox';
import LoginWidget from './LoginWidget'; // Your existing login component

const App = () => {
  return (
    <div>
      <LoginWidget /> {/* Your login form or other content */}
      <div className='inputbox inp'>
        <InputBox className='inp'/>
      </div>
      <div className='inputbox con'>
        <InputBox className='con'/>
      </div>
    </div>
  );
};

export default App;
