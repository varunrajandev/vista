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
import axios from "axios";

function AddNewYcw() {
  // YCW Personal information useState
  const [source, setSource] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [middlename, setMiddlename] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [mobile, setMobile] = React.useState();
  const [alternateMobileNumber, setAlternateMobileNumber] = React.useState("");
  const [isWhatsappAvailable, setIsWhatsappAvailable] = React.useState();
  const [whatsappNumber, setWhatsappNumber] = React.useState("");
  const [birthday, setBirthday] = React.useState();
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const [religion, setReligion] = React.useState("");
  const [education, setEducation] = React.useState("");
  const [educationalRemarks, setEducationalRemarks] = React.useState("");
  const [covidStatus, setCovidStatus] = React.useState("");
  const [medicalCondition, setMedicalCondition] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false)

  //YCW  current Address information useState
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [countryName, setCountryName] = React.useState("");
  const [stateName, setStateName] = React.useState("");
  const [cityName, setCityName] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [addressProofType, setAddressProofType] = React.useState("");
  const [countryID, setCountryID] = useState()
  const [stateID, setStateID] = useState()
  const [cityID, setCityID] = useState()

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
  const [cookType, setCookType] = React.useState("");
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
  const [workingHour, setWorkingHour] = React.useState([]);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [vehicle, setVehicle] = React.useState("")
  const [minSalaryExpected, setMinSalaryExpected] = React.useState("")
  const [maxSalaryExpected, setMaxSalaryExpected] = React.useState("")
  const [traningMode, setTraningMode] = React.useState("")
  const [jobRemarks, setJobRemarks] = React.useState("");

  //bank account
  const [inputFields, setInputFields] = useState([
    {
      accountType: "",
      bankName: "",
      branchName: "",
      branchAddress: "",
      accountHoderName: "",
      accountNumber: "",
      ifscCode: "",
      bankAccountProof: "",
    },
  ]);

  const [name, setName] = useState("")
  

  const startTimeFormat = startTime ? startTime.toLocaleTimeString() : '';
  const endTimeFormat = endTime ? endTime.toLocaleTimeString() : '';

