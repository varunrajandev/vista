import React, {useContext, useEffect, useState} from 'react'
import { Box, Button } from '@mui/material'
import PersonalInfo from '../../form/PersonalInfo'
import { multiStepContext } from '../../../ContextApi/StepContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PersonalInformationData() {
  // YCW Personal information useState
  const [source, setSource] = useState("");
  const [otherSource, setOtherSource] = useState("")
  const [firstname, setFirstname] = useState("");
  const [age, setAge] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternateMobileNumber, setAlternateMobileNumber] = useState("");
  const [isWhatsappAvailable, setIsWhatsappAvailable] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [education, setEducation] = useState("");
  const [educationalRemarks, setEducationalRemarks] = useState("");
  const [covidStatus, setCovidStatus] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [availableNumberResponse, setAvailableNumberResponse] = useState()
  const [userProfile, setUserProfile] = useState([])
  

  const {id} = useParams()
  const {setCurrentSteps, setPersonalData, personalData} = useContext(multiStepContext)
  let ids = localStorage.getItem('ID');



const datatGetById = async() => {
  let allUserDetails = await fetch(`http://13.126.160.155:8080/user/worker/profile/${id||ids}`);
  let allDataResponse = await allUserDetails.json();
  setUserProfile(allDataResponse);
  setPersonalData(allDataResponse)
  
  setSource(allDataResponse.data.sourcingChannel);
  setFirstname(allDataResponse.data.firstName);
  // setMiddlename(allDataResponse.data.middleName);
  setLastname(allDataResponse.data.lastName);
  setGender(allDataResponse.data.gender);
  setMobile(allDataResponse.data.mobileNo);
  setAlternateMobileNumber(allDataResponse.data.secondaryMobileNumber);
  setIsWhatsappAvailable(allDataResponse.data.whatsappAvailable);
  setWhatsappNumber(allDataResponse.data.whatsappNumber);
  setBirthday(allDataResponse.data.birthday)
  setMaritalStatus(allDataResponse.data.maritalStatus)
  setReligion(allDataResponse.data.religion)
  setEducation(allDataResponse.data.education)
  setEducationalRemarks(allDataResponse.data.educationalRemarks)
  setCovidStatus(allDataResponse.data.covidStatus)
  setMedicalCondition(allDataResponse.data.medicalCondition)

    let PickYear = allDataResponse.data.birthday.slice(0, 4)
    const d = new Date();
    let CurrentYear = d.getFullYear();
     setAge(CurrentYear-PickYear)

     console.log("profileData", personalData.data.birthday)
}

 
   async function checkMobilenumber(mobile){
    let checkNumber = await fetch(`http://13.126.160.155:8080/user/worker/checkProfile/${mobile}`)
    let response = await checkNumber.json();
    setAvailableNumberResponse(response.data)
  }

  useEffect(() => {
    datatGetById();
  }, [id || ids])
  
  const n = setTimeout(() => {
    if(mobile.length===10) checkMobilenumber(mobile);
    if(availableNumberResponse&&!userProfile.status){
      alert("Already Available")
    }
  }, 1000);
  if(alternateMobileNumber || whatsappNumber || birthday || maritalStatus){
      clearTimeout(n)
    }
  
  const handleSubmit = async () => {
    try {
        let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
        {
            "birthday":birthday,
            covidStatus,
            educationalRemarks,
             firstName:firstname,
            gender,
            "isoCode": "IN",
            lastName:lastname,
            maritalStatus,
            "medicalCondition": medicalCondition,
            // middleName:middlename,
            "mobileNo":mobile,
            "department": "WORKER",
            "education":education,
            religion,
            "secondaryMobileNumber": alternateMobileNumber,
            "secondaryMobileVerified": false,
            "sourcingChannel": source,
            "userType": "WORKER",
            "whatsappAvailable":(isWhatsappAvailable==="Other number"||isWhatsappAvailable==="Same as alternte number"||isWhatsappAvailable==="Same as mobile number")?true:false,
            "whatsappNumber": whatsappNumber,
          });
          alert(response.data.message)
          localStorage.setItem('ID', response.data.data.userId);
          response.data.status?localStorage.setItem('steps', 2):localStorage.setItem('steps', 1)
          setCurrentSteps(2)
        
    } catch (error) {
      alert("Please fill All the details"); 
    }
 }


 

 const updataData = async () => {
  try {
      let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
      {
          "birthday":birthday,
          "covidStatus":covidStatus,
          "educationalRemarks":educationalRemarks,
           firstName:firstname,
          "gender":gender,
          "isoCode": "IN",
          "education":education,
          lastName:lastname,
          "maritalStatus":maritalStatus,
          "medicalCondition": medicalCondition,
          // middleName:middlename,
          "mobileNo":mobile,
          "nationality": "INDIAN",
          "religion":religion,
          "secondaryMobileNumber": alternateMobileNumber,
          "sourcingChannel": source,
          "whatsappAvailable":(isWhatsappAvailable==="Other number"||isWhatsappAvailable==="Same as alternte number"||isWhatsappAvailable==="Same as mobile number")?true:false,
          "whatsappNumber": whatsappNumber,
          "department": "TECH",
          "userType": "WORKER",
          userId:ids || id
        
        });
        alert("Updated",response.data.message)
        
      
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
                age={age} setAge={setAge}
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
                otherSource={otherSource} setOtherSource={setOtherSource}
                userProfile={userProfile}
                />

                <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                    <Button sx={{display:(personalData.status?"none":"block")}}  variant='contained' onClick={handleSubmit}>save</Button>
                    <Button sx={{display:(personalData.status?"block":"none")}} variant='contained' onClick={updataData}>save</Button>
                    <Button variant='contained' onClick={()=>{setCurrentSteps(2)}}>next</Button>
                </Box>
                </Box>


    </Box>

    </>
  )
}

export default PersonalInformationData