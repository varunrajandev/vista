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
  const [whatsAppValue, setWhatsAppValue] = useState("")
  const [helperText, setHelperText] = useState("")



  const [message, setMessage] = useState('');

  function alphacheck(e) {
    const regex = /[A-Za-z]/;
    const chars = e.target.value.split('');
    const char = chars.pop();
    console.log(char);
    if (!regex.test(char)) {
      e.target.value = chars.join('');
      e.preventDefault();
      return false;
    }
    else {
      return true;
    }
  }



  const {
    walk, setWalk,
    otherSource, setOtherSource,
    fname, setFname,
    age, setAge,
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
    userProfile,
  } = props;

  if (whatsappAvailable === "Same as mobile number") {
    setWhatsapp(phoneNumber)
  }
  if (whatsappAvailable === "Same as alternte number") {
    setWhatsapp(alternateNumber)
  }

  const { setCurrentSteps, setPersonalData, personalData } = useContext(multiStepContext)


  useEffect(() => {
    const dataFetch = async () => {
      let sourceData = await fetch(masterApi + "/drop-down/get/sourceChannel?flag=all");
      let religionData = await fetch(masterApi + "/drop-down/get/religion");
      let maritalData = await fetch(masterApi + "/drop-down/get/maritalStatus")
      let genderData = await fetch(masterApi + "/drop-down/get/gender")
      let covidData = await fetch(masterApi + "/drop-down/get/covidVaccination")
      let educationData = await fetch(masterApi + "/drop-down/get/education")


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
    checkMobilenumber()
  }, [phoneNumber.length === 10 ? phoneNumber : ""])
  console.log(userProfile)

  const handleChange = (event) => {
    setWalk(event.target.value);
  };

  console.log("birthday type is", typeof birthday, birthday)
  if (!personalData.status && birthday) {
    let PickYear = birthday.getFullYear()
    console.log(PickYear)
    const d = new Date();
    let CurrentYear = d.getFullYear();
    setAge(CurrentYear - PickYear)
  }
  else setAge(age)

  async function checkMobilenumber() {
    let checkNumber = await fetch(`http://13.126.160.155:8080/user/worker/checkProfile/${phoneNumber}`)
    let response = await checkNumber.json();
    response.data ? setHelperText("Number is already exist") : setHelperText()

  }


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
              {sourcingDD.map((item) => (
                <MenuItem value={item.value}>{item.value}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            sx={{ width: "18%" }}
            size="small"
            disabled={walk === "Others" ? false : true}
            label="Other Source"
            value={otherSource}
            placeholder="Please Mention..."
            variant="outlined"
            onChange={(event) => {
              setOtherSource(event.target.value);
            }}
          />

          <TextField required
            sx={{ width: "18%" }}
            size="small"
            type="text"
            label="First Name"
            value={fname}
            variant="outlined"
            onChange={(event) => {
              setFname(event.target.value);
            }}
            pattern="[a-zA-Z]*"
            onKeyPress={(e) => alphacheck(e)}
          />

          <TextField sx={{ width: "18%" }} size="small" label="Last Name"
            variant="outlined"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />

          <FormControl sx={{ minWidth: 120, display: "flex", width: "18%" }} size="small" >
            <InputLabel required id="demo-select-small">Gender</InputLabel>
            <Select width={"100%"} value={gender} label="gender" onChange={(event) => {
              setGender(event.target.value);
            }}>
              {genderDD.map((item) => (<MenuItem value={item.key}>{item.value}</MenuItem>))}
            </Select>
          </FormControl>

        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, }}>
          <TextField required
            type="number"
            sx={{
              width: "18%",
              '& input[type=number]': {
                '-moz-appearance': 'textfield'
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              }
            }}
            size="small"
            value={phoneNumber}
            label="Phone Number"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            error={phoneNumber.length == 10 || phoneNumber.length < 1 ? false : true}
            helperText={phoneNumber.length === 10 ? helperText : (phoneNumber.length == 10 || phoneNumber.length < 1 ? "" : "please fill 10 digit number")}
          />

          <TextField
            sx={{
              width: "18%",
              '& input[type=number]': {
                '-moz-appearance': 'textfield'
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              }
            }}
            size="small"
            type="number"
            onWheel={(e) => e.target.blur()}
            id="outlined-basic"
            label="Alternate Phone Number"
            value={alternateNumber}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            onChange={(e) => {
              setAlternateNumber(e.target.value);
            }}
          // error={(alternateNumber != null && alternateNumber.length == 10||alternateNumber.length < 1  ? false : true)}
          // helperText={alternateNumber != null && alternateNumber.length == 10||alternateNumber.length < 1  ? "" : "please fill 10 digit number"}
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
              {WhatsAppStatus.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            sx={{
              width: "18%",
              '& input[type=number]': {
                '-moz-appearance': 'textfield'
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              }
            }}
            size="small"
            id="outlined-basic"
            type="number"
            label="Whatsapp Number*"
            value={whatsapp}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            onChange={(e) => {
              setWhatsapp(e.target.value);
            }}
            disabled={whatsappAvailable === "Not Available" ? true : false}
            error={whatsappAvailable ? (whatsapp != null && whatsapp.length == 10 || whatsapp.length < 1 ? false : true) : false}
            helperText={whatsappAvailable ? (whatsapp != null && whatsapp.length == 10 || whatsapp.length < 1 ? "" : "please fill 10 digit number") : ""}
          />

          <TextField
            sx={{
              width: "18%",
              '& input[type=number]': {
                '-moz-appearance': 'textfield'
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              }
            }}
            size="small"
            value={age}
            type="number"
            id="outlined-basic"
            label="Age"
            variant="outlined"
            onChange={(event) => {
              setAge(event.target.value);
            }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
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
              id="demo-select-small"
              label="Marital Status"
              onChange={(e) => {
                setMaritalStatus(e.target.value);
              }}
            >
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
              value={religion}
              id="demo-select-small"
              label="Religion"
              onChange={(e) => {
                setReligion(e.target.value);
              }}
            >
              {religionDD.map((item) => (
                <MenuItem value={item.key}>{item.value}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <TextField
            label="Last Job Type Others"
            size="small"
            sx={{ width: "18%", }}
            disabled={religion === "OTHERS" ? false : true}
          />

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



              {educationDD.map((item) => (
                <MenuItem value={item.key}>{item.value}</MenuItem>
              ))}
            </Select>
          </FormControl>

        
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
            <TextField
            sx={{ width: "18%" }}
            size="small"
            id="outlined-basic"
            value={educationalRemarks}
            label="Educational Remarks"
            variant="outlined"
            onChange={(e) => {
              setEducationalRemarks(e.target.value);
            }}
          />

          <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
            <InputLabel id="demo-select-small" required>
              COVID Vaccination Status
            </InputLabel>
            <Select
              sx={{ width: "100%" }}
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
            sx={{ width: "59%" }}
            size="small"
            id="outlined-basic"
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

const WhatsAppStatus = [
  { key: true, value: "Same as mobile number" },
  { key: true, value: "Same as alternte number" },
  { key: true, value: "Other number" },
  { key: false, value: "Not Available" },
]
export default PersonalInfo;


