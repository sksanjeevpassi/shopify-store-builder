import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";
import ColorComponent from "./ColorComponent";

class PickColor extends Component {
  constructor(props) {
    super(props);
    const defaultColor = ["#003a6b","#a8a8a8"];
    this.props.handleData({ theme_color: defaultColor[0] });
    this.props.handleData({ font_color: defaultColor[1] });

    this.state = {
      errorFontMessage: "",
    };
  }

  continue = (e) => {
    e.preventDefault();
    const isValid = this.props.storeData.fontchoices;
    if (!isValid) {
      this.setState({ errorFontMessage: "Please Choose Font." });
      return false;
    } else {
      this.setState({ errorFontMessage: "" });
    }
    console.log(this.props);

    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { handleData, storeData } = this.props;

    // const defaultColor = ["#003a6b","#a8a8a8"];
    const defaultColor = ["#a8a8a8","#003a6b"];

    const handleFontChange = (e) => {
      if (e.target.value) {
        this.setState({ errorFontMessage: "" });
      }

      this.setState({ fontchoices: e.target.value });
      this.props.handleData({ fontchoices: e.target.value });
    };

    const themeColorArr = ["#ff493c","#31d2ff","#8cff6f","#fda437"];
    // const fontColorArr = ["#a8a8a8","#000000","#ffffff","#383838"];
    const fontColorArr = ["#ffffff","#a8a8a8","#383838","#000000"];
    // const fontColorArr = [];

    // const fontObj = ["Times-new-roman","Arial","Algerian","Berlin-sans-fb"];

    return (
      <div className="form">
        <form>
          <StepperCompo count={1} />
          <div className="container_card">
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
          </div>

          <div className="buttons footer_btn">
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

export default PickColor;
