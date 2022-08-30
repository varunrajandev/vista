import { Box, TextField } from "@mui/material";
import React,{useEffect, useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CurrentAdd(props) {
  const [countryDD, setCountryDD] = useState([])
  const [stateDD, setStateDD] = useState([])
  const [cityDD, setCityDD] = useState([])
  const [localityDD, setLocalityDD] = useState([])
  const [countryID, setCountryID] = useState()
  const [stateID, setStateID] = useState()
  const [cityID, setCityID] = useState()
const {
  addressL1, setAddressL1,
  addressL2, setAddressL2,
  landmark, setLandmark,
  pinCode, setPinCode,
  country, setCountry,
  state, setState,
  city, setCity,
  locality, setLocality,
  addressProofType, setAddressProofType,
} = props

useEffect(() => {
  async function fetchData() {
    let countryData = await fetch( "http://13.126.160.155:8081/locationmaster/country/get/all");
    let stateData = await fetch( `http://13.126.160.155:8081/locationmaster/state/get/all/${countryID}`);
    let cityData = await fetch( `http://13.126.160.155:8081/locationmaster/city/get/all/${stateID}`);
    let localityData = await fetch( `http://13.126.160.155:8081/locationmaster/micromarket/list/${cityID}`);
    let res1 = await countryData.json();
    let res2 = await stateData.json();
    let res3 = await cityData.json();
    let res4 = await localityData.json();
    setCountryDD(res1.data);
    setStateDD(res2.data || [{name:"please Select Country"}])
    setCityDD(res3.data || [{name:"please Select State"}])
    setLocalityDD(res4.data || [{names:"please Select City"}])
  }
  fetchData();
}, [countryID, stateID, cityID]);

  return (
    <Box 
    sx={{
      marginTop: 7,
      display: "grid",
      gap: 1,
    }}>
      <h5>Current Address</h5>
      
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent:"space-between",
          }}
        >
          <TextField
            sx={{ width: "18%" }}
            size="small"
            id="outlined-basic"
            label="Address Line 1"
            variant="outlined"
            onChange={(e) => {
              setAddressL1(e.target.value);
            }}
          />

          <TextField
            sx={{ width: "18%" }}
            size="small"
            id="outlined-basic"
            label="Address Line 2"
            variant="outlined"
            onChange={(e) => {
              setAddressL2(e.target.value);
            }}
          />

          <TextField
            sx={{ width: "18%" }}
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
            id="outlined-basic"
            label="Pin Code"
            variant="outlined"
            onChange={(e) => {
              setPinCode(e.target.value);
            }}
          />

          <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
            <InputLabel id="demo-select-small">Country</InputLabel>
            <Select
              sx={{ width: "100%" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="Country"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >{countryDD.map((item)=>(
              <MenuItem value={item.countryName} onClick={()=>{setCountryID(item.id)}}>{item.countryName}</MenuItem>
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
          <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
            <InputLabel id="demo-select-small">State</InputLabel>
            <Select
              sx={{ width: "100%" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="State"
              onChange={(e) => {
                setState(e.target.value);
              }}
            >
              {stateDD.map((item) => (
                <MenuItem value={item.stateName} onClick={()=>{setStateID(item.id)}}>{item.stateName}{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
            <InputLabel id="demo-select-small">City</InputLabel>
            <Select
              sx={{ width: "100%" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              {cityDD.map((item) => (
                <MenuItem value={item.cityName} onClick={()=>{setCityID(item.uuid)}}>{item.cityName}{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
            <InputLabel id="demo-select-small">Locality</InputLabel>
            <Select
              sx={{ width: "100%" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="Locality"
              onChange={(e) => {
                setLocality(e.target.value);
              }}
            >
              {localityDD.map((item) => (
                <MenuItem value={item.name}>{item.name}{item.names}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, width:"18%" }} size="small">
            <InputLabel id="demo-select-small">Address Proof Type</InputLabel>
            <Select
              sx={{ width: "100%" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="Address Proof Type"
              onChange={(e) => {
                setAddressProofType(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Aadhaar Card"}>Aadhaar Card</MenuItem>
              <MenuItem value={"Light Bill"}>Light Bill</MenuItem>
              <MenuItem value={"Gas Bill"}>Gas Bill</MenuItem>
              <MenuItem value={"Domicile Certificate"}>Room Agreement</MenuItem>
              <MenuItem value={"Voter ID"}>Voter ID</MenuItem>
              <MenuItem value={"Ration Card"}>Ration Card</MenuItem>
              <MenuItem value={"Driving Licence"}>Driving Licence</MenuItem>
              <MenuItem value={"Passport"}>Passport</MenuItem>
              <MenuItem value={"Bank Passbook"}>Bank Passbook</MenuItem>
              <MenuItem value={"Panchayat Certificate"}>
                Panchayat Certificate
              </MenuItem>
            </Select>
          </FormControl>
          <div style={{width:"18%"}}></div>
        </Box>
      </Box>
  
  );
}

export default CurrentAdd;
