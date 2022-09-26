import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { maritalstatus, masterApi, sourcing } from "../../AlllData";
import { multiStepContext } from "../../ContextApi/StepContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
      MuiFormLabel: {
          styleOverrides: {
              asterisk: { color: "red" },
          },
      },
  },
})



function PersonalInfo(props) {
  const [sourcingDD, setSourcingDD] = useState([])
  const [religionDD, setReligionDD] = useState([])
  const [maritalDD, setMaritalDD] = useState([])
  const [genderDD, setGenderDD] = useState([])
  const [covidDD, setCovidDD] = useState([])
  const [educationDD, setEducationDD] = useState([])
  





  const {
    walk, setWalk,
    fname, setFname,
    mname, setMname,
    lname, setLname,
    gender, setGender,
    phoneNumber, setPhoneNumber,
    alternateNumber, setAlternateNumber,
    whatsappAvailable, setWhatsappAvailable,
    whatsapp, setWhatsapp,
    birthday, setBirthday,
    maritalStatus, setMaritalStatus,
    religion, setReligion,
    education, setEducation,
    educationalRemarks, setEducationalRemarks,
    covidStatus, setCovidStatus,
    medicalCondition, setMedicalCondition,
    submitted, setSubmitted,
    userProfile
  } = props;
  
  const {setCurrentSteps, setPersonalData, personalData} = useContext(multiStepContext)


  useEffect(() => {
    const dataFetch = async () => {
      let sourceData = await fetch(masterApi+"/drop-down/get/sourceChannel?flag=all");
      let religionData = await fetch(masterApi+"/drop-down/get/religion");
      let maritalData = await fetch(masterApi+"/drop-down/get/maritalStatus")
      let genderData = await fetch(masterApi+"/drop-down/get/gender")
      let covidData = await fetch(masterApi+"/drop-down/get/covidVaccination")
      let educationData = await fetch(masterApi+"/drop-down/get/education")
      let res = await sourceData.json();
      let res1 = await religionData.json();
      let res2 = await maritalData.json();
      let res3 = await genderData.json();
      let res4 = await covidData.json();
      let res5 = await educationData.json();
      setSourcingDD(res.data)
      setReligionDD(res1.data)
      setMaritalDD(res2.data)
      setGenderDD(res3.data)
      setCovidDD(res4.data)
      setEducationDD(res5.data)
    }
    dataFetch()
  }, []) 
  console.log(userProfile)

const handleChange = (event) => {
    setWalk(event.target.value);
  };

  
  
  return (
    <ThemeProvider theme={theme}> 
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
          <InputLabel id="demo-select-small" required >Sourcing Channel</InputLabel>
          <Select
            sx={{ width: "100%" }}
            label="Sourcing Channel"
            onChange={handleChange}
            value={walk}
            >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {sourcingDD.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          disabled={walk === "Others" ? false : true}
          label="Other Source"
          placeholder="Please Mention..."
          variant="outlined"
          onChange={(event) => {
            setFname(event.target.value);
          }}
          />
       
        <TextField required
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="First Name"
          value={fname}
          variant="outlined"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />

      
        

        <TextField
          sx={{ width: "18%" }}
          size="small"
          value={mname}
          id="outlined-basic"
          label="Middle Name"
          variant="outlined"
          onChange={(event) => {
            setMname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={lname}
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
          <InputLabel required id="demo-select-small">Gender</InputLabel>
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
            {genderDD.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField required
          type="number"
          sx={{ width: "18%" }}
          size="small"
          value={phoneNumber}
          id="outlined-basic"
          label="Phone Number"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
          }}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        
        <TextField
          sx={{ width: "18%" }}
          size="small"
          type="number"
          id="outlined-basic"
          label="Alternate Phone Number"
          value={alternateNumber}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
          }}
          onChange={(e) => {
            setAlternateNumber(e.target.value);
          }}
        />
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small" required>Whatsapp Available?</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={whatsappAvailable}
            label="Whatsapp Available  "
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
          type="number"
          label="Whatsapp Number*"
          //defaultValue={userProfile.status?userProfile.whatsappNumber:whatsapp}
          value={whatsapp}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
          }}
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
            value={birthday}
            onChange={(newValue) => {
            setBirthday(newValue);
            }}
            renderInput={(params) => (
              <TextField required {...params} size="small" sx={{ width: "18%" }} />
            )}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small" required>Marital Status</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            value={maritalStatus}
            //defaultValue={userProfile.status?userProfile.maritalStatus:maritalStatus}
            id="demo-select-small"
            label="Marital Status"
            onChange={(e) => {
              setMaritalStatus(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {maritalDD.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small" required>Religion</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            //defaultValue={userProfile.status?userProfile.religion:religion}
            value={religion}
            id="demo-select-small"
            label="Religion"
            onChange={(e) => {
              setReligion(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {religionDD.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
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
            value={education}
            label="Educational Qualifications"
            onChange={(e) => {
              setEducation(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {educationDD.map((item)=>(
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          value={educationalRemarks}
         // defaultValue={userProfile.status?userProfile.educationalRemarks:educationalRemarks}
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
          <InputLabel id="demo-select-small" required>
            COVID Vaccination Status
          </InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            //defaultValue={userProfile.status?userProfile.covidStatus:covidStatus}
            value={covidStatus}
            label="COVID Vaccination Status*"
            onChange={(e) => {
              setCovidStatus(e.target.value);
            }}
          >
            {covidDD.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "79.5%" }}
          size="small"
          id="outlined-basic"
          //defaultValue={userProfile.status?userProfile.medicalCondition:medicalCondition}
          value={medicalCondition}
          label="Medical Condition(if any)"
          variant="outlined"
          onChange={(e) => {
            setMedicalCondition(e.target.value);
          }}
        />
      </Box>
       </form>
       </ThemeProvider>
  );
}
export default PersonalInfo;




// {
//   "userId": "YCW0000001",
//   "firstName": "Intezar",
//   "middleName": "Ahmad",
//   "lastName": "khan",
//   "gender": "MALE",
//   "mobileNo": "8655587806",
//   "profileStatus": "IN_ACTIVE",
//   "secondaryMobileNumber": "1234567890",
//   "birthday": null,
//   "userType": "WORKER",
//   "maritalStatus": "MARRIED",
//   "whatsappNumber": null,
//   "email": "string",
//   "secondaryEmail": "string",
//   "nationality": "INDIAN",
//   "sourcingChannel": "BROKER_OR_AGENCY",
//   "medium": "PHONE_CALL",
//   "professsion": "BUSINESS_OWNER",
//   "department": null,
//   "religion": "HINDU",
//   "bloodGroup": "O_POSITIVE",
//   "education": null,
//   "educationalRemarks": "good",
//   "medicalCondition": "nothing",
//   "covidStatus": "FIRST_DOSE",
//   "formStatus": "PERSONAL",
//   "isoCode": "IN",
//   "percentage": 20,
//   "uuid": "642ddcb1-c7c6-4849-8140-2712f0cc012e",
//   "secondaryMobileVerified": false,
//   "whatsappAvailable": false
// }
