import React, { useEffect, useState } from "react";

import CheckBoxItem from "../checkBoxItem/CheckBoxItem";
import PolicyContent from "./policyContent/PolicyContent";

import checkedIconSrc from "../../../assets/icon-check-circle-fill.png";
import unCheckedIconSrc from "../../../assets/icon-check-circle.png";

import "./Agreement.scss";

const Agreement = ({ handleAgreement }) => {
  const [policy, setPolicy] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [checkBoxes, setCheckBoxes] = useState({
    introduction: false,
    account: false,
    usage: false,
    restrictions: false,
    termination: false,
  });
  const [expandedBoxes, setExpandedBoxes] = useState({
    introduction: false,
    account: false,
    usage: false,
    restrictions: false,
    termination: false,
  });

  const isAllChecked =
    checkBoxes.introduction && checkBoxes.account && checkBoxes.usage;
  const buttonContainerClass = isAllChecked
    ? "buttonContainer"
    : "buttonContainerDisabled";

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const response = await fetch("/test-file/provision.json");
        const data = await response.json();

        setPolicy(data);
      } catch (error) {
        console.error("Error fetching policy data:", error);
      }
    };

    fetchPolicyData();
  }, []);

  const toggleExpansion = (checkboxKey) => {
    setExpandedBoxes((prevExpandedBoxes) => {
      const newExpandedBoxes = { ...prevExpandedBoxes };

      newExpandedBoxes[checkboxKey] = !prevExpandedBoxes[checkboxKey];
      return newExpandedBoxes;
    });
  };

  const toggleAll = () => {
    const newCheckStatus = !isChecked;
    setIsChecked(newCheckStatus);

    setCheckBoxes({
      introduction: newCheckStatus,
      account: newCheckStatus,
      usage: newCheckStatus,
      restrictions: newCheckStatus,
      termination: newCheckStatus,
    });
  };

  const toggleCheckBox = (checkboxKey) => {
    setCheckBoxes((prevcheckBoxes) => {
      const newcheckBoxes = { ...prevcheckBoxes };

      newcheckBoxes[checkboxKey] = !prevcheckBoxes[checkboxKey];
      return newcheckBoxes;
    });
  };

  return (
    <div className="agreeContainer">
      <div className="agreeText">
        약관 동의 <span>(필수)</span>
      </div>

      {isChecked ? (
        <div className="agreeBoxTrue" onClick={toggleAll}>
          <img alt="check" className="checkIcon" src={checkedIconSrc} />
          <span>약관 전체 동의하기</span>
        </div>
      ) : (
        <div className="agreeBox" onClick={toggleAll}>
          <img alt="check" className="checkIcon" src={unCheckedIconSrc} />
          <span>약관 전체 동의하기</span>
        </div>
      )}

      {policy.map((data, key) => (
        <ul key={key}>
          <CheckBoxItem
            checkBoxes={checkBoxes}
            data={data}
            expandedBoxes={expandedBoxes}
            toggleCheckBox={toggleCheckBox}
            toggleExpansion={toggleExpansion}
          />
          <PolicyContent data={data} expandedBoxes={expandedBoxes} />
        </ul>
      ))}

      <div className={buttonContainerClass} onClick={handleAgreement}>
        <button className="confirmButton" disabled={!isAllChecked}>
          확인하기
        </button>
      </div>
    </div>
  );
};

export default Agreement;
