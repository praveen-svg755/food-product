// src/components/Login.js
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Login = () => {
  return (
    <div className="login-page-container">
      <h2>Login / Sign In</h2>
      <p>This is a placeholder login page.</p>
      <Link to="/" className="back-button">
        Back to Home
      </Link>
    </div>
  );
};

export default Login;