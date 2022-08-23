import React from "react";
import { Box } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { steps } from "../../../../Data";
function JobTimeline() {
  return (
    <>
      <Box mt={8} sx={{ width: "100%"  }}>
        <Stepper sx={{color:"green"}} activeStep={8} alternativeLabel>
          {steps.map((label) => (
            <Step  key={label}>
              <StepLabel >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
}
export default JobTimeline;