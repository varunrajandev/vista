import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import React from 'react'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />
const label = { inputProps: { "aria-label": "Checkbox demo" } };;

function MultiSelected(props) {
  const {labelData, dataDD, setData, size, values, data} = props
  return (
    <>
      <Autocomplete
          multiple
          size='small'
          options={dataDD}
          value={data}
          disableCloseOnSelect
          getOptionLabel={(option) =>values?option.name:option.key}
          onChange={(event, newValue) => {
            setData([...newValue]);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                size='small'
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {values?option.name:option.value}
            </li>
          )}
           style={{ width: size }}
           renderInput={(params) => (
            <TextField
              {...params}
              label={labelData}
              size="small"
            />
          )}
        />
    </>
  )
}

export default MultiSelected

