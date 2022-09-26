import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

function FormControlSingleSelect(props) {
    const {labelData, dataDD, setData, size, variantData, mtop, values, data} = props
  return (
    <>
        <FormControl sx={{ minWidth: 120, width: size, mt:mtop?mtop:0 }} size="small" variant={variantData}>
          <InputLabel id="demo-select-small" required>{labelData}</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={data}
            label={labelData}
            onChange={(e) => {
                setData(e.target.value);
            }}
          >
            {dataDD.map((items, index) => (
              <MenuItem key={index} value={values?items.name:items.key}>{values?items.name:items.key}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </>
  )
}

export default FormControlSingleSelect