import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function BasicInfo(props) {

  const [languageDropdown, setLanguageDropdown] = useState([]);
  const [genderDropdown, setGenderDropdown] = useState([]);
  const [trainingTypeDropdown, setTrainingTypeDropdown] = useState([]);
  const [agePreferenceDropdown, setAgePreferenceDropdown] = useState([]);
  const [religionPreferenceDropdown, setReligionPreferenceDropdown] = useState([]);
  const [jobTypeDropdown, setJobDropdown] = useState([]);
  const [cxid,setCxid]=useState("");

  const {
    houseTypes, setHouseTypes,
    jobTypes, setJobTypes,
    workDuration, setWorkDuration,
    dailyStartTime, setDailyStartTime,
    membersInFamily, setMembersInFamily,
    languagePreference, setLanguagePreference,
    trainingPreference, setTrainingPreference,
    religionPreference, setReligionPreference,
    agePreference, setAgePreference,
    genderPreference, setGenderPreference,
    value, setValue,
    budgetMax, setBudgetMax,
    budgetMin, setBudgetMin,
    remarks, setRemarks,
    sizeOfHouse, setSizeOfHouse,
    pets, setPets,
    noOfPets, setNoOfPets,


  } = props


  useEffect(() => {
    const dataFetch = async () => {
      const jobTypeApidata = await fetch("http://13.126.160.155:8080/user/drop-down/get/jobType");
      const languageApi = await fetch("http://13.126.160.155:8080/user/get/language");
      const genderApidata = await fetch("http://13.126.160.155:8080/user/get/gender");
      const trainingTypedata = await fetch("http://13.126.160.155:8080/user/get/trainingType");
      const agePreferenceDropdown = await fetch("http://13.126.160.155:8080/user/get/agePreference");
      const religionPreferenceDropdown = await fetch("http://13.126.160.155:8080/user/get/religion");


      let jobTyperes = await jobTypeApidata.json();
      let language = await languageApi.json();
      let gender = await genderApidata.json();
      let training = await trainingTypedata.json();
      let agePreference = await agePreferenceDropdown.json();
      let religionPreference = await religionPreferenceDropdown.json();


      setJobDropdown(jobTyperes.data);
      setLanguageDropdown(language.data);
      setGenderDropdown(gender.data);
      setTrainingTypeDropdown(training.data);
      setAgePreferenceDropdown(agePreference.data);
      setReligionPreferenceDropdown(religionPreference.data);
    }

    dataFetch()
  }, [])


  console.log(
    workDuration,
    dailyStartTime,
    membersInFamily,
    agePreference,
    genderPreference,
    budgetMax,
    budgetMin,
    remarks,
    sizeOfHouse,
    pets,
    noOfPets,
    value
  )


  const handleChange = (event) => {
    setJobTypes(event.target.value);
  };

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
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {jobTypeDropdown.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
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

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker

            label="Preferred Start Time"
            value={dailyStartTime}
            disableIgnoringDatePartForTimeValidation={false}
            onChange={(newValue) => {
              setDailyStartTime(newValue);
            }}
            renderInput={(params) => (
              <TextField size="small" sx={{ width: "18%" }} {...params} />
            )}
          />
        </LocalizationProvider>

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
            {languageDropdown.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
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

            {trainingTypeDropdown.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
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
            {religionPreferenceDropdown.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
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
            {agePreferenceDropdown.map((item) => (
              <MenuItem value={item.value}>{item.value}</MenuItem>
            ))}
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
            {genderDropdown.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Require From Date"
            value={value}
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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


        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Pets?*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Pets? "
            onChange={(e) => {
              setPets(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="No of Pets*"
          onChange={(e) => {
            setNoOfPets(e.target.value);
          }}
          disabled={!pets}
        />

        <div style={{ width: "18%" }}></div>
        <div style={{ width: "18%" }}></div>
      </Box>
    </>
  );
}

export default BasicInfo;
