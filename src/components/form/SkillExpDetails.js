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

      let Pres = await primarySkilldata.json();
      let Sres = await secondarySkilldata.json();
      let Tres = await tertiarySkillData.json()
      let res1 = await primaryLanguagedata.json();
      let res2 = await otherLanguagedata.json();

      setPSkillDD(Pres.data || [{ value: "NO DATA" }]);
      setSSkillDD(Sres.data || [{ value: "NO DATA" }]);
      setTSkillDD(Tres.data || [{ value: "NO DATA" }]);
      setPrimarylanguageDD(res1.data || [{ value: "NO DATA" }]);
      setOtherlanguageDD(res2.data || [{ value: "NO DATA" }]);

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
      <h5>Skill and Language Details</h5>
      <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: "30px", justifyContent: "space-between" }}>

        <FormControl sx={{ minWidth: 120, width: "20%" }} size="small">
          <InputLabel id="demo-select-small" required>Primary Skill</InputLabel>
          <Select sx={{ width: "100%" }} value={primarySkill} label="Primary Skill==">
            {pSkillDD.map((items, index) => (
              <MenuItem key={index} onClick={() => { setPrimarySkill(items.uuid) }} value={items.uuid}>{items.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Autocomplete
          multiple
          disableCloseOnSelect
          size="small"
          options={sSkillDD}
          sx={{ width: "30%" }}
          getOptionLabel={(option) => option.name}
          value={secondarySkill?secondarySkill.map((item) => (item)):""}
          onChange={(event, newValue) => {
            setSecondarySkill([...newValue]);
          }}
          renderInput={(params) => (
            <TextField {...params}
              label="Secondary Skill"

            />
          )}
        />

      {/* <Autocomplete
        id="size-small-outlined"
        size="small"
        options={sSkillDD}
        sx={{ width: "30%" }}
        getOptionLabel={(option) => option.name}
        value={secondarySkill[0]}
        onChange={(event, newValue) => {
          setSecondarySkill([newValue]);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Secondary Skill" />
        )}
      /> */}

        <Autocomplete
          multiple
          disableCloseOnSelect
          size="small"
          sx={{ width: "45%" }}
          options={tSkillDD}
          getOptionLabel={(option) => option.name}
          value={tertiarySkill?tertiarySkill.map((item) => (item)):""}
          onChange={(event, newValue) => {
            setTertiarySkill([...newValue]);
          }}
          renderInput={(params) => (
            <TextField {...params}
              label="Tertiary Skill"
            />
          )}
        />

        <TextFieldComponent
          labelData="Skill Remarks"
          setData={setSkillRemarks}
          data={skillRemarks}
          size="40%"
        />

        <FormControl sx={{ minWidth: 120, width: "20%" }} size="small">
          <InputLabel id="demo-select-small" required>Primary Language</InputLabel>
          <Select sx={{ width: "100%" }} value={primaryLanguage} onChange={(e) => { setPrimaryLanguage(e.target.value) }} label="Primary Language">
            {primarylanguageDD.map((items, index) => (
              <MenuItem key={index} value={items.key}>{items.value}</MenuItem>
            ))}
          </Select>
        </FormControl>


        <Autocomplete
          multiple
          disableCloseOnSelect
          size="small"
          sx={{width:"35%"}}
          options={otherlanguageDD}
          getOptionLabel={(option) => option.value}
          value={otherLanguages?otherLanguages.map((item) => (item)):[]}
          onChange={(event, newValue) => {
            setOtherLanguages([...newValue]);
          }}
          renderInput={(params) => (
            <TextField {...params}
              label="Other Languages"
            />
          )}
        />
        </Box>
    </Box>
  );
}
export default SkillExpDetails;
