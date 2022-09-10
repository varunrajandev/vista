import { TextField } from '@mui/material';
import React from 'react'

function TextFieldComponent(props) {
    const {labelData, setData, size} = props;

  return (
    <>
        <TextField
          sx={{ width: size }}
          size="small"
          id="outlined-basic"
          label={labelData}
          variant="outlined"
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
    
    </>
  )
}

export default TextFieldComponent