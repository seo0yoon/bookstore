import React from "react";

import { AiOutlineClose } from "react-icons/ai";

import "./AdminItem.scss";

const AdminItem = ({ book, handleBookDelete, handleBookClick }) => {
  const formattedPrice = parseInt(book.price).toLocaleString();

  return (
    <article className="adminItem" onClick={() => handleBookClick(book)}>
      <div className="itemContents">
        <button
          className="closeBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleBookDelete(book.id);
          }}
        >
          <AiOutlineClose />
        </button>
        <section className="bottomContext">
          <div className="imgWrap">
            <img className="bookImg" src={book.imageURL} alt="" />
          </div>
          <h3 className="bottomTitle">{book.title}</h3>
          <div className="bottomPrice">
            <span className="prePrice">{formattedPrice}원</span>
          </div>
        </section>
        <section className="bottomDetail">
          <span className="bottomAuthor">{book.author}</span>
          <span className="bottomPublicationDate">{book.publicationDate}</span>
        </section>
      </div>
    </article>
  );
};

export default AdminItem;
