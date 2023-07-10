import React, { useState } from "react";

import Agreement from "../../components/signUpForm/areement/Agreement";
import SignUpForm from "../../components/signUpForm/SignUpForm";

import "./SignUp.scss";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [signUpData, setSignUpData] = useState({});

  const handleAgreement = () => {
    setStep(2);
  };

  const handleFormSubmit = (data) => {
    setSignUpData({ ...signUpData, ...data });
  };

  return (
    <main className="signUpSection">
      <div className="signUpContainer">
        {step === 1 && <Agreement handleAgreement={handleAgreement} />}
        {step === 2 && (
          <SignUpForm
            agreementData={signUpData}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default SignUp;
