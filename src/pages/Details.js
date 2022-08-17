import React from 'react'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom';

function Details() {
    const { id } = useParams();
  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7}>
        this is the details page of id {id}
    </Box>
  )
}

export default Details