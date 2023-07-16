import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getBooks, searchBooks } from "../../firebase/firestore";

import BookListItem from "../../components/bookList/BookListItem";
import BestsellerListItem from "../../components/bestsellerList/BestsellerListItem";
import NewBookListItem from "../../components/newBookList/NewBookListItem";
import SearchBookListItem from "../../components/searchBookList/SearchBookListItem";

import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai";

import "./BookList.scss";

const BookList = () => {
  const location = useLocation();

  const [allBooks, setAllBooks] = useState([]); // 모든 도서를 저장
  const [books, setBooks] = useState([]); // 필터링된 도서를 저장
  const [activeTab, setActiveTab] = useState("전체보기");
  const [activeTitle, setActiveTitle] = useState("전체보기");
  const [originFilter, setOriginFilter] = useState("");

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
      fetchBooks(undefined);
      setActiveTab("전체보기");
      setActiveTitle("전체보기");
    }
  }, [location.search]);

  useEffect(() => {
    // originFilter가 변경될 때마다 도서를 필터링
    if (originFilter === "국내도서" || originFilter === "외국도서") {
      setBooks(allBooks.filter((book) => book.origin === originFilter));
    } else {
      setBooks(allBooks);
    }
  }, [originFilter, allBooks]);

  const fetchBooks = async (type) => {
    const booksData = await getBooks(type);
    setAllBooks(booksData);
  };

  const fetchSearchBooks = async (query) => {
    const searchedBooksData = await searchBooks(query);
    setBooks(searchedBooksData);
  };

  return (
    <div className="bookListContainer">
      <div className="bookListTitle">
        {activeTitle} 총 {books.length}권
      </div>
      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="itemTitle">필터</div>

          <div className="itemWrap">
            <div
              className="item"
              onClick={() => {
                console.log("구갠");
                setOriginFilter("국내도서");
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
                console.log("외갠");
                setOriginFilter("외국도서");
              }}
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

          {/* <div className="itemClickedWrap">
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
          </div> */}
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
