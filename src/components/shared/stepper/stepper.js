/*****************NPM DEPENDENCIES ******************/
import React, { memo } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

/**
 * @description
 * @param {*} { steps, active, children, handleStepper }
 */
const stepper = ({ steps, active, children, handleStepper, ...rest }) => (
  <>
    <Stepper activeStep={active - 1} alternativeLabel>
      {steps.map((step, ind) => (
        <Step
          {...rest}
          sx={{ cursor: 'pointer' }}
          onClick={() => handleStepper(ind + 1)}
          key={step}
        >
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {children}
  </>
);

// Default Export
export default memo(stepper);
