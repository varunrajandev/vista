import {
  Button, Box, Typography, InputLabel,FormControl,Select,MenuItem, gridClasses,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { addressProof, masterApi } from "../../../AlllData";
import { multiStepContext } from "../../../ContextApi/StepContext";
import FormControlSingleSelect from "../../MuiComponents/FormControlSingleSelect";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import styled from "@emotion/styled";

const Div2 = styled("div")({
  display: "flex",
  alignItems: "center",
});

function DocumentData() {
  const [selectedFile, setSelectedFile] = useState();
  const [document, setDocument] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  console.log(selectedFile);

  const { setCurrentSteps, personalData } = useContext(multiStepContext);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const formData = new FormData();

  formData.append("document", selectedFile);
  console.log(formData.name);

  const handleSubmission = async () => {
    try {
      let response = await axios.post(
        masterApi +
          `/document/upload?UserId=${personalData.data.userId}&documentContext=KYC&documentSide=FRONT&documentType=PASSPORT&isActive=true&isReuploaded=false`,
        formData
      );
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
      <Box marginTop={5} sx={{ padding: 3, bgcolor: "white", borderRadius: 3, }} >
        <Box sx={{width: "300px", display:"grid", gap: "20px", backgroundColor: "#e7c6f7", padding: "30px", }} >
        <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>  DOCUMENT UPLOAD </p>
        </Div2>
          <Typography sx={{ display: "flex", alignItems: "center", gap: "1px"}} >
            <BookmarkBorderRoundedIcon />
            <FormControl
              sx={{ minWidth: "80%", mt: -2 }}
              size="small"
              variant="standard"
            >
              <InputLabel id="demo-select-small">Document Type</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                label="Document Type"
                onChange={(e) => {
                  setDocument(e.target.value);
                }}
              >
                {addressProof.map((item) => (
                  <MenuItem value={item.source}>{item.source}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>

          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <Typography>
            <Button
              upload
              component="label"
              startIcon={<AttachFileOutlinedIcon />} 
              color="secondary"
            >
              Upload Document
              <input hidden type="file" name="file" onChange={changeHandler}/>
            </Button>
          </Typography>
            <h5>{isFilePicked && selectedFile.name}</h5>
          </Box>
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
          <Button variant="contained" onClick={handleSubmission}>
            Done
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default DocumentData;
