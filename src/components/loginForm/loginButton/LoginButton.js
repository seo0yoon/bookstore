import { useNavigate } from "react-router-dom";
import React from "react";

import "./LoginButton.scss";

const Button = ({ onLogin }) => {
  const navigate = useNavigate();

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <div className="buttonBox">
      <button className="loginBtn" onClick={onLogin}>
        로그인하기
      </button>
      <button className="signUpBtn" onClick={goToSignUpPage}>
        이메일로 가입하기
      </button>
    </div>
  );
};

export default Button;
