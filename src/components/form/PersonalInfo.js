import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { maritalstatus, sourcing } from "../../AlllData";
import { multiStepContext } from "../../ContextApi/StepContext";

function PersonalInfo(props) {
  const [sourcingDD, setSourcingDD] = useState([])
  const [religionDD, setReligionDD] = useState([])
  const [maritalDD, setMaritalDD] = useState([])
  const [genderDD, setGenderDD] = useState([])
  const [covidDD, setCovidDD] = useState([])


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
    submitted, setSubmitted
  } = props;


  const {setCurrentSteps, setPersonalData, personalData} = useContext(multiStepContext)

  useEffect(() => {
    const dataFetch = async () => {
      let sourceData = await fetch("http://13.126.160.155:8080/user/drop-down/get/sourceChannel?flag=all");
      let religionData = await fetch("http://13.126.160.155:8080/user/drop-down/get/religion");
      let maritalData = await fetch("http://13.126.160.155:8080/user/drop-down/get/maritalStatus")
      let genderData = await fetch("http://13.126.160.155:8080/user/get/gender")
      let covidData = await fetch("http://13.126.160.155:8080/user/drop-down/get/covidVaccination")
      let res = await sourceData.json();
      let res1 = await religionData.json();
      let res2 = await maritalData.json();
      let res3 = await genderData.json();
      let res4 = await covidData.json();
      setSourcingDD(res.data)
      setReligionDD(res1.data)
      setMaritalDD(res2.data)
      setGenderDD(res3.data)
      setCovidDD(res4.data)
    }
    dataFetch()
  }, [])

  const handleChange = (event) => {
    setWalk(event.target.value);
  };

  setTimeout(() => {
    setSubmitted(false);
  }, 2000);


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
            label="Sourcing Channel"
            onChange={handleChange}
            defaultValue={personalData.status?personalData.data.sourcingChannel:walk}
            
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
          defaultValue={personalData.status?personalData.data.firstName:fname}
          variant="outlined"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          defaultValue={personalData.status?personalData.data.middleName:mname}
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
          label="Last Name*"
          variant="outlined"
          defaultValue={personalData.status?personalData.data.lastName:lname}
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
            defaultValue={personalData.status?personalData.data.gender:gender}
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

        <TextField
          type="number"
          sx={{ width: "18%" }}
          size="small"
          defaultValue={personalData.status?personalData.data.mobile:phoneNumber}
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
          defaultValue={personalData.status?personalData.data.secondaryMobileNumber:alternateNumber}
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
            defaultValue={personalData.status?personalData.data.whatsappAvailable:whatsappAvailable}
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
          defaultValue={personalData.status?personalData.data.whatsappNumber:whatsapp}
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
            // defaultValue={personalData.status?personalData.data.birthday:birthday}
            onChange={(newValue) => {
              setBirthday(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" sx={{ width: "18%" }}/>
            )}
          />
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Marital Status*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            defaultValue={personalData.status?personalData.data.maritalStatus:maritalStatus}
            id="demo-select-small"
            label="Marital Status*"
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
          <InputLabel id="demo-select-small">Religion</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            defaultValue={personalData.status?personalData.data.religion:religion}
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
            <MenuItem value={"Pursuing Graduation"}> Pursuing Graduation</MenuItem>
            <MenuItem value={"Graduate"}>Graduate</MenuItem>
            <MenuItem value={"Post Graduate"}>Post Graduation</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          defaultValue={personalData.status?personalData.data.educationalRemarks:educationalRemarks}
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
            defaultValue={personalData.status?personalData.data.covidStatus:covidStatus}
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
          defaultValue={personalData.status?personalData.data.medicalCondition:medicalCondition}
          label="Medical Condition(if any)"
          variant="outlined"
          onChange={(e) => {
            setMedicalCondition(e.target.value);
          }}
        />
      </Box>
       </form>
  );
}

export default PersonalInfo;
