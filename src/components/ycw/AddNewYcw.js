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



  
const [name, setName] = useState("")
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
          
        />
        <JobRequirement />
        <BankAccount/>
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
