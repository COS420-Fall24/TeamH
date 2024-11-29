import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Input from "./components/Input";
import LoginWidget from "./components/LoginWidget";
import Account from "./components/Account";
import Feedback from "./components/Feedback/Feedback";
import OllamaChat from "./components/OllamaChat"; // Import the new component
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login screen route */}
        <Route path="/" element={<LoginWidget />} />
        {/* Main app route */}
        <Route
          path="/app"
          element={
            <div>
              <Account />
              <Input />
              <OllamaChat /> {/* Add the new component here */}
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
