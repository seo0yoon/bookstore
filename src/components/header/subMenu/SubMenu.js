import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { SUB_MENU_ITEM } from "../../../constants";
import { FilterContext } from "../../../contexts/FilterContext";

import "./SubMenu.scss";

const SubMenuItem = () => {
  const { setOriginFilter, setDeliveryFilter, setMdSelectFilter } =
    useContext(FilterContext);

  const handleItemClick = (e) => {
    const tab = e.target.getAttribute("data-tab");

    if (
      tab === "bestseller" ||
      tab === "new" ||
      tab === "search" ||
      tab === "all"
    ) {
      setOriginFilter("");
      setDeliveryFilter("");
      setMdSelectFilter("");
    }
  };

  return (
    <nav className="headerMenu">
      {SUB_MENU_ITEM.map((item) => (
        <ul key={item.id}>
          <li className="menuItem" onClick={handleItemClick}>
            <Link
              to={{ pathname: "/booklist", search: `?tab=${item.query}` }}
              data-tab={item.query}
            >
              {item.text}
            </Link>
          </li>
        </ul>
      ))}
    </nav>
  );
};

export default SubMenuItem;
