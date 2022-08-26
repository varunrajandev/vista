import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Language } from "../../AlllData";
import { JobType } from "../../AlllData";

function BasicInfo() {
  const [jobTypes, setJobTypes] = React.useState("");
  const [workDuration, setWorkDuration] = React.useState("");
  const [dailyStartTime, setDailyStartTime] = React.useState("");
  const [membersInFamily, setMembersInFamily] = React.useState("");
  const [languagePreference, setLanguagePreference] = React.useState("");
  const [trainingPreference, setTrainingPreference] = React.useState("");
  const [religionPreference, setReligionPreference] = React.useState("");
  const [value, setValue] = React.useState("");
  const [agePreference, setAgePreference] = React.useState();
  const [genderPreference, setGenderPreference] = React.useState();
  const [budgetMax, setBudgetMax] = React.useState();
  const [budgetMin, setBudgetMin] = React.useState();
  const [remarks, setRemarks] = React.useState("");
  const [sizeOfHouse, setSizeOfHouse] = React.useState();
  const [pets, setPets] = React.useState();
  const [noOfPets, setNoOfPets] = React.useState();

  const [newData, setNewData] = React.useState([]);


  // useEffect(() => {
  // const dataFetch = async ()=>{
  //   let data = await fetch("http://3.111.186.100:8080/user/get/religion");
  //   let res = await data.json();
  //  setNewData(res.data);
  // }
  //   dataFetch()
  // }, [])
  

  const handleChange = (event) => {
    setJobTypes(event.target.value);
  };

  const handleClick = ()=>{
    console.log({
      budgetMin,
      budgetMax,
      genderPreference,
      agePreference,
      religionPreference,
      trainingPreference,
      jobTypes,
      languagePreference,
      workDuration,
      dailyStartTime,
      membersInFamily,
      value,
      remarks,
    });

  }
 

  return (
    <>
      <h5 style={{ marginBottom: "6px" }}>Personal Information</h5>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: "18%" }} size="small">
          <InputLabel id="demo-select-small">Job Type</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={jobTypes}
            label="Job Type"
            onChange={handleChange}
            required={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {JobType.map((item) => (
              <MenuItem value={item.job}>{item.job}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Work Duration(in hours)"
          variant="outlined"
          onChange={(event) => {
            setWorkDuration(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Daily Start Time"
          variant="outlined"
          onChange={(event) => {
            setDailyStartTime(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="# Members in Family*"
          variant="outlined"
          onChange={(e) => {
            setMembersInFamily(e.target.value);
          }}
        />

        <FormControl sx={{ minWidth: "18%", display: "flex" }} size="small">
          <InputLabel id="demo-select-small">Language Preference</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={languagePreference}
            label="Language Preference"
            onChange={(event) => {
              setLanguagePreference(event.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Language.map((item) => (
              <MenuItem value={item.language}>{item.language}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <FormControl sx={{ minWidth: "18%", display: "flex" }} size="small">
          <InputLabel id="demo-select-small">Training Preference</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={trainingPreference}
            label="Training Preference"
            onChange={(event) => {
              setTrainingPreference(event.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Online"}>Online</MenuItem>
            <MenuItem value={"Offline"}>Offline</MenuItem>
            <MenuItem value={"Both"}>Both</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "18%", display: "flex" }} size="small">
          <InputLabel id="demo-select-small">Religion Preference</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={religionPreference}
            label="Religion Preference"
            onChange={(event) => {
              setReligionPreference(event.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {newData.map((item)=>(
              <MenuItem value={item.value}>{item.value}</MenuItem>
            ))}
            
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "18%" }} size="small">
          <InputLabel id="demo-select-small">Age Preference</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Age Preference"
            onChange={(e) => {
              setAgePreference(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"18 to 25 years"}>18 to 25 years</MenuItem>
            <MenuItem value={"25 to 30 years"}>25 to 30 years</MenuItem>
            <MenuItem value={"30 to 35 years"}>30 to 35 years</MenuItem>
            <MenuItem value={"35 to 40 years"}>35 to 40 years</MenuItem>
            <MenuItem value={"40 to 45 years"}>40 to 45 years</MenuItem>
            <MenuItem value={"45 to 50 years"}>45 to 50 years</MenuItem>
            <MenuItem value={"above 50 years"}>above 50 years</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: "18%" }} size="small">
          <InputLabel id="demo-select-small">Gender Preference</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Gender Preference"
            onChange={(e) => {
              setGenderPreference(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Any"}>Any</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Require From Date"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ width: "18%" }} />
            )}
          />
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Budget [max]"
          type="number"
          variant="outlined"
          onChange={(e) => {
            setBudgetMax(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Budget [min]"
          variant="outlined"
          type="number"
          onChange={(e) => {
            setBudgetMin(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "59%" }}
          size="small"
          id="outlined-basic"
          label="Remarks"
          variant="outlined"
          onChange={(e) => {
            setRemarks(e.target.value);
          }}
        />
        {/*  */}
      </Box>



      <h5 style={{ marginTop: "50px", marginBottom: "6px" }}>
        Additional Details
      </h5>

      <Box sx={{ display: "flex", justifyContent:"space-between" }}>
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Size of House(in sq. ft)"
          variant="outlined"
          onChange={(e) => {
            setSizeOfHouse(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="pets?"
          variant="outlined"
          onChange={(e) => {
            setPets(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="No of Pets"
          variant="outlined"
          onChange={(e) => {
            setNoOfPets(e.target.value);
          }}
        />

        <div style={{ width: "18%" }}></div>
        <div style={{ width: "18%" }}></div>
      </Box>

      <button onClick={handleClick}>click</button>
    </>
  );
}

export default BasicInfo;
