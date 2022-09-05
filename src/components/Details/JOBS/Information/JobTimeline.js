import React from "react";
import { Box } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { steps } from "../../../../Data";
import Stages from "./Stages";
import { Drawer } from "@mui/material";
import { List } from "@mui/material";

function JobTimeline() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Box mt={8} sx={{ width: "100%" }}>
        <Stepper sx={{ cursor: "pointer",}} activeStep={8} alternativeLabel >
          {steps.map((label) => (
            <Step key={label} onClick={() => setOpen(true)} >
              <StepLabel >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Drawer anchor="right" open={open} onClose={(() => setOpen(false))}>
        <List>
          <Stages />
        </List>
      </Drawer>
    </>
  );
}
export default JobTimeline;