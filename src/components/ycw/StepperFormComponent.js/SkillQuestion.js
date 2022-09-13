import { Box, Button, TextField, Autocomplete, Checkbox } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { masterApi } from "../../../AlllData";
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { multiStepContext } from "../../../ContextApi/StepContext";
import SkillExpDetails from "../../form/SkillExpDetails";
import { Cuisines } from "../../../AlllData";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

let Data = ["a", "b", "c"]


const checkedIcon = <CheckBoxIcon fontSize="small" />
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

function SkillQuestion() {
    const [allQuestion, setAllQuestion] = useState([])
  const { currentSteps,setCurrentSteps,personalData,setAddressData} = useContext(multiStepContext);
  
  useEffect(() => {
     const fetchSkillData = async ()=>{
        let QuestionData = await fetch("http://13.126.160.155:8080/user/skill/get/all/question?userId=YCW0000025")
        let responseQuestion = await QuestionData.json();
        setAllQuestion(responseQuestion.data)
     }
     fetchSkillData()
  }, [])

  console.log(allQuestion)
  

  async function handleSubmit(props) {
    try {
      let response = await axios.post(masterApi + "/skill/save");

      alert(response.data.message);
      // setCurrentSteps("")
    } catch (error) {
      alert(error);
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
          <Box width={"100%"} sx={{display:"flex", rowGap:"40px", flexWrap:"wrap",  justifyContent:"space-between"}}>
            {allQuestion.map((item, index)=>(
                      <Box sx={{display:"grid", gap:"8px", width:"48%"}} key={index}>
                        <h5>{item.question}</h5>
                    <Box width={"100%"}> 
                      <Autocomplete
                        multiple
                        size="small"
                        id="checkboxes-tags-demo"    
                        options={item.questionOption}
                        disableCloseOnSelect
                        getOptionLabel={(option) => (option)}
                        // onChange={(event, newValue) => {
                        //   setData([...newValue]);
                        // }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              size="small"
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={selected}
                            />
                            {option}
                          </li>
                        )}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={item.skillNmae}
                            placeholder="Favorites"
                            size="small"
                          />
                        )}
                      />
                      </Box>
                    </Box>
            ))}
            </Box>
     
       
            {/* "skillUuid": "1cd8ed78-245a-4316-8d58`-dfd1c2f8111b",
"skillNmae": "Cooking",
"question": "Cooking Question 1",
"selectionType": "MULTI",
"questionOption": [
"A",
"B",
"C"
],
"questionType": "DROPDOWN",
"maindatory": true */}

            <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: "100px",
              justifyContent: "right",
              gap: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setCurrentSteps(2);
              }}
            >
              back
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              NEXT
            </Button>
            {/* (()=>{setCurrentSteps(4)}) */}
           
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SkillQuestion;
