import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

function FormControlSingleSelect(props) {
    const {labelData, dataDD, setData, size, variantData, mtop, values} = props
  return (
    <>
        <FormControl sx={{ minWidth: 120, width: size, mt:mtop?mtop:0 }} size="small" variant={variantData}>
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
            {dataDD.map((items, index) => (
              <MenuItem key={index} value={values?items.uuid:items.key}>{values?items.name:items.key}</MenuItem>
            ))}
          </Select>
        </FormControl>
    </>
  )
}

export default FormControlSingleSelect