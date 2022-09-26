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
  const [properSkillsDto, setProperSkillsDto] = React.useState([]);
  const [subSkillsDto, setSubSkillsDto] = React.useState([]);
  const [data, setdata] = React.useState([]);
  const { id } = useParams();
  // console.log(userData, id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let ycwprofiledata = await fetch(
          `http://13.126.160.155:8080/user/worker/get/details/${id}`
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
        setProperSkillsDto(skills.skillsMappingDto);
        // setSubSkillsDto(properSkillsDto.skillDto)

        setname(userData.firstName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log("data is ", data);

  console.log("dob", subSkillsDto);

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
                variant="filled"
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
                variant="filled"
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                label="Last Name*"
                color="secondary"
                value={userData.lastName}
                id="outlined-basic"
                variant="filled"
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
                value={userData.mobile}
                id="outlined-basic"
                InputLabelProps={{ shrink: true }}
                variant="filled"
                focused
              />

              <TextField
                sx={{ width: "18%" }}
                size="small"
                color="secondary"
                value={userData.secondaryMobileNumber}
                id="outlined-basic"
                variant="filled"
                label="Alternate Phone Number*"
                InputLabelProps={{ shrink: true }}
                focused
              />
              <TextField
                sx={{ width: "18%" }}
                size="small"
                value={userData.whatsappAvailable}
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
                value={userData.whatsappNumber}
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
                value={userData.birthday}
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
                value={userData.maritalStatus}
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
                value={userData.religion}
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
                value={userData.nationality}
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
                value={userData.educationalRemarks}
                id="outlined-basic"
                variant="filled"
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
                variant="filled"
                color="secondary"
                label="COVID Vaccination Status*"
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
                sx={{ width: "79.5%" }}
                size="small"
                value={userData.medicalCondition}
                id="outlined-basic"
                variant="filled"
                color="secondary"
                label="Medical Condition(if any)"
                InputLabelProps={{ shrink: true }}
                focused
              />
            </Box>
            {/* ========================== Personal Data Section Code End================= */}
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
                  value={currentaddressData.addressLine1}
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
                  value={currentaddressData.addressLine2}
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
                  value={currentaddressData.landmark}
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
                  value={currentaddressData.postalCode}
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
                  value={currentaddressData.countryName}
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
                  value={currentaddressData.stateName}
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
                  value={currentaddressData.cityName}
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
                  value={currentaddressData.locality}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Locality"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <Box sx={{ width: "18%" }}></Box>

                <Box sx={{ width: "18%" }}></Box>
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
                  value={permanentAddressData.addressLine1}
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
                  value={permanentAddressData.addressLine2}
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
                  value={permanentAddressData.landmark}
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
                  value={permanentAddressData.postalCode}
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
                  value={permanentAddressData.countryName}
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
                  value={permanentAddressData.stateName}
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
                  value={permanentAddressData.cityName}
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
                  value={permanentAddressData.locality}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Locality"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <Box sx={{ width: "18%" }}></Box>

                <Box sx={{ width: "18%" }}></Box>
              </Box>
            </Box>
            {/* ========================== Permanent Address Data Section Code End================= */}
            {/* ========================== Skills Section Code Start================= */}
            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>
                Skill and Experience Details
              </h3>
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
                  value={skills.primaryLanguage}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Primary Language"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  value={skills.otherLanguage}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Other Language"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  // value={skills.skillsMappingDto[0].skillDto[0].skillName}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Primary Skills"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  //  value={item.skillLevel}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Secondary Skills"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  // value={skills.cityName}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="TERTIARY Skills"
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
                  value={skills.skillRemarks}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Skills Remarks"
                  InputLabelProps={{ shrink: true }}
                  focused
                />

                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                  // value={item.skillLevel}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Reason For Leaving Job"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <Box sx={{ width: "18%" }}></Box>

                <Box sx={{ width: "18%" }}></Box>
                <Box sx={{ width: "18%" }}></Box>
              </Box>
              {/* ))} */}
            </Box>
            {/* ========================== Skills Section Code End================= */}
            {/* ========================== Job Requirement Section Code Start================= */}
            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Job Requirement</h3>
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
                  value={jobRequirement.jobTypeUuid}
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
                  value={jobRequirement.workingHours}
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
                  value={jobRequirement.startTime}
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
                  value={jobRequirement.endTime}
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
                  value={jobRequirement.totalSimultaneousJob}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Total Simultaneous Job"
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
                  value={jobRequirement.minSalaryExpectedStr}
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
                  value={jobRequirement.maxSalaryExpectedStr}
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
                  value={jobRequirement.openToTraining}
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
                  value={jobRequirement.traningMode}
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
                  value={jobRequirement.jobRemarks}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Job Remarks"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
              </Box>
              {/* <Box
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
                  value={jobRequirement.vehicle}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  label="Vehicle"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
                <TextField
                  sx={{ width: "18%" }}
                  size="small"
                 // value={jobRequirement.userExperienceRequestDto.jobTypeUuid}
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
                 // value={jobRequirement.totalExperienceStr.reasonForLeavingJob}
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
           //     value={jobRequirement.userExperienceRequestDto.totalExperienceStr}
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
                 // value={jobRequirement.jobRemarks}
                  id="outlined-basic"
                  variant="filled"
                  color="secondary"
                  // label="Job Remarks"
                  InputLabelProps={{ shrink: true }}
                  focused
                />
              </Box> */}
            </Box>
            {/* ========================== Job Requirement Section Code End================= */}
            {/* ========================== Bank Details Section Code Start================= */}

            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Bank Details</h3>
              {bankDetails.map((item) => (
                <Box>
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
                      value={item.branchName}
                      id="outlined-basic"
                      variant="filled"
                      color="secondary"
                      label="Branch Name"
                      InputLabelProps={{ shrink: true }}
                      focused
                    />

                    <TextField
                      sx={{ width: "39%" }}
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
                      value={item.ifscCode}
                      id="outlined-basic"
                      variant="filled"
                      color="secondary"
                      label="IFSC Code"
                      InputLabelProps={{ shrink: true }}
                      focused
                    />

                    <TextField
                      sx={{ width: "18%" }}
                      size="small"
                      value={item.primary}
                      id="outlined-basic"
                      variant="filled"
                      color="secondary"
                      label="Primary"
                      InputLabelProps={{ shrink: true }}
                      focused
                    />

                    <Box sx={{ width: "18%" }}></Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ========================== Bank Details Section Code End================= */}
            {/* ========================== Documents Section Code Start================= */}

            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>Documents</h3>
              <Box sx={{ display: "flex", gap: "20px" }}>
                {documents.map((item) => (
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
                          value={item.documentUploadType}
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
                ))}
              </Box>
            </Box>
            {/* ========================== Documents Section Code End================= */}
            {/* ==========================Household Members Information Code Start================= */}
            <Box mt={6}>
              <h3 style={{ marginBottom: "6px" }}>
                Household Members Information
              </h3>

              {householdMembers.map((item) => (
                <StyleBox>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 4,
                    }}
                  >
                    <Box>
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
                    <Box>
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

                    <Box>
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
                    <Box>
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

                    <Box>
                      <MailOutlineIcon
                        sx={{
                          color: "action.active",
                          mr: 1,
                          my: 0.5,
                          marginTop: "15px",
                        }}
                      />
                      <TextField
                        size="small"
                        value={item.email}
                        id="outlined-basic"
                        variant="standard"
                        color="secondary"
                        label="Email"
                        InputLabelProps={{ shrink: true }}
                        focused
                      />
                    </Box>
                  </Box>
                </StyleBox>
              ))}
            </Box>
            {/* ==========================Household Members Information Code End================= */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
