import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginWidget.css';

const LoginWidget = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login logic
    if (email === 'admin@example.com' && password === 'password') {
      console.log(1)
      navigate('/app'); // Navigate to the main app after login
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-widget">
      <h1 className="app-title">NoCom</h1> {/* App Title */}
        
      <h2>Please Login below!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">q
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="Login">Submit</button>
      </form>
    </div>
  );
};

export default LoginWidget;
