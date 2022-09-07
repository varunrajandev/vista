import React, { useState } from "react";
import App from "../App"

export const multiStepContext = React.createContext();

function StepContext() {
  const [currentSteps, setCurrentSteps] = useState(1);
  const [personalData, setPersonalData] = useState([]);
  const [addressData, setAddressData] = useState([]);
  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentSteps,
          setCurrentSteps,
          personalData,
          setPersonalData,
          addressData,
          setAddressData,
        }}
      >
        <App/>
      </multiStepContext.Provider>
    </div>
  );
}

export default StepContext;
