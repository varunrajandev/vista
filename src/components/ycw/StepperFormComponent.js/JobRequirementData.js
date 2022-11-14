import { Box, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { multiStepContext } from '../../../ContextApi/StepContext';
import JobRequirement from '../../form/JobRequirement';
import { JobRequirementApis, masterApi } from '../../../AllData';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Notify from '../../Notification/Notify';

function JobRequirementData() {
    //job requirements:

  const [openToTraining, setOpenToTraining] = useState(false);
  const [preferJob, setPreferJob] = useState("");
  const [ preferOtherJob, setPreferOtherJob] =useState("");
  const [workingHour, setWorkingHour] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [vehicle, setVehicle] = useState("")
  const [minSalaryExpected, setMinSalaryExpected] = useState("")
  const [maxSalaryExpected, setMaxSalaryExpected] = useState("")
  const [traningMode, setTraningMode] = useState("")
  const [jobRemarks, setJobRemarks] = useState("");
  const [experienceRemarks, setExperienceRemarks] = useState("");
  const [lastJobType, setLastJobType] = useState([]);
  const [lastJobTypeOther, setLastJobTypeOther] = useState();
  const [lastJobDuration, setLastJobDuration] = useState();
  const [reasonLeaving, setReasonLeaving] = useState();
  const [otherreasonLeaving, setOtherReasonLeaving] = useState();
  const [jobExpMonth, setJobExpMonth] = useState("");
  const [ jobExpYear, setJobExpYear] = useState("");
  const [jobData, setJobData] = useState("");
  const [ LastjobDurationYear, setLastJobDurationYear] = useState("");
  const [LastjobDurationMonths, setLastJobDurationMonths] = useState("");

  const [notify, setNotify] = useState({isOpen:false, message:"", type:""})


  


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
       setPreferOtherJob(responseJobData.data.otherJobTypeUuid)
       setWorkingHour(responseJobData.data.workingHours)
       setStartTime(responseJobData.data.startTime)
       setEndTime(responseJobData.data.endTime)
       setVehicle(responseJobData.data.vehicle)
       setMinSalaryExpected(responseJobData.data.minSalaryExpected)
       setMaxSalaryExpected(responseJobData.data.maxSalaryExpected)
       setTraningMode(responseJobData.data.traningMode)
       setJobRemarks(responseJobData.data.jobRemarks)
       setLastJobType(responseJobData.data.userExperienceRequestDto.jobTypeUuid)
       setLastJobTypeOther(responseJobData.data.userExperienceRequestDto.otherJobTypeUuid)
       setJobExpYear(responseJobData.data.userExperienceRequestDto.totalExperienceYears)
       setJobExpMonth(responseJobData.data.userExperienceRequestDto.totalExperienceMonths)
       setLastJobDuration(responseJobData.data.userExperienceRequestDto.jobDuration)
       setReasonLeaving(responseJobData.data.userExperienceRequestDto.reasonForLeavingJob)
       setExperienceRemarks(responseJobData.data.userExperienceRequestDto.experienceRemarks)
       setLastJobDurationMonths(responseJobData.data.userExperienceRequestDto.jobDurationMonths)
       setLastJobDurationYear(responseJobData.data.userExperienceRequestDto.jobDurationYears)
       setOtherReasonLeaving(responseJobData.data.userExperienceRequestDto.otherReasonForLeavingJob)
       
      }
    JobDataFetchById()
  }, [ids, id])

  console.log(preferJob)

  console.log(LastjobDurationMonths, LastjobDurationYear)
  

  async function handleSubmit(){
    try {
      let response = await axios.post(masterApi+"/worker/jobRequirement", {
    
        "endTime": endTime,
        "jobRemarks": jobRemarks,
        "jobTypeUuid": preferJob,
        "otherJobTypeUuid": preferOtherJob,
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
          "jobDurationMonths": LastjobDurationMonths,
          "jobDurationYears": LastjobDurationYear,
          "jobTypeUuid": lastJobType,
          "otherJobTypeUuid": lastJobTypeOther,
          "reasonForLeavingJob": reasonLeaving,
          "otherReasonForLeavingJob":otherreasonLeaving ,
          "totalExperienceMonths": jobExpMonth,
          "totalExperienceYears": jobExpYear
        },
      })

      
      setNotify(
        {isOpen:response.data.status,
         message:response.data.message,
         type:"success"}
        )
      
      
    } catch (error) {
      setNotify(
        {isOpen:true,
         message:"Error",
         type:"error"}
        )
    }
  }
  
  return (
    <>
    <Notify 
    notify={notify}
    setNotify={setNotify}
  />
   <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
    <Box
        marginTop={5}
        sx={{
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}>
             <JobRequirement                                                               
              openToTraining={openToTraining} setOpenToTraining={setOpenToTraining}
              preferJob={preferJob} setPreferJob={setPreferJob}
              preferOtherJob={preferOtherJob} setPreferOtherJob={setPreferOtherJob}
              preferWorkHour={workingHour} setPreferWorkHour={setWorkingHour}
              startTime={startTime} setStartTime={setStartTime}
              endTime={endTime} setEndTime={setEndTime}
              vehicleAvailable={vehicle} setVehicleAvailable={setVehicle}
              minSal={minSalaryExpected} setMinSal={setMinSalaryExpected}
              maxSal={maxSalaryExpected} setMaxSal={setMaxSalaryExpected}
              traningMode={traningMode} setTraningMode={setTraningMode}
              jobRemarks={jobRemarks} setJobRemarks={setJobRemarks}
              LastjobDurationYear={LastjobDurationYear} setLastJobDurationYear={setLastJobDurationYear}
              LastjobDurationMonths={LastjobDurationMonths} setLastJobDurationMonths={setLastJobDurationMonths}
              
              experienceRemarks={experienceRemarks} setExperienceRemarks={setExperienceRemarks}
              lastJobType={lastJobType} setLastJobType={setLastJobType}
              lastJobTypeOther={lastJobTypeOther} setLastJobTypeOther={setLastJobTypeOther}
              lastJobDuration={lastJobDuration} setLastJobDuration={setLastJobDuration}
              ReasonLeaving={reasonLeaving} setReasonLeaving={setReasonLeaving}
              otherreasonLeaving={otherreasonLeaving} setOtherReasonLeaving={setOtherReasonLeaving}
              jobExpYear={jobExpYear} setJobExpYear={setJobExpYear}
              jobExpMonth={jobExpMonth} setJobExpMonth={setJobExpMonth}/>

            <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(2)})}>back</Button>
                <Button variant='contained' onClick={handleSubmit}>save</Button>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(4)})}>next</Button>
            </Box>
        
      </Box>

    </Box>
    </>
  )
}

export default JobRequirementData