import React, { Component } from 'react';
import StepperCompo from './Stepper/StepperCompo';

class PickLogo extends Component {
  
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };




  render() {
    const { 
      pickLogo,
      handleChange, 
      onSelectImageHandler, 
    } = this.props;

    return (
      
      <div className='form'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <form>
          <StepperCompo count={2}/>
          <div className='form-group Main_group_log'>   
            <div className='form-group__element Pick_logo_div'>
              <h4>
              Pick Logo
              </h4>
            <div className='Add_file_div'>
            <label className='form-group__label' for="storeLogo">
            <span className="material-symbols-outlined">
            add
            </span> 
            
            Add File
            
              </label>
             {/* <input type='file' value={pickLogo} name='storeLogo' onChange={handleChange('pickLogo')} className='form-group__input'/> */}
             <input type="file" id="storeLogo" name='storeLogo' onChange={(e) => onSelectImageHandler(e.target.files)} className='form-group__input' />
            </div>

            

            </div>

            <div className='buttons footer_btn'>
            <button className='buttons__button buttons__button--back' onClick={this.back}>Back</button>
            <button className='buttons__button buttons__button--next' onClick={this.continue}>Next</button>
          </div>
          
          </div>
            
        </form>
      </div>
    )  
  }
}

export default PickLogo;