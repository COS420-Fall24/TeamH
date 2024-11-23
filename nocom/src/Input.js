import React from 'react';
import './Input.css';
import InputBox from './InputBox';

function Input(){
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    //remove later
    console.log(formJson);
  }

  return(
    <div className='inputbox'>
      <form method="post" onSubmit={handleSubmit}>
      <div>
      <label className='inp'>
        <InputBox name="Code"/>
      </label>
      <label className='con'>
        <InputBox name="Context"/>
      </label>
      </div>
      <button type="submit">BreakDown</button>
      </form>
    </div>
  )
}

export default Input;