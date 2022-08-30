import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import PersonalInfo from "../cxForm/PersonalInfo";
import CurrentAddress from "../cxForm/CurrentAddress";
import HouseholdInfo from "../cxForm/HouseholdInfo";
import { useState } from "react";
import axios from "axios";

function AddNewCustomer() {
  const [cxSource, setCxSource] = React.useState("");
  const [cxMedium, setCxMedium] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [mname, setMname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [alternateNumber, setAlternateNumber] = React.useState("");
  const [whatsappAvailable, setWhatsappAvailable] = React.useState();
  const [whatsapp, setWhatsapp] = React.useState();
  const [profession, setProfession] = React.useState("");
  const [houseTypes, setHouseTypes] = React.useState("");
  const [noOfFamilyMembers, setNoOfFamilyMembers] = React.useState("");
  const [noOfChilds, setNoOfChilds] = React.useState("");
  const [noOfFemaleAdults, setNoOfFemaleAdults] = React.useState("");
  const [noOfPets, setNoOfPets] = React.useState("");
  const [noOfMaleAdults, setNoOfMaleAdults] = React.useState("");
  const [cxTypeOfHouse, setCXTypeOfHouse] = useState([]);
  const [flat, setFlat] = React.useState("");
  const [area, setArea] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [state1, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [formStatus,setFormStatus]=React.useState("");
 const [countryUUID,setCountryUUID]=React.useState("")
const [idProofType, setIdProofType] = React.useState("");


  console.log("All My data", {

    cxSource,
    cxMedium,
    fname,
    mname,
    lname,
    email,
    phoneNumber,
    alternateNumber,
    whatsappAvailable,
    whatsapp,
    profession,

    houseTypes,
    noOfFamilyMembers,
    noOfMaleAdults,
    noOfFemaleAdults,
    noOfChilds,
    noOfPets,

    flat,
    area,
    landmark,
    pinCode,
    city,
    country,
    state1,
    locality,
    countryUUID,
    
  })
  const handleClick = async () => {
  
    try {
      await axios.post("http://13.126.160.155:8080/user/customer/save",
        {
            "addressDtos": 
          {
            "addressLine1": flat,
            "addressLine2": area,
            "cityUuid": city,
            "countryUuid":  country,
            "createdAt": "2022-08-30T09:09:17.173Z",
            "locality": landmark,
            "micromarketUuid":locality,
            "permanent": true,
            "postalCode": pinCode,
            "stateUuid": state1,
          },
          "userAndProfileDto": {
            "alternateMobileNumber": alternateNumber,
            "email": email,
            "firstName": fname,
            "formStatus": "SAVED",
            "lastName": lname,
            "middleName": mname,
            "mobile": phoneNumber,
            "mobileVerified": true,
            "profession": profession,
            "status": true,
            "whatsappAvailable": whatsappAvailable,
            "whatsappNumber": whatsapp,
            "sourcingChannel": cxSource,
            "medium": cxMedium,
             "isoCode": "IN"
          },
        
          "houseHoldInformationDto": {
            "houseType":houseTypes,
            "noOfChilds": noOfChilds,
            "noOfFamilyMembers": noOfFamilyMembers,
            "noOfFemaleAdultsInFamily": noOfFemaleAdults,
            "noOfMaleAdultsInFamily": noOfMaleAdults,
            "noOfPets": noOfPets,
          },
        });
      alert("User Registration successfull")
    
    } catch (error) {
      alert("User Registration Faild", error)
    }
  }

  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7}>
      {/* //Add CX section section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Add New Customer</Typography>
        <Typography sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
            variant="outlined"
          >
            CLOSE
          </Button>

          <Button
            sx={{ background: "#e3b944" }}
            variant="contained"
            color="secondary"
          >
            SAVE AS DRAFT
          </Button>
          <Button color="success" variant="contained" onClick={handleClick}>
            CONFIRM & CREATE
          </Button>
        </Typography>
      </Box>
      {/* //Form */}
      <Box
        marginTop={5}
        sx={{
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        <PersonalInfo
          cxSource={cxSource} setCxSource={setCxSource}
          cxMedium={cxMedium} setCxMedium={setCxMedium}
          fname={fname} setFname={setFname}
          mname={mname} setMname={setMname}
          lname={lname} setLname={setLname}
          email={email} setEmail={setEmail}
          phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          alternateNumber={alternateNumber} setAlternateNumber={setAlternateNumber}
          whatsappAvailable={whatsappAvailable} setWhatsappAvailable={setWhatsappAvailable}
          whatsapp={whatsapp} setWhatsapp={setWhatsapp}
          profession={profession} setProfession={setProfession}
        />
        <CurrentAddress
          flat={flat} setFlat={setFlat}
          area={area} setArea={setArea}
          landmark={landmark} setLandmark={setLandmark}
          pinCode={pinCode} setPinCode={setPinCode}
          country={country} setCountry={setCountry}
          city={city} setCity={setCity}
          state={state1} setState={setState}
          locality={locality} setLocality={setLocality}
        />
        <HouseholdInfo
          houseTypes={houseTypes} setHouseTypes={setHouseTypes}
          noOfFamilyMembers={noOfFamilyMembers} setNoOfFamilyMembers={setNoOfFamilyMembers}
          noOfMaleAdults={noOfMaleAdults} setNoOfMaleAdults={setNoOfMaleAdults}
          noOfFemaleAdults={noOfFemaleAdults} setNoOfFemaleAdults={setNoOfFemaleAdults}
          noOfChilds={noOfChilds} setNoOfChilds={setNoOfChilds}
          noOfPets={noOfPets} setNoOfPets={setNoOfPets}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ mt: 4 }} onClick={handleClick}>
            {" "}
            ADD JOB REQUEST
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddNewCustomer;
