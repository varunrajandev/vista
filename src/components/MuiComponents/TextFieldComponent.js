import { TextField } from '@mui/material';
import React from 'react'

function TextFieldComponent(props) {
    const {labelData, setData, size, data} = props;

  return (
    <>
        <TextField
          sx={{ width: size }}
          size="small"
          label={labelData}
          value={data}
          variant="outlined"
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
    
    </>
  )
}

export default TextFieldComponent