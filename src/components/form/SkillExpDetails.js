import React, { useState, useEffect } from "react";
import { Autocomplete, Box, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Cuisines, masterApi } from "../../AlllData";
import FormControlSingleSelect from "../MuiComponents/FormControlSingleSelect";
import MultiSelected from "../MuiComponents/MultiSelected";
import TextFieldComponent from "../MuiComponents/TextFieldComponent";
import SkillSection from "../MuiComponents/SkillSection";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />

function SkillExpDetails(props) {
  const [pSkillDD, setPSkillDD] = useState([])
  const [sSkillDD, setSSkillDD] = useState([])
  const [tSkillDD, setTSkillDD] = useState([])
  const [primarylanguageDD, setPrimarylanguageDD] = useState([])
  const [otherlanguageDD, setOtherlanguageDD] = useState([])
  const [jobtypeDD, setJobtypeDD] = useState([])

  const {
    primarySkill, setPrimarySkill,
    secondarySkill, setSecondarySkill,
    tertiarySkill, setTertiarySkill,
    skillRemarks, setSkillRemarks,
    primaryLanguage, setPrimaryLanguage,
    otherLanguages, setOtherLanguages,
  } = props
  
  useEffect(() => {
    async function fetchData() {
      let primarySkilldata = await fetch(`http://13.126.160.155:8080/user/skill/get/skills?skill`);
      let secondarySkilldata = await fetch(`http://13.126.160.155:8080/user/skill/get/skills?skill=${primarySkill}`);
      let tertiarySkillData = await fetch(`http://13.126.160.155:8080/user/skill/get/skills?skill`);
      let primaryLanguagedata = await fetch(masterApi + "/drop-down/get/language?language");
      let otherLanguagedata = await fetch(masterApi + `/drop-down/get/language?language=${primaryLanguage}`);
      let Jobtypedata = await fetch(masterApi + "/drop-down/get/jobType?jobType=HOUSEKEEPING");
      let Pres = await primarySkilldata.json();
      let Sres = await secondarySkilldata.json();
      let Tres = await tertiarySkillData.json()

      let res1 = await primaryLanguagedata.json();
      let res2 = await otherLanguagedata.json();
      let res3 = await Jobtypedata.json();
      setPSkillDD(Pres.data || [{ value: "NO DATA" }]);
      setSSkillDD(Sres.data || [{ value: "NO DATA" }]);
      setTSkillDD(Tres.data || [{ value: "NO DATA" }]);
      setPrimarylanguageDD(res1.data || [{ value: "NO DATA" }]);
      setOtherlanguageDD(res2.data || [{ value: "NO DATA" }]);
      setJobtypeDD(res3.data || [{ value: "NO DATA" }]);
    }
    fetchData()
  }, [primarySkill, primaryLanguage, secondarySkill])
  


  return (
    <Box
      marginTop={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <h5>Skill and Experience Details</h5>
      <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: "30px", justifyContent: "space-between"}}>
          
        <FormControl sx={{ minWidth: 120, width: "25%"}} size="small">
          <InputLabel id="demo-select-small" required>Primary Language</InputLabel>
          <Select sx={{ width: "100%" }} value={primaryLanguage} onChange={(e)=>{setPrimaryLanguage(e.target.value)}}  label="Primary Language">
            {primarylanguageDD.map((items, index) => (
              <MenuItem key={index} value={items.key}>{items.value}</MenuItem>
            ))}
          </Select>
        </FormControl>

         <Autocomplete
          multiple
          size='small'
          options={otherlanguageDD}
          value={otherLanguages}
          disableCloseOnSelect
          getOptionLabel={(option) =>option.key}
          onChange={(event, newValue) => {
            setOtherLanguages([...newValue]);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                size='small'
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.key}
            </li>
          )}
           style={{ width: "45%" }}
           renderInput={(params) => (
            <TextField
              {...params}
              label="Other Languages"
              size="small"
            />
          )}
        />
       
        
        
        <TextFieldComponent
          labelData="Skill Remarks"
          setData={setSkillRemarks}
          data={skillRemarks}
          size="25%"
        />

        <FormControl sx={{ minWidth: 120, width: "25%"}} size="small">
          <InputLabel id="demo-select-small" required>Primary Skill</InputLabel>
          <Select sx={{ width: "100%" }} value={primarySkill}  label="Primary Skill==">
            {pSkillDD.map((items, index) => (
              <MenuItem key={index} onClick={() => {setPrimarySkill(items.uuid)}} value={items.uuid}>{items.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <MultiSelected
          labelData="Secondary Skill"
          dataDD={sSkillDD}
          setData={setSecondarySkill}
          values={"name"}
          size="34.7%"
        /> */}

        <Autocomplete
          multiple
          size='small'
          options={sSkillDD}
          value={secondarySkill.skillName}
          disableCloseOnSelect
          getOptionLabel={(option) =>option.name}
          onChange={(event, newValue) => {
            setSecondarySkill([...newValue]);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                size='small'
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          )}
           style={{ width: "34.7%" }}
           renderInput={(params) => (
            <TextField
              {...params}
              label="Secondary Skill"
              size="small"
            />
          )}
        />

        <MultiSelected
          labelData="Tertiary Skill"
          dataDD={tSkillDD}
          setData={setTertiarySkill}
          values={"name"}
          size="34.7%"
          value = {tertiarySkill}
        />
      </Box>
    </Box>
  );
}
export default SkillExpDetails;
