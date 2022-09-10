import React from "react";
import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//import { ProfessionData,} from "../../AlllData";


function PersonalInfo(props) {

  const [customerSourcing, setCustomerSourcing] = useState([]);
  const [customerMedium, setCustomerMedium] = useState([]);
  const [customerprofession,setCustomerprofession]=useState([]);
  const {
    cxSource, setCxSource,
    cxMedium, setCxMedium,
    fname, setFname,
    mname, setMname,
    lname, setLname,
    phoneNumber, setPhoneNumber,
    alternateNumber, setAlternateNumber,
    whatsappAvailable, setWhatsappAvailable,
    whatsapp, setWhatsapp,
    email, setEmail,
    profession, setProfession,
    fStatus,setFStatus

  } = props;

  useEffect(() => {
    async function FetchApi() {

      const customerSourcingApiDropdown = await fetch("http://13.126.160.155:8080/user/drop-down/get/sourceChannel?flag=customer")
      const customerMediumApiDropdown = await fetch("http://13.126.160.155:8080/user/drop-down/get/medium")
      const customerprofessionApiDropdown = await fetch("http://13.126.160.155:8080/user/drop-down/get/profession")

      let cxCustomerMedium = await customerMediumApiDropdown.json();
      let cxCustomerSourcing = await customerSourcingApiDropdown.json();
      let cxCustomerProfession= await customerprofessionApiDropdown.json();

      setCustomerMedium(cxCustomerMedium.data);
      setCustomerSourcing(cxCustomerSourcing.data);
      setCustomerprofession(cxCustomerProfession.data);
    }
    FetchApi();
  }, []);

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
          justifyContent: "space-between"
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
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          sx={{
            width: "18%",
            display: cxSource === "Other" ? "block" : "none",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="CX Other Source"
            placeholder="Please Mention..."
            variant="outlined"
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
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography
          sx={{
            width: "18%",
            display: cxMedium === "Other" ? "block" : "none",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="CX Other Medium"
            placeholder="Please Mention..."
            variant="outlined"
            onChange={(event) => {
              setCxMedium(event.target.value);
            }}
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
          label="Middle Name"
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
            value={profession}
            onChange={(e) => {
              setProfession(e.target.value);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {customerprofession.map((item) => (
              <MenuItem value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default PersonalInfo;
