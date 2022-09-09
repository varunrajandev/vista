import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { multiStepContext } from '../../../ContextApi/StepContext';
import JobRequirement from '../../form/JobRequirement';
import { JobRequirementApis, masterApi } from '../../../AlllData';
import axios from 'axios';

function JobRequirementData() {
    //job requirements:
  const [openToTraining, setOpenToTraining] = React.useState(false);
  const [preferJob, setPreferJob] = React.useState([]);
  const [workingHour, setWorkingHour] = React.useState([]);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [vehicle, setVehicle] = React.useState("")
  const [minSalaryExpected, setMinSalaryExpected] = React.useState("")
  const [maxSalaryExpected, setMaxSalaryExpected] = React.useState("")
  const [traningMode, setTraningMode] = React.useState("")
  const [jobRemarks, setJobRemarks] = React.useState("");

  const {currentSteps, setCurrentSteps, personalData, setAddressData} = useContext(multiStepContext)
  const startTimeFormat = startTime ? startTime.toLocaleTimeString() : '';
  const endTimeFormat = endTime ? endTime.toLocaleTimeString() : '';

  async function handleSubmit(){
    try {
      let response = await axios.post(masterApi+"/worker/jobRequirement", {
        "endTime": endTimeFormat,
        "jobRemarks": jobRemarks,
        "jobType": preferJob,
        "maxSalaryExpected": maxSalaryExpected,
        "minSalaryExpected": minSalaryExpected,
        "openToTiming": true,
        "openToTraining": openToTraining,
        "startTime": startTimeFormat,
        "totalSimultaneousJob": 0,
        "traningMode": traningMode,
        "userId": "string",
        "vehicle": "string",
        "workingHours": "_0_TO_2_HOURS"
      })

      alert(response.data.message)
      
    } catch (error) {
      
    }
  }
  
  return (
    <>
   <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
    <Box
        marginTop={5}
        sx={{

          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
             <JobRequirement                                                               
              openToTraining={openToTraining} setOpenToTraining={setOpenToTraining}
              preferJob={preferJob} setPreferJob={setPreferJob}
              preferWorkHour={workingHour} setPreferWorkHour={setWorkingHour}
              startTime={startTime} setStartTime={setStartTime}
              endTime={endTime} setEndTime={setEndTime}
              vehicleAvailable={vehicle} setVehicleAvailable={setVehicle}
              minSal={minSalaryExpected} setMinSal={setMinSalaryExpected}
              maxSal={maxSalaryExpected} setMaxSal={setMaxSalaryExpected}
              traningMode={traningMode} setTraningMode={setTraningMode}
              jobRemarks={jobRemarks} setJobRemarks={setJobRemarks}
              />
            <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(2)})}>back</Button>
                <Button variant='contained' onClick={handleSubmit}>NEXT</Button>

            </Box>
        
      </Box>

    </Box>
    </>
  )
}

export default JobRequirementData