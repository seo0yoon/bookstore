import React, { useState } from "react";

import LoginButton from "../../components/loginForm/loginButton/LoginButton";

import eyeOff from "../../assets/icon_eye_off_fill.svg";
import eyeOn from "../../assets/icon_eye_on_fill.svg";

import "./LoginForm.scss";

const LoginForm = ({
  id,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  error,
}) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onLogin();
    }
  };

  const toggleEyeIcon = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <section className="loginForm">
      <label htmlFor="userId" className="inputText">
        아이디
      </label>
      <input
        id="userId"
        className="input"
        placeholder="이메일을 입력해주세요."
        value={id}
        onChange={onEmailChange}
        onKeyPress={onKeyPress}
      />
      <label htmlFor="userPassword" className="inputText">
        비밀번호
      </label>
      <input
        id="userPassword"
        className="input"
        placeholder="비밀번호를 입력해주세요."
        type={showPassword.password ? "text" : "password"}
        value={password}
        onChange={onPasswordChange}
        onKeyPress={onKeyPress}
      />
      <img
        alt="eye check"
        className="inputPasswordImg"
        src={showPassword.password ? eyeOn : eyeOff}
        onClick={() => toggleEyeIcon("password")}
      />
      {error && <p className="errorMessage">{error}</p>}
      <LoginButton onLogin={onLogin} />
    </section>
  );
};

export default LoginForm;
