import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import MultiSelected from './MultiSelected'

function SkillSection(props) {
    const {labelData, dataDD, setData} = props;
  return (

    <Box mt={3} display={"grid"} gap={"10px"}>
    <h5>Housekeeping Question</h5>
    <Box display={"flex"} gap={3}>
    <MultiSelected
          labelData="Question 1"
          dataDD={dataDD}
          setData={setData}
          size="23%"
        />

     <MultiSelected
         labelData="Question 2"
         dataDD={dataDD}
        setData={setData}
        size="23%"
        />
        
    </Box>
        
    </Box>
  )
}

export default SkillSection