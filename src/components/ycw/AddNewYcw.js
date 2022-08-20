import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import PersonalInfo from "../form/PersonalInfo";
import CurrentAdd from "../form/CurrentAdd";
import PermanentAdd from "../form/PermanentAdd";
import SkillExpDetails from "../form/SkillExpDetails";
import JobRequirement from "../form/JobRequirement";
import BankAccount from "../form/BankAccount";
import Document from "../form/Document";
import HouseHoldMemberInfo from "../form/HouseHoldMemberInfo";
import YcwButtons from "../buttons/YcwButtons";
import { useState } from "react";

function AddNewYcw() {
  // YCW Personal information useState
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
  const [submitted, setSubmitted ] = React.useState(false)

  //YCW  current Address information useState
  const [addressL1, setAddressL1] = React.useState("");
  const [addressL2, setAddressL2] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [addressProofType, setAddressProofType] = React.useState("");

  //permanent Address
  const [addressL1p, setAddressL1p] = React.useState("");
  const [addressL2p, setAddressL2p] = React.useState("");
  const [landmarkp, setLandmarkp] = React.useState("");
  const [pinCodep, setPinCodep] = React.useState("");
  const [countryp, setCountryp] = React.useState("");
  const [statep, setStatep] = React.useState("");
  const [cityp, setCityp] = React.useState("");
  const [localityp, setLocalityp] = React.useState("");
  const [addressProofTypep, setAddressProofTypep] = React.useState("");
  const [check, setCheck] = React.useState(false);

  //Skill and Experience Deatails
  const [primarySkill, setPrimarySkill] = React.useState("");
  const [secondarySkill, setSecondarySkill] = React.useState("");
  const [tertiarySkill, setTertiarySkill] = React.useState("");
  const [skillRemarks, setSkillRemarks] = React.useState("");
  const [vegNonveg, setVegNonveg] = React.useState("");
  const [cuisinesKnown, setCuisinesKnown] = React.useState([]);
  const [primaryLanguage, setPrimaryLanguage] = React.useState("");
  const [otherLanguages, setOtherLanguages] = React.useState([]);
  const [totalExp, setTotalExp] = React.useState();
  const [experienceRemarks, setExperienceRemarks] = React.useState();
  const [lastJobType, setLastJobType] = React.useState([]);
  const [lastJobDuration, setLastJobDuration] = React.useState();
  const [reasonLeaving, setReasonLeaving] = React.useState();
  // const [values, setValues] = React.useState(false);

  //job requirements:
  const [openToTraining, setOpenToTraining] = React.useState(false);
  const [preferJob, setPreferJob] = React.useState([]);
  const [preferWorkHour, setPreferWorkHour] = React.useState([]);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [vehicleAvailable, setVehicleAvailable] = React.useState("")
  const [minSal, setMinSal] = React.useState("")
  const [maxSal, setMaxSal] = React.useState("")
  const [traningMode, setTraningMode] = React.useState("")
  const [jobRemarks, setJobRemarks] = React.useState("");

  //bank account
  const [inputFields, setInputFields] = useState([
    {
      AccounType: "",
      bankName: "",
      branchName: "",
      branchAddress: "",
      accountHoderName: "",
      accountNumber: "",
      IfceCode: "",
      BankAccountProof: "",
    },
  ]);


  
const [name, setName] = useState("")

const startTimeFormat = startTime ? startTime.toLocaleTimeString() : '';
const endTimeFormat = endTime ? endTime.toLocaleTimeString() : '';


 const handleClick = ()=>{
  console.log("Current Addrress",{
    addressL1,
    addressL2,
    landmark,
    pinCode,
    country,
    state,
    city,
    locality,
    addressProofType,
  });

  console.log("permanaent",{
    addressL1p,
    addressL2p,
    landmarkp,
    pinCodep,
    countryp,
    statep,
    cityp,
    localityp,
    addressProofTypep,
  });

  console.log({
     primarySkill,
    secondarySkill,
    tertiarySkill,
    skillRemarks,
    vegNonveg,
    cuisinesKnown,
    primaryLanguage,
    otherLanguages,
    totalExp,
    experienceRemarks,
    lastJobType,
    lastJobDuration,
    reasonLeaving,
  })

console.log({
  openToTraining,
  preferJob,
  preferWorkHour,
  startTimeFormat,
  endTimeFormat,
  vehicleAvailable,
  minSal,
  maxSal,
  traningMode,
  jobRemarks
})

console.log("inputFields:", inputFields )

}
      
 return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Add New YCW</Typography>
        <Typography sx={{ display: "flex", gap: 2 }}>
          {/* Buttons */}
          <YcwButtons data = {handleClick} />

        </Typography>
      </Box>
      {/* //Form */}
      <Box
        marginTop={5}
        sx={{
          
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        <PersonalInfo 
          walk={walk} setWalk={setWalk}
          fname={fname} setFname={setFname}
          mname={mname} setMname={setMname}
          lname={lname} setLname={setLname}
          gender={gender} setGender={setGender}
          phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          alternateNumber={alternateNumber} setAlternateNumber={setAlternateNumber}
          whatsappAvailable={whatsappAvailable} setWhatsappAvailable={setWhatsappAvailable}
          whatsapp={whatsapp} setWhatsapp={setWhatsapp}
          value={value} setValue={setValue}
          maritalStatus={maritalStatus} setMaritalStatus={setMaritalStatus}
          religion={religion} setReligion={setReligion}
          education={education} setEducation={setEducation}
          educationalRemarks={educationalRemarks} setEducationalRemarks={setEducationalRemarks}
          covidStatus={covidStatus} setCovidStatus={setCovidStatus}
          medicalCondition={medicalCondition} setMedicalCondition={setMedicalCondition}
          submitted={submitted} setSubmitted={setSubmitted}
        />

        <CurrentAdd
          addressL1={addressL1} setAddressL1={setAddressL1}
          addressL2={addressL2} setAddressL2={setAddressL2}
          landmark={landmark} setLandmark={setLandmark}
          pinCode={pinCode} setPinCode={setPinCode}
          country={country} setCountry={setCountry}
          state={state} setState={setState}
          city={city} setCity={setCity}
          locality={locality} setLocality={setLocality}
          addressProofType={addressProofType} setAddressProofType={setAddressProofType}
        />

        <PermanentAdd 
          addressL1={addressL1p} setAddressL1={setAddressL1p}
          addressL2={addressL2p} setAddressL2={setAddressL2p}
          landmark={landmarkp} setLandmark={setLandmarkp}
          pinCode={pinCodep} setPinCode={setPinCodep}
          country={countryp} setCountry={setCountryp}
          state={statep} setState={setStatep}
          city={cityp} setCity={setCityp}
          locality={localityp} setLocality={setLocalityp}
          addressProofType={addressProofTypep} setAddressProofType={setAddressProofTypep}
          check={check} setCheck={setCheck}
        />

        <SkillExpDetails 
          primarySkill={primarySkill} setPrimarySkill={setPrimarySkill}
          secondarySkill={secondarySkill} setSecondarySkill={setSecondarySkill}
          tertiarySkill={tertiarySkill} setTertiarySkill={setTertiarySkill}
          skillRemarks={skillRemarks} setSkillRemarks={setSkillRemarks}
          vegNonveg={vegNonveg} setVegNonveg={setVegNonveg}
          cuisinesKnown={cuisinesKnown} setCuisinesKnown={setCuisinesKnown}
          primaryLanguage={primaryLanguage} setPrimaryLanguage={setPrimaryLanguage}
          otherLanguages={otherLanguages} setOtherLanguages={setOtherLanguages}
          totalExp={totalExp} setTotalExp={setTotalExp}
          experienceRemarks={experienceRemarks} setExperienceRemarks={setExperienceRemarks}
          lastJobType={lastJobType} setLastJobType={setLastJobType}
          lastJobDuration={lastJobDuration} setLastJobDuration={setLastJobDuration}
          ReasonLeaving={reasonLeaving} setReasonLeaving={setReasonLeaving}
          // values={values} setValue={setValue}
        />
        <JobRequirement 
          openToTraining={openToTraining} setOpenToTraining={setOpenToTraining}
          preferJob={preferJob} setPreferJob={setPreferJob}
          preferWorkHour={preferWorkHour} setPreferWorkHour={setPreferWorkHour}
          startTime={startTime} setStartTime={setStartTime}
          endTime={endTime} setEndTime={setEndTime}
          vehicleAvailable={vehicleAvailable} setVehicleAvailable={setVehicleAvailable}
          minSal={minSal} setMinSal={setMinSal}
          maxSal={maxSal} setMaxSal={setMaxSal}
          traningMode={traningMode} setTraningMode={setTraningMode}
          jobRemarks={jobRemarks} setJobRemarks={setJobRemarks}


        />
        <BankAccount
        setInputFields={setInputFields}
        inputFields={inputFields}
        />
        <Document />
        <HouseHoldMemberInfo 
          name={name} 
          setName={setName}
        />
      </Box>
    </Box>
  );
}

export default AddNewYcw;
