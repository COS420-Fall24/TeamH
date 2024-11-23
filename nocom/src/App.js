import React from 'react';
import './App.css';
import Input from './Input';
import LoginWidget from './LoginWidget'; // Your existing login component
import Account from './Account'; // Updated Account component
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <div>
      <LoginWidget />
      <Account /> {/* Account now handles its own interactions (dropdown or modal) */}
      <Input />
    </div>
  );
};

export default App;
