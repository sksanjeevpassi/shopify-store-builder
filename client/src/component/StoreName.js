import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";

class StoreName extends Component {

  continue = (e) => {
    e.preventDefault();
    // const isBusinessNameValid = this.props.validateBusinessName();
    // if (isBusinessNameValid ) {
      this.props.nextStep();
    // }
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { storename, handleChange } = this.props;

    return (
      <div className="form">
        <form>
          <StepperCompo count={4} />
          <div className="container_card">
          <div className="">
            <div className="div_business">
              <label className="form-group__label">
                Store Name
              </label>
              <input
                type="text"
                value={storename}
                name="storename"
                onChange={handleChange("storename")}
                className="form-group__input"
              />
            </div>
          </div>
          </div>

          <div style={{ textAlign: "center" }} className="buttons footer_btn">
            <button
              className="buttons__button buttons__button--back"
              onClick={this.back}
            >
              Back
            </button>
            <button
              className="buttons__button buttons__button--next"
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

export default StoreName;
