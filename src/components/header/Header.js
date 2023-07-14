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
    <header className={`header ${click ? "active" : ""}`}>
      <nav className="hearderContainer">
        <ul className="userInfoContainer">
          {user ? (
            <>
              <li className="userInfoItem" onClick={handleClick}>
                로그아웃
              </li>
              <Link to={"/orderhistory"} className="userInfoItem">
                <li>주문내역</li>
              </Link>
              <Link to={"/admin"} className="userInfoItem">
                <li>관리자페이지</li>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"} className="userInfoItem">
                <li>로그인</li>
              </Link>
              <Link to={"/signup"} className="userInfoItem">
                <li>회원가입</li>
              </Link>
            </>
          )}
        </ul>
        <Logo />
        <button
          className="mobileHamburgerMenu"
          onClick={() => setClick(!click)}
        >
          &nbsp;
        </button>
        <SearchBar />
        <div className="desktopMenu">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <section>
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
            </section>
          )}
        </div>
      </nav>

      <nav className="headerMenu">
        <ul>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
