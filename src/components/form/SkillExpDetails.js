import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Cuisines, masterApi } from "../../AlllData";
import FormControlSingleSelect from "../MuiComponents/FormControlSingleSelect";
import MultiSelected from "../MuiComponents/MultiSelected";
import TextFieldComponent from "../MuiComponents/TextFieldComponent";
import SkillSection from "../MuiComponents/SkillSection";

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
    vegNonveg, setVegNonveg,
    cuisinesKnown, setCuisinesKnown,
    primaryLanguage, setPrimaryLanguage,
    otherLanguages, setOtherLanguages,
    totalExp, setTotalExp,
    experienceRemarks, setExperienceRemarks,
    lastJobType, setLastJobType,
    lastJobDuration, setLastJobDuration,
    ReasonLeaving, setReasonLeaving,
    // values, setValue,
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

  console.log(tertiarySkill)
  


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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "30px",
          justifyContent: "space-between",
        }}
      >
        <FormControlSingleSelect
          labelData="Primary Language"
          dataDD={primarylanguageDD}
          setData={setPrimaryLanguage}
          size="25%"
        />

        <MultiSelected
          labelData="Other Languages"
          dataDD={otherlanguageDD}
          setData={setOtherLanguages}
          size="45%"
        />

        <TextFieldComponent
          labelData="Total Experience"
          setData={setTotalExp}
          size="25%"
        />

        <TextFieldComponent
          labelData="Experience Remarks"
          setData={setExperienceRemarks}
          size="25%"
        />

      <FormControlSingleSelect
          labelData="Last Job Type"
          dataDD={pSkillDD}
          setData={setLastJobType}
          values={"name"}
          size="37.5%"
        />

        <TextFieldComponent
          labelData="Last Job Duration(in months)"
          setData={setLastJobDuration}
          size="25%"
        />

        <TextFieldComponent
          labelData="Reason For Leaving Last Job"
          setData={setReasonLeaving}
          size="60%"
        />

        <FormControlSingleSelect
          labelData="Primary Skill"
          dataDD={pSkillDD}
          setDatas={setPrimarySkill}
          values={"name"}
          size="37.5%"
          data={primarySkill}
        />

        <MultiSelected
          labelData="Secondary Skill"
          dataDD={sSkillDD}
          setData={setSecondarySkill}
          values={"name"}
          size="48.7%"
        />

        <MultiSelected
          labelData="Tertiary Skill"
          dataDD={tSkillDD}
          setData={setTertiarySkill}
          values={"name"}
          size="48.7%"
          value = {tertiarySkill}
        />
      </Box>
    </Box>
  );
}
export default SkillExpDetails;
