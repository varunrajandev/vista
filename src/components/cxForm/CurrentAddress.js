import React from "react";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";


function CurrentAddress(props) {
  const [cxcountry, setCXCountry] = useState([]);
  const [cxstate, setCXState] = useState([]);
  const [cxcity, setCXCity] = useState([]);
  const [cxlocality, setCXLocality] = useState([]);
  const [countryUUID, setCountryUUID] = useState()
  const [stateUUID, setStateUUID] = useState()
  const [cityID, setCityID] = useState()
  const[conuuid,setConuuid]=React.useState();
  const {
    flat, setFlat,
    area, setArea,
    landmark, setLandmark,
    pinCode, setPinCode,
    country, setCountry,
    state1, setState,
    city, setCity,
    locality, setLocality,
   // countryUUID,setCountryUUID,
    
    

  } = props;


  useEffect(() => {
    async function FetchApi() {
      const countryApidata = await fetch("http://13.126.160.155:8081/locationmaster/country/get/all");
      const StateApidata = await fetch(`http://13.126.160.155:8081/locationmaster/state/get/states/by/${countryUUID}`);
      const cityApidata = await fetch(`http://13.126.160.155:8081/locationmaster/city/get/cities/by/${stateUUID}`);
      const localityApidata = await fetch(`http://13.126.160.155:8081/locationmaster/micromarket/list/${cityID}`);

      let country = await countryApidata.json();
      let state = await StateApidata.json();
      let city = await cityApidata.json();
      let locality = await localityApidata.json();

      setCXCountry(country.data);
      setCXState(state.data || [{ name: "please Select Country" }]);
      setCXCity(city.data || [{ name: "please Select State" }]);
      setCXLocality(locality.data || [{ names: "please Select City" }]);

      // StoreApiData(conuuid);
  
      // console.log(conuuid);
    }
    FetchApi();
  }, [countryUUID, stateUUID, cityID]);

  // function StoreApiData(conuuid){
  //   setConuuid(conuuid)




  // }

  // const {      
  //   flat, setFlat,
  //   area, setArea,
  //   landmark, setLandmark,
  //   pinCode, setPinCode,
  //   country, setCountry,
  //   state, setState,
  //   city, setCity,
  //   locality, setLocality,
  //   addressProofType, setAddressProofType
  //   } = props;



  return (
    <Box
      sx={{
        marginTop: 7,
        display: "grid",
        gap: 1,
      }}
    >
      <h5>Current Address</h5>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "space-between"
        }}
      >
        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Flat/Building"
          variant="outlined"
          onChange={(e) => {
            setFlat(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Society/Colony/Area"
          variant="outlined"
          onChange={(e) => {
            setArea(e.target.value);
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
          >
            {cxcountry.map((item) => (
              <MenuItem value={item.uuid} onClick={() => { setCountryUUID(item.uuid)}}>{item.countryName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
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
            {cxstate.map((item) => (
              <MenuItem value={item.value} onClick={() => { setStateUUID(item.value) }}>{item.label} {item.name}</MenuItem>
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
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            {cxcity.map((item) => (
              <MenuItem value={item.value} onClick={() => { setCityID(item.value) }}>{item.label}{item.name}</MenuItem>
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
            onChange={(e) => {
              setLocality(e.target.value);
            }}
          >
            {cxlocality.map((item) => (
              <MenuItem value={item.id}>{item.name}{item.names}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ width: "18%" }}></div>
        <div style={{ width: "18%" }}></div>
      </Box>
    </Box>
  );
}

export default CurrentAddress;
