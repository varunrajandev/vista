import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BankApi, masterApi } from "../../../AlllData";
import { multiStepContext } from "../../../ContextApi/StepContext";
import BankAccount from "../../form/BankAccount";

function BankInformation() {
    //bank account
  const [inputFields, setInputFields] = useState([
    {
      accountType: "",
      bankName: "",
      branchName: "",
      branchAddress: "",
      accountHoderName: "",
      accountNumber: "",
    },
  ]);

  const [ifscCodeData, setIfscCodeData] = useState([])

  useEffect(() => {
    async function fetchData() {
      let FetchByIfce = await fetch(masterApi+`/bank/get/bankDetails/${inputFields[0].ifscCode}`)
      let AccountTypeData = await FetchByIfce.json()
      setIfscCodeData(AccountTypeData.data)
    }
    fetchData();
  }, [inputFields[0].ifscCode]);

  console.log("first",inputFields[0].ifscCode)

  const {currentSteps, setCurrentSteps, personalData, setAddressData, } = useContext(multiStepContext)
   
  async function handleSubmit(){
    
    try {
      let response = await axios.post(BankApi, 
        [
          {
            "accountHolderName": inputFields[0].accountHoderName,
            "accountNumber": inputFields[0].accountNumber,
            "accountType": inputFields[0].accountType,
            "bankName": ifscCodeData.bankName,
            "branchAddress": ifscCodeData.branchAddress,
            "branchName": ifscCodeData.branchName,
            "ifscCode": inputFields[0].ifscCode,
            "primary": true,
            "userId": personalData.data.userId
          }
        ]
      )

      alert(response.data.message)
      setCurrentSteps(6)
      

      
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
          <BankAccount
           setInputFields={setInputFields}
           inputFields={inputFields}
           ifscCodeData={ifscCodeData}
          />

            <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(4)})}>back</Button>
                <Button variant='contained' onClick={handleSubmit}>NEXT</Button>
            </Box>

        </Box>
      </Box>
    </>
  );
}

export default BankInformation;
