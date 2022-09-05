import { Box } from '@mui/material';
import React from 'react';

function BasicInfo() {
  return (
    <>
      <Box
        mr={6}
        sx={{
          display: 'flex',
          justifyContent: "space-between",
          fontSize: "11px",
          fontWeight: "500",
          letterSpacing: "1px"
        }}
      >
        <Box
          bgcolor="#EDF4FF"
          padding="12px 25px 30px 12px"
          width="40%"
          sx={{
            borderRadius: "8px",
            lineHeight: "25px"
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <p>CUSTOMER ID</p>
                <p>CXY5555110P</p>
              </Box>
              <Box>
                <p>CUSTOMER NAME</p>
                <p>RAM KARAN SHERA</p>
              </Box>
              <Box>
                <p>CUSTOMER PHONE</p>
                <p>9988776655</p>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "2rem",

            }}
          >
            <p>CUSTOMER ADDRESS</p>
            <p>5D 66o awas vikas hanspuram naubsta kanpur nagar</p>
          </Box>
        </Box>
        <Box
          bgcolor="#EDF4FF"
          padding="10px 20px 10px 10px"
          width="53%"
          sx={{
            borderRadius: "8px",
          }}
        >
          <Box >
            <Box align="left"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                lineHeight: "25px"
              }}
            >
              <Box>
                <p>JOB ID</p>
                <p>CXY5555110P</p>
              </Box>
              <Box>
                <p>WORK TYPE</p>
                <p>Type of the work</p>
              </Box>
              <Box>
                <p>WORK LOCATION</p>
                <p>Locality and city</p>
              </Box>
              <Box>
                <p>WORK HOUR</p>
                <p>4 hour</p>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <p>WORK START TIME</p>
                <p>6:00 PM</p>
              </Box>
              <Box ml={-3}>
                <p>WORK START TIME</p>
                <p>10:00 AM</p>
              </Box>
              <Box>
                <p># OF SHIFTs</p>
                <p>Once per day</p>
              </Box>
              <Box>
                <p>MAX. SALARY</p>
                <p>9988 -100000</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BasicInfo