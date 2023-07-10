import React, { useState } from "react";

import { DROP_DOWN_OPTION } from "../../../constants/index";

import dropDownIcon from "../../../assets/triangle-bottom.png";

import "./DropDownMenu.scss";

const DropDownMenu = ({ onSelectDomain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelectDomain(option);
  };

  return (
    <div className="dropdown">
      <button
        className={`dropdownButton ${
          selectedOption ? "dropdownButtonSelected" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption || "선택"}
      </button>
      <img alt="arrow" className="dropdownIcon" src={dropDownIcon} />
      {isOpen && (
        <ul className="dropdownMenu">
          {DROP_DOWN_OPTION.map((option) => (
            <li
              className="dropdownItem"
              key={option.id}
              onClick={() => selectOption(option.text)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
