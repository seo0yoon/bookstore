import { Link } from "react-router-dom";

import { SUB_MENU_ITEM } from "../../../constants";

import "./SubMenu.scss";

const SubMenuItem = () => (
  <nav className="headerMenu">
    {SUB_MENU_ITEM.map((item) => (
      <ul key={item.id}>
        <li className="menuItem">
          <Link to={{ pathname: "/booklist", search: `?tab=${item.query}` }}>
            {item.text}
          </Link>
        </li>
      </ul>
    ))}
  </nav>
);

export default SubMenuItem;
