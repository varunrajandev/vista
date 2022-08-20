import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { JobType, PreferredWorkingHour } from "../../AlllData";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function JobRequirement(props) {
const {  
  openToTraining, setOpenToTraining,
  preferJob, setPreferJob,
  preferWorkHour, setPreferWorkHour,
  startTime, setStartTime,
  endTime, setEndTime,
  vehicleAvailable, setVehicleAvailable,
  minSal, setMinSal,
  maxSal, setMaxSal,
  traningMode, setTraningMode,
  jobRemarks, setJobRemarks,} = props;


  return (
    <Box  
    sx={{
      marginTop: 7,
      display: "grid",
      gap: 1,
    }}>
      <h5>Job Requirements</h5>
      <Box
        sx={{
          display: "flex",
          flexWrap:"wrap",
          justifyContent:"space-between"

        }}
      >
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={JobType}
          disableCloseOnSelect
          getOptionLabel={(option) => option.job}
          onChange={(event, newValue) => {
            setPreferJob([...newValue]);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.job}
            </li>
          )}
          style={{ width: "18%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Preferred Job Types"
              placeholder="Favorites"
              size="small"
            />
          )}
        />

        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={PreferredWorkingHour}
          disableCloseOnSelect
          getOptionLabel={(option) => option.hour}
          onChange={(event, newValue) => {
            setPreferWorkHour([...newValue]);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.hour}
            </li>
          )}
          style={{ width: "18%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Preferred Working Hours"
              placeholder="Favorites"
              size="small"
            />
          )}
        />

          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Preferred Start Time"
              value={startTime}
              disableIgnoringDatePartForTimeValidation={false}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "18%" }} {...params} />
              )}
            />
          </LocalizationProvider>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Preferred End Time"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => (
                <TextField size="small" sx={{ width: "18%" }} {...params} />
              )}
            />
          </LocalizationProvider>

          <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
          <InputLabel id="demo-select-small">Cycle/Bike available for travel?</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Cycle/Bike available for travel?"
            onChange={(e)=>{
              setVehicleAvailable(e.target.value)
            }}
          >
          
            <MenuItem value={true}>YES</MenuItem>
            <MenuItem value={false}>NO</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt:"30px"
        }}
      >
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Expected Salary[min]"
          variant="outlined"
          onChange={(e)=>{
            setMinSal(e.target.value)
          }}
        />
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Expected Salary[max]"
          variant="outlined"
          onChange={(e)=>{
            setMaxSal(e.target.value)
          }}
        />
        <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
          <InputLabel id="demo-select-small">Open to Training?</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Open to Training?"
            onChange={(e)=>{
              setOpenToTraining(e.target.value)
            }}
          >
          
            <MenuItem value={true}>YES</MenuItem>
            <MenuItem value={false}>NO</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
          <InputLabel id="demo-select-small">Training Mode</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Training Mode"
            disabled={!openToTraining}
            onChange={(e)=>{
              setTraningMode(e.target.value)
            }}
          >
          
            <MenuItem value={"Online"}>Online</MenuItem>
            <MenuItem value={"Offline"}>Offline</MenuItem>
            <MenuItem value={"Both"}>Both</MenuItem>
          </Select>
        </FormControl>

      
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Job Remarks"
          variant="outlined"
          onChange={(e)=>{
            setJobRemarks(e.target.value)
          }}
        />
          
      </Box>
    </Box>
  );
}

export default JobRequirement;
