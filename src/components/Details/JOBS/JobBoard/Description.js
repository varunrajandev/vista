import React from "react";
import { Box } from "@mui/system";

function Description() {
  return (
    <>
      <Box
        marginTop="2rem"
        border={1}
        sx={{
          borderRadius: "7px",
          borderStyle: "dashed",
          width: "100%",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
        <h6 style={{ color: "grey" }}>Job Id: Y1234567</h6>
        <h5>Housekeeping Job: 4 ( hrs)</h5>
        <div style={{ fontSize: "13px" }}>CX NAME :Mamta Devi</div>
      </Box>
    </>
  );
}
export default Description;
