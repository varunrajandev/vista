import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import PersonalInfo from "../cxForm/PersonalInfo";
import CurrentAddress from "../cxForm/CurrentAddress";
import HouseholdInfo from "../cxForm/HouseholdInfo";



function AddNewCustomer() {
  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7}>
      {/* //Add Ycw Section section */}
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
          <Button color="success" variant="contained">
            CONFIRM & CREATE
          </Button>
        </Typography>
      </Box>
      {/* //Form */}
      <Box
        marginTop={5}
        sx={{
          // boxShadow: "-1px -5px 5px 0px rgba(102,93,102,1)",
          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
       <PersonalInfo/>
       <CurrentAddress/>
       <HouseholdInfo/>
       <Box sx={{display:"flex", justifyContent:"center"}}><Button variant="contained" sx={{mt:4}}> ADD JOB REQUEST</Button></Box>
       
      </Box>
    </Box>
  );
}

export default AddNewCustomer;
