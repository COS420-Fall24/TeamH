import React, { useState } from 'react';
import './Account.css';

function Account() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
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
          </ul>
        </div>
      )}
    </div>
  );
}

export default Account;
