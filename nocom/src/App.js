import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Input from './components/Input';
import LoginWidget from './components/LoginWidget';
import Account from './components/Account';
import Feedback from './components/Feedback/Feedback'; // Import the new Feedback screen
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Input screen route */}
        <Route
          path="/"
          element={
            <div>
              <LoginWidget />
              <Account />
              <Input />
            </div>
          }
        />

        {/* Feedback/Explanations screen route */}
        <Route
          path="/feedback"
          element={
            <div>
              <Account />
              <Feedback />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
