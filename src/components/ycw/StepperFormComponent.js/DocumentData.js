import {
  Button, Box, Typography, InputLabel, FormControl, Select, MenuItem, gridClasses,
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
import { useParams } from "react-router-dom";
import Notify from "../../Notification/Notify";


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
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" })

  const ids = localStorage.getItem('ID')
  const { id } = useParams()

  const { setCurrentSteps, personalData, setDocumentData, documentData } = useContext(multiStepContext);

  async function fetchDorpDown() {
    let documentType = await fetch(`http://13.126.160.155:8080/user/drop-down/get/documentUploadType?flag`)
    let KycType = await fetch("http://13.126.160.155:8080/user/drop-down/get/documentContext")
    let responseType = await documentType.json();
    let responseKycType = await KycType.json();
    setDocumnetTypeDD(responseType.data)
    setKycTypeDD(responseKycType.data)
  }

  const documentGetByID = async () => {
    const documentData = await fetch(`http://13.126.160.155:8080/user/document/all/${ids || id}`);
    const responseDocument = await documentData.json();
    setStoreDocument(responseDocument.data)
  }
  useEffect(() => {
    documentGetByID()
    fetchDorpDown()
  }, [ids, id])

  console.log(storeDocument)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const formData = new FormData();
  formData.append("document", selectedFile);

  const handleSubmission = async () => {
    try {
      let response = await axios.post(masterApi + `/document/upload?UserId=${ids || id}&documentContext=${kycDocument}&documentSide=FRONT&documentType=${document}&isActive=true&isReuploaded=false`,
        formData
      );
      setNotify(
        {isOpen:response.data.status,
         message:response.data.message,
         type:"success"}
        )
      // setDocumentData(response.data)
    }
    catch (error) {
      setNotify(
        {
          isOpen: true,
          message: "Error",
          type: "error"
        }
      )
    }
  };
  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} minWidth={"90%"}>
    <Notify 
    notify={notify}
    setNotify={setNotify}
  />
      <Box marginTop={5} sx={{ padding: 3, bgcolor: "white", borderRadius: 3, }} >
        <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: "30px", justifyContent: "space-between" }}>
          {/* First Document */}
          <Box sx={{ width: "27%", display: "grid", backgroundColor: "#e7c6f0", padding: "30px", boxSizing: "boderBox" }} >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>  PROFILE PICTURE </p>
            </Div2>
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <Typography>
                <Button upload component="label" startIcon={<AttachFileOutlinedIcon />} color="secondary">
                  Upload Document
                  <input hidden type="file" name="file" />
                </Button>
              </Typography>
              {/* <h5>{isFilePicked && selectedFile.name}</h5> */}
            </Box>
          </Box>

          {/* second Document */}
          <Box sx={{ width: "27%", display: "grid", gap: "20px", backgroundColor: "#e7c6f0", padding: "30px", boxSizing: "boderBox" }} >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>  AADHAAR CARD </p>
            </Div2>
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <Typography>
                <Button upload component="label" startIcon={<AttachFileOutlinedIcon />} color="secondary">
                  Upload Document
                  <input hidden type="file" name="file" />
                </Button>
              </Typography>
              {/* <h5>{isFilePicked && selectedFile.name}</h5> */}
            </Box>
          </Box>

          {/* third Document */}
          <Box sx={{ width: "27%", display: "grid", gap: "20px", backgroundColor: "#e7c6f0", padding: "30px", boxSizing: "boderBox" }} >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}> ADDRESS PROOF </p>
            </Div2>
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <Typography>
                <Button upload component="label" startIcon={<AttachFileOutlinedIcon />} color="secondary">
                  Upload Document
                  <input hidden type="file" name="file" />
                </Button>
              </Typography>
              {/* <h5>{isFilePicked && selectedFile.name}</h5> */}
            </Box>
          </Box>

          {/* Last Document */}

          <Box sx={{ width: "27%", display: "grid", gap: "20px", backgroundColor: "#e7c6f0", padding: "30px", boxSizing: "boderBox" }} >
            <Div2>
              <TextSnippetOutlinedIcon />
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>  DOCUMENT UPLOAD </p>
            </Div2>
            <Typography sx={{ display: "flex", alignItems: "center", gap: "1px" }} >
              <BookmarkBorderRoundedIcon />
              <FormControlSingleSelect
                labelData="KYC Type"
                dataDD={kycTypeDD}
                setData={setKycDocument}
                variantData="standard"
                size="80%"
                mtop={-2}
              />
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center", gap: "1px" }} >
              <BookmarkBorderRoundedIcon />
              <FormControlSingleSelect
                labelData="Document Type"
                dataDD={documnetTypeDD}
                setData={setDocument}
                variantData="standard"
                size="80%"
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
                  <input hidden type="file" name="file" onChange={changeHandler} />
                </Button>
              </Typography>
              <h5>{isFilePicked && selectedFile.name}</h5>
            </Box>
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
          <Button variant="contained" onClick={() => { setCurrentSteps(4) }} > back </Button>
          <Button variant="contained" onClick={handleSubmission}> save </Button>
          <Button variant="contained" onClick={() => { setCurrentSteps(6) }} > next </Button>
        </Box>
      </Box>

      
      <Box marginTop={5} sx={{ padding: 3, bgcolor: "white", borderRadius: 3, }} >
      <Box mt={2} sx={{display:"flex", gap:"10px"}}>
        {storeDocument.map((item)=>(
               <a href={item.fileUrl} target="blank" download>
          <img width={"20%"} src={item.fileUrl} alt="noImg" />
          </a>
        ))}
      </Box>
      </Box>


    </Box>
  );
}

export default DocumentData;
