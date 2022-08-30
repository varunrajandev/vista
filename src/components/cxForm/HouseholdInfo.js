import { Box, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from 'react';


function HouseholdInfo(props) {
 
  const [cxTypeOfHouse, setCXTypeOfHouse] = useState([]);

  const {
    houseTypes, setHouseTypes,
    noOfFamilyMembers, setNoOfFamilyMembers,
    noOfMaleAdults, setNoOfMaleAdults,
    noOfFemaleAdults, setNoOfFemaleAdults,
    noOfChilds, setNoOfChilds,
    noOfPets, setNoOfPets,
  } = props

  useEffect(() => {
    async function FetchApi() {

      const typeOfHouseApidata = await fetch("http://13.126.160.155:8080/user/drop-down/get/houseType");

      let typeOfHouse = await typeOfHouseApidata.json();

      setCXTypeOfHouse(typeOfHouse.data);

    }
    FetchApi();
  }, []);

  return (
    <Box sx={{
      marginTop: 7,
      display: "grid",
      gap: 1,
    }}
    >
      <h5>Household Members</h5>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "space-between" }}>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Type of House</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Type of House"
            onChange={(e) => {
              setHouseTypes(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cxTypeOfHouse.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <TextField
          sx={{ width: '18%' }}
          size="small"
          id="outlined-basic"
          label="No of Family Members"
          variant="outlined"
          onChange={(e) => {
            setNoOfFamilyMembers(e.target.value);
          }}
        />

        <TextField
          sx={{ width: '18%' }}
          size="small"
          id="outlined-basic"
          label="No of male adults in family"
          variant="outlined"
          onChange={(e) => {
            setNoOfMaleAdults(e.target.value);
          }}
        />

        <TextField
          sx={{ width: '18%' }}
          size="small"
          id="outlined-basic"
          label="No of female adults in family"
          variant="outlined"
          onChange={(e) => {
            setNoOfFemaleAdults(e.target.value);
          }}
        />

        <TextField
          sx={{ width: '18%' }}
          size="small"
          id="outlined-basic"
          label="No of child below 5years"
          variant="outlined"
          onChange={(e) => {
            setNoOfChilds(e.target.value);
          }}
        />

        <TextField
          sx={{ width: '18%' }}
          size="small"
          id="outlined-basic"
          label="No pets"
          variant="outlined"
          onChange={(e) => {
            setNoOfPets(e.target.value);
          }}
        />

      </Box>
    </Box>
  );
}

export default HouseholdInfo;
