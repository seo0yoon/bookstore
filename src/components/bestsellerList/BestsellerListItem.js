import React, { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

import { BiSolidHeart } from "react-icons/bi";
import { BsShare } from "react-icons/bs";

import CartModal from "../modal/cartModal/CartModal";

import "./BestsellerListItem.scss";

const BestsellerListItem = ({ book }) => {
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

  const formattedPrice = parseInt(book.price).toLocaleString();
  const salePrice = (parseInt(book.price) * 0.9).toLocaleString();

  return (
    <article className="bestsellerListItem">
      <section
        className="itemContents"
        onMouseOver={() => setIsOptionOpen(true)}
        onMouseOut={() => setIsOptionOpen(false)}
      >
        <div className="content">
          <img className="bookImg" src={book.imageURL} alt="book" />
          <div
            className={`tagWrap freeDelivery ${
              book.freeDelivery ? "show" : "hide"
            }`}
          >
            무료배송
          </div>
          <div
            className={`tagWrap MDselection ${
              book.MDselection ? "show" : "hide"
            } ${!book.freeDelivery ? "top" : ""}`}
          >
            MD의 선택
          </div>
          <nav
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
          </nav>
        </div>
        <section className="bottomContext">
          <h3 className="bottomTitle">{book.title}</h3>
          <div className="bottomPrice">
            <span className="prePrice">{formattedPrice}원</span>
            <span className="salePrice">{salePrice}원</span>
          </div>
        </section>
        <section className="bottomDetail">
          <span className="bottomAuthor">{book.author}</span>
          <span className="bottomPublicationDate">{book.publicationDate}</span>
        </section>
      </section>
    </article>
  );
};

export default BestsellerListItem;
