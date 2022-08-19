import { Box, Checkbox, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AddressData } from "../../AddressData";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function PermanentAdd(props) {

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
    check, setCheck
  } = props

  const res = AddressData.filter((word) => word.admin_name === state);

  let arr = [];
  AddressData.forEach((item) => {
    let data = item.admin_name;
    arr.push(data);
  });
  var set = new Set(arr);
  let newArr = [...set];



  return (
    <Box sx={{ marginTop: 7 }}>
      <h5>
        Permanent Address{" "}
        <Checkbox
          onChange={(e) => setCheck(e.target.checked)}
          {...label}
          color="success"
        />
        <span style={{ fontWeight: "100" }}>Same as current Address</span>
      </h5>
      <Box style={{ display: check === true && "none" }}>
       
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"India"}>India</MenuItem>
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {newArr.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {res.map((item) => (
                  <MenuItem value={item.city}>{item.city}</MenuItem>
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Phase1"}>Phase1</MenuItem>
                <MenuItem value={"Phase2"}>Phase2</MenuItem>
                <MenuItem value={"Phase3"}>Phase3</MenuItem>
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
                <MenuItem value={"Aadhar Card"}>Aadhar Card</MenuItem>
                <MenuItem value={"Light Bill"}>Light Bill</MenuItem>
                <MenuItem value={"Gas Bill"}>Gas Bill</MenuItem>
                <MenuItem value={"Domicile Certificate"}>
                  Room Agreement
                </MenuItem>
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
      </Box>
  );
}

export default PermanentAdd;
