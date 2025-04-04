// LoginPage.js

import React from "react";
import LoginForm from "./LoginForm";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-page-main">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
