import React, {useContext, useEffect, useState} from 'react'
import { Box, Button } from '@mui/material'
import PersonalInfo from '../../form/PersonalInfo'
import { multiStepContext } from '../../../ContextApi/StepContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import Notify from '../../Notification/Notify';


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
  const [otherreligion, setOtherReligion] =useState("")
  const [education, setEducation] = useState("");
  const [educationalRemarks, setEducationalRemarks] = useState("");
  const [covidStatus, setCovidStatus] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [availableNumberResponse, setAvailableNumberResponse] = useState()
  const [userProfile, setUserProfile] = useState([])
  const [notify, setNotify] = useState({isOpen:false, message:"", type:""})
  

  const {id} = useParams()
  const {setCurrentSteps, setPersonalData, personalData} = useContext(multiStepContext)
  let ids = localStorage.getItem('ID');



const datatGetById = async() => {
  let allUserDetails = await fetch(`http://13.126.160.155:8080/user/worker/profile/${id||ids}`);
  let allDataResponse = await allUserDetails.json();
  setUserProfile(allDataResponse);
  setPersonalData(allDataResponse)
  console.log("ProfileData is=>", allDataResponse)
  
  setSource(allDataResponse.data.sourcingChannel);
  setOtherSource(allDataResponse.data.otherSourcingChannel)
  setFirstname(allDataResponse.data.firstName);
  setAge(allDataResponse.data.age);
  setLastname(allDataResponse.data.lastName);
  setGender(allDataResponse.data.gender);
  setMobile(allDataResponse.data.mobileNo);
  setAlternateMobileNumber(allDataResponse.data.secondaryMobileNumber);
  setIsWhatsappAvailable(allDataResponse.data.whatsappAvailable);
  setWhatsappNumber(allDataResponse.data.whatsappNumber);
  setBirthday(allDataResponse.data.birthday)
  setMaritalStatus(allDataResponse.data.maritalStatus)
  setReligion(allDataResponse.data.religion)
  setOtherReligion(allDataResponse.data.otherReligion)
  setEducation(allDataResponse.data.education)
  setEducationalRemarks(allDataResponse.data.educationalRemarks)
  setCovidStatus(allDataResponse.data.covidStatus)
  setMedicalCondition(allDataResponse.data.medicalCondition)

    let PickYear = allDataResponse.data.birthday.slice(0, 4)
    const d = new Date();
    let CurrentYear = d.getFullYear();
     setAge(CurrentYear-PickYear)
}
 useEffect(() => {
    datatGetById();
  }, [id || ids])
  

  
  const handleSubmit = async () => {
    try {
        let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
        {
            "birthday":birthday,
            "age": age,
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
            "otherReligion": otherreligion,
            "secondaryMobileNumber": alternateMobileNumber,
            "secondaryMobileVerified": false,
            "sourcingChannel": source,
            "otherSourcingChannel": otherSource,
            "userType": "WORKER",
            "whatsappAvailable":(isWhatsappAvailable==="Other number"||isWhatsappAvailable==="Same as alternte number"||isWhatsappAvailable==="Same as mobile number")?true:false,
            "whatsappNumber": whatsappNumber,
          });
          setNotify(
            {isOpen:response.data.status,
             message:response.data.message,
             type:"success"}
            )
          localStorage.setItem('ID', response.data.data.userId);
        
    } catch (error) {
      setNotify(
        {isOpen:true,
         message:"Please Filled phone Number",
         type:"error"}
        )
    }
 }


 

 const updataData = async () => {
  try {
      let response = await axios.post("http://13.126.160.155:8080/user/worker/profile",
      {
          "birthday":birthday,
           age,
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
          "otherReligion": otherreligion,
          "secondaryMobileNumber": alternateMobileNumber,
          "sourcingChannel": source,

          "otherSourcingChannel": otherSource,


          "whatsappAvailable":(isWhatsappAvailable==="Other number"||isWhatsappAvailable==="Same as alternte number"||isWhatsappAvailable==="Same as mobile number")?true:false,
          "whatsappNumber": whatsappNumber,
          "department": "TECH",
          "userType": "WORKER",
          userId:ids || id
        
        });
        setNotify(
          {isOpen:response.data.message,
           message:response.data.message,
           type:"success"}
          )
        
      
  } catch (error) {
    setNotify(
      {isOpen:true,
       message:error,
       type:"error"}
      )
  }
}



  return (

  <>
   <Box >
 <Notify 
    notify={notify}
    setNotify={setNotify}
  />
 </Box>
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
    <Box
        marginTop={5}
        sx={{
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        {personalData.data&&<div style={{display:"flex", alignItems:"center", justifyContent:"right", gap:"5px" }}><h5>Saved</h5><VerifiedIcon color='secondary' fontSize='13px'/></div>}
        
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
                otherreligion={otherreligion} setOtherReligion={setOtherReligion}
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