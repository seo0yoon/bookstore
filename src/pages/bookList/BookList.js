import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  getBooks,
  getBestsellerBooks,
  getNewBooks,
  searchBooks,
} from "../../firebase/firestore";

import BookListItem from "../../components/bookList/BookListItem";
import BestsellerListItem from "../../components/bestsellerList/BestsellerListItem";
import NewBookListItem from "../../components/newBookList/NewBookListItem";
import SearchBookListItem from "../../components/searchBookList/SearchBookListItem";

import { AiOutlinePlus } from "react-icons/ai";

import "./BookList.scss";

const BookList = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("전체보기");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    const query = searchParams.get("query");

    if (tab === "bestseller") {
      fetchBestsellerBooks();
      setActiveTab("베스트셀러");
    } else if (tab === "newbooks") {
      fetchNewBooks();
      setActiveTab("신상품");
    } else if (tab === "search") {
      fetchSearchBooks(query);
      setActiveTab("검색결과");
    } else {
      fetchBooks();
      setActiveTab("전체보기");
    }
  }, [location.search]);

  const fetchBooks = async () => {
    const booksData = await getBooks();
    setBooks(booksData);
  };

  const fetchBestsellerBooks = async () => {
    const bestsellerBooksData = await getBestsellerBooks();
    setBooks(bestsellerBooksData);
  };

  const fetchNewBooks = async () => {
    const newBooksData = await getNewBooks();
    setBooks(newBooksData);
  };

  const fetchSearchBooks = async (query) => {
    const searchedBooksData = await searchBooks(query);
    setBooks(searchedBooksData);
  };

  return (
    <div className="bookListContainer">
      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="itemTitle">필터</div>
          <div className="itemWrap">
            <div className="item">검색결과</div>
            <AiOutlinePlus />
          </div>
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
        <div className="bookListSectin">
          <div className="items">
            {activeTab === "전체보기" &&
              books.map((book) => <BookListItem key={book.id} book={book} />)}
            {activeTab === "베스트셀러" &&
              books.map((book) => (
                <BestsellerListItem key={book.id} book={book} />
              ))}
            {activeTab === "신상품" &&
              books.map((book) => (
                <NewBookListItem key={book.id} book={book} />
              ))}
            {activeTab === "검색결과" && books.length === 0 && (
              <div>검색된 결과가 없습니다.</div>
            )}
            {activeTab === "검색결과" &&
              books.map((book) => (
                <SearchBookListItem key={book.id} book={book} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
