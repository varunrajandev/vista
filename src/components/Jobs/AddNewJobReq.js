import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import BasicInfo from "../JobRequestForm/BasicInfo";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function AddNewJobReq() {
  const [jobTypes, setJobTypes] = React.useState("");
  const [workDuration, setWorkDuration] = React.useState("");
  const [dailyStartTime, setDailyStartTime] = React.useState("");
  const [membersInFamily, setMembersInFamily] = React.useState("");
  const [languagePreference, setLanguagePreference] = React.useState("");
  const [trainingPreference, setTrainingPreference] = React.useState("");
  const [religionPreference, setReligionPreference] = React.useState("");
  const [value, setValue] = React.useState("");
  const [agePreference, setAgePreference] = React.useState();
  const [genderPreference, setGenderPreference] = React.useState("");
  const [budgetMax, setBudgetMax] = React.useState("");
  const [budgetMin, setBudgetMin] = React.useState();
  const [remarks, setRemarks] = React.useState("");
  const [sizeOfHouse, setSizeOfHouse] = React.useState();
  const [pets, setPets] = React.useState();
  const [noOfPets, setNoOfPets] = React.useState();

  const startTimeFormat = dailyStartTime ? dailyStartTime.toLocaleTimeString() : '';
  
  function refreshPage() {
  window.location.reload(false);
  }

  console.log("All My data", {
    jobTypes,
    workDuration,
    startTimeFormat,
    membersInFamily,
    languagePreference,
    trainingPreference,
    religionPreference,
    value,
    agePreference,
    genderPreference,
    budgetMax,
    budgetMin,
    remarks,
    sizeOfHouse,
    pets,
    noOfPets,
  })
  //const startTimeFormat = startTime ? startTime.toLocaleTimeString() : '';
  const handleClick = async () => {
    try {
      await axios.post("http://13.126.160.155:8080/user/job/create",
        {
          "agePreference": agePreference,
          "cityUuid": "string",
          "endDate": value,
          "endTime": "string",
          "userId": "CX000013",
          "locationUuid": "string",
          "jobStatus": "CREATED",
          "familyMember": membersInFamily,
          "gender": genderPreference,
          "houseSize": sizeOfHouse,
          "jobDescription": remarks,
          "jobType": jobTypes,
          "language": languagePreference,
          "maxBudget": budgetMax,
          "minBudget": budgetMin,
          "pet": pets,
          "petCount": noOfPets,
          "religion": religionPreference,
          "startDate": value,
          "startTime": startTimeFormat,
          "traingType": trainingPreference,
          "workingHours": workDuration
        }
        
        );


      alert("User Registration successfull")
      console.log()
      
    } catch (error) {
      alert("User Registration Faild", error)
      console.log()
    }
    
  };

  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7}>

      {/* //Add Ycw Section section */}

      <Box sx={{
        display: "flex",
        justifyContent: "space-between"
      }}
      >
        <Typography variant="h6">
          Add New Jobs
        </Typography>
        <Typography sx={{
          display: "flex",
          gap: 2
        }}
        >
           <Link to="/jobs" style={{textDecoration:"none"}}>
          <Button
            sx={{
              color: "#f52f50",
              border: "1px solid #f52f50"
            }}
            variant="outlined"
          >
            CLOSE
          </Button>
          </Link>
          <Button
            sx={{ background: "#e3445f" }}
            variant="contained"
            color="secondary"
            onClick={refreshPage}
          >
            CANCEL CREATION
          </Button>
          <Button
            sx={{ background: "#e3b944" }}
            variant="contained"
            color="secondary"
          >
            SAVE AS DRAFT
          </Button>
          <Button color="success" variant="contained" onClick={handleClick}>
            CONFIRM & CREATE
          </Button>
        </Typography>
      </Box>
      {/* //Form */}
      <Box
        marginTop={5}
        sx={{
          // boxShadow: "-1px -5px 5px 0px rgba(102,93,102,1)",
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        {/* //Components */}
        <BasicInfo
          jobTypes={jobTypes} setJobTypes={setJobTypes}
          workDuration={workDuration} setWorkDuration={setWorkDuration}
          dailyStartTime={dailyStartTime} setDailyStartTime={setDailyStartTime}
          membersInFamily={membersInFamily} setMembersInFamily={setMembersInFamily}
          languagePreference={languagePreference} setLanguagePreference={setLanguagePreference}
          trainingPreference={trainingPreference} setTrainingPreference={setTrainingPreference}
          religionPreference={religionPreference} setReligionPreference={setReligionPreference}
          value={value} setValue={setValue}
          agePreference={agePreference} setAgePreference={setAgePreference}
          genderPreference={genderPreference} setGenderPreference={setGenderPreference}
          budgetMax={budgetMax} setBudgetMax={setBudgetMax}
          budgetMin={budgetMin} setBudgetMin={setBudgetMin}
          remarks={remarks} setRemarks={setRemarks}
          sizeOfHouse={sizeOfHouse} setSizeOfHouse={setSizeOfHouse}
          pets={pets} setPets={setPets}
          noOfPets={noOfPets} setNoOfPets={setNoOfPets}
        />
      </Box>
    </Box>
  );
}

export default AddNewJobReq;
