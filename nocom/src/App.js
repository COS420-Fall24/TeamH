import React from 'react';
import './App.css';
import Input from './Input';
import LoginWidget from './LoginWidget'; // Your existing login component
import Account from './Account'
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <div>
      <LoginWidget />
      <Account onClick={() => alert('Account button clicked!')} /> {/* Your login form or other content */}
      <Input/>
    </div>
    
  );
};

export default App;
