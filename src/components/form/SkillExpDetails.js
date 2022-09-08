import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Cuisines } from "../../AlllData";
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
      let primarySkilldata = await fetch("http://13.126.160.155:8080/user/drop-down/get/skills");
      let primaryLanguagedata = await fetch("http://13.126.160.155:8080/user/drop-down/get/primaryLanguage");
      let otherLanguagedata = await fetch("http://13.126.160.155:8080/user/drop-down/get/otherLanguages");
      let Jobtypedata = await fetch("http://13.126.160.155:8080/user/drop-down/get/jobType");
      let res = await primarySkilldata.json();
      let res1 = await primaryLanguagedata.json();
      let res2 = await otherLanguagedata.json();
      let res3 = await Jobtypedata.json();
      setPSkillDD(res.data || [{ value: "NO DATA" }]);
      setSSkillDD(res.data || [{ value: "NO DATA" }]);
      setTSkillDD(res.data || [{ value: "NO DATA" }]);
      setPrimarylanguageDD(res1.data || [{ value: "NO DATA" }]);
      setOtherlanguageDD(res2.data || [{ value: "NO DATA" }]);
      setJobtypeDD(res3.data || [{ value: "NO DATA" }]);
    }
    fetchData()
  }, [])


  return (
    <Box
      marginTop={1}
      sx={{
        display: "flex",
        flexDirection:"column",
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

        <MultiSelected
          labelData="Last Job Type"
          dataDD={jobtypeDD}
          setData={setLastJobType}
          size="45%"
        />

        <TextFieldComponent
          labelData="Last Job Duration(in months)"
          setData={setLastJobDuration}
          size="25%"
        />

       <TextFieldComponent
          labelData="Reason For Leaving Last Job"
          setData={setReasonLeaving}
          size="50%"
        />
        </Box>

        {/* Skill */}
        <Box mt={7}>
        <FormControlSingleSelect
          labelData="Primary Skill"
          dataDD={pSkillDD}
          setData={setPrimarySkill}
          size="60%"
        />
        <Box>
          <SkillSection
            labelData="Primary Skill"
            dataDD={pSkillDD}
            setData={setPrimarySkill}
          />
        </Box>

         </Box>

        {/* <MultiSelected
          labelData="Secondary Skill"
          dataDD={sSkillDD}
          setData={setSecondarySkill}
          size="23%"
        />

        <MultiSelected
          labelData="Tertiary Skill"
          dataDD={tSkillDD}
          setData={setTertiarySkill}
          size="23%"
        />

        <TextFieldComponent
          labelData="Skill Remarks"
          setData={setSkillRemarks}
          size="23%"
        />

        <FormControlSingleSelect
          labelData="Can Cook Veg/Non-veg?"
          dataDD={[{ key: "No Data", value: "NO Data" }]}
          setData={setVegNonveg}
          size="23%"
        />

        <MultiSelected
          labelData="Cuisines"
          dataDD={Cuisines}
          setData={setCuisinesKnown}
          size="23%"
        />

        <FormControlSingleSelect
          labelData="Primary Language"
          dataDD={primarylanguageDD}
          setData={setPrimaryLanguage}
          size="23%"
        /> */}
        
      </Box>
  );
}
export default SkillExpDetails;
