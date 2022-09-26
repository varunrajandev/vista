import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      ifscCode: "",
      accountNumber: "",
    },
  ]);

  const [ifscCodeData, setIfscCodeData] = useState([])
  const ids = localStorage.getItem("ID")
  const {id} = useParams()

//Data Fetch by IFce
  async function fetchData(ifsc) {
    let FetchByIfce = await fetch(masterApi+`/bank/get/bankDetails/${ifsc}`)
    let AccountTypeData = await FetchByIfce.json();
    setIfscCodeData(AccountTypeData.data);

    setInputFields([
      {
        accountType: "",
        bankName:AccountTypeData.data.bankName?AccountTypeData.data.bankName:"",
        branchName:AccountTypeData.data.branchName?AccountTypeData.data.branchName:"",
        branchAddress:AccountTypeData.data.branchAddress?AccountTypeData.data.branchAddress:"",
        accountHoderName: "",
        ifscCode: inputFields[0].ifscCode?inputFields[0].ifscCode:"",
        accountNumber: "",
      },])
    
  }
  console.log("account",ifscCodeData)

  //All Details fetch by id
  async function DataFetchById(){
    let bankData = await fetch(`http://13.126.160.155:8080/user/bank/get/${ids || id}`)
    let allDataResponse = await bankData.json();
    setInputFields([
      {
        accountType: allDataResponse.data[0].accountType,
        bankName:ifscCodeData.bankName?ifscCodeData.bankName:allDataResponse.data[0].bankName,
        branchName:ifscCodeData.branchName?ifscCodeData.branchName:allDataResponse.data[0].branchName,
        branchAddress:ifscCodeData.branchAddress?ifscCodeData.branchAddress:allDataResponse.data[0].branchAddress,
        accountHoderName: allDataResponse.data[0].accountHolderName,
        ifscCode: inputFields[0].ifscCode?inputFields[0].ifscCode:allDataResponse.data[0].ifscCode,
        accountNumber: allDataResponse.data[0].accountNumber,
      },
    ])
  }

  console.log(inputFields[0].branchAddress)
  
 


  useEffect(() => {
    if(inputFields[0].ifscCode.length===11){
       fetchData(inputFields[0].ifscCode);
    }
    DataFetchById()
  }, [ids||id, inputFields[0].ifscCode]);

  const {currentSteps, setCurrentSteps, personalData, setAddressData } = useContext(multiStepContext)


   
  async function handleSubmit(){
    try {
      let response = await axios.post(BankApi, 
        [
          {
            "accountHolderName": inputFields[0].accountHoderName,
            "accountNumber": inputFields[0].accountNumber,
            "accountType": inputFields[0].accountType,
            "bankName": inputFields[0].bankName,
            "branchAddress": inputFields[0].branchAddress,
            "branchName": inputFields[0].branchName,
            "ifscCode": inputFields[0].ifscCode,
            "primary": true,
            "userId": ids || id
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
                <Button variant='contained' onClick={handleSubmit}>save</Button>
            </Box>

        </Box>
      </Box>
    </>
  );
}

export default BankInformation;
