import React, { Component } from "react";
import StepperCompo from "./Stepper/StepperCompo";
import axios from "axios";

class PickTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickThemeError: "",
      theme_id: "",
    };
  }

  continue = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", this.props.storeData.themeFile);
      // formData.append('themeFile', this.props.storeData.themeFile);
      formData.append("businessname", this.props.storeData.businessname);
      formData.append("storename", this.props.storeData.storename);
      formData.append("theme_color", this.props.storeData.theme_color);
      formData.append("access_token", this.props.storeData.access_token);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      console.log("before-click");

      // console.log("after-click");
      // this.props.nextStep();

      // e.preventDefault();
      axios
        .post(
          `${process.env.REACT_APP_FRONTEND_URL}api/upload/store/theme`,
          formData,
          config
        )
        .then((response) => {
          // alert(response.data.message);
          if (response.data.status === "error") {
            this.setState({
              pickThemeError: response.data.message,
            });
          } else {
            console.log(response.data);

            this.setState({
              pickThemeError: "",
              theme_file_name: response.data.theme_name,
              theme_id: response.data.theme_id,
            });

            this.props.sendDataToParent(response.data.theme_id);
            this.props.nextStep();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { onSelectThemeHandler, handleChange } = this.props;

    return (
      <div className="form">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        
        <form>
          <StepperCompo count={6} />
          <div className="form-group Main_group_log">
            <div className="form-group__element Pick_logo_div">
              <h4>Upload Theme (zip file)</h4>
              
             
              
              <div className="Add_file_div">
                <label className="form-group__label" for="storeLogo">
                  <span className="material-symbols-outlined">add</span>
                  Add File
                </label>
                {/* <input type='file' value={pickLogo} name='storeLogo' onChange={handleChange('pickLogo')} className='form-group__input'/> */}
                <input
                  type="file"
                  id="storeLogo"
                  name="storeLogo"
                  onChange={(e) => onSelectThemeHandler(e.target.files)}
                  className="form-group__input"
                />
              </div>

              <p className="error">{this.state.pickThemeError}</p>

            </div>

            <input
              type="hidden"
              id="theme_id"
              value={this.state.theme_id}
              ref={(input) => (this.inputElement = input)}
              name="theme_id"
              onClick={handleChange("theme_id")}
            />
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

export default PickTheme;
