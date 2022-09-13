import { Box, Button } from '@mui/material'
import axios from 'axios';
import React, { useContext } from 'react'
import { masterApi } from '../../../AlllData';
import { multiStepContext } from '../../../ContextApi/StepContext';
import SkillExpDetails from '../../form/SkillExpDetails'

function SkillInformationData() {
    //Skill and Experience Deatails
    const [primarySkill, setPrimarySkill] = React.useState("");
    const [secondarySkill, setSecondarySkill] = React.useState([]);
    const [tertiarySkill, setTertiarySkill] = React.useState([]);
    const [skillRemarks, setSkillRemarks] = React.useState("");
    const [cookType, setCookType] = React.useState("");
    const [cuisinesKnown, setCuisinesKnown] = React.useState([]);
    const [primaryLanguage, setPrimaryLanguage] = React.useState("");
    const [otherLanguages, setOtherLanguages] = React.useState([]);
    const [totalExp, setTotalExp] = React.useState();
    const [experienceRemarks, setExperienceRemarks] = React.useState();
    const [lastJobType, setLastJobType] = React.useState([]);
    const [lastJobDuration, setLastJobDuration] = React.useState();
    const [reasonLeaving, setReasonLeaving] = React.useState();
    
    //const [values, setValues] = React.useState(false);
    // newSkill data
    // const [secondarySkillArray, setSecondarySkillArray] = React.useState([]);
    let PrimarySkillArray = [];


    if(secondarySkill){
      secondarySkill.map((item)=>{
          PrimarySkillArray.push(item.name)
      })
    }

    console.log(PrimarySkillArray)

    const {currentSteps, setCurrentSteps, personalData, setAddressData} = useContext(multiStepContext)
    

    async function handleSubmit(){
    
      try {
        let response = await axios.post(masterApi+"/skill/save",
        {
          "otherLanguage": [
            "HINDI"
          ],
          "primaryLanguage": "HINDI",
          "skillRemarks": "string",
          "skillRequestDtos": [
            {
              "skillLevel": "PRIMARY",
              "skillUuid": [
                primarySkill
              ]
            },
            {
              "skillLevel": "SECONDARY",
              "skillUuid": [
                "string"
              ]
            },
            {
              "skillLevel": "TERTIARY",
              "skillUuid": [
                "string"
              ]
            }
          ],
          "userExperienceRequestDto": {
            "experienceRemarks": "string",
            "jobDuration": "string",
            "jobTypeUuid": "string",
            "reasonForLeavingJob": "string",
            "totalExperience": "string"
          },
          "userId": "YCW0000001"
        }
        )
  
        alert(response.data.message)
        setCurrentSteps("")
        
        
      } catch (error) {
        alert(error)
      }
    }

    

  return (
    <>
       <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
    <Box
        marginTop={5}
        sx={{

          padding: 3,
          bgcolor: "white",
          borderRadius: 3,
        }}
      >
        <SkillExpDetails
          primarySkill={primarySkill} setPrimarySkill={setPrimarySkill}
          secondarySkill={secondarySkill} setSecondarySkill={setSecondarySkill}
          tertiarySkill={tertiarySkill} setTertiarySkill={setTertiarySkill}
          skillRemarks={skillRemarks} setSkillRemarks={setSkillRemarks}
          vegNonveg={cookType} setVegNonveg={setCookType}
          cuisinesKnown={cuisinesKnown} setCuisinesKnown={setCuisinesKnown}
          primaryLanguage={primaryLanguage} setPrimaryLanguage={setPrimaryLanguage}
          otherLanguages={otherLanguages} setOtherLanguages={setOtherLanguages}
          totalExp={totalExp} setTotalExp={setTotalExp}
          experienceRemarks={experienceRemarks} setExperienceRemarks={setExperienceRemarks}
          lastJobType={lastJobType} setLastJobType={setLastJobType}
          lastJobDuration={lastJobDuration} setLastJobDuration={setLastJobDuration}
          ReasonLeaving={reasonLeaving} setReasonLeaving={setReasonLeaving}
        // values={values} setValue={setValue}
        />
          <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
              <Button variant='contained' onClick={(()=>{setCurrentSteps(2)})}>back</Button>
              <Button variant='contained' onClick={handleSubmit}>NEXT</Button>
              {/* (()=>{setCurrentSteps(4)}) */}
          </Box>
        
      </Box>

    </Box>
    </>
  )
}

export default SkillInformationData