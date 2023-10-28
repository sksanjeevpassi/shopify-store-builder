import React from 'react';
import { Stepper } from 'react-form-stepper';
import "./stepper.css";

const StepperCompo = ({count}) => {

  const stepObj = [
    { label: 'Business Name' },
    { label: 'Pick Your Color' },
    { label: 'Pick Your Logo' },
    { label: 'Setup Store' },
    { label: 'Pick a Store Name' },
    { label: 'Access Store' },
    { label: 'Pick Your Store Theme' },
    { label: 'Store Detail' },
    { label: 'Finish' },
  ];


  return (
         <Stepper
            steps={stepObj}
            activeStep={count}
            styleConfig={{
              activeBgColor: '#003a6b',
              activeTextColor: '#fff',
              inactiveBgColor: '#fff',
              inactiveTextColor: '#003a6b',
              completedBgColor: '#fff',
              completedTextColor: '#003a6b',
              size: '3em'
            }}
            className={'stepper'}
            stepClassName={'stepper__step'}
          />
  )
}

export default StepperCompo