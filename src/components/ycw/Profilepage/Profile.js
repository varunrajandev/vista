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
      setname(userData.firstName)
    };
    fetchData();
  }, []);
  console.log("data is ", userData)

  return (

    <>

      <Box bgcolor="#fafbfb" flex={7}>
        <YcwNav />
        <BOX
          sx={{
            justifyContent: "space-between",
            padding: "30px 30px 10px 30px",
            mt: "10px",
          }}
        >
          
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
                sx={{ width: "18%" }}
                size="small"
                value={userData.userId}
                id="outlined-basic"
                label="USER ID"
                InputLabelProps={{ shrink: true }}
                variant="outlined"

              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.sourcingChannel}
                label="Sourcing Channel"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.firstName}
                label="First Name*"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Middle Name"
                value={userData.middleName}
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant="outlined"
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Last Name*"
                value={userData.lastName}
                id="outlined-basic"
                variant="outlined"
                InputLabelProps={{ shrink: true }}

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
                label="gender"
                value={userData.gender}
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Phone Number*"
                value={userData.mobile}
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />

              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.secondaryMobileNumber}
                id="outlined-basic"
                variant="outlined"
                label="Alternate Phone Number*"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.whatsappAvailable}
                id="outlined-basic"
                variant="outlined"
                label="Whatsapp Available "
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.whatsappNumber}
                id="outlined-basic"
                variant="outlined"
                label="Whatsapp Number*"
                InputLabelProps={{ shrink: true }}
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
                variant="outlined"
                label="Marital Status*"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.birthday}
                id="outlined-basic"
                variant="outlined"
                label="DOB*"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.educationalRemarks}
                id="outlined-basic"
                variant="outlined"
                label="Educational Remarks"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.medicalCondition}
                id="outlined-basic"
                variant="outlined"
                label="Medical Condition(if any)"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.covidStatus}
                id="outlined-basic"
                variant="outlined"
                label="COVID Vaccination Status*"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.religion}
                id="outlined-basic"
                variant="outlined"
                label="Religion"
                InputLabelProps={{ shrink: true }}
              />
            </Box>






          </Box>
          </Box>


            
        </BOX>
      
        
      </Box>













    </>
  )
}

export default Profile