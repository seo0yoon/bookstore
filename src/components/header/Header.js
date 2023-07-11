import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

import Logo from "../logo/Logo";

import { BiSolidUser } from "react-icons/bi";
import { BsBagCheck } from "react-icons/bs";

import "./Header.scss";

const Header = () => {
  const [click, setClick] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const handleClick = () => {
    if (user) {
      logout();
    }
  };

  const scrollTo = (id) => {
    let element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <section className={`header ${click ? "active" : ""}`}>
      <nav className="navBar">
        <Logo />
        <span className="hamburgerMenu" onClick={() => setClick(!click)}>
          &nbsp;
        </span>
        <ul className="menu">
          <Link to={"booklist"}>
            <li className="menuItem">책 구매하기</li>
          </Link>
          <li className="menuItem">베스트셀러</li>
          <li className="menuItem">신상품</li>
          <li className="menuItem">인기도서</li>
          <li className="menuItem mobile">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <BiSolidUser className="userIcon" />
            )}
          </li>

          <ul className="userContainer">
            {user ? (
              <>
                <li className="userItem" onClick={handleClick}>
                  로그아웃
                </li>
                <Link to={"/orderhistory"} className="userItem">
                  <li>주문내역</li>
                </Link>
                <Link to={"/admin"} className="userItem">
                  <li>관리자페이지</li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className="userItem">
                  <li>로그인</li>
                </Link>
                <Link to={"/signup"} className="userItem">
                  <li>회원가입</li>
                </Link>
              </>
            )}
          </ul>
        </ul>

        <div className="desktop">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Link to={"/cart"} className="cartWrap">
                <BsBagCheck className="cartIcon" />
                {cart.length > 0 && (
                  <span className="cartQuantity">{cart.length}</span>
                )}
              </Link>

              {user ? (
                <BiSolidUser className="logoutUserIcon" />
              ) : (
                <BiSolidUser className="loginUserIcon" />
              )}
            </>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Header;
