import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  customerSourcing,
  ProfessionData,
  customerMedium,
} from "../../AlllData";

function PersonalInfo() {
  const [cxSource, setCxSource] = React.useState("");
  const [cxMedium, setCxMedium] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [mname, setMname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [alternateNumber, setAlternateNumber] = React.useState();
  const [whatsappAvailable, setWhatsappAvailable] = React.useState();
  const [whatsapp, setWhatsapp] = React.useState();
  const [profession, setProfession] = React.useState("");

  console.log({
    cxMedium,
    profession,
    whatsapp,
    whatsappAvailable,
    alternateNumber,
    phoneNumber,
    cxSource,
    fname,
    mname,
    lname,
  });
  return (
    <Box
      sx={{
        marginTop: 5,
        display: "grid",
        gap: 1,
      }}
    >
      <h5>Personal Information</h5>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent:"space-between"
        }}
      >
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Sourcing Channel</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={cxSource}
            label="Sourcing Channel"
            onChange={(e) => {
              setCxSource(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {customerSourcing.map((item) => (
              <MenuItem value={item.source}>{item.source}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          sx={{
            width: "18%",
            display: cxSource === "Others" ? "block" : "none",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="CX Other Source"
            placeholder="Please Mention..."
            variant="outlined"
            // onChange={(event) => {
            //   set(event.target.value);
            // }}
          />
        </Typography>

        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Medium</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            value={cxMedium}
            label="Medium"
            onChange={(e) => {
              setCxMedium(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {customerMedium.map((item) => (
              <MenuItem value={item.medium}>{item.medium}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          sx={{
            width: "18%",
            display: cxMedium === "Others" ? "block" : "none",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="CX Other Medium"
            placeholder="Please Mention..."
            variant="outlined"
            // onChange={(event) => {
            //   set(event.target.value);
            // }}
          />
        </Typography>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="First Name*"
          variant="outlined"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Middle Name*"
          variant="outlined"
          onChange={(event) => {
            setMname(event.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Last Name*"
          variant="outlined"
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Phone Number*"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        {/* </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt:2
        }}
      > */}

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Alternate Phone Number*"
          onChange={(e) => {
            setAlternateNumber(e.target.value);
          }}
        />
        <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
          <InputLabel id="demo-select-small">Whatsapp Available?*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Whatsapp Available "
            onChange={(e) => {
              setWhatsappAvailable(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Whatsapp Number*"
          onChange={(e) => {
            setWhatsapp(e.target.value);
          }}
          disabled={!whatsappAvailable}
        />

        <TextField
          sx={{ width: "18%" }}
          size="small"
          id="outlined-basic"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <FormControl
          sx={{ minWidth: 120, width: "18%", display: "flex" }}
          size="small"
        >
          <InputLabel id="demo-select-small">Profession*</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="demo-select-small"
            id="demo-select-small"
            label="Profession"
            onChange={(event) => {
              setProfession(event.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {ProfessionData.map((item) => (
              <MenuItem value={item.profession}>{item.profession}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default PersonalInfo;
