import React, { useState, useEffect } from "react";
import { getBooks } from "../../firebase/firestore";

import BookListItem from "../../components/bookList/BookListItem";

import { AiOutlinePlus } from "react-icons/ai";

import "./BookList.scss";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };

    fetchBooks();
  }, []);

  return (
    <div className="bookListContainer">
      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="sideBarFilter">
            <div className="varietys">
              <div className="itemTitle">필터</div>

              <div className="itemWrap">
                <div className="item">국내도서</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">외국도서</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">무료배송</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">비비문고 배송</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">가격</div>
                <AiOutlinePlus />
              </div>
            </div>
          </div>
        </div>
        <div className="bookListSectin">
          <div className="items">
            {books.map((book) => (
              <BookListItem key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
