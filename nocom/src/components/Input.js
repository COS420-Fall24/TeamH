import React from "react";
import "./Input.css";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

function Input() {
  const navigate = useNavigate();
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
    // Navigate to the Feedback/Explanations screen
    navigate("/feedback");
  }

  return (
    <div className="inputbox">
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            <InputBox name="Code" className="inp" />
          </label>
          <label>
            <InputBox name="Context" className="con" />
          </label>
        </div>
        <button type="submit" className="breakdown-button">
          BreakDown
        </button>
      </form>
    </div>
  );
}

export default Input;
