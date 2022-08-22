import {
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import LongMenu from "./LongMenu";
import styled from "@emotion/styled";
import PersonIcon from "@mui/icons-material/Person";
import { TextField } from "@mui/material";
import Popup from "../Popup";
import { useState } from "react";
import { FormControl } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

const BOX = styled(Box)({
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
});

const StyleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4eeff",
  padding: "5px 20px 20px 20px",
  borderRadius: "5px",
  width: "22%",
  gap: "5px",
});

// const Div1 = styled("div")({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   margin: "5px",
// });

const Div2 = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "-25px",
});

function HouseHoldMemberInfo(props) {
  const [openPopup, setOpenPopup] = useState(false);
  const { name, setName } = props;
  return (
    <Box marginTop={3}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h5>Household Members Information</h5>
        <div>
          <IconButton aria-label="delete">
            <AddIcon
              sx={{
                backgroundColor: "purple",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => {
                setOpenPopup(true);
              }}
            />
          </IconButton>
          <span style={{ fontSize: "13px", fontWeight: "bolder" }}>
            &nbsp; Add a new Member
          </span>
        </div>
      </Box>

      <BOX>
        <StyleBox>
          <Div2>
            <div></div>
            <LongMenu />
          </Div2>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Name of the family member"
              variant="standard"
              onChange={(e)=>{
                setName(e.target.value)
              }}
              sx={{ width: "90%" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <GroupIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Relationship"
              variant="standard"
              sx={{ width: "90%" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LocalPhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Phone_no"
              variant="standard"
              sx={{ width: "90%" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Email"
              variant="standard"
              sx={{ width: "90%" }}
            />
          </Box>
        </StyleBox>
      </BOX>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add a new Member"
      >
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItem: "center",
          }}
        >
          <TextField label="Member Name" sx={{ width: "230px" }} size="small" />

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Relationship</InputLabel>
            <Select
              sx={{ width: "230px" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="Relationship"
              // onChange={(e) => {
              //   setCountry(e.target.value);
              // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"India"}>India</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Phone Number"
            sx={{ width: "230px" }}
            size="small"
          />
          <TextField label="Age" sx={{ width: "230px" }} size="small" />
          <TextField label="Occupation" sx={{ width: "230px" }} size="small" />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button
            sx={{ color: "#f52f50", border: "1px solid #f52f50", margin: 2 }}
            variant="outlined"
          >
            CLOSE
          </Button>

          <Button variant="contained" color="primary" sx={{ m: 2 }}>
            ADD MEMBER
          </Button>
        </Box>
      </Popup>
    </Box>
  );
}

export default HouseHoldMemberInfo;
