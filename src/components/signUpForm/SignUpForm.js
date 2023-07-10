import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

import DropDownMenu from "./dropDownMenu/DropDownMenu";

import { signUp } from "../../utils/auth";

import eyeOff from "../../assets/icon_eye_off_fill.svg";
import eyeOn from "../../assets/icon_eye_on_fill.svg";

import "./SignUpForm.scss";

const SignUpForm = ({ handleFormSubmit }) => {
  const navigate = useNavigate();
  const passwordRef = useRef();

  const [emailID, setEmailID] = useState("");
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [YYYY, setYYYY] = useState("");
  const [MM, setMM] = useState("");
  const [DD, setDD] = useState("");

  const [passwordMessage, setPasswordMessage] = useState(
    "8~16자 영문 대 소문자, 숫자, 특수문자"
  );

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchingMessage, setMatchingMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const signUpData = {
        id: `${emailID}@${domain}`,
        password: passwordRef.current?.value,
      };

      const user = await signUp(signUpData.id, signUpData.password);

      if (user) {
        console.log(user);

        handleFormSubmit(signUpData);

        confetti({
          particleCount: 150,
          spread: 60,
        });

        alert("축하합니다! 회원가입에 성공했습니다. 로그인해주세요.");

        navigate("/login");
      } else {
        alert("이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.");
      } else {
        console.error(error);
        alert("API 요청 실패");
      }
    }
  };

  const onSelectDomain = (domain) => {
    setDomain(domain);
  };

  const onEmailChange = (e) => {
    setEmailID(e.target.value);
  };

  const passMessageStyle = () => {
    switch (passwordMessage) {
      case "사용가능한 비밀번호입니다.":
        return "successMessage";
      case "8~16자 영문 대 소문자, 숫자, 특수문자":
        return "defaultMessage";
      default:
        return "errorMessage";
    }
  };

  const matchMessageStyle = () => {
    if (matchingMessage === "비밀번호가 일치합니다.") {
      return "matchingMessage";
    } else if (matchingMessage === "비밀번호가 일치하지 않습니다.") {
      return "unMatchingMessage";
    } else {
      return "defaultMessage";
    }
  };

  const toggleEyeIcon = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const sanitizeInput = (event) => {
    const { value, className } = event.target;
    let maxLength;

    if (className === "signUpYear") {
      maxLength = 4;
    } else if (className === "signUpMonth" || className === "signUpDay") {
      maxLength = 2;
    } else {
      return;
    }

    const numberValue = value.replace(/[^0-9]/g, "");
    if (numberValue.length > maxLength) {
      event.target.value = numberValue.slice(0, maxLength);
    } else {
      event.target.value = numberValue;
    }
  };

  const validatePassword = (password) => {
    const passwordRegEx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    return passwordRegEx.test(password);
  };

  const onPasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);

    if (!validatePassword(password)) {
      setPasswordMessage("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요");
    } else {
      setPasswordMessage("사용가능한 비밀번호입니다.");
    }
  };

  const onConfirmChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);

    if (password !== confirmPassword) {
      setMatchingMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setMatchingMessage("");
    }
  };

  const isFormValid = () => {
    return (
      emailID !== "" &&
      domain !== "" &&
      password !== "" &&
      password === confirmPassword &&
      passwordMessage === "사용가능한 비밀번호입니다." &&
      YYYY !== "" &&
      MM !== "" &&
      DD !== ""
    );
  };

  const buttonContainerClass = isFormValid()
    ? "buttonContainer"
    : "buttonContainerDisabled";

  return (
    <>
      <div className="signUpInputContainer">
        <div className="signUpInputText">생년월일</div>
        <div className="signUpInput">
          <input
            className="signUpYear"
            placeholder="YYYY"
            type="text"
            value={YYYY}
            onChange={(e) => setYYYY(e.target.value)}
            onInput={sanitizeInput}
          />
          <input
            className="signUpMonth"
            placeholder="MM"
            type="text"
            value={MM}
            onChange={(e) => setMM(e.target.value)}
            onInput={sanitizeInput}
          />
          <input
            className="signUpDay"
            placeholder="DD"
            type="text"
            value={DD}
            onChange={(e) => setDD(e.target.value)}
            onInput={sanitizeInput}
          />
        </div>
      </div>

      <div className="signUpInputContainer">
        <div className="signUpInputText">이메일</div>
        <div className="signUpInput">
          <input
            className="signUpEmail"
            placeholder="이메일"
            value={emailID}
            onChange={onEmailChange}
          />
          <span>@</span>
          <DropDownMenu onSelectDomain={onSelectDomain} />
        </div>
      </div>

      <div className="signUpInputContainer">
        <div className="signUpInputText">비밀번호</div>
        <div className="signUpBoxColumn">
          <div className="passwordBox">
            <input
              className="signUpPassword"
              placeholder="비밀번호 입력"
              ref={passwordRef}
              type={showPassword.password ? "text" : "password"}
              value={password}
              onChange={onPasswordChange}
            />
            <img
              alt="eye check"
              className="inputPasswordImg"
              src={showPassword.password ? eyeOn : eyeOff}
              onClick={() => toggleEyeIcon("password")}
            />
          </div>
          <div className={passMessageStyle()}>{passwordMessage}</div>
          <div className="passwordBox">
            <input
              className="signUpPassword"
              placeholder="비밀번호 재입력"
              type={showPassword.confirmPassword ? "text" : "password"}
              onChange={onConfirmChange}
            />
            <img
              alt="eye check"
              className="inputPasswordImg"
              src={showPassword.confirmPassword ? eyeOn : eyeOff}
              onClick={() => toggleEyeIcon("confirmPassword")}
            />
          </div>
          <div className={matchMessageStyle()}>{matchingMessage}</div>
        </div>
      </div>

      <div
        className={buttonContainerClass}
        onClick={isFormValid() ? handleSignUp : undefined}
      >
        <button className="confirmButton" disabled={!isFormValid()}>
          가입하기
        </button>
      </div>
    </>
  );
};

export default SignUpForm;