const handleClick = async () => {
    const Current_Addrress={
          addressLine1,
          addressLine2,
          landmark,
          postalCode,
          countryName,
          stateName,
          cityName,
          locality,
          addressProofType,
        }

    try {
      await axios.post("http://13.126.160.155:8080/user/worker/save",
        {
          "userAndProfileDto": {
            "status": true,           
            "isoCode": "string",
            "mobile": "string",
            "mobileVerified": true,
            "email": "string",
            "emailVerified": true,
            "userType": "WORKER",
            "department": "TECH",
            "departmentName": "string",
            "firstName": "string",
            "lastName": "string",
            "otp": 0,
            "profession": "BUSINESS_OWNER",
            "micromarketUuid": "string",
            "cityUuid": "string",
            "middleName": "string",
            "gender": "MALE",
            "profileStatus": "ACTIVE_AND_NOT_AVAILABLE",
            "alternateMobileNumber": "string",
            "birthday": 1661848805777,
            "maritalStatus": "SINGLE",
            "whatsappNumber": "string",
            "secondaryEmail": "string",
            "nationality": "INDIAN",
            "sourcingChannel": "APNA",
            "medium": "PHONE_CALL",
            "professsion": "BUSINESS_OWNER",
            "religion": "HINDU",
            "bloodGroup": "O_POSITIVE",
            "educationalRemarks": "string",
            "medicalCondition": "string",
            "covidStatus": "UNVACCINATED",
            "nextDestination": "string",
            "arrivalDate": 1661848805777,
            "secondaryMobileNumber": "string",
            "secondaryMobileVerified": true,
            "formStatus": "DRAFT",
            "whatsappAvailable": true
          },
          "addressDtos": [
            {
              "status": true,
              "addressLine1":"string",
              "addressLine2":"string",
              "micromarketUuid": "string",
              "locality":"string",
              "cityUuid":cityID,
              "stateUuid":stateID,
              "postalCode":"string",
              "countryUuid":countryID,
              "addressProofType":"AAADHAR_CARD",
              "permanent":true
            }
          ],
          "skillsMappingDto": {
            "primarySkill": "DRIVING",
            "secondarySkill": "DRIVING",
            "teritarySkill": "DRIVING",
            "cookType": "ONLY_VEG",
            "cuisines": "string",
            "totalExperience": "string",
            "skillRemarks": "string"
          },
          "userJobExperience": {
            "jobType": "HOUSEKEEPING",
            "experienceRemarks": "string",
            "totalExperience": "string",
            "lastJobDuration": "string",
            "reasonForLeavingJob": "string"
          },
          "jobRequirementDtos": [
            {
              "workingHours": "_0_TO_2_HOURS",
              "startTime": "string",
              "endTime": "string",
              "vehicle": "string",
              "minSalaryExpected": "string",
              "maxSalaryExpected": "string",
              "openToTraining": true,
              "traningMode": "ONLINE",
              "jobRemarks": "string"
            }
          ],
          "bankDetailsDtos":inputFields,

          "documentRequestDtos": [
            {
              "documentContext": "KYC",
              "documentUploadType": "PASSPORT",
              "documentSideType": "FRONT",
              "filePath": "string",
              "fileName": "string",
              "fileUrl": "string",
              "metadata": "string",
              "approvalStatus": "string",
              "rejectedReason": "string",
              "bucketName": "string",
              "verified": true
            }
          ],
          "userFamilyMemberDto": [
            {
              "status": true,
              "name": "string",
              "userId": "string",
              "jobType": "HOUSEKEEPING",
              "relationship": "WIFE",
              "age": 0,
              "mobileNo": "string",
              "email": "string"
            }]
        });
      alert("User Registration successfull")
    } catch (error) {
      alert("User Registration Faild", error)
    }
  }

  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Add New YCW</Typography>
        <Typography sx={{ display: "flex", gap: 2 }}>
          {/* Buttons */}
          <YcwButtons data={handleClick} />
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
          walk={source} setWalk={setSource}
          fname={firstname} setFname={setFirstname}
          mname={middlename} setMname={setMiddlename}
          lname={lastname} setLname={setLastname}
          gender={gender} setGender={setGender}
          phoneNumber={mobile} setPhoneNumber={setMobile}
          alternateNumber={alternateMobileNumber} setAlternateNumber={setAlternateMobileNumber}
          whatsappAvailable={isWhatsappAvailable} setWhatsappAvailable={setIsWhatsappAvailable}
          whatsapp={whatsappNumber} setWhatsapp={setWhatsappNumber}
          birthday={birthday} setBirthday={setBirthday}
          maritalStatus={maritalStatus} setMaritalStatus={setMaritalStatus}
          religion={religion} setReligion={setReligion}
          education={education} setEducation={setEducation}
          educationalRemarks={educationalRemarks} setEducationalRemarks={setEducationalRemarks}
          covidStatus={covidStatus} setCovidStatus={setCovidStatus}
          medicalCondition={medicalCondition} setMedicalCondition={setMedicalCondition}
          submitted={submitted} setSubmitted={setSubmitted}
        />

        <CurrentAdd
          addressL1={addressLine1} setAddressL1={setAddressLine1}
          addressL2={addressLine2} setAddressL2={setAddressLine2}
          landmark={landmark} setLandmark={setLandmark}
          pinCode={postalCode} setPinCode={setPostalCode}
          country={countryName} setCountry={setCountryName}
          state={stateName} setState={setStateName}
          city={cityName} setCity={setCityName}
          locality={locality} setLocality={setLocality}
          addressProofType={addressProofType} setAddressProofType={setAddressProofType}
          countryID={countryID} setCountryID={setCountryID}
          stateID={stateID} setStateID={setStateID}
          cityID={cityID} setCityID={setCityID}
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
          vegNonveg={cookType} setVegNonveg={setCookType}
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
          preferWorkHour={workingHour} setPreferWorkHour={setWorkingHour}
          startTime={startTime} setStartTime={setStartTime}
          endTime={endTime} setEndTime={setEndTime}
          vehicleAvailable={vehicle} setVehicleAvailable={setVehicle}
          minSal={minSalaryExpected} setMinSal={setMinSalaryExpected}
          maxSal={maxSalaryExpected} setMaxSal={setMaxSalaryExpected}
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
