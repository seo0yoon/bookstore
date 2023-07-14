import React from "react";

import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.png";

import "./MainBanner.scss";

const Banner = () => {
  return (
    <section className="banner">
      <figure className="bannerContainer">
        <img className="bannerImg" src={banner1} alt="banner left" />
      </figure>

      <figure className="bannerContainer">
        <img className="bannerImg" src={banner2} alt="banner right" />
      </figure>
    </section>
  );
};

export default Banner;
