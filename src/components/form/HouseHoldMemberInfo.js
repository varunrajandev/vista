import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { FilterData, masterApi } from "../../AllData";
import axios from "axios";


function HouseHoldMemberInfo(props) {

  const [occupationDD, setOccupationDD] = React.useState([]);
  const [relationshipDD, setRelationshipDD] = React.useState([]);
  const [occupation, setOccupation] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const { setInputFields, inputFields } = props;

  const ID = localStorage.getItem("ID")
  const { id } = useParams()

  const handleChangeInput = (index, event) => {    
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    if (event.target.name === 'addressType'){
      if (event.target.value !== null){
        axios.get(`http://13.126.160.155:8080/user/address/get/address/${id || ID}?isPermanent=${event.target.value}`)
        .then(res => {
          const values = [...inputFields];
          values[index]['address'] = res?.data?.data ?? '';
          setInputFields(values);
        })

      }
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputs", inputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        age: "",
        jobTypeUuid: "",
        otherJobType: "",
        mobileNo: "",
        name: "",
        relationship: null,
        otherrRlationship: "",
        locality: "",
        addressType: null,
        address: ""
      },
    ]);
  };

  const ispermanaentFetchByStatus = async () => {
    let response = await fetch(`http://13.126.160.155:8080/user/address/get/address/YCW6548029}?isPermanent=true`)
    let data = await response.json();}

  useEffect(() => {
    async function fetchDD() {
      let relationShipDropdown = await fetch(`http://13.126.160.155:8080/user/drop-down/get/relation`)
      let occupationDropdown = await fetch(`http://13.126.160.155:8080/user/skill/get/skills`)
      let relationshipData = await relationShipDropdown.json();
      let occupationDD = await occupationDropdown.json();
      setRelationshipDD(relationshipData.data);
      setOccupationDD(occupationDD.data);
    }
    fetchDD()
    ispermanaentFetchByStatus()
  }, [])

  console.log("relation", relation)
  // console.log("occupation",occupation)
  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        display: "grid",
        gap: 0.3,
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Household Members</h5>
        <div>
          <IconButton aria-label="delete">
            <AddIcon
              sx={{
                backgroundColor: "purple",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => handleAddFields()}
            />
          </IconButton>
          <span style={{ fontSize: "13px", fontWeight: "bolder" }}>
            &nbsp; Add Household Members
          </span>
        </div>
      </Box>
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              marginBottom: 5,
            }}
          >
            <TextField
              style={{ width: "18%" }}
              name="name"
              label="Name"
              size="small"
              value={inputField.name}
              onChange={(event) => handleChangeInput(index, event)}
            />



            <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
              <InputLabel id="demo-select-small">Relationship</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                name="relationship"
                value={inputField?.relationship ?? ''}
                label="Occupation"
                onChange={(event) => handleChangeInput(index, event)}
              >
                {relationshipDD.map((item) => (
                  <MenuItem value={item.key}>{item.value}</MenuItem>
                ))}
              </Select>
            </FormControl>


            <TextField
              label="Others Relationship"
              name="otherrRlationship"
              size="small"
              value={inputField.otherrRlationship}
              sx={{ width: "18%", }}
              disabled={inputField.relationship === "OTHERS" ? false : true}
              onChange={(event) => handleChangeInput(index, event)}
            />

            <TextField
              sx={{
                width: "18%",
                '& input[type=number]': {
                  '-moz-appearance': 'textfield'
                },
                '& input[type=number]::-webkit-outer-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0
                },
                '& input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0
                }
              }}
              name="mobileNo"
              label="Mobile Number"
              type="number"
              value={inputField.mobileNo}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />


            <TextField
              style={{ width: "18%" }}
              name="age"
              label="Age"
              value={inputField.age}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />

            <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
              <InputLabel id="demo-select-small">Occupation</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                name="jobTypeUuid"
                value={inputField?.jobTypeUuid ?? ''}
                label="Occupation"
                onChange={(event) => handleChangeInput(index, event)}
              >
                {occupationDD.map((item) => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Relative Job"
              name="otherJobType"
              size="small"
              value={inputField.otherJobType}
              sx={{ width: "18%", }}
              disabled={inputField.jobTypeUuid === "Others" ? false : true}
              onChange={(event) => handleChangeInput(index, event)}
            />

            <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
              <InputLabel id="demo-select-small">Address Type</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                name="addressType"
                value={inputField?.addressType ?? ''}
                label="Address Type"
                onChange={(event) => handleChangeInput(index, event)}
              >
                <MenuItem value={false}>Same As Current Address</MenuItem>
                <MenuItem value={true}>Same As Permanent Address</MenuItem>
                <MenuItem value={null}>Other</MenuItem>
                </Select>
            </FormControl>

            <TextField
              style={{ width: "38.3%" }}
              name="address"
              label="Address/Locality"
              value={inputField.address}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />

            <Box sx={{ display: "flex", justifyContent: "right", width: "100%" }}>
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => handleRemoveFields(index)} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </form>
    </Box>
  );
}

export default HouseHoldMemberInfo;
