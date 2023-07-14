import React from "react";
import BestsellerListItem from "../../bestsellerList/BestsellerListItem";

import "./MainBestSellers.scss";

const MainBestSellers = ({ bestseller }) => {
  return (
    <div className="mainBestSellers">
      <div className="mainBestSellersTitle">
        <h2 className="mainTitle">이번주 베스트셀러</h2>
      </div>

      <div className="bookItems">
        {bestseller.map((book) => (
          <BestsellerListItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default MainBestSellers;
