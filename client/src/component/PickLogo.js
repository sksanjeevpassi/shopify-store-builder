import React, { Component } from "react";

class PickLogo extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { onSelectImageHandler } = this.props;

    return (
      <div className="form-group__element Pick_logo_div">
        <h4>Pick Logo</h4>
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
            onChange={(e) => onSelectImageHandler(e.target.files)}
            className="form-group__input"
          />
        </div>
        <p>
          <a
            rel="noopener noreferrer"
            className="btn btn-general"
            href="https://turbologo.com/"
            target="_blank"
          >
            Generate Logo
          </a>
        </p>
      </div>
    );
  }
}

export default PickLogo;
