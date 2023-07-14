import React from "react";

import mainImg from "../../../assets/123123.png";

import "./MainOffers.scss";

const MainOffers = () => {
  return (
    <main className="mainSection">
      <section className="mainContainer">
        <figure className="box">
          <img className="mainImage" src={mainImg} alt="mainbook" />
        </figure>
        <div className="box">
          <h2 className="boxTitle">
            "독서를 즐기는 모든 분들을 위한 특별한 혜택! 지금 놓치지 마세요!"
          </h2>
          <p className="boxSubTitle">
            관심있는 분야에 대한 지식을 확장할 수 있는 기회를 잡아보세요. 당신의
            독서 시간을 더욱 풍성하게 만들어줄 최고의 거래를 이제 만나보실 수
            있습니다. 어서 확인해보세요!
          </p>
        </div>
      </section>
    </main>
  );
};

export default MainOffers;
