import React, { useState } from 'react'
import PersonalInfo from '../../form/PersonalInfo'
import PersonalInformationData from '../StepperFormComponent.js/PersonalInformationData'
import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import YcwNav from "../../../components/Details/YcwDetails/YcwNav";
import styled from "@emotion/styled";


const BOX = styled(Box)({
  display: "flex",
});

function Profile() {
  const [userData, setUserData] = React.useState([])
  const[currentaddressData,setCurrentAddressData] = React.useState([])
  const[permanentAddressData,setPermanentAddressData]=React.useState([])
  const [name, setname] = React.useState("");
  const { id } = useParams();
  console.log(userData, id)

  useEffect(() => {
    const fetchData = async () => {

      let ycwprofiledata = await fetch(
        `http://13.126.160.155:8080/user/worker/get/details/${id}`
      )
      let profiletadata = await ycwprofiledata.json();
      let useprofiledata = await profiletadata.data;
      setUserData(useprofiledata.userProfile)
      setCurrentAddressData(useprofiledata.addressDtos[0])
      setPermanentAddressData(useprofiledata.addressDtos[1])
      setname(userData.firstName)
    };
    fetchData();
  }, []);
  console.log("data is ", userData)
  // console.log("permanetdata is ",permanentAddressData)

  // let dob=userData.birthday.toLocaleDateString();
  // console.log("dob",dob)
  

  return (

    <>

      <Box bgcolor="#fafbfb" flex={7}>
        <YcwNav />  
       <Box
            sx={{
          padding: 5,
          bgcolor: "white",
          borderRadius: 3,
           }}
             >
        
          <Box>
            <h3 style={{ marginBottom: "6px" }}>Personal Information</h3>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
            
              <TextField
                sx={{ width: "18%", }}
                size="small"
                value={userData.sourcingChannel}
                label="Sourcing Channel"
                color="secondary" 
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant="filled"
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.firstName}
                label="First Name*"
                color="secondary" 
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant='filled'
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Middle Name"
                color="secondary" 
                value={userData.middleName}
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant='filled'
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Last Name*"
                color="secondary" 
                value={userData.lastName}
                id="outlined-basic"
                variant='filled'
                InputLabelProps={{ shrink: true }}
                focused
              />
                 <TextField
                sx={{ width: "18%" }}
                size="small"
                label="gender"
                value={userData.gender}
                color="secondary" 
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant='filled'
                focused
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
            
              <TextField
                sx={{ width: "18%" }}
                size="small"
                color="secondary" 
                label="Phone Number*"
                value={userData.mobile}
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant='filled'
                focused
              />

              <TextField
                sx={{ width: "18%" }}
                size="small"
                color="secondary" 
                value={userData.secondaryMobileNumber}
                id="outlined-basic"
                variant='filled'
                label="Alternate Phone Number*"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.whatsappAvailable}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Whatsapp Available "
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.whatsappNumber}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Whatsapp Number*"
                InputLabelProps={{ shrink: true }}
                focused
              />
               <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.birthday}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="DOB*"
                InputLabelProps={{ shrink: true }}
                focused
              />
             

            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
               <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.maritalStatus}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Marital Status*"
                InputLabelProps={{ shrink: true }}
                focused
              />
                 <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.religion}
                id="outlined-basic"
                variant='filled'
                label="Religion"
                color="secondary" 
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.nationality}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Nationality"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.educationalRemarks}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Educational Remarks"
                InputLabelProps={{ shrink: true }}
                focused
              />
           
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.covidStatus}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="COVID Vaccination Status*"
                InputLabelProps={{ shrink: true }}
                focused
              />
              
               
            </Box>
            <Box   sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
            <TextField
                sx={{ width: "79.5%" }}
                size="small"
                value={userData.medicalCondition}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Medical Condition(if any)"
                InputLabelProps={{ shrink: true }}
                focused
              />
</Box>
         <Box mt={6}>
            <h3 style={{ marginBottom: "6px" }}>Current Address</h3>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >

             <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.addressLine1}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Flat/Building"
                InputLabelProps={{ shrink: true }}
                focused
              />
               <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.addressLine2}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Society/Colony/Area"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.landmark }
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Landmark"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.postalCode}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Pin Code"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.countryName}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Country"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >

             <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.stateName}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="State"
                InputLabelProps={{ shrink: true }}
                focused
              />
               <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.cityName}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="City"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={currentaddressData.locality}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Locality"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
            <Box  sx={{ width: "18%" }}></Box>
              
             <Box  sx={{ width: "18%" }}></Box>
          
          
            </Box>
            </Box>

            <Box mt={6}>
            <h3 style={{ marginBottom: "6px" }}>Permanent Address</h3>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >

             <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.addressLine1}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Flat/Building"
                InputLabelProps={{ shrink: true }}
                focused
              />
               <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.addressLine2}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Society/Colony/Area"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.landmark }
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Landmark"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.postalCode}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Pin Code"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.countryName}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Country"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >

             <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.stateName}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="State"
                InputLabelProps={{ shrink: true }}
                focused
              />
               <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.cityName}
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="City"
                InputLabelProps={{ shrink: true }}
                focused
              />
          
          <TextField
                sx={{ width: "18%" }}
                size="small"
                value={permanentAddressData.locality }
                id="outlined-basic"
                variant='filled'
                color="secondary" 
                label="Locality"
                InputLabelProps={{ shrink: true }}
                focused
              />
              
              <Box  sx={{ width: "18%" }}></Box>
              
             <Box  sx={{ width: "18%" }}></Box>
               
          
             
          
  
          
            </Box>
            </Box>



   {/* <PersonalInfo  fname={name}/> */}

          </Box>
          </Box>


            
     
      
        
      </Box>













    </>
  )
}

export default Profile