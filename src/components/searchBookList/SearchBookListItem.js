import React, { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

import { BiSolidHeart } from "react-icons/bi";
import { BsShare } from "react-icons/bs";

import CartModal from "../modal/cartModal/CartModal";

import "./SearchBookListItem.scss";

const SearchBookListItem = ({ book }) => {
  const { cart, addToCart } = useContext(CartContext);

  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    const isAlreadyInCart = cart.find((item) => item.id === book.id);

    if (isAlreadyInCart) {
      setMessage("장바구니에 이미 담은 상품이 있어 수량이 추가 되었습니다.");
    } else {
      setMessage("상품이 장바구니에 담겼습니다.");
    }

    addToCart(book);
  };

  return (
    <div className="searchBookListItem">
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
              <li className="list" onClick={handleAddToCart}>
                <CartModal message={message} />
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

export default SearchBookListItem;