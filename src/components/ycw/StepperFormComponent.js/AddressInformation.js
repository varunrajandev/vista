import { Box, Checkbox } from "@mui/material";
import is from "date-fns/esm/locale/is/index.js";
import React, { useState } from "react";
import CurrentAdd from "../../form/CurrentAdd";



function AddressInformation() {

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

    // isPermanent or not
    const [isPermanent, setIsPermanent] = useState();

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

    console.log("Permanent address is",{
        addressLine1p,
        addressLine2p,
        landmarkp,
        postalCodep,
        countryNamep,
        stateNamep,
        localityp,
        addressProofTypep,
        stateIDp,
        cityIDp
    })





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
                    />
                </Box>
            </Box>
        </>
    );
}

export default AddressInformation;
