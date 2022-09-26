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

function UserRegistration() {
  const [genderDD, setGenderDD] = React.useState([]);
  const [localityDD, setLocalityDD] = React.useState([]);
  const [religionDD, setReligionDD] = React.useState([]);
  const [skillsDD, setSkillsDD] = React.useState([]);
  const [workingHrDD, setWorkingHrDD] = React.useState([]);

  const [candidatemobileNumber, setCandidateMobileNumber] = React.useState("");
  const [candidateFirstName, setCandidateFirstName] = React.useState("");
  const [candidateLastName, setCandidateLastName] = React.useState("");
  const [candidategender, setCandidateGender] = React.useState("");
  const [candidateage, setCandidateAge] = React.useState("");
  const [candidateworkingHr, setCandidateWorkingHr] = React.useState("");
  const [candidateprimarySkills, setCandidatePrimarySkills] = React.useState("");
  const [candidatelocality, setCandidateLocality] = React.useState("");
  const [candidatereligion, setCandidateReligion] = React.useState("");
  const [candidatePartnerPhoneNumber, setCandidatePartnerPhoneNumber] = React.useState("");
  const [availableNumberResponse, setAvailableNumberResponse] = React.useState();
  const [helpertext, setHelpertext] = React.useState("");
  const [displayalert, setDisplayalert] = React.useState("none");

  useEffect(() => {
    const fetchData = async () => {
      let genderDD = await fetch(masterApiforAll + "user/drop-down/get/gender");
      let localityDataDD = await fetch(
        MasterApiForLocation + "/locationmaster/internal/micromarkets/all"
      );
      let ReligionDataDD = await fetch(
        masterApiforAll + "user/drop-down/get/religion"
      );
      let skillsDataDD = await fetch(masterApiforAll + "user/skill/get/skills");
      let workingHrDataDD = await fetch(
        masterApiforAll + "user/drop-down/get/workingHours"
      );

      let skillsDropDown = await skillsDataDD.json();
      let localityDropDown = await localityDataDD.json();
      let ReligionDropDown = await ReligionDataDD.json();
      let genderDropdown = await genderDD.json();
      let workingHrDropDown = await workingHrDataDD.json();

      let localityDropDownList = await localityDropDown.data;
      let ReligionDropDownList = await ReligionDropDown.data;
      let DDgender = await genderDropdown.data;
      let skillsDropDownList = await skillsDropDown.data;
      let workingHrDropDownList = await workingHrDropDown.data;

      setGenderDD(DDgender);
      setLocalityDD(localityDropDownList);
      setReligionDD(ReligionDropDownList);
      setSkillsDD(skillsDropDownList);
      setWorkingHrDD(workingHrDropDownList);
    };

    fetchData();
  }, []);
// console.log("genderDD",genderDD)
// console.log("religionDD",religionDD)
// console.log("skillsDD",skillsDD)
// console.log("workingHrDD",workingHrDD)
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
      });
      alert("Candidate Registration successfully");
      setDisplayalert("visible");
    } catch (error) {
      alert("Please Fill correct Details", error);
    }
  };

  return (
    <>
      <Grid
        sx={{
          textAlign: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: "0px",
        }}
      >
        <Card  sx={{ padding: "10px"}}>
        {/* <Grid sx={{ display: "flex" }}>
          <CardMedia
            image={image}
            component="img"
            sx={{
              width: "150px",
              paddingLeft: "10px",
              textAlign: "center",
              justifyContent: "center",
              margin: "auto",
              marginTop: "20px",
            }}
            alt="CARE CREW"
          />
        </Grid> */}
        <CardContent>
          <Box
            sx={{
              fontSize: "22px",
              fontWeight: "900",
              color: "#BDBDBD",
              marginLeft: "3%",
            }}
          >
            Candidate Registration
          </Box>
          <Grid
            mt={2}
            container
            spacing={3}
            sx={{
              textAlign: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Grid lg={12} sm={12} sx={12} item>
              <TextField
                required
                type="number"
                placeholder="Phone Number"
                variant="standard"
                helperText={helpertext}
                onInput={(e) => {
                  setCandidateMobileNumber(
                    (e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10))
                  );
                }}
              />
            </Grid>

            <Grid lg={12} sm={12} sx={12} item>
              <TextField
                required
                type="text"
                placeholder="First Name"
                variant="standard"
                onInput={(e) => {
                  setCandidateFirstName(e.target.value);
                }}
              />
            </Grid>

            <Grid lg={12} sm={12} sx={12} item>
              <TextField
                required
                size="small"
                id="standard-size-small"
                type="text"
                placeholder="Last Name"
                variant="standard"
                onInput={(e) => {
                  setCandidateLastName(e.target.value);
                }}
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
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "180px" }}
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
                required
                size="small"
                id="standard-size-small"
                type="number"
                placeholder="Age ( in Year )"
                variant="standard"
                onInput={(e) => {
                  setCandidateAge(
                    (e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 2))
                  );
                }}
              />
            </Grid>

            <Grid lg={12} sm={12} sx={12} item>
              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={skillsDD}
                onChange={(event, newValue) => {
                  setCandidatePrimarySkills(newValue.uuid);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "180px" }}
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

            <Grid lg={12} sm={12} sx={12} item>
              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={localityDD}
                onChange={(event, newValue) => {
                  setCandidateLocality(newValue.uuid);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "180px" }}
                    variant="standard"
                    {...params}
                    placeholder="Locality"
                    onChange={(event, newValue) => {
                      setCandidateLocality("");
                    }}
                  />
                )}
                getOptionLabel={(item) => `${item.microMarketName}`}
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
                renderInput={(params) => (
                  <TextField
                    sx={{ width: "180px" }}
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

            <Grid lg={12} sm={12} sx={12} item>
              <Autocomplete
                disablePortal
                size="small"
                id="combo-box-demo"
                options={religionDD}
                onChange={(event, newValue) => {
                  setCandidateReligion(newValue.key);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    sx={{ width: "180px" }}
                    {...params}
                    placeholder="Religion"
                    onChange={(event, newValue) => {
                      setCandidateReligion("");
                    }}
                  />
                )}
                getOptionLabel={(item) => `${item.value}`}
              />
            </Grid>

            <Grid lg={12} sm={12} sx={12} item>
              <TextField
                required
                type="number"
                placeholder=" Partner Phone Number"
                variant="standard"
                helperText={helpertext}
                onInput={(e) => {
                  setCandidatePartnerPhoneNumber(
                    (e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10))
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid mt={4} ml={4} item>
            <Button variant="contained" color="success" onClick={handleClick}>
              Registration
            </Button>
          </Grid>
        </CardContent>
        </Card>
        <Grid>
          <Alert sx={{ display: `${displayalert}` }} severity="success"  action={
          <Button color="inherit" size="small" onClick={()=>{window.location.reload(false)}}>
          Done
          </Button>
        }>
            <AlertTitle >Candidate Registration Successfully </AlertTitle>
            <strong>Thank You</strong>
          </Alert>
        </Grid>
      </Grid>
    </>
  );
}

export default UserRegistration;
