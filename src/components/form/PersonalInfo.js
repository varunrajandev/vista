import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { maritalstatus } from "../../AlllData";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

function PersonalInfo() {
  const [walk, setWalk] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [mname, setMname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [alternateNumber, setAlternateNumber] = React.useState();
  const [whatsappAvailable, setWhatsappAvailable] = React.useState();
  const [whatsapp, setWhatsapp] = React.useState();
  const [value, setValue] = React.useState();
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [religion, setReligion] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [educationalRemarks, setEducationalRemarks] = React.useState("");
  const [covidStatus, setCovidStatus] = React.useState("");
  const [medicalCondition, setMedicalCondition] = React.useState("");
  const [ submitted, setSubmitted ] = React.useState(false)

  const handleChange = (event) => {
    setWalk(event.target.value);
  };

  setTimeout(() => {
    setSubmitted(false)
  }, 2000);

  console.log({
    medicalCondition,
    covidStatus,
    educationalRemarks,
    education,
    religion,
    maritalStatus,
    value,
    whatsapp,
    whatsappAvailable,
    alternateNumber,
    phoneNumber,
    walk,
    gender,
    fname,
    mname,
    lname,
  });
  return (
    <form>
      <h5 style={{ marginBottom: "6px" }}>Personal Information</h5>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Sourcing Channel</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={walk}
            label="Sourcing Channel"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Apna"}>Apna</MenuItem>
            <MenuItem value={"Quikr"}>Quikr</MenuItem>
            <MenuItem value={"OLX"}>OLX</MenuItem>
            <MenuItem value={"Newspaper"}>Newspaper</MenuItem>
            <MenuItem value={"JobHai"}>JobHai</MenuItem>
            <MenuItem value={"Facebook"}>Facebook</MenuItem>
            <MenuItem value={"Website"}>Website</MenuItem>
            <MenuItem value={"Helpers4U"}>Helpers4U</MenuItem>
            <MenuItem value={"Field Activity"}>Branch Officer</MenuItem>
            <MenuItem value={"Broker/Agency"}>Broker/Agency</MenuItem>
            <MenuItem value={"Reference"}>Reference</MenuItem>
            <MenuItem value={"WorkIndia"}>WorkIndia</MenuItem>
            <MenuItem value={"Instagram"}>Instagram</MenuItem>
            <MenuItem value={"Field office"}>Field office</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          disabled={walk === "Others" ? false : true}
          id="outlined-basic"
          label="Other Source"
          placeholder="Please Mention..."
          variant="outlined"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="First Name*"
          variant="outlined"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Middle Name*"
          variant="outlined"
          onChange={(event) => {
            setMname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Last Name*"
          variant="outlined"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <FormControl
          sx={{ minWidth: 120, display: "flex", width: "18%" }}
          size="small"
        >
          <InputLabel id="demo-select-small">Gender*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={gender}
            label="gender"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Transgender"}>Transgender</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Phone Number*"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Alternate Phone Number*"
          onChange={(e) => {
            setAlternateNumber(e.target.value);
          }}
        />
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Whatsapp Available?*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Whatsapp Available "
            onChange={(e) => {
              setWhatsappAvailable(e.target.value);
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
          label="Whatsapp Number*"
          onChange={(e) => {
            setWhatsapp(e.target.value);
          }}
          disabled={!whatsappAvailable}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="DOB"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ width: "18%" }} />
            )}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Marital Status*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Marital Status*"
            onChange={(e) => {
              setMaritalStatus(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {maritalstatus.map((item) => (
              <MenuItem value={item.status}>{item.status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Religion</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Religion"
            onChange={(e) => {
              setReligion(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Muslim"}>Muslim</MenuItem>
            <MenuItem value={"Hindu"}>Hindu</MenuItem>
            <MenuItem value={"Christian"}>Christian</MenuItem>
            <MenuItem value={"Sikh"}>Sikh</MenuItem>
            <MenuItem value={"Jain"}>Jain</MenuItem>
            <MenuItem value={"Others"}>Others</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">
            Educational Qualifications
          </InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Educational Qualifications"
            onChange={(e) => {
              setEducation(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            <MenuItem value={"No Education"}>No Education</MenuItem>
            <MenuItem value={"5th"}>5th</MenuItem>
            <MenuItem value={"8th"}>8th</MenuItem>
            <MenuItem value={"10th"}>10th</MenuItem>
            <MenuItem value={"12th"}>12th</MenuItem>
            <MenuItem value={"Pursuing Graduation"}>
              Pursuing Graduation
            </MenuItem>
            <MenuItem value={"Graduate"}>Graduate</MenuItem>
            <MenuItem value={"Post Graduate"}>Post Graduation</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Educational Remarks"
          variant="outlined"
          onChange={(e) => {
            setEducationalRemarks(e.target.value);
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">
            COVID Vaccination Status
          </InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="COVID Vaccination Status*"
            onChange={(e) => {
              setCovidStatus(e.target.value);
            }}
          >
            <MenuItem value={"Unvaccinated"}>Unvaccinated</MenuItem>
            <MenuItem value={"First Dose"}>First Dose</MenuItem>
            <MenuItem value={"Both Dose"}>Both Dose</MenuItem>
            <MenuItem value={"Booster"}>Booster</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "79.5%" }}
          size="small"
          id="outlined-basic"
          label="Medical Condition(if any)"
          variant="outlined"
          onChange={(e) => {
            setMedicalCondition(e.target.value);
          }}
        />
      </Box>
      <Box sx={{display:"grid", gap:4, justifyContent:"right", mt:2}}>
        <LoadingButton
          loading={submitted}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          size="small"
          onClick={()=>{
            setSubmitted(true)
          }}
        >
          Save
        </LoadingButton>
      </Box>
    </form>
  );
}

export default PersonalInfo;
