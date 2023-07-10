import React from "react";

import "./PolicyContent.scss";

const PolicyContent = ({ data, expandedBoxes }) => {
  const parts = data.value.split("\n");

  return (
    <div className="policyContainer">
      {expandedBoxes[data.key] && (
        <div className="policyContent">
          {parts.map((part, index) => (
            <p className="sectionContent" key={index}>
              {part}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PolicyContent;
