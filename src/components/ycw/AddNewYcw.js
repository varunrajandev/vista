import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import PersonalInfo from "../form/PersonalInfo";
import CurrentAdd from "../form/CurrentAdd";
import PermanentAdd from "../form/PermanentAdd";
import SkillExpDetails from "../form/SkillExpDetails";
import JobRequirement from "../form/JobRequirement";
import BankAccount from "../form/BankAccount";
import Document from "../form/Document";
import HouseHoldMemberInfo from "../form/HouseHoldMemberInfo";
import YcwButtons from "../buttons/YcwButtons";
import { useState } from "react";

function AddNewYcw() {
const [name, setName] = useState("")

      const handleClick = ()=>{
        console.log(name)
      }

      
  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Add New YCW</Typography>
        <Typography sx={{ display: "flex", gap: 2 }}>
          {/* Buttons */}
          <YcwButtons data = {handleClick} />

        </Typography>
      </Box>
      {/* //Form */}
      <Box
        marginTop={5}
        sx={{
          
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        <PersonalInfo />
        <CurrentAdd />
        <PermanentAdd />
        <SkillExpDetails />
        <JobRequirement />
        <BankAccount/>
        <Document />
        <HouseHoldMemberInfo 
          name={name} 
          setName={setName}
        />
      </Box>
    </Box>
  );
}

export default AddNewYcw;
