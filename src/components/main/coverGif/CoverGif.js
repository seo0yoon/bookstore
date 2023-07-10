import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "../../../assets/bg-shape.png";
import image2 from "../../../assets/home-one-img1.jpg";
import image3 from "../../../assets/home-one-img2.jpg";

import "./CoverGif.scss";

const CoverGif = () => {
  return (
    <div className="gif-container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <img src={image1} alt="111" />
        </div>
        <div>
          <img src={image2} alt="222" />
        </div>
        <div>
          <img src={image3} alt="333" />
        </div>
      </Carousel>
    </div>
  );
};

export default CoverGif;
