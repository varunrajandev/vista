import * as React from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import YcwStepper from "../Stepper/YcwStepper";
function AddNewYcw() {
  return (
    <Box bgcolor="#E1E2E3" padding="20px" flex={7} minWidth={"90%"}>
      {/* STEPPER */}
      <YcwStepper/>
    </Box>
  );
}
export default AddNewYcw;

