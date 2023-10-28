import React from "react";
import StepperCompo from "./Stepper/StepperCompo";
import shopifyLogo from "../images/shopify.png";

const SetupStore = ({ nextStep, prevStep }) => {
  const back = () => {
    prevStep();
  };
  const Continue = () => {
    nextStep();
  };

  return (
    <div className="form">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <form>
        <StepperCompo count={3} />

        <div className="container_card">
          <div className="form-group">
            <h4>Create your account on Shopify</h4>
            <p>
              First you need to create an account on shopify for free, follow
              the step below:
            </p>

            <ul>
              <li>
                <span className="material-symbols-outlined">double_arrow</span>Click
                here below button <b>Access Shopify.</b>
              </li>
              <li>
                <span className="material-symbols-outlined">double_arrow</span>Click{" "}
                <b>Start Free Trail</b> and enter your email address.{" "}
              </li>
              <li>
                <span className="material-symbols-outlined">double_arrow</span>Skill
                all step and complete a registration.
              </li>
              <li>
                <span className="material-symbols-outlined">double_arrow</span>
                Return on this tab.
              </li>
              <li>
                <span className="material-symbols-outlined">double_arrow</span>Then
                go to next tab.
              </li>
            </ul>
            <a
              rel="noopener noreferrer"
              className="btn btn-general"
              href="https://www.shopify.com/"
              target="_blank"
            >
              <img  src={shopifyLogo}  alt="shopify"/> Access Shopify
            </a>
          </div>
        </div>

        <div className="buttons footer_btn">
          <button
            className="buttons__button buttons__button--back"
            onClick={back}
          >
            Back
          </button>
          <button
            className="buttons__button buttons__button--next"
            onClick={Continue}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupStore;
