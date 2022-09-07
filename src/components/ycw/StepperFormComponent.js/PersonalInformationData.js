import React, {useContext} from 'react'
import { Box, Button } from '@mui/material'
import axios from 'axios';
import PersonalInfo from '../../form/PersonalInfo'
import { multiStepContext } from '../../../ContextApi/StepContext';

function PersonalInformationData() {

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

  const {setCurrentSteps, setPersonalData, personalData} = useContext(multiStepContext)

  const handleSubmit = async () => {
    try {
        let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
        {
            "birthday": "2022-09-07T07:54:57.130Z",
            "bloodGroup": "O_POSITIVE",
            "covidStatus": "UNVACCINATED",
            "educationalRemarks": "string",
            "email": "string",
            "firstName": "string",
            "formStatus": "DRAFT",
            "gender": "MALE",
            "isoCode": "string",
            "lastName": "string",
            "maritalStatus": "SINGLE",
            "medicalCondition": "string",
            "medium": "PHONE_CALL",
            "middleName": "string",
            "mobile": "string",
            "nationality": "INDIAN",
            "professsion": "BUSINESS_OWNER",
            "profileStatus": "ACTIVE_AND_NOT_AVAILABLE",
            "religion": "HINDU",
            "secondaryEmail": "string",
            "secondaryMobileNumber": "string",
            "secondaryMobileVerified": true,
            "sourcingChannel": "APNA",
            "userType": "WORKER",
            "whatsappAvailable": true,
            "whatsappNumber": "string"
          });
          alert(response.data.message)
          setPersonalData(response.data)
          setCurrentSteps(2)
        
    } catch (error) {
        
    }
 }

  return (
  <>
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
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

                <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right"}}>
                    <Button sx={{display:(personalData.status?"none":"block")}}  variant='contained' onClick={handleSubmit}>NEXT</Button>
                    <Button sx={{display:(personalData.status?"block":"none")}} variant='contained' onClick={()=>{setCurrentSteps(2)}}>UPDATE & NEXT</Button>
                </Box>

      </Box>


    </Box>

    </>
  )
}

export default PersonalInformationData