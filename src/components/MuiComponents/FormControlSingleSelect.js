import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

function FormControlSingleSelect(props) {
    const {labelData, dataDD, setData, size} = props
  return (
    <>
        <FormControl sx={{ minWidth: 120, width: size }} size="small">
          <InputLabel id="demo-select-small">{labelData}</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label={labelData}
            onChange={(e) => {
                setData(e.target.value);
            }}
          >
            {dataDD.map((items) => (
              <MenuItem value={items.key}>{items.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </>
  )
}

export default FormControlSingleSelect