import React, { useState } from "react";
import "./Account.css";

function Account() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="account-container">
      <button className="Account" onClick={toggleDropdown}>
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
          </ul>
        </div>
      )}
    </div>
  );
}
export default Account;
