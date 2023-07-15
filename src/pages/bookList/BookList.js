import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getAllBooks, searchBooks } from "../../firebase/firestore";

import BookListItem from "../../components/bookList/BookListItem";
import BestsellerListItem from "../../components/bestsellerList/BestsellerListItem";
import NewBookListItem from "../../components/newBookList/NewBookListItem";
import SearchBookListItem from "../../components/searchBookList/SearchBookListItem";

import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";

import "./BookList.scss";

const BookList = () => {
  const location = useLocation();

  const [books, setBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("전체보기");
  const [activeTitle, setActiveTitle] = useState("전체보기");
  const [originFilter, setOriginFilter] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [clickedFilters, setClickedFilters] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    const query = searchParams.get("query");

    if (tab === "bestseller") {
      fetchBooks("bestseller");
      setActiveTab("베스트셀러");
      setActiveTitle("베스트셀러");
    } else if (tab === "new") {
      fetchBooks("new");
      setActiveTab("신상품");
      setActiveTitle("신상품");
    } else if (tab === "search") {
      fetchSearchBooks(query);
      setActiveTab("검색결과");
    } else {
      fetchBooks();
      setActiveTab("전체보기");
      setActiveTitle("전체보기");
    }

    console.log(books);
  }, [location.search, originFilter]);

  const fetchBooks = async (type) => {
    const allBooksData = await getAllBooks();
    let filteredBooks = filterBooks(allBooksData, originFilter);

    if (type) {
      const booksData = filteredBooks.filter((book) => book.type === type);
      filteredBooks = booksData;
    }

    setBooks(filteredBooks);
  };

  const fetchSearchBooks = async (query) => {
    const searchedBooksData = await searchBooks(query);
    setBooks(searchedBooksData);
  };

  const filterBooks = (books, originFilter) => {
    let filteredBooks = [...books];

    if (originFilter.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        originFilter.includes(book.origin)
      );
    }

    if (originFilter.includes("freeDelivery")) {
      filteredBooks = filteredBooks.filter(
        (book) => book.freeDelivery === true
      );
    }

    return filteredBooks;
  };

  const handleOriginFilterChange = (origin) => {
    let updatedOriginFilter = [...originFilter];

    if (originFilter.includes(origin)) {
      // 이미 선택된 필터를 누르면 선택 해제
      updatedOriginFilter = updatedOriginFilter.filter((o) => o !== origin);
    } else {
      // 새로운 필터를 추가
      updatedOriginFilter.push(origin);
    }

    setOriginFilter(updatedOriginFilter);
    fetchBooks(activeTab === "전체보기" ? undefined : activeTab.toLowerCase());
  };
  return (
    <div className="bookListContainer">
      <div className="bookListTitle">{activeTitle}</div>
      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="itemTitle">필터</div>

          <div className="itemWrap">
            <div
              className="item"
              onClick={() => handleOriginFilterChange("국내도서")}
            >
              국내도서
            </div>
            <AiOutlinePlus />
          </div>
          <div className="itemWrap">
            <div
              className="item"
              onClick={() => handleOriginFilterChange("외국도서")}
            >
              외국도서
            </div>
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

          <div>
            <div className="itemTitle">베스트셀러</div>
            <div className="itemWrap">
              <div className="item">소설</div>
              <AiOutlinePlus />
            </div>
          </div>

          <div className="itemClickedWrap">
            {clickedFilters.map((filter, index) => (
              <div className="clickBox" key={index}>
                <div className="itemClicked">{filter}</div>
                <AiFillCloseCircle
                  className="closeIcon"
                  onClick={() => {
                    setClickedFilters(
                      clickedFilters.filter((f) => f !== filter)
                    );
                  }}
                />
              </div>
            ))}
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
