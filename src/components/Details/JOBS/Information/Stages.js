import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
function Stages() {
  return (
    <>
      <Box width={700} p={4} sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Stage: </h1>
        <Button
          sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
          variant="outlined"
        >
          CLOSE
        </Button>
      </Box>
    </>
  )
}

export default Stages