import { Box, Checkbox, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { multiStepContext } from "../../ContextApi/StepContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function CurrentAdd(props) {
  const [countryDD, setCountryDD] = useState([])
  const [stateDD, setStateDD] = useState([])
  const [cityDD, setCityDD] = useState([])
  const [localityDD, setLocalityDD] = useState([])
  const {
    marginTopSize,
    labelData,
    isPermanent, setIsPermanent,
    addressL1, setAddressL1,
    addressL2, setAddressL2,
    landmark, setLandmark,
    pinCode, setPinCode,
    country, setCountry,
    state, setState,
    city, setCity,
    locality, setLocality,
    addressProofType, setAddressProofType,
    countryID, setCountryID,
    stateID, setStateID,
    cityID, setCityID,
    addressData,
    AllAddress
  } = props

  const {currentSteps, setCurrentSteps, personalData, setAddressData} = useContext(multiStepContext)


  useEffect(() => {
    async function fetchData() {
      let countryData = await fetch("http://13.126.160.155:8081/locationmaster/country/get/all");
      let stateData = await fetch(`http://13.126.160.155:8081/locationmaster/state/get/states/by/${country}`);
      let cityData = await fetch(`http://13.126.160.155:8081/locationmaster/city/get/cities/by/${state}`);
      let localityData = await fetch(`http://13.126.160.155:8081/locationmaster/micromarket/list/${city}`);
      let res1 = await countryData.json();
      let res2 = await stateData.json();
      let res3 = await cityData.json();
      let res4 = await localityData.json();
      setCountryDD(res1.data);
      setStateDD(res2.data || [{ name: "please Select Country" }])
      setCityDD(res3.data || [{ name: "please Select State" }])
      setLocalityDD(res4.data || [{ names: "please Select City" }])
    }
    fetchData();
  }, [country, state, city]);

  console.log({country})

  return (
    <Box
      sx={{
        marginTop: marginTopSize,
        display: "grid",
        gap: 1,
      }}>

      <Box sx={{display:"flex", alignItems:"center"}}>
        <h5> {labelData}</h5>
          <Box sx={{display:(marginTopSize?"block":"none")}}>
          <Checkbox onChange={(e) => setIsPermanent(e.target.checked)}{...label}
            color="success"
            checked={isPermanent?true:false}
          />
          <span style={{ fontWeight: "100" }}>Same as current Address</span>
          </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Flat/Building"
           value={addressL1}
          variant="outlined"
          onChange={(e) => {
            setAddressL1(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          value={addressL2}
          id="outlined-basic"
          label="Society/Colony/Area"
          variant="outlined"
          onChange={(e) => {
            setAddressL2(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          value={landmark}
          size="small"
          id="outlined-basic"
          label="Landmark"
          variant="outlined"
          onChange={(e) => {
            setLandmark(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          type="number"
          value={pinCode}
          label="Pin Code"
          variant="outlined"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
          }}
          onChange={(e) => {
            setPinCode(e.target.value);
          }}
        />

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Country</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >{countryDD.map((item) => (
            <MenuItem value={item.uuid} >{item.countryName}</MenuItem>
          ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        display={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">State</InputLabel>
          <Select
            sx={{ width: "100%" }}
            label="State"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          >
            {stateDD.map((item) => (
              <MenuItem value={item.value}>{item.key}{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">City</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="City"
            value={city}
      onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            {cityDD.map((item) => (
              <MenuItem value={item.value}>{item.key}{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Locality</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Locality"
            value={locality}
            onChange={(e) => {
              setLocality(e.target.value);
            }}
          >
            {localityDD.map((item) => (
              <MenuItem value={item.id}>{item.name}{item.names}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Address Proof Type</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={addressProofType}
            label="Address Proof Type"
            onChange={(e) => {
              setAddressProofType(e.target.value);
            }}
          >
            <MenuItem value={"AADHAAR"}>Aadhaar</MenuItem></Select>
        </FormControl>
        <div style={{ width: "18%" }}></div>
      </Box>
    </Box>

  );
}

export default CurrentAdd;
