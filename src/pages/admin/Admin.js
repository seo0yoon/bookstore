// import React from "react";
// import { useForm } from "react-hook-form";
// import { addBook } from "../../firebase/firestore";

// const Admin = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       await addBook(data);
//       alert("Book has been successfully added!");
//     } catch (error) {
//       console.error("Error adding book: ", error);
//     }
//   };

//   return (
//     <div className="Admin">
//       <h2>새로운 책 추가</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label>제목:</label>
//         <input {...register("title", { required: true })} />
//         {errors.title && <p>This field is required</p>}

//         <label>저자:</label>
//         <input {...register("author", { required: true })} />
//         {errors.author && <p>This field is required</p>}

//         <label>가격:</label>
//         <input type="number" {...register("price", { required: true })} />
//         {errors.price && <p>This field is required</p>}

//         <button type="submit">추가하기</button>
//       </form>
//     </div>
//   );
// };

// export default Admin;

import React, { useState, useEffect } from "react";
import {
  getBestsellerBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../../firebase/firestore";

import BookListItem from "../../components/bookList/BookListItem";

import { AiOutlinePlus } from "react-icons/ai";

import "./Admin.scss";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  const fetchBooks = async () => {
    const books = await getBestsellerBooks();
    setBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setBookTitle(book.title);
    setBookAuthor(book.author);
  };

  const handleBookAdd = async () => {
    await addBook({ title: bookTitle, author: bookAuthor });
    fetchBooks();
  };

  const handleBookUpdate = async () => {
    if (selectedBook) {
      await updateBook(selectedBook.id, {
        title: bookTitle,
        author: bookAuthor,
      });
      fetchBooks();
    }
  };

  const handleBookDelete = async () => {
    if (selectedBook) {
      await deleteBook(selectedBook.id);
      fetchBooks();
    }
  };

  return (
    <div className="bookListContainer">
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
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            placeholder="가격"
          />
          <input
            type="text"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
            placeholder="발행일"
          />
        </div>

        <div className="btnBox">
          <button className="addBtn" onClick={handleBookAdd}>
            추가하기
          </button>
        </div>
      </div>

      <div className="bookListContent">
        <div className="sideBarBox">
          <div className="sideBarFilter">
            <div className="varietys">
              <div className="itemTitle">목록</div>

              <div className="itemWrap">
                <div className="item">전체 도서 목록</div>
                <AiOutlinePlus />
              </div>

              <div className="itemWrap">
                <div className="item">베스트셀러</div>
                <AiOutlinePlus />
              </div>
              <div className="itemWrap">
                <div className="item">신상품</div>
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

export default Admin;
