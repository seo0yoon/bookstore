import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

import SearchBar from "../main/searchBar/SearchBar";
import Logo from "../logo/Logo";
import SubMenu from "./subMenu/SubMenu";

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
      <SubMenu />
    </header>
  );
};

export default Header;
