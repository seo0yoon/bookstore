import React from "react";

import LoginButton from "../../components/loginForm/loginButton/LoginButton";

import "./LoginForm.scss";

const LoginForm = ({
  id,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  error,
}) => {
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      onLogin();
    }
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
        type="password"
        value={password}
        onChange={onPasswordChange}
        onKeyPress={onKeyPress}
      />
      {error && <p className="errorMessage">{error}</p>}
      <LoginButton onLogin={onLogin} />
    </section>
  );
};

export default LoginForm;
