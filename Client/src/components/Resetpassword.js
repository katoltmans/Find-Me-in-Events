import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Resetpassword() {
  const { token } = useParams();
  const [newPassword, setNewpass] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  console.log("token", token);
  const navigate = useNavigate();

  const handlereset = (e) => {
    e.preventDefault();
    const obj = { token, newPassword, confirmNewPassword };
    console.log("obj", obj);
    axios
      .put("http://localhost:8000/api/resetpassword", obj, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("succfully Changed Password", res);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error while Changing the password", err);
      });
  };
  return (
    <div>
      <label htmlFor="">Enter New Password</label>
      <input
        type="text"
        value={newPassword}
        onChange={(e) => setNewpass(e.target.value)}
      />
      <label htmlFor="">Confirm New Password</label>
      <input
        type="text"
        value={confirmNewPassword}
        onChange={(e) => setconfirmNewPassword(e.target.value)}
      />
      <button onClick={handlereset}>ResetPASSWORD</button>
    </div>
  );
}

export default Resetpassword;
