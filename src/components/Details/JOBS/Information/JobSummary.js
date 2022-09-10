import React from "react";
import { Box } from "@mui/system";
function JobSummary() {
  return (
    <>
      <Box
        bgcolor="#EDF4FF"
        p={2}
        pr={3}
        mt={1}
        sx={{
          borderRadius: "8px",
          fontSize: "10px",
          fontWeight: "500",
          lineHeight: "25px",
          letterSpacing: "1px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box align="left">
              <p>START DATE (EXPECTED)</p>
              <p>date</p>
            </Box>
            <Box align="left"
              sx={{
                marginTop: "2rem",
              }}
            >
              <p>END DATE (CONTRACTUAL)</p>
              <p>DATE</p>
            </Box>
            <Box align="left"
              sx={{
                marginTop: "2rem",
              }}
            >
              <p>SALARY PER MONTH (EXPECTED)</p>
              <p>12000</p>
            </Box>
          </Box>
          <Box>
            <Box align="left">
              <p>START DATE (ACTUAL)</p>
              <p>DATE</p>
            </Box>
            <Box align="left"
              sx={{
                marginTop: "2rem",
              }}
            >
              <p>END DATE (ACTUAL)</p>
              <p
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "900",
                }}
              >
                Mark End Date
              </p>
            </Box>
            <Box align="left"
              sx={{
                marginTop: "2rem",
              }}
            >
              <p>SALARY PER MONTH (ACTUAL)</p>
              <p>Type of the work</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default JobSummary;