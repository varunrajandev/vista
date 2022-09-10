import React from "react";
import { Box, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { data } from "../../Data";

function CurrentAddress(props) {
  const [cxcountry, setCXCountry] = useState([]);
  const [cxstate, setCXState] = useState([]);
  const [cxcity, setCXCity] = useState([]);
  const [cxlocality, setCXLocality] = useState([]);
  const [countryUUID, setCountryUUID] = useState()
  const [stateUUID, setStateUUID] = useState()
  const [cityID, setCityID] = useState()
  const[conuuid,setConuuid]=React.useState();
  var [pcode,setPcode]=React.useState();
  const [pincode1,setPincode1]=React.useState([]);
  const[conty,setcountry]=React.useState();
  const[xm,setxm]=React.useState();
  const[xx,setxx]=React.useState();
  

  const {
    flat, setFlat,
    area, setArea,
    landmark, setLandmark,
    pinCode, setPinCode,
     pinCode1, setPinCode1,
    country, setCountry,
    state1, setState,
    city, setCity,
    locality, setLocality,
   // countryUUID,setCountryUUID,
    
    

  } = props;


  useEffect(() => {
    async function FetchApi() {
      // const countryApidata = await fetch("http://13.126.160.155:8081/locationmaster/country/get/all");
      // const StateApidata = await fetch(`http://13.126.160.155:8081/locationmaster/state/get/states/by/${countryUUID}`);
      // const cityApidata = await fetch(`http://13.126.160.155:8081/locationmaster/city/get/cities/by/${stateUUID}`);
      // const localityApidata = await fetch(`http://13.126.160.155:8081/locationmaster/micromarket/list/${cityID}`);
      const pincodeApi = await fetch(`http://13.126.160.155:8080/user/address/get/address/${pcode}`)

      // let country = await countryApidata.json();
      // let state = await StateApidata.json();
      // let city = await cityApidata.json();
      // let locality = await localityApidata.json();
      let pcodel = await pincodeApi.json();
      
      // let kk= await pcode1.country;
      // let xx1= await pcode1.State;
      // let yy= await pcode1.District;


      setPincode1(pcodel.data)
      // setCXCountry(country.data);
      // setCXState(state.data || [{ name: "please Select Country" }]);
      // setCXCity(city.data || [{ name: "please Select State" }]);
      // setCXLocality(locality.data || [{ names: "please Select City" }]);
      setcountry (pincode1.country);
      setxm( pincode1||[{ name: "please Select Country" }]);
      setxx( pincode1||[{ name: "please Select Country" }]);   
    }
    console.log("NOo",pincode1)
    FetchApi();
  }, [pcode]);
  console.log("yes",pincode1)



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

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Pin Code2.0"
          variant="outlined"
          onInput={(e) => {
            setPcode(e.target.value);
          }}
        />

      
          <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          variant="outlined"
          // label="Country"
          value={conty||"conty"}
          // onChange={(e) => {
          //   setCountry();
          // }}
        />
       
<TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          value={pincode1.state||"state"}
          variant="outlined"
        //  label="State"
        
        />

<TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="City"
          variant="outlined"
          // value={pincode1.city||"City"}
          // onInput={(e) => {
          //   setPcode(e.target.value);
          // }}
        />
   

        {/* <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
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
        </FormControl> */}
        <div style={{ width: "18%" }}></div>
        <div style={{ width: "18%" }}></div>
      </Box>
    </Box>
  );
}

export default CurrentAddress;
