import { Box, Button, Checkbox } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { masterApi } from "../../../AlllData";
import { multiStepContext } from "../../../ContextApi/StepContext";
import CurrentAdd from "../../form/CurrentAdd";



function AddressInformation() {
        // isPermanent or not
        const [isPermanent, setIsPermanent] = useState();
        const [primaryAddress, setPrimaryAddress] = useState([]);
        const [secondaryAddress, setSecondaryAddress] = useState([])

    //YCW  current Address information useState
    const [addressLine1, setAddressLine1] = React.useState("");
    const [addressLine2, setAddressLine2] = React.useState("");
    const [landmark, setLandmark] = React.useState("");
    const [postalCode, setPostalCode] = React.useState("");
    const [countryName, setCountryName] = React.useState("");
    const [stateName, setStateName] = React.useState("");
    const [cityName, setCityName] = React.useState("");
    const [locality, setLocality] = React.useState("");
    const [addressProofType, setAddressProofType] = useState("");
    const [countryID, setCountryID] = useState()
    const [stateID, setStateID] = useState()
    const [cityID, setCityID] = useState()
    const [localityDD, setLocalityDD] = useState([])


// YCW Permanent Adddress
    const [addressLine1p, setAddressLine1p] = React.useState("");
    const [addressLine2p, setAddressLine2p] = React.useState("");
    const [landmarkp, setLandmarkp] = React.useState("");
    const [postalCodep, setPostalCodep] = React.useState("");
    const [countryNamep, setCountryNamep] = React.useState("");
    const [stateNamep, setStateNamep] = React.useState("");
    const [cityNamep, setCityNamep] = React.useState("");
    const [localityp, setLocalityp] = React.useState("");
    const [addressProofTypep, setAddressProofTypep] = useState("");
    const [countryIDp, setCountryIDp] = useState()
    const [stateIDp, setStateIDp] = useState()
    const [cityIDp, setCityIDp] = useState()

    const {id} = useParams()

    const {currentSteps, setCurrentSteps, personalData, setAddressData, addressDatas} = useContext(multiStepContext)

    let ids = localStorage.getItem('ID');

    const  AddressFetchByPincode = async (pincode, num)=>{
        let AddressByPincode = await fetch(masterApi+`/address/get/address/${pincode}`)
        let AddressResponse = await AddressByPincode.json()
        num===1?setPrimaryAddress(AddressResponse.data):setSecondaryAddress(AddressResponse.data)
    }

    const AddressGetById = async()=>{
        let addressData = await fetch(`http://13.126.160.155:8080/user/address/get/${ids || id}`);
        let responseData =await addressData.json();
        console.log(responseData)
        //current Address
        setAddressLine1(responseData.data[0].addressLine1)
        setAddressLine2(responseData.data[0].addressLine2)
        setLandmark(responseData.data[0].landmark)
        setPostalCode(responseData.data[0].postalCode)
        setCountryName(responseData.data[0].countryUuid)
        setStateName(responseData.data[0].stateUuid)
        setCityName(responseData.data[0].cityUuid)
        setLocality(responseData.data[0].micromarketUuid)
        setAddressProofType(responseData.data[0].addressProofType)

        //PermanentAddress
        setAddressLine1p(responseData.data[1].addressLine1)
        setAddressLine2p(responseData.data[1].addressLine2)
        setLandmarkp(responseData.data[1].landmark)
        setPostalCodep(responseData.data[1].postalCode)
        setCountryNamep(responseData.data[1].countryUuid)
        setStateNamep(responseData.data[1].stateUuid)
        setCityNamep(responseData.data[1].cityUuid)
        setLocalityp(responseData.data[1].micromarketUuid)
        setAddressProofTypep(responseData.data[1].addressProofType)
        setIsPermanent(responseData.data[1].permanent)
    }
    // {
    //     "district": "Gurgaon",
    //     "state": "Haryana",
    //     "country": "India",
    //     "locality": [
    //         "DLF Ph-III"
    //     ]
    // }

    console.log("ispermanment", isPermanent)

    useEffect(() => {
         AddressGetById()
  
        if(postalCode.length==6){
            AddressFetchByPincode(postalCode, 1)
        }
        if(postalCodep.length==6){
            AddressFetchByPincode(postalCodep, 2)
        }
        
    }, [postalCode , postalCodep, ids])

    
    const handleSubmit = async () => {
        console.log("clicked")
       try {
        let response = await axios.post("http://13.126.160.155:8080/user/address/save",
        [
            {
              "addressLine1": addressLine1,
              "addressLine2": addressLine2,
              "addressProofType": "OTHERS",
              "cityUuid": cityName,
              "countryUuid": countryName,
              "landmark": landmark,
              "locality": locality,
              "micromarketUuid": locality,
              "permanent": !isPermanent,
              "postalCode": postalCode,
              "stateUuid": stateName,
              "userId": ids || id
            },
            {
                "addressLine1": addressLine1p,
                "addressLine2": addressLine2p,
                "addressProofType": "OTHERS",
                "cityUuid": cityNamep,
                "countryUuid": countryNamep,
                "landmark": landmarkp,
                "locality": localityp,
                "micromarketUuid":localityp,
                "permanent": isPermanent,
                "postalCode":postalCodep,
                "stateUuid":stateNamep,
                "userId": ids || id
              }])
              alert(response.data.message)
              setCurrentSteps(3)
              setAddressData(response.data.data)
            } catch (error) {
        console.log(error)
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
                    <CurrentAdd
                        labelData={"Current Address"}
                        addressL1={addressLine1} setAddressL1={setAddressLine1}
                        addressL2={addressLine2} setAddressL2={setAddressLine2}
                        landmark={landmark} setLandmark={setLandmark}
                        pinCode={postalCode} setPinCode={setPostalCode}
                        country={countryName} setCountry={setCountryName}
                        state={stateName} setState={setStateName}
                        city={cityName} setCity={setCityName}
                        locality={locality} setLocality={setLocality}
                        addressProofType={addressProofType} setAddressProofType={setAddressProofType}
                        countryID={countryID} setCountryID={setCountryID}
                        stateID={stateID} setStateID={setStateID}
                        cityID={cityID} setCityID={setCityID}
                        localityDD={localityDD} setLocalityDD={setLocalityDD}
                        AllAddress = {addressDatas[0]}
                    />

                    

                    <CurrentAdd
                        marginTopSize={5}
                        labelData={"Permanent Address"}
                        isPermanent={isPermanent} setIsPermanent={setIsPermanent}
                        addressL1={isPermanent?addressLine1:addressLine1p} setAddressL1={setAddressLine1p}
                        addressL2={isPermanent?addressLine2:addressLine2p} setAddressL2={setAddressLine2p}
                        landmark={isPermanent?landmark:landmarkp} setLandmark={setLandmarkp}
                        pinCode={isPermanent?postalCode:postalCodep} setPinCode={setPostalCodep}
                        country={isPermanent?countryName:countryNamep} setCountry={setCountryNamep}
                        state={isPermanent?stateName:stateNamep} setState={setStateNamep}
                        city={isPermanent?cityName:cityNamep} setCity={setCityNamep}
                        locality={isPermanent?locality:localityp} setLocality={setLocalityp}
                        addressProofType={isPermanent?addressProofType:addressProofTypep} setAddressProofType={setAddressProofTypep}
                        countryID={isPermanent?countryID:countryIDp} setCountryID={setCountryIDp}
                        stateID={isPermanent?stateID:stateIDp} setStateID={setStateIDp}
                        cityID={isPermanent?cityID:cityIDp} setCityID={setCityIDp}
                        localityDD={localityDD} setLocalityDD={setLocalityDD}
                        AllAddress = {isPermanent?addressDatas[0]:addressDatas[1]}
                    />

            <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
                <Button variant='contained' onClick={(()=>{setCurrentSteps(1)})}>back</Button>
                <Button variant='contained' onClick={handleSubmit}>save</Button>
            </Box>
                </Box>
            </Box>
        </>
    );
}

export default AddressInformation;
