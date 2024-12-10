import React, { useState } from 'react';
import './Account.css';

export default function Account() {

  const[modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  };


  return (
    <>
    
    <button
    onClick={toggleModal}
    className="btn-modal">
      Open
    </button>

    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Account Settings</h2>
        <p>Hello World</p>
      </div>
    </div>
    </>
  );
}