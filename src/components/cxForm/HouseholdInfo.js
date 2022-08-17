import { Box, TextField } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { houseType } from "../../AlllData";

function HouseholdInfo() {
  const [houseTypes, setHouseTypes] = React.useState("");
  const [noOfFamilyMembers, setNoOfFamilyMembers] = React.useState("");
  const [noOfAdults, setNoOfAdults] = React.useState("");
  const [noOfFemaleAdults, setNoOfFemaleAdults] = React.useState("");
  const [noOfElders, setNoOfElders] = React.useState("");
  

  

  console.log({houseTypes, noOfAdults, noOfElders, noOfFamilyMembers})


  return (
    <Box sx={{
      marginTop: 7,
      display: "grid",
      gap: 1,
    }}>

      <h5>Household Members</h5>
      
      <Box sx={{display:"flex", flexWrap:"wrap", gap:"30px", justifyContent:"space-between"}}>

      <FormControl sx={{minWidth: 120, width:"18%" }} size="small">
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
            {houseType.map((item)=>(
              <MenuItem value={item.house}>{item.house}</MenuItem>
            ))}
           
          </Select>
        </FormControl>

        <TextField
          sx={{ width:'18%' }}
          size="small"
          id="outlined-basic"
          label="No of Family Members"
          variant="outlined"
          onChange={(e) => {
            setNoOfFamilyMembers(e.target.value);
          }}

        />

        <TextField
          sx={{width:'18%' }}
          size="small"
          id="outlined-basic"
          label="No of male adults in family"
          variant="outlined"
          onChange={(e) => {
            setNoOfAdults(e.target.value);
          }}
        />

<TextField
          sx={{width:'18%' }}
          size="small"
          id="outlined-basic"
          label="No of female adults in family"
          variant="outlined"
          onChange={(e) => {
            setNoOfAdults(e.target.value);
          }}
        />

<TextField
          sx={{width:'18%' }}
          size="small"
          id="outlined-basic"
          label="No of child below 5years"
          variant="outlined"
          onChange={(e) => {
            setNoOfAdults(e.target.value);
          }}
        />

        <TextField
          sx={{ width:'18%' }}
          size="small"
          id="outlined-basic"
          label="No pets"
          variant="outlined"
          onChange={(e) => {
            setNoOfElders(e.target.value);
          }}
        />

        </Box>

       
      
    </Box>
   
  );
}

export default HouseholdInfo;
