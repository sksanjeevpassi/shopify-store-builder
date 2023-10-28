import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";

class BusinessName extends Component {
  continue = (e) => {
    e.preventDefault();
    const isBusinessNameValid = this.props.validateBusinessName();
    if (isBusinessNameValid ) {
      this.props.nextStep();
    }
  };

  render() {
    const {
      businessname,
      handleChange,
      validateBusinessName,
      isErrorBusinessName,
      errorMessageBusinessName,
    } = this.props;

    return (
      <div className="form">
        <form>
          <StepperCompo count={0} />

          <div className="container_card">
            <div className="">
              <div className="div_business">
                <label className="form-group__label">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessname}
                  name="first name"
                  onChange={handleChange("businessname")}
                  onBlur={validateBusinessName}
                  className="form-group__input"
                />
                <p className="error">
                  {isErrorBusinessName && errorMessageBusinessName}
                </p>
              </div>
            </div>
          </div>

          <div className="button_div">
            <button
              className="buttons__button buttons__button--next btn_next"
              onClick={this.continue}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BusinessName;
