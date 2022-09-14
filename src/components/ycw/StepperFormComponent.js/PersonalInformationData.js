import React, {useContext, useEffect} from 'react'
import { Box, Button } from '@mui/material'
import axios from 'axios';
import PersonalInfo from '../../form/PersonalInfo'
import { multiStepContext } from '../../../ContextApi/StepContext';
import { useState } from 'react';

function PersonalInformationData() {
  // YCW Personal information useState
  const [source, setSource] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [middlename, setMiddlename] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [mobile, setMobile] = React.useState("");
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
  const [availableNumberResponse, setAvailableNumberResponse] = useState()

  const {setCurrentSteps, setPersonalData, personalData} = useContext(multiStepContext)

  console.log(personalData)
  
  useEffect(() => {
   async function checkMobilenumber(){
    let checkNumber = await fetch(`http://13.126.160.155:8080/user/worker/checkProfile/${mobile}`)
    let response = await checkNumber.json();
    setAvailableNumberResponse(response.data)
   }
  checkMobilenumber()
  }, [mobile])

  if(availableNumberResponse){
    alert("Already Available")
    
  }
  
  console.log(availableNumberResponse)
  
  const handleSubmit = async () => {
    try {
        let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
        {
            birthday,
            "bloodGroup": "O_POSITIVE",
            covidStatus,
            educationalRemarks,
            "email": "string",
             firstName:firstname,
            "formStatus": "DRAFT",
            gender,
            "isoCode": "string",
            lastName:lastname,
            maritalStatus,
            "medicalCondition": medicalCondition,
            "medium": "PHONE_CALL",
            middleName:middlename,
            mobile,
            "nationality": "INDIAN",
            "professsion": "BUSINESS_OWNER",
            "profileStatus": "IN_ACTIVE",
            religion,
            "secondaryEmail": "string",
            "secondaryMobileNumber": alternateMobileNumber,
            "secondaryMobileVerified": true,
            "sourcingChannel": source,
            "userType": "WORKER",
            "whatsappAvailable":isWhatsappAvailable,
            "whatsappNumber": whatsappNumber,
          });
          alert(response.data.message)
          setPersonalData(response.data)
          setCurrentSteps(2)
        
    } catch (error) {
      alert("Please fill All the details"); 
    }
 }

 const updataData = async () => {
  try {
      let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
      {
          "birthday":birthday?birthday:personalData.data.birthday,
          "bloodGroup": "O_POSITIVE",
          "covidStatus":covidStatus?covidStatus:personalData.data.covidStatus,
          "educationalRemarks":educationalRemarks?educationalRemarks:personalData.data.educationalRemarks,
          "email": "string",
           firstName:firstname?firstname:personalData.data.firstName,
          "formStatus": "DRAFT",
          "gender":gender?gender:personalData.data.gender,
          "isoCode": "string",
          lastName:lastname?lastname:personalData.data.lastName,
          "maritalStatus":maritalStatus?maritalStatus:personalData.data.maritalStatus,
          "medicalCondition": medicalCondition?medicalCondition:personalData.data.medicalCondition,
          "medium": "PHONE_CALL",
          middleName:middlename?middlename:personalData.data.middleName,
          "mobile":mobile?mobile:personalData.data.mobile,
          "nationality": "INDIAN",
          "professsion": "BUSINESS_OWNER",
          "profileStatus": "IN_ACTIVE",
          "religion":religion?religion:personalData.data.religion,
          "secondaryEmail": "string",
          "secondaryMobileNumber": alternateMobileNumber?alternateMobileNumber:personalData.data.secondaryMobileNumber,
          "secondaryMobileVerified": true,
          "sourcingChannel": source?source:personalData.data.sourcingChannel,
          "userType": "WORKER",
          "whatsappAvailable":isWhatsappAvailable?isWhatsappAvailable:personalData.data.whatsappAvailable,
          "whatsappNumber": whatsappNumber?whatsappNumber:personalData.data.whatsappNumber,
          userId:personalData.data.userId
        });
        alert("Updated",response.data.message)
        setPersonalData(response.data)
        setCurrentSteps(2)
      
  } catch (error) {
    alert("Please fill All the details"); 
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
                    <Button sx={{display:(personalData.status?"block":"none")}} variant='contained' onClick={updataData}>UPDATE & NEXT</Button>
                </Box>
                </Box>


    </Box>

    </>
  )
}

export default PersonalInformationData