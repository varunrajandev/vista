import {
  Button,
  IconButton,
  // TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import LongMenu from "./LongMenu";
import styled from "@emotion/styled";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import Popup from "../Popup";
import { useState } from "react";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { addressProof, idProof } from "../../AlllData";

const BOX = styled(Box)({
  display: "flex",
  rowGap: "30px",
  flexWrap: "wrap",
  justifyContent: "space-between",
});

const StyleBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f4eeff",
  padding: "10px",
  boxSizing: "border-box",
  borderRadius: "5px",
  width: "22%",
});

const Div1 = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const Div2 = styled("div")({
  display: "flex",
  alignItems: "center",
});

function Document() {
  const [selectedFile, setSelectedFile] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  console.log("document", selectedFile)

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		// setIsSelected(true);
	};

  return (
    <Box marginTop={3}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h5>Document</h5>
        <div>
          <IconButton aria-label="delete">
            <AddIcon
              sx={{
                backgroundColor: "purple",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => {
                setOpenPopup(true);
              }}
            />
          </IconButton>
          <span style={{ fontSize: "13px", fontWeight: "bolder" }}>
            &nbsp; Add a new Document
          </span>
        </div>
      </Box>

      <BOX>
        <StyleBox>
          <Div1>
            <Div2>
              <TextSnippetOutlinedIcon />
              &nbsp;
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>
                WHATSAPP CONSENT FORM
              </p>
            </Div2>
            <LongMenu />
          </Div1>
          <Typography>
            <Button
              upload
              size="small"
              component="label"
              startIcon={<AttachFileOutlinedIcon />}
              sx={{ mt: 1 }}
              color="secondary"
            >
              Upload Document
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Typography>
        </StyleBox>

        <StyleBox>
          <Div1>
            <Div2>
              <TextSnippetOutlinedIcon />
              &nbsp;
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>
                COVID VACCINATION PROOF*
              </p>
            </Div2>
            <LongMenu />
          </Div1>
          <Typography>
            <Button
              upload
              size="small"
              component="label"
              startIcon={<AttachFileOutlinedIcon />}
              sx={{ mt: 1 }}
              color="secondary"
            >
              Upload Document
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Typography>
        </StyleBox>

        <StyleBox>
          <Div1>
            <Div2>
              <TextSnippetOutlinedIcon />
              &nbsp;
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>ID PROOF</p>
            </Div2>
            <LongMenu />
          </Div1>

          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "1px" }}
          >
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
              // onChange={(e) => {
              //   setCountry(e.target.value);
              // }}
              >
                {idProof.map((item) => (
                  <MenuItem value={item.source}>{item.source}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>

          <Typography>
            <Button
              upload
              size="small"
              component="label"
              startIcon={<AttachFileOutlinedIcon />}
              sx={{ mt: 1 }}
              color="secondary"
            >
              Upload Document
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Typography>
        </StyleBox>

        <StyleBox>
          <Div1>
            <Div2>
              <TextSnippetOutlinedIcon />
              &nbsp;
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>
                CURRENT ADDRESS PROOF*
              </p>
            </Div2>
            <LongMenu />
          </Div1>

          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "1px" }}
          >
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
              // onChange={(e) => {
              //   setCountry(e.target.value);
              // }}
              >
                {addressProof.map((item) => (
                  <MenuItem value={item.source}>{item.source}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>

          <Typography>
            <Button
              upload
              size="small"
              component="label"
              startIcon={<AttachFileOutlinedIcon />}
              sx={{ mt: 1 }}
              color="secondary"
            >
              Upload Document
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Typography>
        </StyleBox>

        <StyleBox>
          <Div1>
            <Div2>
              <TextSnippetOutlinedIcon />
              &nbsp;
              <p style={{ fontSize: "13px", fontWeight: "bolder" }}>
                PERMANENT ADDRESS PROOF
              </p>
            </Div2>
            <LongMenu />
          </Div1>

          <Typography
            sx={{ display: "flex", alignItems: "center", gap: "1px" }}
          >
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
              // onChange={(e) => {
              //   setCountry(e.target.value);
              // }}
              >
                {addressProof.map((item) => (
                  <MenuItem value={item.source}>{item.source}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>

          <Typography>
            <Button
              upload
              size="small"
              component="label"
              startIcon={<AttachFileOutlinedIcon />}
              sx={{ mt: 1 }}
              color="secondary"
            >
              Upload Document
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Typography>
        </StyleBox>
      </BOX>

      {/* Popup Form */}
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add a new Member"
      >
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItem: "center",
          }}
        >
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Document Type</InputLabel>
            <Select
              sx={{ width: "230px" }}
              labelId="demo-select-small"
              id="demo-select-small"
              label="Document Type"
            // onChange={(e) => {
            //   setCountry(e.target.value);
            // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"India"}>India</MenuItem>
            </Select>
          </FormControl>
          <input type="file" name="file" onChange={changeHandler}/>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "right", mt: 3, gap: 2 }}>
          <Button
            sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
            variant="outlined"
          >
            CLOSE
          </Button>

          <Button variant="contained" color="primary">
            ADD MEMBER
          </Button>
        </Box>
      </Popup>
    </Box>
  );
}

export default Document;
