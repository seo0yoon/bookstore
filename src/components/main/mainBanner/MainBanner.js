import React from "react";

import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.png";

import "./MainBanner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <div className="bannerContainer">
        <img className="baanerImg" src={banner1} alt="banner left" />
      </div>

      <div className="bannerContainer">
        <img className="baanerImg" src={banner2} alt="banner right" />
      </div>
    </div>
  );
};

export default Banner;
