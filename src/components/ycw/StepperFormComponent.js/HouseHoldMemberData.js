import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { masterApi } from '../../../AlllData'
import { multiStepContext } from '../../../ContextApi/StepContext'
import HouseHoldMemberInfo from '../../form/HouseHoldMemberInfo'
import { Navigate } from "react-router-dom";

function HouseHoldMemberData() {
    const [inputFields, setInputFields] = useState([
        {
            age: "",
            email: "",
            jobType: "",
            mobileNo: "",
            name: "",
            relationship: "", 
        }
    ])

    console.log(inputFields)
    const {currentSteps, setCurrentSteps, personalData, setAddressData, householdData, setHouseholdData} = useContext(multiStepContext)
    
    async function handleSubmit(){
    
        try {
          let response = await axios.post(masterApi+"/worker/familyMember",
          [
            {
              "age": inputFields[0].age,
              "email": inputFields[0].email,
              "jobType": inputFields[0].jobType,
              "mobileNo": inputFields[0].mobileNo,
              "name": inputFields[0].name,
              "relationship": inputFields[0].relationship,
              "userId": personalData.data.userId
            }
          ]
          )
    
          alert(response.data.message)
          setHouseholdData(response.data)
          setCurrentSteps(7)
          
          
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
            <HouseHoldMemberInfo
            inputFields={inputFields}
            setInputFields={setInputFields}
            />
            
            <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(5)})}>back</Button>
                <Button variant='contained' onClick={handleSubmit}>NEXT</Button>

            </Box>

        </Box>
      </Box>
      {householdData.status && <Navigate to="/ycw" />}
    </>
  )
}

export default HouseHoldMemberData