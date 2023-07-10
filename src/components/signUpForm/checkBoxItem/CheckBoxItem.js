import React from "react";

import checkedIconSrc from "../../../assets/icon-check-circle-fill.png";
import unCheckedIconSrc from "../../../assets/icon-check-circle.png";
import triangleTopIconSrc from "../../../assets/triangle-top.png";
import triangleBottomIconSrc from "../../../assets/triangle-bottom.png";

import "./CheckBoxItem.scss";

const CheckBoxItem = ({
  data,
  checkBoxes,
  expandedBoxes,
  toggleCheckBox,
  toggleExpansion,
}) => {
  return (
    <li className={expandedBoxes[data.key] ? "agreeItemExpanded" : "agreeItem"}>
      <div className="textContainer" onClick={() => toggleCheckBox(data.key)}>
        <img
          alt="check"
          className="checkIcon"
          src={checkBoxes[data.key] ? checkedIconSrc : unCheckedIconSrc}
        />

        <div className="agreeItemText">
          {data.text}
          <span className={data.essential ? "essential" : "select"}>
            ({data.essential ? "필수" : "선택"})
          </span>
        </div>
      </div>
      <img
        alt="triangle"
        className="triangleIcon"
        src={
          expandedBoxes[data.key] ? triangleTopIconSrc : triangleBottomIconSrc
        }
        onClick={() => toggleExpansion(data.key)}
      />
    </li>
  );
};

export default CheckBoxItem;
