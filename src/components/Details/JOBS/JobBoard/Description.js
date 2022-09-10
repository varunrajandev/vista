import React from "react";
import { Box } from "@mui/system";
import { Link } from "react-router-dom"

function Description() {
  const id = 123456;
  return (
    <>
      <Link style={{ textDecoration: "none" }} to={`/ycw/add/dashboard/basicinfo/${id}`}>
        <Box
          marginTop="2rem"
          border={1}
          sx={{
            borderRadius: "7px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            width: "100%",
            boxSizing: "border-box",
            padding: "7px",
            color: "black",
            lineHeight: "22px",
            border:"none"
          }}
        >
          <h5 style={{ color: "grey" }}>Job Id: Y1234567</h5>
          <h5>Housekeeping Job: 4 ( hrs)</h5>
          <div style={{ fontSize: "13px" }}>CX NAME :Mamta Devi</div>
          <div style={{ fontSize: "13px" }}>Name Of Stage</div>

        </Box>
      </Link>
    </>
  );
}
export default Description;
