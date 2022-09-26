import { Box, Button, TextField, Autocomplete, Checkbox } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { masterApi } from "../../../AlllData";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { multiStepContext } from "../../../ContextApi/StepContext";
import SkillExpDetails from "../../form/SkillExpDetails";
import { Cuisines } from "../../../AlllData";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useParams } from "react-router-dom";

let Array = [];




const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

function SkillQuestion() {

  const [allQuestion, setAllQuestion] = useState([])
  //const [storeQuestion, setStoreQuestion] = useState([])
  const [storeQuestion, setStoreQuestion] = useState([]);

  const {id} = useParams()
  let ids = localStorage.getItem('ID')

  const { currentSteps, setCurrentSteps, personalData, setAddressData } = useContext(multiStepContext);



  useEffect(() => {
    const fetchSkillData = async () => {
      let QuestionData = await fetch(`http://13.126.160.155:8080/user/skill/get/all/question?userId=${ids || id}`)
     
      let responseQuestion = await QuestionData.json();
      setAllQuestion(responseQuestion.data);
    };
    fetchSkillData();
  }, [id || ids]);

  console.log(ids)

  console.log(storeQuestion);

  console.log("all question is",allQuestion)

  async function handleSubmit() {
     try {
    let response = await axios.post("http://13.126.160.155:8080/user/skill/save/userResponse",{
      skillDto:storeQuestion,
      userId:ids || id
    });

       alert(response.data.message);
       setCurrentSteps(4)
     } catch (error) {
       alert(error);
     }
  }

  const handleChangeInput = (event, newValue, questions, uuid, index) => {
    
    const values = [...storeQuestion];
    values[index] = {
      "question": [
        {
          "answer": [
            ...newValue
          ],
          "question": questions
        }
      ],
      "skillUuid": uuid
    }

    setStoreQuestion(values);
  };

  return (
    <>
      <Box>
        <Box
          marginTop={5}
          sx={{
            padding: 3,
            bgcolor: "white",
            borderRadius: 3,
          }}
        >
          <Box
            width={"100%"}
            sx={{
              display: "flex",
              rowGap: "40px",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {allQuestion.map((item, index) => (
              <Box
                sx={{ display: "grid", gap: "8px", width: "48%" }}
                key={index}
              >
                <h5>{item.question}</h5>
                <Box width={"100%"}>
                  <Autocomplete
                    multiple
                    size="small"
                    id="checkboxes-tags-demo"
                    options={item.questionOption}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) =>
                      handleChangeInput(event, newValue, item.question, item.skillUuid, index)
                    }
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
              save
            </Button>
            {/* (()=>{setCurrentSteps(4)}) */}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SkillQuestion;
