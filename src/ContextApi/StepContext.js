import React, { useState } from "react";
import App from "../App"

export const multiStepContext = React.createContext();

function StepContext() {
  const [currentSteps, setCurrentSteps] = useState(2);
  const [personalData, setPersonalData] = useState([]);
  const [addressDatas, setAddressData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [jobData, setJobData] = useState([])
  const [bankData, setBankData] = useState([])
  const [householdData, setHouseholdData] = useState([])
  const [documentData, setDocumentData] = useState([])
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentSteps,setCurrentSteps,
          personalData,setPersonalData,
          addressDatas,setAddressData,
          skillData,setSkillData,
          jobData, setJobData,
          bankData,setBankData,
          householdData,setHouseholdData,
          documentData,setDocumentData
        }}
      >
        <App/>
      </multiStepContext.Provider>
    </div>
  );
}

export default StepContext;
