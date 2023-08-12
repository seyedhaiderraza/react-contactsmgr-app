import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      const token = response.data.authentication_token;
      localStorage.setItem("authToken", token); // Save token to localStorage
      navigate("/"); // Redirect to the contacts list page
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="ui main">
      <h2 style={{ marginTop: "50px" }}>Please Login</h2>
      <form onSubmit={handleLogin} className="ui form">
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
