import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
function Stages() {


  function refreshPage() {
    window.location.reload(false);
    }
  return (
    <>
      <Box width={700} p={4} sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Stage: </h1>
        <Button
          sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
          variant="outlined"
       onClick={refreshPage}
       >
          CLOSE
        </Button>
      </Box>
    </>
  )
}

export default Stages