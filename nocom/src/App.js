import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Input from "./components/Input";
import LoginWidget from "./components/LoginWidget";
import Account from "./components/Account";
import Feedback from "./components/Feedback/Feedback";
import "@fortawesome/fontawesome-free/css/all.min.css";

<<<<<<< HEAD
const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Account />
    <main>{children}</main>
  </div>
);

=======
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login screen route */}
        <Route path="/" element={<LoginWidget />} />
<<<<<<< HEAD

=======
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
        {/* Main app route */}
        <Route
          path="/app"
          element={
<<<<<<< HEAD
            <AppLayout>
              <Input />
            </AppLayout>
=======
            <div>
              <Account />
              <Input />
            </div>
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
          }
        />

        {/* Feedback/Explanations screen route */}
        <Route
          path="/feedback"
          element={
<<<<<<< HEAD
            <AppLayout>
              <Feedback />
            </AppLayout>
=======
            <div>
              <Account />
              <Feedback />
            </div>
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
