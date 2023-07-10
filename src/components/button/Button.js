import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button = ({ text, link, handleClick }) => {
  return (
    <Link to={link} aria-label={text}>
      <button className="btn" onClick={handleClick}>
        {text}
      </button>
    </Link>
  );
};

export default Button;
