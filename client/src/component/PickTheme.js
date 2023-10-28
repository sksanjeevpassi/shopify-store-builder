import React, { Component } from "react";
import { TailSpin } from 'react-loader-spinner'
class PickTheme extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     pickThemeError: "",
  //     theme_id: "",
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { handleData,pickThemeError,themFileSubmit } = this.props;
    
    const onSelectThemeHandler = async (e) => {
      console.log(this.props);
      this.setState({ loading: true });

      e.preventDefault();
      const files = e.target.files;
      handleData({
        themeFile: files[0],
      });
      try {
        // themFileSubmit(e);
        await themFileSubmit(e);
        if (this.storeData.state.theme_id) {
          this.setState({ loading: false });
        }else{
          this.setState({ loading: false });
        }
      } catch (error) {
        // Handle errors from await
        this.setState({ loading: false });
        console.log(error);
      }
    }

    return (
     
          <div className="form-group Main_group_log">
            <div className="form-group__element">
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
                  onChange={(e) => onSelectThemeHandler(e)}
                  className="form-group__input"
                />
              </div>

              <p className="error">{pickThemeError}</p>

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

            
          </div>
    );
  }
}

export default PickTheme;
