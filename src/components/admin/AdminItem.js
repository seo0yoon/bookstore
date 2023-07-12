import React from "react";

import { AiOutlineClose } from "react-icons/ai";

import "./AdminItem.scss";

const AdminItem = ({ book, handleBookDelete, handleBookClick }) => {
  return (
    <div className="adminItem" onClick={() => handleBookClick(book)}>
      <div className="itemContents">
        <AiOutlineClose
          className="closeBtn"
          onClick={(e) => {
            e.stopPropagation();
            handleBookDelete(book.id);
          }}
        />
        <div className="bottomContext">
          <div className="imgWrap">
            <img className="bookImg" src={book.imageURL} alt="" />
          </div>
          <div className="bottomTitle">{book.title}</div>
          <div className="bottomPrice">
            <span className="prePrice">{book.price.toLocaleString()}원</span>
            <span className="salePrice">{book.price.toLocaleString()}원</span>
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

export default AdminItem;
