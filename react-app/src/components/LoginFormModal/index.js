import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";

    const data = await dispatch(login(demoEmail, demoPassword));

    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  return (
    <>
    <div className="outerform">
    <div className="mainform">
      <h1 className="login">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
        <label className="email">
          Email
          <input className="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="login-demo">
        <div className="login-div">
        <button className="login-btn" type="submit">Log In</button>
        </div>
        <div className="demodiv">
      <button className="demouser" onClick={handleDemoLogin}>Demo User</button>
    </div>
    </div>
      </form>
      </div>
      </div>
    </>
  );
}

export default LoginFormModal;
