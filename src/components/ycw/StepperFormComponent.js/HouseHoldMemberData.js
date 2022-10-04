import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { masterApi } from '../../../AlllData'
import { multiStepContext } from '../../../ContextApi/StepContext'
import HouseHoldMemberInfo from '../../form/HouseHoldMemberInfo'
import { Navigate, useParams } from "react-router-dom";
import Notify from '../../Notification/Notify'

function HouseHoldMemberData() {
  const [inputFields, setInputFields] = useState([
    {
      age: "",
      jobTypeUuid: "",
      otherJobType:"",
      mobileNo: "",
      name: "",
      relationship: "",
      otherrRlationship:"",
      otherJobType:"",
      relationship:"",
      locality:"",
      addressType:"",
      address:""

    }
  ])

  const [notify, setNotify] = useState({isOpen:false, message:"", type:""})
  const ids = localStorage.getItem("ID")
  const { id } = useParams()
  const { currentSteps, setCurrentSteps, personalData, setAddressData, householdData, setHouseholdData } = useContext(multiStepContext)

  useEffect(() => {
    const getAllDataById = async () => {
      let fetchbyid = await fetch(`http://13.126.160.155:8080/user/worker/familyMember/${ids || id}`)
      let responsehousehold = await fetchbyid.json()
      console.log(responsehousehold.data)

      setInputFields([
        {
          age: responsehousehold.data.familyMemberDto[0].age,
          email: responsehousehold.data.familyMemberDto[0].email,
          jobTypeUuid: responsehousehold.data.familyMemberDto[0].jobTypeUuid,
          mobileNo: responsehousehold.data.familyMemberDto[0].mobileNo,
          name: responsehousehold.data.familyMemberDto[0].name,
          relationship: responsehousehold.data.familyMemberDto[0].relationship,
          otherrRlationship:responsehousehold.data.familyMemberDto[0].otherrRlationship,
          otherJobType:responsehousehold.data.familyMemberDto[0].otherJobType,
          locality:responsehousehold.data.familyMemberDto[0].locality,
          addressType:responsehousehold.data.familyMemberDto[0].addressType,
          address:responsehousehold.data.familyMemberDto[0].address

        }
      ])
    }
    getAllDataById()
  }, [ids, id])


  async function handleSubmit() {
    try {
      let response = await axios.post(masterApi + "/worker/familyMember",
        {
          "familyMemberDto": inputFields,
          "userId": ids || id
        }

      )

      setNotify(
        {isOpen:response.data.status,
         message:response.data.message,
         type:"success"}
        )
      setHouseholdData(response.data)
      


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
          }}
        >
          <HouseHoldMemberInfo
            inputFields={inputFields}
            setInputFields={setInputFields}
          />

          <Box sx={{ display: "flex", alignItems: "end", height: "100px", justifyContent: "right", gap: "20px" }}>
            <Button variant='contained' onClick={(() => { setCurrentSteps(5) })}>back</Button>
            <Button variant='contained' onClick={handleSubmit}>save</Button>
            <Button variant='contained' onClick={(() => { setCurrentSteps(7) })}>next</Button>
          </Box>

        </Box>
      </Box>
     
    </>
  )
}

export default HouseHoldMemberData