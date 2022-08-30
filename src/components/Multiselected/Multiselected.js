import React from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Cuisines } from "../../AlllData";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function Multiselected(props) {
    const {data, setData} = props
  return (
    <>
         <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={Cuisines}
          disableCloseOnSelect
          getOptionLabel={(option) => option.dish}
          onChange={(event, newValue) => {
            setData([...newValue]);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.dish}
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={data}
              placeholder="Favorites"
              size="small"
            />
          )}
        />
    </>
  );
}

export default Multiselected;
