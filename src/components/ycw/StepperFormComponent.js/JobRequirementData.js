import { Box, Button } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { multiStepContext } from '../../../ContextApi/StepContext';
import JobRequirement from '../../form/JobRequirement';
import { JobRequirementApis, masterApi } from '../../../AlllData';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function JobRequirementData() {
    //job requirements:
  const [openToTraining, setOpenToTraining] = React.useState(false);
  const [preferJob, setPreferJob] = React.useState("");
  const [workingHour, setWorkingHour] = React.useState("");
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [vehicle, setVehicle] = React.useState("")
  const [minSalaryExpected, setMinSalaryExpected] = React.useState("")
  const [maxSalaryExpected, setMaxSalaryExpected] = React.useState("")
  const [traningMode, setTraningMode] = React.useState("")
  const [jobRemarks, setJobRemarks] = React.useState("");
  const [experienceRemarks, setExperienceRemarks] = React.useState("");
  const [lastJobType, setLastJobType] = React.useState([]);
  const [lastJobDuration, setLastJobDuration] = React.useState();
  const [reasonLeaving, setReasonLeaving] = React.useState();
  const [jobExpMonth, setJobExpMonth] = React.useState("");
  const [ jobExpYear, setJobExpYear] = React.useState("");
  const [jobData, setJobData] = React.useState("");

  


  const {currentSteps, setCurrentSteps, personalData, setAddressData} = useContext(multiStepContext)
  let {id} = useParams()
  // const startTimeFormat = startTime ? startTime.toLocaleTimeString() : '';
  // const endTimeFormat = endTime ? endTime.toLocaleTimeString() : '';
   
if(startTime && endTime && !jobData){
var stt = startTime.getTime();
var endt = endTime.getTime();
}
if(stt >endt){
   alert("max time")
} else console.log("")

  const ids = localStorage.getItem("ID")

  useEffect(() => {
    const JobDataFetchById = async()=>{
      const jobAllData = await fetch(`http://13.126.160.155:8080/user/worker/jobRequirement/${id||ids}`)
      const responseJobData = await jobAllData.json();
      setJobData(responseJobData.status)
      console.log("data is",responseJobData.data)
       setOpenToTraining(responseJobData.data.openToTraining)
       setPreferJob(responseJobData.data.jobTypeUuid)
       setWorkingHour(responseJobData.data.workingHours)
       setStartTime(responseJobData.data.startTime)
       setEndTime(responseJobData.data.endTime)
       setVehicle(responseJobData.data.vehicle)
       setMinSalaryExpected(responseJobData.data.minSalaryExpected)
       setMaxSalaryExpected(responseJobData.data.maxSalaryExpected)
       setTraningMode(responseJobData.data.traningMode)
       setJobRemarks(responseJobData.data.jobRemarks)
       setLastJobType(responseJobData.data.userExperienceRequestDto.jobTypeUuid)
       setJobExpYear(responseJobData.data.userExperienceRequestDto.totalExperienceYears)
       setJobExpMonth(responseJobData.data.userExperienceRequestDto.totalExperienceMonths)
       setLastJobDuration(responseJobData.data.userExperienceRequestDto.jobDuration)
       setReasonLeaving(responseJobData.data.userExperienceRequestDto.reasonForLeavingJob)
       setExperienceRemarks(responseJobData.data.userExperienceRequestDto.experienceRemarks)
       
      }
    JobDataFetchById()
  }, [ids, id])

  console.log(preferJob)
  

  async function handleSubmit(){
    try {
      let response = await axios.post(masterApi+"/worker/jobRequirement", {
    
        "endTime": endTime,
        "jobRemarks": jobRemarks,
        "jobTypeUuid": preferJob,
        "maxSalaryExpected":maxSalaryExpected,
        "minSalaryExpected":minSalaryExpected,
        "openToTiming": openToTraining,
        "openToTraining": openToTraining,
        "startTime": startTime,
        "totalSimultaneousJob": 0,
        "traningMode": traningMode,
        "userId": ids || id,
        "vehicle": vehicle,
        "workingHours": workingHour,

        "userExperienceRequestDto": {
          "experienceRemarks": experienceRemarks,
          "jobDuration": lastJobDuration,
          "jobTypeUuid": lastJobType,
          "reasonForLeavingJob": reasonLeaving,
          "totalExperienceMonths": jobExpMonth,
          "totalExperienceYears": jobExpYear
        },
      })
      //console.log({totalExp,experienceRemarks, lastJobType, lastJobDuration, reasonLeaving, jobExpMonth, jobExpYear})
      
      alert(response.data.message)
      setCurrentSteps(5)
      
    } catch (error) {
      alert(error)
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
            
             
              experienceRemarks={experienceRemarks} setExperienceRemarks={setExperienceRemarks}
              lastJobType={lastJobType} setLastJobType={setLastJobType}
              lastJobDuration={lastJobDuration} setLastJobDuration={setLastJobDuration}
              ReasonLeaving={reasonLeaving} setReasonLeaving={setReasonLeaving}
              jobExpYear={jobExpYear} setJobExpYear={setJobExpYear}
              jobExpMonth={jobExpMonth} setJobExpMonth={setJobExpMonth}

              />
            <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(3)})}>back</Button>
                <Button variant='contained' onClick={handleSubmit}>save</Button>
            </Box>
        
      </Box>

    </Box>
    </>
  )
}

export default JobRequirementData