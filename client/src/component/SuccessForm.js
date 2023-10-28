import React, { Component } from 'react';
import StepperCompo from './Stepper/StepperCompo';
import check_mark_img from "../images/check-mark.png";

class SuccessForm extends Component {
  continue = e => {
    e.preventDefault(); 
      this.props.nextStep();
  }
  
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    

    return (
      <div className='form'>
        <form>
          <StepperCompo count={8}/>
          <div className='container_card Successfully'>
            <div className='form-group__element'>
              <label className='form-group__label'>
                <img src={check_mark_img} alt="sucess card" />
              Store Created Successfully.
              </label>
            </div>
          </div>
            

        </form>
      </div>
    )
  }
}

export default SuccessForm;