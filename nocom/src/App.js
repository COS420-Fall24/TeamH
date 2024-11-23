import React from 'react';
import './App.css';
import Input from './Input';
import LoginWidget from './LoginWidget'; // Your existing login component
import Account from './Account';
const App = () => {
  return (
    <div>
      <LoginWidget /> {/* Your login form or other content */}
      <Input/>
    </div>
  );
};

export default App;
