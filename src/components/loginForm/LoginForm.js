import LoginButton from "../../components/loginForm/loginButton/LoginButton";
import React from "react";

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
    <div className="inputBox">
      <div className="inputText">아이디</div>
      <input
        className="input"
        placeholder="이메일을 입력해주세요."
        value={id}
        onChange={onEmailChange}
        onKeyPress={onKeyPress}
      />
      <div className="inputText">비밀번호</div>
      <input
        className="input"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={password}
        onChange={onPasswordChange}
        onKeyPress={onKeyPress}
      />
      <div className="errorMessage">{error}</div>
      <LoginButton onLogin={onLogin} />
    </div>
  );
};

export default LoginForm;
