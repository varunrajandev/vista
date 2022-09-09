import React, { useState, useEffect } from "react";
import {
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { FilterData, masterApi } from "../../AlllData";

function HouseHoldMemberInfo(props) {
const { setInputFields, inputFields } = props;

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputs", inputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        age: "",
        email: "",
        jobType: "",
        mobileNo: "",
        name: "",
        relationship: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Box
      sx={{
        marginTop: 7,
        display: "grid",
        gap: 0.3,
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Bank Account information</h5>
        <div>
          <IconButton aria-label="delete">
            <AddIcon
              sx={{
                backgroundColor: "purple",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => handleAddFields()}
            />
          </IconButton>
          <span style={{ fontSize: "13px", fontWeight: "bolder" }}>
            &nbsp; Add a new bank account
          </span>
        </div>
      </Box>
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              marginBottom: 5,
            }}
          >
            <TextField
              style={{ width: "18%" }}
              name="name"
              label="Name"
              size="small"
              value={inputField.name}
              onChange={(event) => handleChangeInput(index, event)}
            />

            <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
              <InputLabel id="demo-select-small">Relationship</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                name="relationship"
                value={inputField.relationship}
                label="Relationship"
                onChange={(event) => handleChangeInput(index, event)}
              >
                <MenuItem value={"WIFE"}>Wife</MenuItem>
              </Select>
            </FormControl>

            <TextField
              style={{ width: "18%" }}
              name="mobileNo"
              label="Mobile Number"
              type="number"
              value={inputField.mobileNo}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />

            <TextField
              style={{ width: "38.5%" }}
              name="email"
              label="Email"
              value={inputField.email}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />
 
            <TextField
              style={{ width: "18%" }}
              name="age"
              label="Age"
              value={inputField.age}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />

            <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
              <InputLabel id="demo-select-small">Occupation</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                name="jobType"
                value={inputField.jobType}
                label="Occupation"
                onChange={(event) => handleChangeInput(index, event)}
              >
                <MenuItem value={"DRIVER"}>Driver</MenuItem>
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                justfyContent: "space-between",
                width: "18%",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="delete">
                <DeleteIcon  onClick={() => handleRemoveFields(index)} />
              </IconButton>
            </div>
          </Box>
        ))}
      </form>
    </Box>
  );
}

export default HouseHoldMemberInfo;
