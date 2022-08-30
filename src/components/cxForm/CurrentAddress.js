import { Box, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AddressData } from "../../AddressData";

function CurrentAddress() {
  const [flat, setFlat] = React.useState("");
  const [area, setArea] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [pinCode, setPinCode] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [locality, setLocality] = React.useState("");
  const [addressProofType, setAddressProofType] = React.useState("");


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

  // flat={flat} setFlat={setFlat}
  // area={area} setArea={setArea}
  // landmark={landmark} setLandmark={setLandmark}
  // pinCode={pinCode} setPinCode={setPinCode}
  // country={country} setCountry={setCountry}
  // state={state} setState={setState}
  // city={city} setCity={setCity}
  // locality={locality} setLocality={setLocality}
  // addressProofType={addressProofType} setAddressProofType={setAddressProofType}

  const res = AddressData.filter((word) => word.admin_name === state);

  let arr = [];
  AddressData.forEach((item) => {
    let data = item.admin_name;
    arr.push(data);
  });
  var set = new Set(arr);
  let newArr = [...set];

  console.log({
    flat,
    area,
    landmark,
    pinCode,
    country,
    state,
    city,
    locality,
    addressProofType,
  });

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
          justifyContent:"space-between"
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"India"}>India</MenuItem>
          </Select>
        </FormControl>
        {/* </Box>

        <Box
          display={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        > */}
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {newArr.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {res.map((item) => (
              <MenuItem value={item.city}>{item.city}</MenuItem>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Phase1"}>Phase1</MenuItem>
            <MenuItem value={"Phase2"}>Phase2</MenuItem>
            <MenuItem value={"Phase3"}>Phase3</MenuItem>
          </Select>
        </FormControl>
        <div style={{width:"18%"}}></div>
        <div style={{width:"18%"}}></div>
      </Box>
    </Box>
  );
}

export default CurrentAddress;
