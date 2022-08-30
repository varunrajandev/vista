import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const StyleLi = styled("li")({
  listStyle: "none",
  fontSize: "20px",
  fontWeight: "600",
  color:"gray"
});

function YcwNav() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ fontWeight: "400", fontSize: "20px" }}>YCW#</p>
          <p style={{ fontWeight: "800", fontSize: "20px" }}>Y1234567</p>
          <Box sx={{}}>STATUS</Box>
        </div>

        <Button
          sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
          variant="outlined"
        >
          CLOSE
        </Button>
      </Box>

      {/*NavBar */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          mt: "60px",
          backgroundColor: "#edf4ff",
          padding:"15px",
          borderBottomLeftRadius:"15px",
          borderBottomRightRadius:"15px"
        }}
      >
        <StyleLi>PROFILE</StyleLi>
        <StyleLi>JOBS</StyleLi>
        <StyleLi>LEDGER</StyleLi>
        <StyleLi>SUPPORT</StyleLi>
      </Box>
    </>
  );
}

export default YcwNav;
