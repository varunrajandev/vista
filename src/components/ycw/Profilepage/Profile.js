import React, { useState } from "react";
import PersonalInfo from "../../form/PersonalInfo";
import PersonalInformationData from "../StepperFormComponent.js/PersonalInformationData";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import YcwNav from "../../../components/Details/YcwDetails/YcwNav";
import styled from "@emotion/styled";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CallIcon from "@mui/icons-material/Call";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { masterApiforAll } from "../../../AlllData";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import carecrewimg from "../../../images/CareCrewImg.png";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BOX = styled(Box)({
  display: "flex",
});

const StyleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#EBECEC",
  padding: "5px",
  boxSizing: "border-box",
  borderRadius: "5px",
  width: "22%",
  paddingBottom: "30px",
});



const StyleBoxHouseHold = styled(Box)({
  display: "flex",
  backgroundColor: "#EBECEC",
  padding: "10px",
  boxSizing: "border-box",
  borderRadius: "5px",
  width: "100%",
  paddingBottom: "30px",
});

function Profile() {
  const [userData, setUserData] = React.useState([]);
  const [currentaddressData, setCurrentAddressData] = React.useState([]);
  const [permanentAddressData, setPermanentAddressData] = React.useState([]);
  const [name, setname] = React.useState("");
  const [bankDetails, setbankDetails] = React.useState([]);
  const [jobRequirement, setJobRequirement] = React.useState([]);
  const [householdMembers, setHouseholdMembers] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [skillotherLanguage, setSkillotherLanguage] = React.useState([]);
  const [primarySkillsDto, setPrimarySkillsDto] = React.useState("");
  const [primarySkillsQuestions, setPrimarySkillsQuestions] = React.useState(
    []
  );
  const [secondarySkillsDto, setSecondarySkillsDto] = React.useState([]);
  const [secondarySkillsQuestions, setSecondarySkillsQuestions] =
    React.useState([]);
  const [tertiarySkillsDto, setTertiarySkillsDto] = React.useState([]);
  const [subSkillsDto, setSubSkillsDto] = React.useState([]);
  const [data, setdata] = React.useState([]);
  const [expandLastJob, setExpandLastJob] = React.useState({});
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let ycwprofiledata = await fetch(
          masterApiforAll + `user/worker/get/details/${id}`
        );
        let profiletadata = await ycwprofiledata.json();
        let useprofiledata = await profiletadata.data;

        setdata(useprofiledata);
        setUserData(useprofiledata.userProfile);
        setCurrentAddressData(useprofiledata.addressDtos[0]);
        setPermanentAddressData(useprofiledata.addressDtos[1]);
        setbankDetails(useprofiledata.bankDetailsDtos);
        setJobRequirement(useprofiledata.jobRequirementResponseDto);
        setHouseholdMembers(useprofiledata.familyMemberDto.familyMemberDto);
        setDocuments(useprofiledata.documentResponseDtos);
        setSkills(useprofiledata.skillResponseDto);
        setPrimarySkillsDto(
          useprofiledata.skillResponseDto.skillsMappingDto[0].skillDto[0]
        );
        setPrimarySkillsQuestions(
          useprofiledata.skillResponseDto.skillsMappingDto[0].skillDto[0]
            .question
        );

        setSecondarySkillsDto(
          useprofiledata.skillResponseDto.skillsMappingDto[1].skillDto
        );

        setTertiarySkillsDto(
          useprofiledata.skillResponseDto.skillsMappingDto[2].skillDto
        );
        setSkillotherLanguage(useprofiledata.skillResponseDto.otherLanguage);

        setExpandLastJob(
          useprofiledata.jobRequirementResponseDto.userExperienceRequestDto
        );
        setname(userData.firstName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("data is ", data);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
   const handleClose = () => {
    setOpen(false);
  };
  let dateofBirth = moment(userData.birthday).utc().format("DD/MM/YYYY");
  let StartTime = moment(userData.birthday).format("LT");
  let JobStartTime = moment(jobRequirement.startTime).format("LT");
  let JobEndTime = moment(jobRequirement.endTime).format("LT");
  // console.log("dob is =>", StartTime);

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
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.sourcingChannel : ""}
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
                value={userData ? userData.otherSourcingChannel : ""}
                label="Other Sourcing Channel"
                color="secondary"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant="filled"
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.firstName : ""}
                label="First Name*"
                color="secondary"
                InputLabelProps={{ shrink: true }}
                id="outlined-basic"
                variant="filled"
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Last Name*"
                color="secondary"
                value={userData ? userData.lastName : ""}
                id="outlined-basic"
                variant="filled"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="gender"
                value={userData ? userData.gender : ""}
                color="secondary"
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant="filled"
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
                value={userData ? userData.mobileNo : ""}
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant="filled"
                focused
              />

              <TextField
                sx={{ width: "18%" }}
                size="small"
                color="secondary"
                value={userData ? userData.secondaryMobileNumber : ""}
                id="outlined-basic"
                variant="filled"
                label="Alternate Phone Number*"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.whatsappAvailable : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Whatsapp Available "
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.whatsappNumber : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Whatsapp Number*"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={dateofBirth ? dateofBirth : ""}
                id="outlined-basic"
                variant="filled"
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
                value={userData ? userData.maritalStatus : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Marital Status*"
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.religion : ""}
                id="outlined-basic"
                variant="filled"
                label="Religion"
                color="secondary"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.otherReligion : ""}
                id="outlined-basic"
                variant="filled"
                label="Other Religion"
                color="secondary"
                InputLabelProps={{ shrink: true }}
                focused
              />

              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.nationality : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Nationality"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData ? userData.educationalRemarks : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Educational Remarks"
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
                value={userData ? userData.covidStatus : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="COVID Vaccination Status*"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "79.7%" }}
                size="small"
                value={userData ? userData.medicalCondition : ""}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Medical Condition(if any)"
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
           
            {/* ========================== Personal Data Section Code End================= */}
            {/* ========================== Skills Section Code Start================= */}
            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>
                Skill and Language Details
              </h3>
              <Box
                sx={{
                  display: "flex",
                  gap: "2%",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mt: 4,
                }}
              >
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={skills ? skills.primaryLanguage : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Primary Language"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "79.8%" }}
                  size="small"
                  value={
                    skillotherLanguage
                      ? skillotherLanguage.map((item) => item.value)
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Other Language"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
              </Box>
              <Box mt={4}>
                <h4>Primary Skills</h4>
                <Box
                  sx={{
                    display: "flex",
                    gap: "2%",
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <h3> {primarySkillsDto ? primarySkillsDto.name : ""}</h3>
                </Box>
                <Box
                  sx={{
                    gap: "2%",
                    display: "flex",
                    flexWrap: "wrap",
                    mt: 2,
                  }}
                >
                  {primarySkillsQuestions ? (
                    primarySkillsQuestions.map((item) => (
                      <Box>
                        <TextField
                          sx={{ width: "350px" }}
                          size="small"
                          value={item.question ? item.question : ""}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Questions"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        {item.answer.map((value) => (
                          <Box sx={{ display: "flex" }} mt={1}>
                            <Box sx={{ fontSize: "15px", fontWeight: 900 }}>
                              {" "}
                              Answer :-{" "}
                            </Box>{" "}
                            <Box
                              mt={0.1}
                              sx={{ fontSize: "13px", fontWeight: 400 }}
                            >
                              {" "}
                              {value ? value : ""}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ))
                  ) : (
                    <Box mt={1}>
                      <h5>No Questions</h5>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box mt={4}>
                <h4>Secondary Skills</h4>
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {secondarySkillsDto
                    ? secondarySkillsDto.map((item) => (
                        <Box>
                          <h3>{item.name}</h3>
                          <Box sx={{ display: "flex", gap: "2%" }}>
                            {item.question ? (
                              item.question.map((value) => (
                                <Box mt={2}>
                                  <TextField
                                    sx={{ width: "350px" }}
                                    size="small"
                                    value={value.question ? value.question : ""}
                                    id="outlined-basic"
                                    variant="filled"
                                    color="secondary"
                                    label="Question"
                                    InputLabelProps={{ shrink: true }}
                                    focused
                                  />
                                  {value.answer.map((result) => (
                                    <Box sx={{ display: "flex" }} mt={1}>
                                      <Box
                                        sx={{
                                          fontSize: "15px",
                                          fontWeight: 900,
                                        }}
                                      >
                                        {" "}
                                        Answer :-{" "}
                                      </Box>{" "}
                                      <Box
                                        mt={0.1}
                                        sx={{
                                          fontSize: "13px",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {" "}
                                        {result ? result : null}
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              ))
                            ) : (
                              <Box mt={1}>
                                <h5>No Questions</h5>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      ))
                    : ""}
                </Box>
              </Box>
              <Box mt={4}>
                <h4>Tertiary Skills</h4>
                <Box
                  sx={{
                    // display: "flex",
                    gap: "2%",
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {tertiarySkillsDto
                    ? tertiarySkillsDto.map((item) => (
                        <Box
                          mt={2}
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <h3> {item.name}</h3>
                          <Box sx={{ display: "flex", gap: "2%" }}>
                            {item.question ? (
                              item.question.map((value) => (
                                <Box mt={2}>
                                  <TextField
                                    sx={{ width: "350px" }}
                                    size="small"
                                    value={
                                      value.question ? value.question : null
                                    }
                                    label="Questions"
                                    color="secondary"
                                    InputLabelProps={{ shrink: true }}
                                    id="outlined-basic"
                                    variant="filled"
                                    focused
                                  />
                                  {value.answer.map((result) => (
                                    <Box sx={{ display: "flex" }} mt={1}>
                                      <Box
                                        sx={{
                                          fontSize: "15px",
                                          fontWeight: 900,
                                        }}
                                      >
                                        {" "}
                                        Answer :-{" "}
                                      </Box>{" "}
                                      <Box
                                        mt={0.1}
                                        sx={{
                                          fontSize: "13px",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {" "}
                                        {result ? result : "No Answer"}
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              ))
                            ) : (
                              <Box mt={1}>
                                <h5>No Questions</h5>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      ))
                    : ""}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "2%",
                  mt: 2,
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  value={skills ? skills.skillRemarks : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Skills Remarks"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
              </Box>
            </Box>
            {/* ========================== Skills Section Code End================= */}
            {/* ========================== Job Requirement Section Code Start================= */}

            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Job Requirement</h3>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mt: 4,
                  gap: "32px",
                }}
              >
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.jobTypeName : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Job Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.otherJobTypeUuid : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Other Job Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.workingHours : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Working Hours"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={JobStartTime ? JobStartTime : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Start Time"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={JobEndTime ? JobEndTime : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="End Time"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    jobRequirement ? jobRequirement.totalSimultaneousJob : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Total Simultaneous Job"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    jobRequirement ? jobRequirement.minSalaryExpectedStr : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Min Salary Expected"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    jobRequirement ? jobRequirement.maxSalaryExpectedStr : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Max Salary Expected"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.openToTraining : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Open To Training"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.traningMode : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Traning Mode"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.jobRemarks : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Job Remarks"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={jobRequirement ? jobRequirement.vehicle : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Vehicle"
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
              ></Box>
            </Box>
            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Job Experience Details</h3>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "32px",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={expandLastJob ? expandLastJob.totalExperienceStr : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Total Experience"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    expandLastJob ? expandLastJob.totalExperienceYears : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Total Experience in Years"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    expandLastJob ? expandLastJob.totalExperienceMonths : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Total Experience in Months"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={expandLastJob ? expandLastJob.jobTypeUuid : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Last Job Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={expandLastJob ? expandLastJob.otherJobTypeUuid : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Other Last Job Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={expandLastJob ? expandLastJob.reasonForLeavingJob : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Reason For Leaving Job"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    expandLastJob ? expandLastJob.otherReasonForLeavingJob : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Other Reason For Leaving Job"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={expandLastJob ? expandLastJob.jobDurationMonths : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Last Job Duration in Months"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={expandLastJob ? expandLastJob.jobDurationYears : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Last Job Duration in Years"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <Box sx={{ width: "18%" }}></Box>
                <Box sx={{ width: "18%" }}></Box>
                <Box sx={{ width: "18%" }}></Box>
              </Box>
            </Box>
            {/* ========================== Job Requirement Section Code End================= */}
            {/* ========================== Current Address Data Section Code Start================= */}

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
                  value={
                    currentaddressData ? currentaddressData.addressLine1 : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Flat/Building"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    currentaddressData ? currentaddressData.addressLine2 : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Society/Colony/Area"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={currentaddressData ? currentaddressData.landmark : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Landmark"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    currentaddressData ? currentaddressData.postalCode : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Pin Code"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    currentaddressData ? currentaddressData.countryName : ""
                  }
                  id="outlined-basic"
                  variant="filled"
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
                  value={currentaddressData ? currentaddressData.stateName : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={currentaddressData ? currentaddressData.cityName : ""}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    currentaddressData ? currentaddressData.micromarketName : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Supply Hub"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    currentaddressData
                      ? currentaddressData.addressProofType
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Current Address Proof Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    currentaddressData
                      ? currentaddressData.otherAddressProofType
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Othr Current Address Proof Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
              </Box>
            </Box>
            {/* ========================== Current Address Data Section Code End================= */}
            {/* ========================== Permanent Address Data Section Code Start================= */}
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
                  value={
                    permanentAddressData
                      ? permanentAddressData.addressLine1
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Flat/Building"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData
                      ? permanentAddressData.addressLine2
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Society/Colony/Area"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData ? permanentAddressData.landmark : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Landmark"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData ? permanentAddressData.postalCode : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Pin Code"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData ? permanentAddressData.countryName : ""
                  }
                  id="outlined-basic"
                  variant="filled"
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
                  value={
                    permanentAddressData ? permanentAddressData.stateName : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData ? permanentAddressData.cityName : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData
                      ? permanentAddressData.micromarketName
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Supply Hub"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData
                      ? permanentAddressData.addressProofType
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Permanent Address Proof Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={
                    permanentAddressData
                      ? permanentAddressData.otherAddressProofType
                      : ""
                  }
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Other Permanent Address Proof Type"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
              </Box>
            </Box>
            {/* ========================== Permanent Address Data Section Code End================= */}
            {/* ========================== Bank Details Section Code Start================= */}

            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Bank Details</h3>
              {bankDetails
                ? bankDetails.map((item) => (
                    <Box sx={{ dispkay: "flex" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 4,
                          flexWrap: "wrap",
                        }}
                      >
                        <TextField
                          sx={{ width: "18%" }}
                          size="small"
                          value={item.accountHolderName}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Account Holder Name"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        <TextField
                          sx={{ width: "18%" }}
                          size="small"
                          value={item.accountNumber}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Account Number"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        <TextField
                          sx={{ width: "18%" }}
                          size="small"
                          value={item.accountType}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Account Type"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                        <TextField
                          sx={{ width: "18%" }}
                          size="small"
                          value={item.bankName}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Bank Name"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />

                        <TextField
                          sx={{ width: "18%" }}
                          size="small"
                          value={item.ifscCode}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="IFSC Code"
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
                          value={item.branchName}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Branch Name"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />

                        <TextField
                          sx={{ width: "79.8%" }}
                          size="small"
                          value={item.branchAddress}
                          id="outlined-basic"
                          variant="filled"
                          color="secondary"
                          label="Branch Address"
                          InputLabelProps={{ shrink: true }}
                          focused
                        />
                      </Box>
                    </Box>
                  ))
                : ""}
            </Box>

            {/* ========================== Bank Details Section Code End================= */}
            {/* ========================== Documents Section Code Start================= */}

            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Documents</h3>
              <Box
                mt={3}
                sx={{ display: "flex", gap: "30px", flexWrap: "wrap" }}
              >
                {documents
                  ? documents.map((item) => (
                      // <Box>
                      <StyleBox>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: "10px",
                            alignItems: "center",
                            mt: 4,
                          }}
                        >
                          <Box>
                            <BookmarkBorderIcon />
                            <TextField
                              size="small"
                              value={item.documentContext}
                              id="outlined-basic"
                              variant="filled"
                              color="secondary"
                              label="Document Upload Type"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box>
                            <AttachFileIcon />
                            <TextField
                              size="small"
                              value={item.fileName}
                              id="outlined-basic"
                              variant="filled"
                              color="secondary"
                              label="File Name"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                        </Box>
                        <Box ml={6} mt={2}>
                          <a href={item.fileUrl} target="blank" download>
                            <img width="90%" src={item.fileUrl} />
                          </a>
                        </Box>
                      </StyleBox>
                      // </Box>
                    ))
                  : ""}
              </Box>
            </Box>
            {/* ========================== Documents Section Code End================= */}
            {/* ==========================Household Members Information Code Start================= */}
            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>
                Household Members Information
              </h3>
              <Box mt={3} sx={{ display: "flex", gap: "3%", flexWrap: "wrap" }}>
                {householdMembers
                  ? householdMembers.map((item) => (
                      <StyleBoxHouseHold>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "25px",
                            justifyContent: "space-between",
                            mt: 4,
                          }}
                        >
                          <Box sx={{ width: "18%" }}>
                            <PersonOutlineIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />

                            <TextField
                              size="small"
                              value={item.name}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Name"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: "18%" }}>
                            <WorkIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              value={item.jobTypeUuid}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Occupation"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: "18%" }}>
                            <WorkIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              value={item.otherJobType}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Other Occupation"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: "18%" }}>
                            <PersonAddAltIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              value={item.relationship}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Relationship"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box sx={{ width: "18%" }}>
                            <PersonAddAltIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              value={item.otherrRlationship}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Other Relationship"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: "18%" }}>
                            <CallIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              value={item.mobileNo}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Mobile Number"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                          <Box sx={{ width: "18%" }}>
                            <DataUsageOutlinedIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              value={item.age}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Age"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>

                          <Box sx={{ width: "59%" }}>
                            <LocationOnIcon
                              sx={{
                                color: "action.active",
                                mr: 1,
                                my: 0.5,
                                marginTop: "15px",
                              }}
                            />
                            <TextField
                              size="small"
                              sx={{ width: "95.5%" }}
                              value={item.address}
                              id="outlined-basic"
                              variant="standard"
                              color="secondary"
                              label="Address"
                              InputLabelProps={{ shrink: true }}
                              focused
                            />
                          </Box>
                        </Box>
                      </StyleBoxHouseHold>
                    ))
                  : ""}
              </Box>
            </Box>
            {/* ==========================Household Members Information Code End================= */}
          </Box>
          {/* ==========================Id card Information Code Start================= */}
          <Box mt={4}>
            <h3 style={{ marginBottom: "6px" }}>ID Card</h3>

            <Card  sx={{ maxWidth: 367, marginTop:"30px" }} onClick={handleClickOpen}>
              <CardActionArea>
                <Box sx={{ backgroundColor: "yellow", padding: "10px" }}>
                  <img
                    sx={{ padding: "5px" }}
                    height="50px"
                    width="320px"
                    src={carecrewimg}
                    alt="Care Crew"
                  />
                </Box>
                <CardContent>
                  <Typography variant="body2">
                    <Box sx={{ display: "flex", gap: "29px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          gap: "3px",
                          fontWeight: 900,
                          fontSize: "16px",
                        }}
                      >
                        <h4>Registration ID: </h4>
                        <h4>Name: </h4>
                        <h4>Location: </h4>
                        <h4>Working Time: </h4>
                        <h4>Experience: </h4>
                        <h4> Monthly Salary: </h4>
                        <h4> Proof of Id: </h4>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          gap: "5px",
                          fontWeight: 400,
                          color: "black",
                          fontSize: "15px",
                        }}
                      >
                        <p>{id}</p>
                        <p>
                          {userData.firstName?userData.firstName:"--"} {userData.lastName?userData.lastName:""}
                        </p>
                        <p>
                          
                          {currentaddressData.micromarketName?currentaddressData.micromarketName:""}, {currentaddressData.cityName?currentaddressData.cityName:""}
                        </p>
                        <p>{jobRequirement.workingHours?jobRequirement.workingHours:"--"}</p>
                        <p>{expandLastJob.totalExperienceYears ? expandLastJob.totalExperienceYears : "--"} Years</p>
                        <p>&#8377; {jobRequirement?jobRequirement.maxSalaryExpectedStr:"--"}</p>
                        <p>{currentaddressData?currentaddressData.addressProofType:"--"}</p>
                      </Box>
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>

          {/* ==========================Id Card Information Code End================= */}
          {/* =============  Id card Open     ============       */}
    
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <Card  sx={{ maxWidth: 450}} onClick={handleClickOpen}>
              <CardActionArea>
                <Box sx={{ backgroundColor: "yellow", padding: "14px" }}>
                  <img
                    sx={{ padding: "5px" }}
                    height="50px"
                    width="320px"
                    src={carecrewimg}
                    alt="Care Crew"
                  />
                </Box>
                <CardContent>
                  <Typography variant="body2">
                    <Box sx={{ display: "flex", gap: "30px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          gap: "3px",
                          fontWeight: 900,
                          fontSize: "16px",
                        }}
                      >
                        <h4>Registration ID: </h4>
                        <h4>Name: </h4>
                        <h4>Location: </h4>
                        <h4>Working Time: </h4>
                        <h4>Experience: </h4>
                        <h4>Monthly Salary: </h4>
                        <h4>Proof of Id: </h4>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          gap: "5px",
                          fontWeight: 400,
                          color: "black",
                          fontSize: "15px",
                        }}
                      >
                        <p>{id}</p>
                        <p>
                          {userData.firstName?userData.firstName:"--"} {userData.lastName?userData.lastName:""}
                        </p>
                        <p>
                        {currentaddressData.micromarketName?currentaddressData.micromarketName:""}, {currentaddressData.cityName?currentaddressData.cityName:""}
                        
                        </p>
                        <p>{jobRequirement.workingHours?jobRequirement.workingHours:"--"}</p>
                        <p>{expandLastJob.totalExperienceStr?expandLastJob.totalExperienceYears:"--"} Years </p> 
                        <p>&#8377; {jobRequirement.maxSalaryExpectedStr?jobRequirement.maxSalaryExpectedStr:"--"}</p>
                        <p>{currentaddressData.addressProofType?currentaddressData.addressProofType:"--"}</p>
                      </Box>
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
       
      </Dialog>
      
        {/* ========== Id card Open  =========== */}
        </Box>
      </Box>
    </>
  );
}

export default Profile;
