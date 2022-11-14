import { Box, Button, Checkbox } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { masterApi } from "../../../AllData";
import { multiStepContext } from "../../../ContextApi/StepContext";
import CurrentAdd from "../../form/CurrentAdd";
import Notify from "../../Notification/Notify";

function AddressInformation() {
  // isPermanent or not
  const [isPermanent, setIsPermanent] = useState();
  const [primaryAddress, setPrimaryAddress] = useState([]);
  const [secondaryAddress, setSecondaryAddress] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //YCW  current Address information useState
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [countryName, setCountryName] = React.useState("0");
  const [stateName, setStateName] = React.useState("");
  const [cityName, setCityName] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [addressProofType, setAddressProofType] = useState("");
  const [countryID, setCountryID] = useState();
  const [stateID, setStateID] = useState();
  const [cityID, setCityID] = useState();
  const [localityDD, setLocalityDD] = useState([]);
  const [documnetTypeDD, setDocumnetTypeDD] = useState([]);

  // YCW Permanent Adddress
  const [addressLine1p, setAddressLine1p] = React.useState("");
  const [addressLine2p, setAddressLine2p] = React.useState("");
  const [landmarkp, setLandmarkp] = React.useState("");
  const [postalCodep, setPostalCodep] = React.useState("");
  const [countryNamep, setCountryNamep] = React.useState("0");
  const [stateNamep, setStateNamep] = React.useState("");
  const [cityNamep, setCityNamep] = React.useState("");
  const [localityp, setLocalityp] = React.useState("");
  const [addressProofTypep, setAddressProofTypep] = useState("");
  const [countryIDp, setCountryIDp] = useState();
  const [stateIDp, setStateIDp] = useState();
  const [cityIDp, setCityIDp] = useState();
  const [documnetTypeDDp, setDocumnetTypeDDp] = useState([]);

  const { id } = useParams();

  const {
    currentSteps,
    setCurrentSteps,
    personalData,
    setAddressData,
    addressDatas,
  } = useContext(multiStepContext);

  let ids = localStorage.getItem("ID");

  const AddressFetchByPincode = async (pincode, num) => {
    let AddressByPincode = await fetch(
      masterApi + `/address/get/address/${pincode}`
    );
    let AddressResponse = await AddressByPincode.json();
    num === 1
      ? setPrimaryAddress(AddressResponse.data)
      : setSecondaryAddress(AddressResponse.data);
  };

  const AddressGetById = async () => {
    let addressData = await fetch(
      `http://13.126.160.155:8080/user/address/get/${ids || id}`
    );
    let responseData = await addressData.json();
    console.log("data address", responseData);
    //current Address
    setAddressLine1(responseData.data[0].addressLine1);
    setAddressLine2(responseData.data[0].addressLine2);
    setLandmark(responseData.data[0].landmark);
    setPostalCode(responseData.data[0].postalCode);
    setCountryName(responseData.data[0].countryUuid);
    setStateName(responseData.data[0].stateUuid);
    setCityName(responseData.data[0].cityUuid);
    setLocality(responseData.data[0].micromarketUuid);
    setAddressProofType(responseData.data[0].addressProofType);

    //PermanentAddress
    setAddressLine1p(responseData.data[1].addressLine1);
    setAddressLine2p(responseData.data[1].addressLine2);
    setLandmarkp(responseData.data[1].landmark);
    setPostalCodep(responseData.data[1].postalCode);
    setCountryNamep(responseData.data[1].countryUuid);
    setStateNamep(responseData.data[1].stateUuid);
    setCityNamep(responseData.data[1].cityUuid);
    setLocalityp(responseData.data[1].micromarketUuid);
    setAddressProofTypep(responseData.data[1].addressProofType);
    setIsPermanent(responseData.data[0].permanent);
  };

  async function fetchDorpDown() {
    let documentType = await fetch(
      `http://13.126.160.155:8080/user/drop-down/get/documentUploadType?flag`
    );
    let responseType = await documentType.json();
    setDocumnetTypeDD(responseType.data);
    setDocumnetTypeDDp(responseType.data);
  }
  useEffect(() => {
    AddressGetById();
    fetchDorpDown();
    if (postalCode.length == 6) {
      AddressFetchByPincode(postalCode, 1);
    }
    if (postalCodep.length == 6) {
      AddressFetchByPincode(postalCodep, 2);
    }
  }, [ids]);

  const handleSubmit = async () => {
    try {
      let response = await axios.post(
        "http://13.126.160.155:8080/user/address/save",
        [
          {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            addressProofType: addressProofType,
            cityUuid: cityName,
            countryUuid: countryName,
            landmark: landmark,
            micromarketUuid: locality,
            permanent: isPermanent,
            postalCode: postalCode,
            stateUuid: stateName,
            userId: ids || id,
          },
          {
            addressLine1: isPermanent ? addressLine1 : addressLine1p,
            addressLine2: isPermanent ? addressLine2 : addressLine2p,
            addressProofType: isPermanent
              ? addressProofType
              : addressProofTypep,
            cityUuid: isPermanent ? cityName : cityNamep,
            countryUuid: isPermanent ? countryName : countryNamep,
            landmark: isPermanent ? landmark : landmarkp,
            micromarketUuid: isPermanent ? locality : localityp,
            permanent: !isPermanent,
            postalCode: isPermanent ? postalCode : postalCodep,
            stateUuid: isPermanent ? stateName : stateNamep,
            userId: ids || id,
          },
        ]
      );
      setNotify({
        isOpen: response.data.status,
        message: response.data.message,
        type: "success",
      });
      localStorage.setItem("number", 4);
      setAddressData(response.data.data);
    } catch (error) {
      setNotify({
        isOpen: true,
        message: "Error",
        type: "error",
      });
    }
  };

  return (
    <>
      <Notify notify={notify} setNotify={setNotify} />
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
            addressL1={addressLine1}
            setAddressL1={setAddressLine1}
            addressL2={addressLine2}
            setAddressL2={setAddressLine2}
            landmark={landmark}
            setLandmark={setLandmark}
            pinCode={postalCode}
            setPinCode={setPostalCode}
            country={countryName}
            setCountry={setCountryName}
            state={stateName}
            setState={setStateName}
            city={cityName}
            setCity={setCityName}
            locality={locality}
            setLocality={setLocality}
            addressProofType={addressProofType}
            setAddressProofType={setAddressProofType}
            countryID={countryID}
            setCountryID={setCountryID}
            stateID={stateID}
            setStateID={setStateID}
            cityID={cityID}
            setCityID={setCityID}
            localityDD={localityDD}
            setLocalityDD={setLocalityDD}
            AllAddress={addressDatas[0]}
            documnetTypeDD={documnetTypeDD}
          />

          <CurrentAdd
            marginTopSize={5}
            labelData={"Permanent Address"}
            isPermanent={isPermanent}
            setIsPermanent={setIsPermanent}
            addressL1={isPermanent ? addressLine1 : addressLine1p}
            setAddressL1={setAddressLine1p}
            addressL2={isPermanent ? addressLine2 : addressLine2p}
            setAddressL2={setAddressLine2p}
            landmark={isPermanent ? landmark : landmarkp}
            setLandmark={setLandmarkp}
            pinCode={isPermanent ? postalCode : postalCodep}
            setPinCode={setPostalCodep}
            country={isPermanent ? countryName : countryNamep}
            setCountry={setCountryNamep}
            state={isPermanent ? stateName : stateNamep}
            setState={setStateNamep}
            city={isPermanent ? cityName : cityNamep}
            setCity={setCityNamep}
            locality={isPermanent ? locality : localityp}
            setLocality={setLocalityp}
            addressProofType={
              isPermanent ? addressProofType : addressProofTypep
            }
            setAddressProofType={setAddressProofTypep}
            countryID={isPermanent ? countryID : countryIDp}
            setCountryID={setCountryIDp}
            stateID={isPermanent ? stateID : stateIDp}
            setStateID={setStateIDp}
            cityID={isPermanent ? cityID : cityIDp}
            setCityID={setCityIDp}
            localityDD={localityDD}
            setLocalityDD={setLocalityDD}
            AllAddress={isPermanent ? addressDatas[0] : addressDatas[1]}
            documnetTypeDD={documnetTypeDDp}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: "100px",
              justifyContent: "right",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setCurrentSteps(3);
              }}
            >
              back
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              save
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setCurrentSteps(5);
              }}
            >
              next
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddressInformation;
