import React from "react";

import { AiOutlineMenu } from "react-icons/ai";

import "./BookListNav.scss";

const BookListNav = ({ getActiveTab, activeTitle, books }) => {
  return (
    <ul className="bookListNav">
      <li>
        <AiOutlineMenu />
      </li>
      <li>{activeTitle}</li>
      {">"}
      <li>{getActiveTab()}</li>
      {">"}
      <li>
        <strong>{books.length}</strong>개
      </li>
    </ul>
  );
};

export default BookListNav;
