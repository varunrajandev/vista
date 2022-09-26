import React, { useState } from "react";
import App from "../App"

export const multiStepContext = React.createContext();


function StepContext() {


  const [currentSteps, setCurrentSteps] = useState(1);

  const [personalData, setPersonalData] = useState([]);
  const [addressDatas, setAddressData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [jobData, setJobData] = useState([])
  const [bankData, setBankData] = useState([])
  const [householdData, setHouseholdData] = useState([])
  const [documentData, setDocumentData] = useState([])
  const [loginData, setLoginData] = useState([])
  
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentSteps,setCurrentSteps,
          loginData, setLoginData,
          personalData,setPersonalData,
          addressDatas,setAddressData,
          skillData,setSkillData,
          jobData, setJobData,
          bankData,setBankData,
          householdData,setHouseholdData,
          documentData,setDocumentData,
        }}
      >
        <App/>
      </multiStepContext.Provider>
    </div>
  );
}

export default StepContext;
