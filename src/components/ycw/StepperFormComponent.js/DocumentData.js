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
  const [kycDocument, setKycDocument] = useState("")
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [documnetTypeDD, setDocumnetTypeDD] = useState([]);
  const [kycTypeDD, setKycTypeDD] = useState([]);
  const [storeDocument, setStoreDocument] = useState([])

  const ids = localStorage.getItem('ID')

  const { setCurrentSteps, personalData, setDocumentData, documentData } = useContext(multiStepContext);

  async function fetchDorpDown(){
    let documentType = await fetch(`http://13.126.160.155:8080/user/drop-down/get/documentUploadType?flag`)
    let KycType = await fetch("http://13.126.160.155:8080/user/drop-down/get/documentContext")
    let responseType = await documentType.json();
    let responseKycType = await KycType.json();
    setDocumnetTypeDD(responseType.data)
    setKycTypeDD(responseKycType.data)
  }

  const documentGetByID = async () =>{
    const documentData = await fetch(`http://13.126.160.155:8080/user/document/all/${ids}`);
    const responseDocument = await documentData.json();
    setStoreDocument(responseDocument.data)
  } 
  useEffect(() => {
    documentGetByID()
    fetchDorpDown()
  }, [ids])
  
console.log(storeDocument)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const formData = new FormData();
  formData.append("document", selectedFile);

  const handleSubmission = async () => {
    try {
      let response = await axios.post(
        masterApi +
          `/document/upload?UserId=${ids}&documentContext=${kycDocument}&documentSide=FRONT&documentType=${document}&isActive=true&isReuploaded=false`,
        formData
      );
      alert(response.data.message);
      setDocumentData(response.data)
      setCurrentSteps(7)
    } 
        catch (error) {
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
            <FormControlSingleSelect
            labelData="KYC Type"
            dataDD = {kycTypeDD}
            setData = {setKycDocument}
            variantData = "standard"
            size = "80%"
            mtop={-2}
            />
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center", gap: "1px"}} >
            <BookmarkBorderRoundedIcon />
            <FormControlSingleSelect
            labelData="Document Type"
            dataDD = {documnetTypeDD}
            setData = {setDocument}
            variantData = "standard"
            size = "80%"
            mtop={-2}
            />
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
          <Button variant="contained" onClick={() => { setCurrentSteps(5)}} > back </Button>
          <Button variant="contained" onClick={handleSubmission}> Done </Button>
        </Box>
      </Box>
      
      <Box>
        {storeDocument.map((item)=>(
          <img src="kyc-documents/YCW0000002/1663770301148-2345244.jpg" alt="noImg" />
          //https://pinch-documents.s3.ap-south-1.amazonaws.com/kyc-documents/YCW0000002/1663771775289-Screenshot_%28134%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220921T144935Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIARAGLMVYHAWFDXLSD%2F20220921%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=3f3eb01903be2fc33186fe2ef5d7e2c5c0b74fa3a1fe560b921186e7823544ae
        ))}
      </Box>

    </Box>
  );
}

export default DocumentData;
