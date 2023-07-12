import React, { useState, useEffect } from "react";
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../../firebase/firestore";

import AdminItem from "../../components/admin/AdminItem";

import { AiOutlinePlus } from "react-icons/ai";

import "./Admin.scss";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookpublicationDate, setBookPublicationDate] = useState("");

  const fetchBooks = async () => {
    const books = await getBooks();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookAdd = async () => {
    if (!bookTitle || !bookAuthor || !bookPrice || !bookpublicationDate) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    await addBook({
      title: bookTitle,
      author: bookAuthor,
      price: bookPrice,
      publicationDate: bookpublicationDate,
    });
    fetchBooks();
    console.log("추가 완료");
    alert("추가 되었습니다.");
  };

  const handleBookDelete = async (bookId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await deleteBook(bookId);
      fetchBooks();
      console.log("삭제 완료");
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookPrice(book.price);
    setBookPublicationDate(book.publicationDate);
  };

  const handleBookSave = async () => {
    if (!bookTitle || !bookAuthor || !bookPrice || !bookpublicationDate) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (selectedBook) {
      const isModified =
        selectedBook.title !== bookTitle ||
        selectedBook.author !== bookAuthor ||
        selectedBook.price !== bookPrice ||
        selectedBook.publicationDate !== bookpublicationDate;

      if (!isModified) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      await updateBook({
        id: selectedBook.id,
        title: bookTitle,
        author: bookAuthor,
        price: bookPrice,
        publicationDate: bookpublicationDate,
      });
      console.log("수정 완료");
      alert("수정 되었습니다.");
    } else {
      await addBook({
        title: bookTitle,
        author: bookAuthor,
        price: bookPrice,
        publicationDate: bookpublicationDate,
      });
      console.log("추가 완료");
      alert("추가 되었습니다.");
    }

    fetchBooks();
  };

  return (
    <div className="adminBookListContainer">
      <div className="bookListInputBox">
        <div className="bookForm">
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            placeholder="도서 제목"
          />
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            placeholder="도서 저자"
          />
          <input
            type="text"
            value={bookPrice}
            onChange={(e) => setBookPrice(e.target.value)}
            placeholder="가격"
          />
          <input
            type="date"
            value={bookpublicationDate}
            onChange={(e) => setBookPublicationDate(e.target.value)}
            placeholder="발행일"
          />
        </div>
        <div className="btnBox">
          <button
            className="addBtn"
            onClick={handleBookAdd}
            disabled={!!selectedBook}
          >
            추가하기
          </button>
          <button
            className="updateBtn"
            onClick={handleBookSave}
            disabled={!selectedBook}
          >
            수정하기
          </button>
          {selectedBook && (
            <button
              className="cancelSelectBtn"
              onClick={() => {
                setSelectedBook(null);
                setBookTitle("");
                setBookAuthor("");
                setBookPrice("");
                setBookPublicationDate("");
              }}
            >
              선택해제
            </button>
          )}
        </div>
        {!selectedBook && (
          <div className="instructions">
            * 도서를 수정하려면, 먼저 도서 목록에서 원하는 도서를 선택해주세요.
          </div>
        )}
      </div>

      <div className="adminBookListContent">
        <div className="bookListSectin">
          <div className="items">
            {books.map((book) => (
              <AdminItem
                key={book.id}
                book={book}
                handleBookDelete={handleBookDelete}
                handleBookClick={handleBookClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
