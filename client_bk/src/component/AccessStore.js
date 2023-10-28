import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";
import axios from "axios";

class AccessStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeError: "",
    };
  }

  continue = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_FRONTEND_URL}api/get/store?storename=${this.props.storename}&access_token=${this.props.access_token}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        //
        if (response.data.status === "error") {
          this.setState({
            storeError: response.data.message,
          });
        } else {
          this.props.nextStep();
        }
      });
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { access_token, handleChange } = this.props;

    return (
      <div className="form">
        <form>
          <StepperCompo count={5} />
          <div className="container_card">
          <div className="">
            <div className="div_business">
              <label className="form-group__label">
                API Access Token 
              </label>
              <input
                type="text"
                value={access_token}
                name="access_token"
                onChange={handleChange("access_token")}
                className="form-group__input"
              />
              <p className="error">{this.state.storeError}</p>
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

export default AccessStore;
