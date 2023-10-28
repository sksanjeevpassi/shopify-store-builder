import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";
import ColorComponent from "./ColorComponent";
import PickLogo from "./PickLogo";
import StoreDetails from "./StoreDetails";
import GuidLinePopup from "./Popup/GuidLinePopup";
import AccessStorePopup from "./Popup/AccessStorePopup";

class BusinessDetails extends Component {
  constructor(props) {
    super(props);
    const defaultColor = ["#003a6b", "#a8a8a8"];
    this.props.handleData({ theme_color: defaultColor[0] });
    this.props.handleData({ font_color: defaultColor[1] });

    this.state = {
      errorFontMessage: "",
      errorEmailMessage: "",
      submitError: "",
      swal: {},
    };
  }

  continue = (e) => {
    console.log(this.props);
    e.preventDefault();
    const isBusinessNameValid = this.props.validateBusinessName();
    const isValid = this.props.storeData.fontchoices;
    const isEmail = this.props.storeData.email;

    if (isBusinessNameValid && isValid && isEmail) {
      this.setState({ errorFontMessage: "" });
      this.setState({ errorEmailMessage: "" });
      this.props.nextStep();
    }

    if (!isValid) {
      this.setState({ errorFontMessage: "Please Choose Font." });
    }

    if (!isEmail) {
      this.setState({ errorEmailMessage: "Please Enter You Email." });
    }
  };

  render() {
    const {
      businessname,
      handleChange,
      handleData,
      validateBusinessName,
      isErrorBusinessName,
      errorMessageBusinessName,
      storeData,
      onSelectImageHandler,
      product_display,
      email,
    } = this.props;

    // const defaultColor = ["#003a6b","#a8a8a8"];
    const defaultColor = ["#a8a8a8", "#003a6b"];

    const handleFontChange = (e) => {
      if (e.target.value) {
        this.setState({ errorFontMessage: "" });
      }

      this.setState({ fontchoices: e.target.value });
      handleData({ fontchoices: e.target.value });
    };

    const themeColorArr = [
      "#0000FF",
      "#000000",
      "#00FFFF",
      "#00FF00",
      "#2E8B57",
      "#FF00FF",
      "#FFA500",
      "#A020F0",
      "#FF0000",
      "#FF4500",
      "#EE82EE",
      "#FFFFFF",
      "#FFFF00",
    ];
    const fontColorArr = [
      "#0000FF",
      "#000000",
      "#00FFFF",
      "#00FF00",
      "#2E8B57",
      "#FF00FF",
      "#FFA500",
      "#A020F0",
      "#FF0000",
      "#FF4500",
      "#EE82EE",
      "#FFFFFF",
      "#FFFF00",
    ];
    // const fontColorArr = ["#a8a8a8","#000000","#ffffff","#383838"];
    // const fontColorArr = ["#ffffff", "#a8a8a8", "#383838", "#000000", "#f4f1de", "#3a5a40", "#293241", "#e56b6f"];

    // alert(this.state.errorEmailMessage)

    // const handleAccessTokenClose = (e) => {
    //   e.preventDefault();
    //   this.setState({
    //     swal: {
    //       show: false,
    //     },
    //   });
    // };

    return (
      <div className="form">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
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

            <div className="div_business">
              <label className="form-group__label">Email</label>
              <input
                type="text"
                value={email}
                name="email"
                onChange={handleChange("email")}
                className="form-group__input"
              />
              <p className="error">{this.state.errorEmailMessage}</p>
            </div>

            <div className="color_choose">
              <ColorComponent
                headingName="Theme Color"
                colorFor="theme_color"
                handleData={handleData}
                defaultColor={defaultColor}
                storeData={storeData}
                colorArray={themeColorArr}
              />
              <ColorComponent
                headingName="Font Color"
                colorFor="font_color"
                handleData={handleData}
                defaultColor={defaultColor}
                storeData={storeData}
                colorArray={fontColorArr}
              />
            </div>

            <div className="form-group__element font_selector_dropdown">
              <label className="form-group__label">Select Font</label>
              <select
                id="input-font"
                name="fontchoices"
                className="form-group__input"
                onChange={(e) => handleFontChange(e)}
                value={this.props.storeData.fontchoices}
              >
                <option value=""> -- Choose Font -- </option>
                <option value="Times-new-roman">Times New Roman</option>
                <option value="Arial">Arial</option>
                <option value="Algerian">Algerian</option>
                <option value="Berlin-sans-fb">Berlin Sans FB</option>
                <option value="bold" className="bolder">
                  Tebal
                </option>
              </select>
              <p className="error">{this.state.errorFontMessage}</p>
            </div>

            <PickLogo
              handleChange={handleChange}
              onSelectImageHandler={onSelectImageHandler}
            />

            <StoreDetails
              handleChange={handleChange}
              product_display={product_display}
              storeData={storeData}
              handleData={handleData}
            />
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

export default BusinessDetails;
