<<<<<<< HEAD
import React, { useState } from "react";
import "./Account.css";
=======
import React, { useState } from 'react';
import './Account.css';
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188

function Account() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
<<<<<<< HEAD
    setIsOpen(!isOpen);
  };
  return (
    <div className="account-container">
      <button className="Account" onClick={toggleDropdown} aria-label="Account">
        Account
      </button>
      {isOpen && (
        <div className="account-dropdown">
          <ul>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
=======
    setIsOpen(!isOpen); // Toggle the dropdown visibility
  };

  return (
    <div className="account-container">
      {/* Account Button */}
      <button className="Account" onClick={toggleDropdown}>
        <i className="fas fa-user-circle"></i>
        Account
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="account-dropdown">
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
          </ul>
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 0035beb419e070be2a5c9e4029e7733c2801d188
export default Account;
