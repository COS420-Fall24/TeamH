import React from 'react';
import './Account.css'; // Import the styles for the Account button

function Account({ onClick }) {
  return (
    <button className="Account" onClick={onClick} aria-label="Account Button">
      <i className="fas fa-user-circle" style={{ marginRight: '8px' }}></i>
      Account
    </button>
  );
}

export default Account;
