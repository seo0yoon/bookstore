import React from "react";

import { BsSearch } from "react-icons/bs";

import "./SearchBar.scss";

const SearchBar = () => {
  return (
    <div className="searchBarBox">
      <input className="searchBar" placeholder="도서를 검색하세요." />
      <div className="searchBtn">
        <BsSearch />
      </div>
    </div>
  );
};

export default SearchBar;
