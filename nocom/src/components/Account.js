import React, { useState } from 'react';
import Modal from './Modal';
import './Account.css';

export default function Account() {

  const[modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  };


  return (
    <div>
    
    <button
    onClick={toggleModal}
    className="btn-modal">
      Open
    </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="account-dropdown">
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><button onClick ={() => setShowModal(true)}>Settings</button></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      )}
    {showModal && <Modal/>}
    </div>
  );
}