import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Input from "./components/Input";
import LoginWidget from "./components/LoginWidget";
import Account from "./components/Account";
import Feedback from "./components/Feedback/Feedback";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Account />
    <main>{children}</main>
  </div>
);

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
            <AppLayout>
              <Input />
            </AppLayout>
          }
        />

        {/* Feedback/Explanations screen route */}
        <Route
          path="/feedback"
          element={
            <AppLayout>
              <Feedback />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
