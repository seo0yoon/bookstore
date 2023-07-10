import React, { useState, useEffect } from "react";
import { getBooks } from "../../firebase/firestore";

import BookListItem from "../../components/bookList/BookListItem";

import { BsSearch } from "react-icons/bs";
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
      <div className="bookListSearch">
        <div className="bookListInputBox">
          <input className="searchBar" placeholder="도서를 검색하세요." />
          <button className="searchBtn">
            <BsSearch />
          </button>
        </div>
      </div>

      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="sideBarFilter">
            <div className="varietys">
              <div className="itemTitle">Shop by Category</div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
            </div>
          </div>

          <div className="sideBarFilter">
            <div className="varietys">
              <div className="itemTitle">Shop by Category</div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
            </div>
          </div>

          <div className="sideBarFilter">
            <div className="varietys">
              <div className="itemTitle">Shop by Category</div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">Category1</div>
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
