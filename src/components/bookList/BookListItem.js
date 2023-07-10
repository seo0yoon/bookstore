import React, { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

import { BiSolidHeart } from "react-icons/bi";
import { BsCart2, BsShare } from "react-icons/bs";

import "./BookListItem.scss";

const BookListItem = ({ book }) => {
  const { addToCart } = useContext(CartContext);

  const [isOptionOpen, setIsOptionOpen] = useState(false);

  return (
    <div className="bookListItem">
      <div
        className="itemContents"
        onMouseOver={() => setIsOptionOpen(true)}
        onMouseOut={() => setIsOptionOpen(false)}
      >
        <div className="content">
          <img className="bookImg" src={book.imageURL} alt="" />
          <div className="badgeTop">sale</div>
          <div className="badgeBottom">-10%</div>
          <div
            className={`options ${isOptionOpen ? "openOption" : "closeOption"}`}
          >
            <ul className="lists">
              <li className="list">
                <div className="context">위시리스트에 추가</div>
                <BiSolidHeart className="icon" />
              </li>
              <li className="list">
                <div className="context">공유하기</div>
                <BsShare className="icon" />
              </li>
              <li className="list" onClick={() => addToCart(book)}>
                <div className="context">장바구니에 추가</div>
                <BsCart2 className="icon" />
              </li>
            </ul>
          </div>
        </div>
        <div className="bottomContext">
          <div className="bottomTitle">{book.title}</div>
          <div className="bottomPrice">
            <span className="prePrice">{book.price}</span>
            <span className="salePrice">{book.price}</span>
          </div>
        </div>
        <div className="bottomDetail">
          <span className="bottomAuthor">{book.author}</span>
          <span className="bottomPublicationDate">{book.publicationDate}</span>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
