import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Alert } from "@mui/material";
import axios from "axios";
import image from "../../images/careCrew1.png";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import OTPInput, { ResendOTP } from "otp-input-react";
import InputAdornment from "@mui/material/InputAdornment";
import { data } from "../../Data";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

function Login() {
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [isoCode, setIsoCode] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [displayopt, setDisplayOtp] = React.useState("none");
  const [displayalert, setDisplayAlert] = React.useState("none");
  const [openPopup, setOpenPopup] = React.useState(false);
  const [helpertext, setHelpertext] = React.useState("");
  // const handleClickOpen = () => {
  //   setOpen(true);
  //   handleClick();
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const toll = () => {
    setIsError(true);
  };

  const handleClick2 = async () => {
    try {
      let response = await axios.post(
        "http://13.126.160.155:8080/user/auth/resendOtp",
        {
          isoCode: "IN",
          mobile: mobileNumber,
          userType: "WORKER",
        }
      );
      alert("User Resend OTP");

      console.log("res", response.data.message);
      handleClose();
    } catch (error) {
      alert("User Registration Faild", error);
      handleClose();
    }
  };
  const handleClick1 = async () => {
    if (otp === "") {
      alert("Please fill otp");
    } else {
      try {
        let response = await axios.post(
          "http://13.126.160.155:8080/user/auth/validateOtp",
          {
            isoCode: "IN",
            mobile: mobileNumber,
            otp: otp,
            userType: "WORKER",
          }
        );

        // alert("User Registration successfull")
        console.log("res", response.data.message);
        console.log(response);
        console.log(mobileNumber);
        handleClose();
        window.location.href = "/ycw";
      } catch (error) {
        alert("User Registration Faild", error);
        handleClose();
      }
    }
  };
  // const handleChange = (newValue) => {
  //     setOtp(newValue.target.value)
  //   }

  const handleClick = async () => {
    try {
      let response = await axios.post(
        "http://13.126.160.155:8080/user/auth/login",
        {
          isoCode: "IN",
          mobile: mobileNumber,
          userType: "WORKER",
        }
      );
      // axios.defaults.headers.common['Authorization'] = `Bearer ${response['token']}`;
      //   let response=      axios({
      //   method:"post",
      //   url:'http://13.126.160.155:8080/user/auth/login',
      //   data:{
      //     "isoCode": "IN",
      //                 "mobile": mobileNumber,
      //                 "userType": "WORKER"
      //   },
      //   headers: {
      //     "accepts": "application/json",
      //     'Access-Control-Allow-Origin': '*',
      //     'Authorization': 'Bearer ' + "",
      //   },

      // })
      // axios.defaults.headers.common['Authorization'] = data.token;
      // alert("User Registration successfull")
      setDisplayOtp("visible");
      // handleClick2()
      //   console.log("res",response)
      //   console.log("login success",response.message)
      // //   setGivenMobileNumver(mobileNumber)
      //   console.log(mobileNumber);
      // setOpen(true);

      // {<Link to="/ycw"></Link> }
    } catch (error) {
      alert("Please Fill Currect Mobile Number", error);
    }
  };
  return (
    <>
      <Card
        sx={{
          marginLeft: "39%",
          maxWidth: 300,
          padding: "25px",
          height: "500px",
          marginTop: "100px",
          marginBottom: "220px",
        }}
      >
        <CardMedia
          image={image}
          component="img"
          // height="140"
          //   width="300"
          sx={{ width: "150px", marginLeft: "24%", marginTop: "60px" }}
          alt="CARE CREW"
          // sx={{width:"50px"}}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "250px",
            justifyContent: "space-around",
            marginTop: "60px",
          }}
        >
          <Box sx={{ lineHeight: "30px" }}>
            <Box sx={{ fontSize: "22px", fontWeight: "900" }}>Log In</Box>
            <Box sx={{ fontSize: "15px", fontWeight: "450", color: "#949494" }}>
              Enter your Registered phone number
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {/* <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    size="small"
    value="IN"
    label="India"
    // onChange={handleChange}
  > */}
            {/* <MenuItem value="IN">
    <img  src="https://cdn.pixabay.com/photo/2018/01/21/14/36/indian-flag-3096740_1280.png" style={{width:"12px",height:"12px"}}></img> 
     IN</MenuItem> */}
            {/* </Select> */}
            <TextField
              sx={{ width: "60px" }}
              required
              size="small"
              // id="outlined-required"
              id="standard-size-small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src="https://cdn.pixabay.com/photo/2018/01/21/14/36/indian-flag-3096740_1280.png"
                      style={{ width: "13px", height: "12px" }}
                    ></img>
                  </InputAdornment>
                ),
              }}
              value="+91"
              variant="standard"
            />

            <TextField
              sx={{ textDecoration: "none", counterText: "" }}
              required
              size="small"
              // id="outlined-required"
              id="standard-size-small"
              type="number"
              //  TextFieldType="number"
              error={isError}
              placeholder="Phone Number"
              // maxlength="10"
              // defaultValue=""
              // TextFieldLength={4}
              // onfocusout={myfo()}
              variant="standard"
              helperText={helpertext}
              onInput={(e) => {
                setMobileNumber(
                  (e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10))
                );

                if (e.target.value.length < 1 || e.target.value.length === 10) {
                  setIsError(false);
                  setHelpertext("");
                } else {
                  setIsError(true);
                  setDisplayOtp("none");
                  setHelpertext("Please Enter your correct Number");
                }
              }}
              // onInput={(event) => {
              //     setMobileNumber(event.target.value);
              //     if (event.target.value.length >11) {

              //       setIsError(true);

              //     }
              //     else{
              //       setIsError(false);
              //     }
              //   }}
            />
            {/* <Box sx={{display:`${displayalert}`}}>
          please fill correct Number
         </Box> */}
          </Box>

          <Button variant="contained" color="success" onClick={handleClick}>
            {/* onClick={handleClick} */}
            Send OTP
          </Button>

          {/* --------------------OTP CODE ---------------------------- */}
          {/* <Dialog open={open}  >
        <DialogTitle sx={{padding:"30px"}}>Enter OTP</DialogTitle>
        <DialogContent> */}
          <Box sx={{ display: `${displayopt}` }}>
            <OTPInput
              autoFocus
              OTPLength={4}
              value={otp}
              otpType="number"
              //  onChange={(event) => {
              //         setOtp(event.target.value);
              //       }}
              onChange={setOtp}
            />

            {/* </DialogContent> */}
            {/* <DialogActions> */}
            <Box
              sx={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "space-between",
              }}
            >
              <ResendOTP
                onClick={handleClick2}
                maxTime={60}
                //style={{color:"red" ,gap:"10px", backgroundColor:"white",border:"none"}}
              />
              {/* <Button onClick={handleClick2}>Resend OTP</Button> */}
              <button onClick={handleClick1} variant="sucess">
                Submit
              </button>
            </Box>
          </Box>
          {/* </DialogActions> */}
          {/* </Dialog> */}

          {/* --------------------OTP CODE ---------------------------- */}
        </CardContent>
      </Card>
      {/* <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="SUCCESS MESSAGE"
      >
        <Alert severity="success">This is a success alert — check it out!</Alert>
      </Popup> */}
    </>
  );
}

export default Login;
