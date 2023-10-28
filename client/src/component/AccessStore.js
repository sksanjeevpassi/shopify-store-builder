import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";
import axios from "axios";
import shopifyLogo from "../images/shopify.png";
import { TailSpin } from "react-loader-spinner";
import GuidLinePopup from "./Popup/GuidLinePopup";
import AccessStorePopup from "./Popup/AccessStorePopup";

class AccessStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeError: "",
      loading: false,
    };
  }

  continue = (e) => {
    e.preventDefault();
    console.log(this.props);
    this.props.dataSubmit(e);
    // this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      access_token,
      handleChange,
      storename,
      sendDataToParent,
      handleData,
      pickThemeError,
      themFileSubmit,
    } = this.props;

    const handleAccessToken = async (e) => {
      if (!e.target.value) return;

      this.setState({ loading: true });

      handleData({
        access_token: e.target.value,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FRONTEND_URL}api/get/store?storename=${this.props.storename}&access_token=${e.target.value}`,
          config
        );

        if (response.data.status === "error") {
          this.setState({ storeError: response.data.message });
          this.setState({ loading: false });
        } else {
          // this.props.nextStep(); success
          if (response.data.status === "success") {
            await themFileSubmit(e);
            if (this.storeData.state.theme_id) {
              this.setState({ storeError: "" });
              this.setState({ loading: false });
            } else {
              this.setState({ storeError: response.data.message });
              this.setState({ loading: false });
            }
          }
        }
      } catch (error) {
        // Handle errors from await
        this.setState({ loading: false });
        console.log(error);
      }
    };

    return (
      <div className="form">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <form>
          <StepperCompo count={1} />
          <div className="container_card">
            <div className="form-group">
              <h4>Create your account on Shopify</h4>
              <p>
                First you need to create an account on shopify for free, follow
                the step below:
              </p>

              <ul>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Click here below button <b>Access Shopify.</b>
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Click <b>Start Free Trail</b> and enter your email address.{" "}
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Skill all step and complete a registration.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Return on this tab.
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    double_arrow
                  </span>
                  Then go to next tab.
                </li>
              </ul>
              {/* <a
                rel="noopener noreferrer"
                className="btn btn-general"
                href="https://shopify.pxf.io/c/3761361/1101159/13624"
                target="_blank"
              >
                <img src={shopifyLogo} alt="shopify" /> Access Shopify
              </a> */}
              <AccessStorePopup handleData={handleData} />
            </div>

            <div className="">
              <div className="div_business">
                <label className="form-group__label">Store Name</label>
                <input
                  type="text"
                  value={storename}
                  name="storename"
                  onChange={handleChange("storename")}
                  className="form-group__input"
                />
              </div>
            </div>

            <div className="">
              <div className="div_business">
                <label className="form-group__label">
                  API Access Token
                  <GuidLinePopup handleData={handleData} />
                </label>
                <input
                  type="text"
                  value={access_token}
                  name="access_token"
                  onChange={(e) => handleAccessToken(e)}
                  className="form-group__input"
                />
                <p className="error">{this.state.storeError}</p>
              </div>
            </div>

            {this.state.loading && (
              <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="custom-loader"
              />
            )}

            {/* <PickTheme
              handleChange={handleChange}
              sendDataToParent={sendDataToParent}
              handleData={handleData}
              pickThemeError={pickThemeError}
              themFileSubmit={themFileSubmit}
            /> */}
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
