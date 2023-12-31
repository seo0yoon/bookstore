import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { getBooks, searchBooks } from "../../firebase/firestore";
import { FilterContext } from "../../contexts/FilterContext";

import BookListItem from "../../components/bookList/BookListItem";
import BookListNav from "../../components/bookList/bookListNav/BookListNav";
import BestsellerListItem from "../../components/bestsellerList/BestsellerListItem";
import NewBookListItem from "../../components/newBookList/NewBookListItem";
import SearchBookListItem from "../../components/searchBookList/SearchBookListItem";

import { AiOutlinePlus } from "react-icons/ai";

import "./BookList.scss";

const BookList = () => {
  const location = useLocation();
  const {
    originFilter,
    setOriginFilter,
    deliveryFilter,
    setDeliveryFilter,
    mdSelectFilter,
    setMdSelectFilter,
  } = useContext(FilterContext);

  const [allBooks, setAllBooks] = useState([]);
  const [filteredByOriginBooks, setFilteredByOriginBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("전체보기");
  const [activeTitle, setActiveTitle] = useState("전체보기");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    const query = searchParams.get("query");

    if (tab === "bestseller") {
      fetchBooks("bestseller");
      setActiveTitle("베스트셀러");
      setActiveTab("베스트셀러");
    } else if (tab === "new") {
      fetchBooks("new");
      setActiveTitle("신상품");
      setActiveTab("신상품");
    } else if (tab === "search") {
      setActiveTitle("검색결과");
      fetchSearchBooks(query);
      setActiveTab("검색결과");
    } else {
      fetchBooks(undefined);
      setActiveTitle("전체보기");
      setActiveTab("전체보기");
    }
  }, [location.search]);

  useEffect(() => {
    let filteredBooks = allBooks;

    if (originFilter === "국내도서" || originFilter === "외국도서") {
      filteredBooks = filteredBooks.filter(
        (book) => book.origin === originFilter
      );
    }

    setFilteredByOriginBooks(filteredBooks);
  }, [originFilter, allBooks]);

  useEffect(() => {
    let filteredBooks = filteredByOriginBooks;

    if (deliveryFilter) {
      filteredBooks = filteredBooks.filter((book) => book.freeDelivery);
    }

    if (mdSelectFilter) {
      filteredBooks = filteredBooks.filter((book) => book.MDselection);
    }

    setBooks(filteredBooks);
  }, [deliveryFilter, mdSelectFilter, filteredByOriginBooks]);

  const fetchBooks = async (type) => {
    const booksData = await getBooks(type);
    setAllBooks(booksData);
  };

  const fetchSearchBooks = async (query) => {
    const searchedBooksData = await searchBooks(query);
    setBooks(searchedBooksData);
  };

  const setFilterAndResetOthers = (filterType, value) => {
    if (filterType === "origin") {
      setOriginFilter(value);
      setDeliveryFilter(false);
      setMdSelectFilter(false);
    } else if (filterType === "freeDelivery") {
      setDeliveryFilter(value);
      setOriginFilter("");
      setMdSelectFilter(false);
    } else if (filterType === "MDselection") {
      setMdSelectFilter(value);
      setOriginFilter("");
      setDeliveryFilter(false);
    }
  };

  const getActiveTab = () => {
    if (originFilter === "국내도서") {
      return "국내도서";
    } else if (originFilter === "외국도서") {
      return "외국도서";
    } else if (deliveryFilter) {
      return "무료배송";
    } else if (mdSelectFilter) {
      return "MD의 추천";
    } else {
      return "전체";
    }
  };

  return (
    <div className="bookListContainer">
      <BookListNav
        getActiveTab={getActiveTab}
        activeTitle={activeTitle}
        books={books}
      />
      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="itemTitle">필터</div>

          <div className="itemWrap">
            <div
              className="item"
              onClick={() => {
                setFilterAndResetOthers("origin", "국내도서");
              }}
            >
              국내도서
            </div>
            <AiOutlinePlus />
          </div>
          <div className="itemWrap">
            <div
              className="item"
              onClick={() => {
                setFilterAndResetOthers("origin", "외국도서");
              }}
            >
              외국도서
            </div>
            <AiOutlinePlus />
          </div>
          <div className="itemWrap">
            <div
              className="item"
              onClick={() => {
                setFilterAndResetOthers("freeDelivery", true);
              }}
            >
              무료배송
            </div>
            <AiOutlinePlus />
          </div>
          <div className="itemWrap">
            <div
              className="item"
              onClick={() => {
                setFilterAndResetOthers("MDselection", true);
              }}
            >
              MD의 선택
            </div>
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
              <div className="emptyItem">검색된 결과가 없습니다.</div>
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
