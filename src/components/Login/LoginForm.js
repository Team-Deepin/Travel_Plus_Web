// LoginForm.js

import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 관리자 아이디, 비번
    const correctId = "admin";
    const correctPw = "1234";

    if (id === correctId && pw === correctPw) {
      navigate("/content");
    } else {
      setError("ID 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="logo" className="login-logo" />

      <form onSubmit={handleLogin}>
        <h1 className="login-title">여행+</h1>

        <p className="login-subtitle">
          AI 추천 시스템을 활용한
          <br />
          국내 여행 플래너
        </p>

        <input
          type="text"
          placeholder="ID"
          className="login-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="login-input"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}

        <div className="login-button-container">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
