import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { contactsContext } from "../context/ContactsContext";
const Register = () => {
  const {
    authenticationToken,
    isRegistered,
    setisRegistered,
    registerHandler,
  } = useContext(contactsContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    registerHandler({ username, email, password });
  };

  useEffect(() => {
    setisRegistered(false);
  }, []);
  return isRegistered || authenticationToken ? (
    <>
      <div className="ui main" style={{ marginTop: "50px" }}>
        You are registered please login to continue
        <Link to="/login">
          <button className="ui button blue">Login</button>
        </Link>
      </div>
    </>
  ) : (
    <div className="ui main">
      <h2 style={{ marginTop: "50px" }}>Please Register</h2>
      <form onSubmit={handleRegister} className="ui form">
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="ui button blue">Register</button>
        <Link to="/login" className="ui button">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
