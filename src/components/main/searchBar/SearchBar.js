import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchBooks } from "../../../firebase/firestore";

import { BsSearch } from "react-icons/bs";

import "./SearchBar.scss";

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      return;
    }
    navigate(`/booklist?tab=search&query=${encodeURIComponent(searchTerm)}`);

    const results = await searchBooks(searchTerm);
    setSearchResults(results);

    setSearchTerm("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchBar">
      <input
        className="searchBarInput"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="도서명 또는 저자이름으로 검색하세요."
      />
      <button className="searchBtn" onClick={handleSearch}>
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
