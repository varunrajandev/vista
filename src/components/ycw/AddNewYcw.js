import * as React from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import YcwStepper from "../Stepper/YcwStepper";


function AddNewYcw() {
 

  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
      {/* STEPPER */}
      <YcwStepper/>
    </Box>
  );
}

export default AddNewYcw;

