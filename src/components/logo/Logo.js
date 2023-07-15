import React from "react";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import "./Logo.scss";

const Logo = () => {
  return (
    <h1 className="logoText">
      <Link to="/">
        <img className="logoImg" src={logo} alt="logo" />
      </Link>
    </h1>
  );
};

export default Logo;
