import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Input from "./components/Input";
import LoginWidget from "./components/LoginWidget";
import Account from "./components/Account";
import Feedback from "./components/Feedback/Feedback";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AppRoutes = () => (
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
);

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
export { AppRoutes };
