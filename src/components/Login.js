import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { contactsContext } from "../context/ContactsContext";

const Login = () => {
  const { errorMessage, authenticationToken, loginHandler } =
    useContext(contactsContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //loginHandler(email, password);wrong its a call so everytime called on comp render

  return errorMessage.includes("invalid Login credentials") ? (
    <>
      <div className="ui main" style={{ marginTop: "5rem" }}>
        <h2 style={{ color: "black" }}>
          Invalid Login Credentials Please retry
        </h2>
        <Link
          to="/login"
          className="ui button red"
          onClick={() => {
            errorMessage = "";
          }}
        >
          Retry Login
        </Link>
      </div>
    </>
  ) : authenticationToken ? (
    <>
      <div className="ui main" style={{ marginTop: "5rem" }}>
        Already Loggedin please continue
      </div>
      <Link to="/" className="ui button green">
        Contacts List
      </Link>
      <Link to="/add" className="ui button blue">
        Add Contact
      </Link>
    </>
  ) : (
    <div className="ui main">
      <h2 style={{ marginTop: "50px" }}>Please Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginHandler(email, password);
        }}
        className="ui form"
      >
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
        <button className="ui button blue">Login</button>
        <Link to="/register" className="ui button">
          Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
