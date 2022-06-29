import axios from "axios";
import React, { useState } from "react";

function ForgotPassword() {
  const [emailId, setemail] = useState("");

  function handleClick(e) {
    e.preventDefault();

    axios
      .put(
        "http://localhost:8000/api/forgotpassword",
        { emailId: emailId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("succfully sent email", res);
        e.target.disabled = true;
      })
      .catch((err) => {
        console.log("Error while sending email", err);
      });
  }
  return (
    <div>
      ForgotPassword
      <label htmlFor="">Enter your email</label>
      <input
        type="text"
        value={emailId}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <p>Reset Link has been sent your email</p>
      <button onClick={handleClick}>Go to emial</button>
    </div>
  );
}

export default ForgotPassword;
