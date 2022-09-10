import React from 'react'
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import axios from "axios";

function OtpValidate() {

    const [otp,setOtp]=React.useState("");
    // const [givenmobilenumber,setGivenMobileNumver]=React.useState("");
    const handleClick = async () => {
  
        try {
         let response= await axios.post("http://13.126.160.155:8080/user/auth/validateOtp",
            {  
                
            
                    "isoCode": "IN",
                    "mobile": "8655587809",
                    "otp": otp,
                    "userType": "WORKER"
                


            });

         
          alert("User Registration successfull")
          console.log("res",response.data.message)
           console.log(response)
        //   console.log(mobileNumber);
      
        } catch (error) {
          alert("User Registration Faild", error)
        }

    }
  return (
    <>
    <TextField
        required
        id="outlined-required"
        label="Enter OTP"
        placeholder="Enter OTP."
        defaultValue=""
        onChange={(event) => {
            setOtp(event.target.value);
          }}
      />
      <Button 
      variant="contained"  color="success" onClick={handleClick}>
  Submit
    </Button>
    </>
  );
 }
export default OtpValidate