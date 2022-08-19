import React from 'react'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom';
import YcwNav from '../../components/Details/YcwNav';

function Details() {
    const { id } = useParams();
  return (
    <Box bgcolor="#e1e2e3" flex={7}>
        <YcwNav/>
    </Box>
  )
}

export default Details