import * as React from "react";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { Box, Button, Alert } from "@mui/material";
import axios from "axios";
import image from "../../images/careCrew1.png";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import OTPInput, { ResendOTP } from "otp-input-react";
import InputAdornment from "@mui/material/InputAdornment";
import { data } from "../../Data";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { multiStepContext } from "../../ContextApi/StepContext";
import { masterApiforAll } from "../../AlllData";
import indianflag from "../../images/india.png";
import AlertTitle from "@mui/material/AlertTitle";

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
  const [errorvalue, setErrorValue] = React.useState("");
  let navigate = useNavigate();

  const { loginData, setLoginData } = useContext(multiStepContext);

  console.log("loginData", loginData);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const toll = () => {
    setIsError(true);
  };

  const handleClickforReSendOTP = async () => {
    try {
      let response = await axios.post(masterApiforAll + "user/auth/resendOtp", {
        isoCode: "IN",
        mobile: mobileNumber,
        userType: "WORKER",
      });
      alert("User Resend OTP");
      console.log("res", response.data.message);
      handleClose();
    } catch (error) {
      // alert("User Registration Faild", error)
      setDisplayAlert("visible");
      setErrorValue("OTP Resend Fail Please Try Again");
      handleClose();
    }
  };
  const handleClickforLogin = async () => {
    if (otp === "") {
      setDisplayAlert("visible");
      setErrorValue("OTP is Empty Please Fill OTP");
    } else {
      try {
        let response = await axios.post(
          masterApiforAll + "user/auth/validateOtp",
          {
            isoCode: "IN",
            mobile: mobileNumber,
            otp: otp,
            userType: "WORKER",
          }
        );

        localStorage.setItem("Response", JSON.stringify(response.data.status));
        localStorage.setItem("ResponseName", JSON.stringify(response.data.data.firstName))
        setLoginData(response.data);
        navigate("/ycw");
      } catch (error) {
        setErrorValue("Please Fill Correct OTP");
        setDisplayAlert("visible");
        handleClose();
      }
    }
  };

  const handleClickforSendOTP = async () => {
    try {
      let response = await axios.post(masterApiforAll + "user/auth/login", {
        isoCode: "IN",
        mobile: mobileNumber,
        userType: "WORKER",
      });
      setDisplayOtp("visible");
      setDisplayAlert("none");
    } catch (error) {
      setDisplayAlert("visible");
      setErrorValue("Please Fill correct Mobile Number");
    }
  };
  return (
    <>
      <Grid
        height={650}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          textAlign: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {/*--------------------- Login Field Code Start ---------------------------- */}
        <Card sx={{ marginTop: "50px", padding: "25px" }}>
          <CardMedia
            image={image}
            component="img"
            sx={{ width: "150px", margin: "auto", marginTop: "40px" }}
            alt="CARE CREW"
          />
          <Grid>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "250px",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ fontSize: "22px", fontWeight: "900" }}>Log In</Box>
              <Box
                sx={{ fontSize: "15px", fontWeight: "450", color: "#949494" }}
              >
                Enter your Registered phone number
              </Box>
              {/*------------------- Login Mobile Number TextField Code Start From here ----------------*/}
              <Grid lg={12} sm={12} sx={12}>
                <Box mt={3} sx={{ display: "flex", gap: "10px" }}>
                  <TextField
                    sx={{ width: "60px" }}
                    required
                    size="small"
                    id="standard-size-small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={indianflag}
                            style={{ width: "13px", height: "13px" }}
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
                    id="standard-size-small"
                    type="number"
                    error={isError}
                    placeholder="Phone Number"
                    variant="standard"
                    helperText={helpertext}
                    onInput={(e) => {
                      setMobileNumber(
                        (e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 10))
                      );
                      if (
                        e.target.value.length < 1 ||
                        e.target.value.length === 10
                      ) {
                        setIsError(false);
                        setHelpertext("");
                      } else {
                        setIsError(true);
                        setDisplayOtp("none");
                        setHelpertext("Please Enter correct Number");
                        setDisplayAlert("none");
                      }
                    }}
                  />
                </Box>
              </Grid>
              {/*------------------- Login Mobile Number TextField Code Start From here ----------------*/}
              <Grid lg={12} sm={12} sx={12}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClickforSendOTP}
                >
                  {" "}
                  Send OTP{" "}
                </Button>
              </Grid>
              {/* --------------------OTP CODE Start ---------------------------- */}

              <Box sx={{ display: `${displayopt}` }}>
                <OTPInput
                  autoFocus
                  OTPLength={4}
                  value={otp}
                  otpType="number"
                  onChange={setOtp}
                />

                <Box
                  sx={{
                    display: "flex",
                    marginTop: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <ResendOTP
                    onClick={handleClickforReSendOTP}
                    maxTime={30}
                    style={{ color: "green" }}
                  />

                  <button onClick={handleClickforLogin} variant="sucess">
                    Submit
                  </button>
                </Box>
              </Box>

              {/* --------------------OTP CODE End ---------------------------- */}
            </CardContent>
          </Grid>
        </Card>
        {/* --------------------Alert Code Start---------------------------- */}
        <Grid>
          <Alert sx={{ display: `${displayalert}` }} severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorvalue} <strong>check it out!</strong>
          </Alert>
        </Grid>
        {/* -------------------- Alert Code End---------------------------- */}
        {/*--------------------- Login Field Code End ---------------------------- */}
      </Grid>
    </>
  );
}

export default Login;
