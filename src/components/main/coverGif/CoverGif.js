import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "../../../assets/1.jpg";
import image2 from "../../../assets/2.jpg";
import image3 from "../../../assets/3.jpg";

import "./CoverGif.scss";

const CoverGif = () => {
  return (
    <div className="gifContainer">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <img className="coverImg" src={image1} alt="main" />
        </div>
        <div>
          <img className="coverImg" src={image2} alt="main" />
        </div>
        <div>
          <img className="coverImg" src={image3} alt="main" />
        </div>
      </Carousel>
    </div>
  );
};

export default CoverGif;
