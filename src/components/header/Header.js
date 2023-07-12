import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

import SearchBar from "../main/searchBar/SearchBar";
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

  return (
    <section className={`header ${click ? "active" : ""}`}>
      <nav className="navBar">
        <Logo />
        <span className="hamburgerMenu" onClick={() => setClick(!click)}>
          &nbsp;
        </span>

        <SearchBar />

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

      <ul className="menu">
        <li className="menuItem">
          <Link to={{ pathname: "/booklist", search: "?tab=all" }}>
            전체보기
          </Link>
        </li>
        <li className="menuItem">
          <Link to={{ pathname: "/booklist", search: "?tab=bestseller" }}>
            베스트셀러
          </Link>
        </li>
        <li className="menuItem">
          <Link to={{ pathname: "/booklist", search: "?tab=newbooks" }}>
            신상품
          </Link>
        </li>
        <li className="menuItem">
          <Link to={{ pathname: "/booklist", search: "?tab=newbooks" }}>
            신상품
          </Link>
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
    </section>
  );
};

export default Header;
