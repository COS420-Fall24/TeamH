import React, { useState } from 'react';
import './LoginWidget.css'; // Optional if you have a CSS file for styling

const LoginWidget = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="login-widget">
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
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
                <button type="submit">Submit</button>
            </form>

            {submitted && (
                <div className="output-container">
                    <h3>Your Input:</h3>
                    <p>Email: {email}</p>
                    <p>Password: {password}</p>
                </div>
            )}
        </div>
    );
};

export default LoginWidget;
