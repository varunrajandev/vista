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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const [userType, setUserType] = React.useState("");

  let navigate = useNavigate();

  // const renderButtonforResendOtp =()=>{
  //   return <Button onClick={handleClickforReSendOTP} sx={{cursor:"ponter"}}>Resend</Button>;

  // }

  // const renderTime = remainingTime => {
  //   return <span>{remainingTime} seconds remaining</span>;
  // };
  const renderButton = (buttonProps) => {
    return (
      <Button {...buttonProps} onClick={handleClickforReSendOTP}>
        {buttonProps.remainingTime !== 0
          ? `wait for ${buttonProps.remainingTime} sec`
          : "Resend"}
      </Button>
    );
  };
  const renderTime = () => React.Fragment;
  const { loginData, setLoginData } = useContext(multiStepContext);

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
      });
      alert("User Resend OTP");
      setDisplayAlert("none");
      console.log("res", response.data.message);
      handleClose();
    } catch (error) {
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
          }
        );

        localStorage.setItem("Response", JSON.stringify(response.data.status));
        localStorage.setItem(
          "ResponseName",
          JSON.stringify(response.data.data.firstName)
        );
        localStorage.setItem(
          "ResponseLastName",
          JSON.stringify(response.data.data.lastName)
        );
        localStorage.setItem(
          "ResponseUserType",
          JSON.stringify(response.data.data.userType)
        );

        if (response.data.data.userType === "OPS") {
          navigate("/ycw");
        }
        if (response.data.data.userType === "FIELD_OFFICER") {
          navigate("/registration");
        }
        setLoginData(response.data);
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
                    marginTop: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <ResendOTP
                    //  renderButton={renderButtonforResendOtp}
                    renderButton={renderButton}
                    renderTime={renderTime}
                    maxTime={30}
                    mt={2}
                    style={{ display: "flex", gap: "10px", color: "red" }}
                  />

                  <Button onClick={handleClickforLogin}>Submit</Button>
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
