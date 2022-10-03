import React from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Alert,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import image from "../../images/careCrew1.png";
import india from "../../images/india.png";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
import { masterApiforAll } from "../../AlllData";
import { MasterApiForLocation } from "../../AlllData";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UserRegistration() {
  const [genderDD, setGenderDD] = React.useState([]);
  const [localityDD, setLocalityDD] = React.useState([]);
  const [cityDD, setCityDD] = React.useState([]);
  const [religionDD, setReligionDD] = React.useState([]);
  const [skillsDD, setSkillsDD] = React.useState([]);
  const [workingHrDD, setWorkingHrDD] = React.useState([]);

  const [helperText, setHelperText] = React.useState("")
  const [candidatemobileNumber, setCandidateMobileNumber] = React.useState("");
  const [candidateFirstName, setCandidateFirstName] = React.useState();
  const [candidateLastName, setCandidateLastName] = React.useState();
  const [candidategender, setCandidateGender] = React.useState();
  const [candidateage, setCandidateAge] = React.useState();
  const [candidateworkingHr, setCandidateWorkingHr] = React.useState();
  const [candidateprimarySkills, setCandidatePrimarySkills] =
    React.useState();
  const [candidateOtherSkills, setCandidateOtherSkills] =
    React.useState();
  const [candidatecity, setCandidateCity] = React.useState();
  const [candidatelocality, setCandidateLocality] = React.useState();
  const [candidatereligion, setCandidateReligion] = React.useState();
  const [candidatereligionOther, setCandidateReligionOther] = React.useState();
  const [candidatePartnerPhoneNumber, setCandidatePartnerPhoneNumber] =
    React.useState();
  const [availableNumberResponse, setAvailableNumberResponse] =
    React.useState();
  const [helpertextPartner, setHelpertextPartner] = React.useState("");
  const [helpertext, setHelpertext] = React.useState("");
  const [helpertextAge, setHelpertextAge] = React.useState("");
  const [displayalert, setDisplayalert] = React.useState("none");
  const [errorvalue, setErrorValue] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isErrorforAlt, setIsErrorforAlt] = React.useState(false);
  const [isErrorforAge, setIsErrorforAge] = React.useState(false);
  const [textfieldshow, setTextfieldshow] = React.useState("none");
  const [textfieldshowSkill, setTextfieldshowSkill] = React.useState("none");
  const [registeredSuccessfully, setRegisteredSuccessfully] = React.useState(false);

  function alphacheck(e) {
    const regex = /[A-Za-z]/;
    const chars = e.target.value.split("");
    const char = chars.pop();
    console.log(char);
    if (!regex.test(char)) {
      e.target.value = chars.join("");
      e.preventDefault();
      return false;
    } else {
      return true;
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      let genderDD = await fetch(masterApiforAll + "user/drop-down/get/gender");
      let cityDataDD = await fetch("http://13.126.160.155:8081/locationmaster/city/get/all")
      let localityDataDD = await fetch(`http://13.126.160.155:8081/locationmaster/micromarket/list/${candidatecity}`);
      let ReligionDataDD = await fetch(masterApiforAll + "user/drop-down/get/religion");
      let skillsDataDD = await fetch(masterApiforAll + "user/skill/get/skills");
      let workingHrDataDD = await fetch(masterApiforAll + "user/drop-down/get/workingHours");

      let skillsDropDown = await skillsDataDD.json();
      let cityDropDown = await cityDataDD.json();
      let localityDropDown = await localityDataDD.json();
      let ReligionDropDown = await ReligionDataDD.json();
      let genderDropdown = await genderDD.json();
      let workingHrDropDown = await workingHrDataDD.json();

      let localityDropDownList = await localityDropDown.data;
      let cityDropDownList = await cityDropDown.data;
      let ReligionDropDownList = await ReligionDropDown.data;
      let DDgender = await genderDropdown.data;
      let skillsDropDownList = await skillsDropDown.data;
      let workingHrDropDownList = await workingHrDropDown.data;

      setGenderDD(DDgender);
      setCityDD(cityDropDownList)
      setLocalityDD(localityDropDownList || [{ names: "please Select City" }]);
      setReligionDD(ReligionDropDownList);
      setSkillsDD(skillsDropDownList);
      setWorkingHrDD(workingHrDropDownList);
    };

    fetchData();
  }, [candidatecity]);
  

  async function checkMobilenumber(){
    let checkNumber = await fetch(`http://13.126.160.155:8080/user/worker/checkProfile/${candidatemobileNumber}`)
    let response = await checkNumber.json();
   // setAvailableNumberResponse(response.data)
   response.data?setHelperText("Number is already exist Please Update the Profile"):setHelperText()
  }

  useEffect(() => {
  checkMobilenumber();

  },[candidatemobileNumber.length===10?candidatemobileNumber:""])


  const handleClick = async () => {
    try {
      let response = await axios.post(masterApiforAll + "user/internal/add", {
        department: "WORKER",
        mobileNo: candidatemobileNumber,
        userType: "WORKER",
        isoCode: "IN",
        firstName: candidateFirstName,
        gender: candidategender,
        lastName: candidateLastName,
        religion: candidatereligion,
        micromarketUuid: candidatelocality,
        workingHours: candidateworkingHr,
        skillUuid: candidateprimarySkills,
        age: candidateage,
        partnerMobileNo: candidatePartnerPhoneNumber,
        cityUuid: candidatecity,
        otherReligion: candidatereligionOther,
        otherSkill: candidateOtherSkills,

      });
      setRegisteredSuccessfully(true)
      setTimeout(function () {
        setRegisteredSuccessfully(false)
        window.location.reload(false);
      }, 4000);
    } catch (error) {
      alert("Please Fill correct Details", error);
    }
  };

  return (
    <>
      <Grid
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card   sx={{ width:"350px" , padding: "0px" }}>
          <CardContent >
            <Box
              sx={{
                fontSize: "22px",
                fontWeight: "900",
                color: "#BDBDBD",
                textAlign: "center",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              Candidate Registration
            </Box>
            <Grid
              mt={0.5}
              container
              spacing={2.5}
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
              }}
              ml={-2}
            >
              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  required
                  sx={{
                    width: "200px",
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  }}
                  type="number"
                  placeholder="Phone Number"
                  variant="standard"
                  value={candidatemobileNumber}
                  onInput={(e) => {
                    setCandidateMobileNumber(
                      (e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10))
                    )
                   
                  }}
                  onChange={(e) => {
                    setCandidateMobileNumber(e.target.value);
                  }}
                    error={candidatemobileNumber.length === 10||candidatemobileNumber.length < 1 ? false : true}
                    helperText={candidatemobileNumber.length===10? helperText:(candidatemobileNumber.length === 10 ||candidatemobileNumber.length <1 ? "" : "please fill 10 digit number")}
                     // error={isError}
                  // helperText={helpertext}
                  //   if (
                  //     e.target.value.length < 1 ||
                  //     e.target.value.length === 10
                  //   ) {
                  //     setIsError(false);
                  //     setHelpertext("");
                  //   } else {
                  //     setIsError(true);
                  //     setHelpertext("Please Enter correct Number");
                  //   }
                
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{ width: "200px" }}
                  required
                  type="text"
                  placeholder="First Name"
                  variant="standard"
                  onInput={(e) => {
                    setCandidateFirstName(e.target.value);
                  }}
                  pattern="[a-zA-Z]*"
                  onKeyPress={(e) => alphacheck(e)}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{ width: "200px" }}
                  required
                  size="small"
                  id="standard-size-small"
                  type="text"
                  placeholder="Last Name"
                  variant="standard"
                  onInput={(e) => {
                    setCandidateLastName(e.target.value);
                  }}
                  pattern="[a-zA-Z]*"
                  onKeyPress={(e) => alphacheck(e)}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  options={genderDD}
                  onChange={(event, newValue) => {
                    setCandidateGender(newValue.key);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setCandidateGender(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "200px" }}
                      variant="standard"
                      {...params}
                      placeholder="Gender"
                      onChange={(event, newValue) => {
                        setCandidateGender("");
                      }}
                    />
                  )}
                  getOptionLabel={(item) => `${item.value}`}
                />
              </Grid>
              <Grid lg={12} sm={12} sx={12} item>
                <TextField
                  sx={{
                    width: "200px",
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  }}
                  required
                  size="small"
                  id="standard-size-small"
                  type="number"
                  error={isErrorforAge}
                  helperText={helpertextAge}
                  placeholder="Age (Years)"
                  variant="standard"
                  onInput={(e) => {
                    setCandidateAge(
                      (e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 2))
                    );
                    if (
                      e.target.value.length < 1 ||
                      e.target.value.length === 2
                    ) {
                      setIsErrorforAge(false);
                      setHelpertextAge("");
                    }
                    else {
                      setIsErrorforAge(true);
                      setHelpertextAge("Please Enter correct Age");
                    }
                  }}
                />
              </Grid>
              <Grid lg={12} sm={12} sx={12}
                spacing={2.5} item>
                <Grid lg={12} sm={12} sx={12} item>
                  <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={skillsDD}
                    onChange={(event, newValue) => {
                      if (newValue.name === "Others") {
                        setTextfieldshowSkill("visible")
                        setCandidatePrimarySkills(newValue.uuid);
                      } else {
                        setTextfieldshowSkill("none")
                        setCandidatePrimarySkills(newValue.uuid);
                      }
                    }}
                    onInputChange={(event, newInputValue) => {
                      setCandidatePrimarySkills(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "200px" }}
                        variant="standard"
                        {...params}
                        placeholder="Primary Skill"
                        onChange={(event, newValue) => {
                          setCandidatePrimarySkills("");
                        }}
                      />
                    )}
                    getOptionLabel={(item) => `${item.name}`}
                  />
                </Grid>

                <Grid 
                sx={{display: `${textfieldshowSkill}`}} mt={2.5} item >
                  <TextField
                    sx={{ width: "200px", display: `${textfieldshowSkill}` }}
                    required
                    size="small"
                    id="standard-size-small"
                    type="text"
                    placeholder="Other Skill"
                    variant="standard"
                    onInput={(e) => {
                      setCandidateOtherSkills(e.target.value);
                    }}
                    pattern="[a-zA-Z]*"
                    onKeyPress={(e) => alphacheck(e)}
                  />
                </Grid>
              </Grid>
              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  options={cityDD}
                  onChange={(event, newValue) => {
                    setCandidateCity(newValue.uuid);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setCandidateCity(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "200px" }}
                      variant="standard"
                      {...params}
                      placeholder="City"
                      onChange={(event, newValue) => {
                        setCandidateCity("");
                      }}
                    />
                  )}
                  getOptionLabel={(item) => `${item.cityName}`}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  options={localityDD}
                  onChange={(event, newValue) => {
                    setCandidateLocality(newValue.id);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setCandidateLocality(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "200px" }}
                      variant="standard"
                      {...params}
                      placeholder="Locality"
                      onChange={(event, newValue) => {
                        setCandidateLocality("");
                      }}
                    />
                  )}
                  getOptionLabel={(item) => `${item.name}`}
                />
              </Grid>



              <Grid lg={12} sm={12} sx={12} item>
                <Autocomplete
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  options={workingHrDD}
                  onChange={(event, newValue) => {
                    setCandidateWorkingHr(newValue.key);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setCandidateWorkingHr(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "200px" }}
                      variant="standard"
                      {...params}
                      placeholder="Preferred Working Hours"
                      onChange={(event, newValue) => {
                        setCandidateWorkingHr("");
                      }}
                    />
                  )}
                  getOptionLabel={(item) => `${item.value}`}
                />
              </Grid>

              <Grid lg={12} sm={12} sx={12}
                spacing={2.5} item>

                <Grid lg={12} sm={12} sx={12} item>
                  <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={religionDD}
                    onChange={(event, newValue) => {
                      if (newValue.key === "OTHERS") {
                        setTextfieldshow("visible")
                        setCandidateReligion(newValue.key);
                      } else {
                        setTextfieldshow("none")
                        setCandidateReligion(newValue.key);
                      }

                    }}
                    onInputChange={(event, newInputValue) => {
                      setCandidateReligion(newInputValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        sx={{ width: "200px" }}
                        {...params}
                        placeholder="Religion"
                        onChange={(event, newValue) => {
                          setCandidateReligion("");
                          setTextfieldshow("none")
                        }}
                      />
                    )}
                    getOptionLabel={(item) => `${item.value}`}
                  />
                </Grid>
                <Grid mt={2.5}
                 sx={{display: `${textfieldshow}`}} 
                 item>
                  <TextField
                    sx={{ width: "200px"}}
                    required
                    size="small"
                    id="standard-size-small"
                    type="text"
                    placeholder="Other Religion"
                    variant="standard"
                    onInput={(e) => {
                      setCandidateReligionOther(e.target.value);
                    }}
                    pattern="[a-zA-Z]*"
                    onKeyPress={(e) => alphacheck(e)}
                  />
                </Grid>
              </Grid>
              <Grid lg={12} sm={12} sx={12} item >
                <TextField
                  required
                  sx={{
                    width: "200px",
                    "& input[type=number]": {
                      "-moz-appearance": "textfield",
                    },
                    "& input[type=number]::-webkit-outer-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    "& input[type=number]::-webkit-inner-spin-button": {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                  }}
                  type="number"
                  placeholder=" Partner Phone Number"
                  variant="standard"
                  error={isErrorforAlt}
                  helperText={helpertextPartner}
                  onInput={(e) => {
                    setCandidatePartnerPhoneNumber(
                      (e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10))
                    );
                    if (
                      e.target.value.length < 1 ||
                      e.target.value.length === 10
                    ) {
                      setIsErrorforAlt(false);
                      setHelpertextPartner("");
                    } else {
                      setIsErrorforAlt(true);
                      setHelpertextPartner("Please Enter correct Number");
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Grid mt={4} sx={{
              textAlign: "center",
              justifyContent: "center",
            }} item>
              <Button sx={{ width: "200px", }} variant="contained" color="success" onClick={handleClick}>
                Submit
              </Button>
            </Grid>
          </CardContent>
        </Card>
        <Grid>
          <Dialog
            open={registeredSuccessfully}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Profile Saved
            </DialogTitle>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
}

export default UserRegistration;
