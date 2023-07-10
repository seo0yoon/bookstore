import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/loading/Loading";
import LoginForm from "../../components/loginForm/LoginForm";
import { signIn } from "../../utils/auth";

import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedId = getStoredId();
    if (savedId) {
      setId(savedId);
    }
  }, []);

  const validateId = (id) => {
    const idRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return idRegex.test(id);
  };

  const onLogin = async () => {
    if (id.length === 0) {
      return setError("이메일을 입력해주세요.");
    }

    if (!id || !validateId(id)) {
      return setError("이메일 형식이 맞지 않습니다.");
    }

    if (!password) {
      return setError("비밀번호를 입력해주세요.");
    }

    setLoading(true);

    try {
      const user = await signIn(id, password);

      if (user) {
        storeId(id);
        navigate("/");
        console.log("로그인 성공");
      } else {
        setError("이메일과 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("등록되지 않은 이메일입니다. 확인 후 다시 시도해주세요.");
      } else if (error.code === "auth/wrong-password") {
        setError("비밀번호가 일치하지 않습니다. 확인 후 다시 시도해주세요.");
      } else {
        console.error(error);
        alert("API 요청 실패");
      }
    } finally {
      setLoading(false);
    }
  };

  const storeId = (id) => {
    localStorage.setItem("savedId", id);
  };

  const getStoredId = () => {
    return localStorage.getItem("savedId");
  };

  return (
    <main className="loginSection">
      <div className="loginContainer">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="textBox">
              <div className="text">로그인</div>
            </div>
            <LoginForm
              error={error}
              id={id}
              password={password}
              onEmailChange={(e) => setId(e.target.value)}
              onLogin={onLogin}
              onPasswordChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Login;
