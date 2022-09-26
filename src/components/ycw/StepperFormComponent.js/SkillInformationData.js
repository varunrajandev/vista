import { Box, Button } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { masterApi } from '../../../AlllData';
import { multiStepContext } from '../../../ContextApi/StepContext';
import SkillExpDetails from '../../form/SkillExpDetails'
import SkillQuestion from './SkillQuestion';

function SkillInformationData() {
    //Skill and Experience Deatails
    const [primarySkill, setPrimarySkill] = React.useState("");
    const [secondarySkill, setSecondarySkill] = React.useState([]);
    const [tertiarySkill, setTertiarySkill] = React.useState([]);
    const [skillRemarks, setSkillRemarks] = React.useState("");
    const [primaryLanguage, setPrimaryLanguage] = React.useState("");
    const [otherLanguages, setOtherLanguages] = React.useState([]);
    const [status, setStatus] = useState()

    
    const {id} = useParams()
    let SecondarySkillArray =[];
    let TertiarySkillArray = [];
    let otherLanguageArray = []
    let ids = localStorage.getItem('ID')
   
    if(secondarySkill){
      secondarySkill.map((item)=>{
          SecondarySkillArray.push(item.uuid)
      })
    }

    if(TertiarySkillArray){
      tertiarySkill.map((item)=>{
        TertiarySkillArray.push(item.uuid)
      })
    }

       if(otherLanguages){
        otherLanguages.map((item)=>{
          otherLanguageArray.push(item.key)
      })
    }

    useEffect(() => {
      const allSkillFetchById = async() =>{
        let allSkillData = await fetch(`http://13.126.160.155:8080/user/skill/${ids || id}`)
        let responseAllSkill = await allSkillData.json();
        setStatus(responseAllSkill.status)
        console.log(responseAllSkill)
        
        setPrimaryLanguage(responseAllSkill.data.primaryLanguage)
        setOtherLanguages(responseAllSkill.data.otherLanguage)
        setSkillRemarks(responseAllSkill.data.skillRemarks)
        setPrimarySkill(responseAllSkill.data.skillsMappingDto[2].skillDto[0].skillUuid)
        //secondarySkill(responseAllSkill.data.skillsMappingDto[0].skillDto)
    
    
        setSecondarySkill(responseAllSkill.data.skillsMappingDto[0].skillDto)
       
        
      }
      allSkillFetchById()
    }, [ids, id])
    

    const {currentSteps, setCurrentSteps, personalData, setAddressData, skillData, setSkillData} = useContext(multiStepContext)
    

    async function handleSubmit(){
    
      try {
        let response = await axios.post(masterApi+"/skill/save",
        {
          "otherLanguage":otherLanguageArray,
          "primaryLanguage": primaryLanguage,
          "skillRemarks": skillRemarks,
          "skillRequestDtos": [
            {
              "skillLevel": "PRIMARY",
              "skillUuid": [primarySkill]
            },
            {
              "skillLevel": "SECONDARY",
              "skillUuid": SecondarySkillArray
            },
            {
              "skillLevel": "TERTIARY",
              "skillUuid": TertiarySkillArray
            }
          ],
          "userId": ids || id
        })
  
        alert(response.data.message)
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
          primaryLanguage={primaryLanguage} setPrimaryLanguage={setPrimaryLanguage}
          otherLanguages={otherLanguages} setOtherLanguages={setOtherLanguages}
          // values={values} setValue={setValue}
        />
       

          <Box sx={{display:"flex", alignItems:"end", height:"100px", justifyContent:"right", gap:"20px"}}>
              <Button variant='contained' onClick={handleSubmit}>save</Button>
              {/* (()=>{setCurrentSteps(4)}) */}
          </Box>
        
      </Box>

       <Box sx={{display:(status?"block":"none")}}><SkillQuestion/></Box> 

    </Box>
    </>
  )
}

export default SkillInformationData