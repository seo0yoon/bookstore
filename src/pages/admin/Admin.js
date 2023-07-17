import React, { useState, useEffect } from "react";
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../../firebase/firestore";

import AdminItem from "../../components/admin/AdminItem";

import "./Admin.scss";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookPublicationDate, setBookPublicationDate] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchBooks = async () => {
    const books = await getBooks();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookAdd = async () => {
    if (
      !bookTitle ||
      !bookAuthor ||
      !bookPrice ||
      !bookPublicationDate ||
      !imageFile
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    await addBook(
      {
        title: bookTitle,
        author: bookAuthor,
        price: bookPrice,
        publicationDate: bookPublicationDate,
      },
      imageFile
    );

    setImageFile(null); // 이미지 파일 상태 초기화
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
    if (!bookTitle || !bookAuthor || !bookPrice || !bookPublicationDate) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    if (selectedBook) {
      const isModified =
        selectedBook.title !== bookTitle ||
        selectedBook.author !== bookAuthor ||
        selectedBook.price !== bookPrice ||
        selectedBook.publicationDate !== bookPublicationDate ||
        imageFile;

      if (!isModified) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      await updateBook(
        {
          id: selectedBook.id,
          title: bookTitle,
          author: bookAuthor,
          price: bookPrice,
          publicationDate: bookPublicationDate,
        },
        imageFile
      );

      setImageFile(null); 
      fetchBooks();
      alert("도서 정보가 수정되었습니다.");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const bookInputs = [
    {
      name: "bookTitle",
      state: bookTitle,
      setState: setBookTitle,
      placeholder: "도서 제목",
      type: "text",
    },
    {
      name: "bookAuthor",
      state: bookAuthor,
      setState: setBookAuthor,
      placeholder: "도서 저자",
      type: "text",
    },
    {
      name: "bookPrice",
      state: bookPrice,
      setState: setBookPrice,
      placeholder: "가격",
      type: "text",
    },
    {
      name: "bookPublicationDate",
      state: bookPublicationDate,
      setState: setBookPublicationDate,
      placeholder: "발행일",
      type: "date",
    },
    {
      name: "bookImage",
      state: imageFile,
      setState: setImageFile,
      placeholder: "이미지",
      type: "file",
      onChange: handleImageChange,
    },
  ];

  console.log("books", books);
  return (
    <div className="adminBookListContainer">
      <div className="bookListInputBox">
        <div className="bookForm">
          {bookInputs.map((input) =>
            input.type !== "file" ? (
              <input
                key={input.name}
                className="bookInput"
                value={input.state}
                onChange={(e) => input.setState(e.target.value)}
                placeholder={input.placeholder}
                type={input.type}
              />
            ) : (
              <input
                key={input.name}
                className="bookInput"
                onChange={input.onChange}
                placeholder={input.placeholder}
                type={input.type}
              />
            )
          )}
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
