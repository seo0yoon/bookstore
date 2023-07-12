import React, { useState } from "react";
import { searchBooks } from "../../../firebase/firestore";

import { BsSearch } from "react-icons/bs";

import "./SearchBar.scss";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }

    const results = await searchBooks(searchTerm);
    setSearchResults(results);

    console.log(results);
  };

  return (
    <div className="searchBarBox">
      <input
        className="searchBar"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="도서명 또는 저자이름으로 검색하세요."
      />
      <div className="searchBtn" onClick={handleSearch}>
        <BsSearch />
      </div>
    </div>
  );
};

export default SearchBar;
