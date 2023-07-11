import React from "react";

import BestSellersItem from "./bestSellersItem/BestSellersItem";

import "./MainBestSellers.scss";

const MainBestSellers = ({ bestseller }) => {
  return (
    <div className="mainBestSellers">
      <div className="mainBestSellersTitle">
        <h2 className="mainTitle">이번주 베스트셀러</h2>
      </div>

      <div className="items">
        {bestseller.map((book) => (
          <BestSellersItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default MainBestSellers;
