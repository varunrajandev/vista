import  React,{useContext} from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { multiStepContext } from "../../ContextApi/StepContext";
import PersonalInformationData from "../ycw/StepperFormComponent.js/PersonalInformationData";
import AddressInformation from "../ycw/StepperFormComponent.js/AddressInformation";
import SkillInformationData from "../ycw/StepperFormComponent.js/SkillInformationData"
import JobRequirementData from "../ycw/StepperFormComponent.js/JobRequirementData";
import BankInformation from "../ycw/StepperFormComponent.js/BankInformation";
import HouseHoldMemberData from "../ycw/StepperFormComponent.js/HouseHoldMemberData";
import DocumentData from "../ycw/StepperFormComponent.js/DocumentData";
import SkillQuestion from "../ycw/StepperFormComponent.js/SkillQuestion";


const steps = [
  "PERSONAL",
  "ADDRESS",
  "SKILL",
  "SKILL QUESTIONS",
  "JOB",
  "BANK",
  "DOCUMENT",
  "HOUSEHOLD",
];

function YcwStepper() {
    const {currentSteps} = useContext(multiStepContext)

    function showSteps(steps){
        switch(steps){
            case 1 : return <PersonalInformationData/>
            case 2 : return <AddressInformation/>
            case 3 : return <SkillInformationData/>
            case 4 : return <SkillQuestion/>
            case 5 : return <JobRequirementData/>
            case 6 : return <BankInformation/>
            case 7 : return <DocumentData/>
            case 8 : return <HouseHoldMemberData/>
            
        }
        
    }
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={currentSteps-1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {showSteps(currentSteps)}
    </div>
  );
}

export default YcwStepper;
