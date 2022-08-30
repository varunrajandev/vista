import React from "react";
import { Box } from "@mui/system";
import YcwNav from "../../../components/Details/YcwDetails/YcwNav";
import AppsIcon from "@mui/icons-material/Apps";
import styled from "@emotion/styled";
import Status from "../../../components/Details/JOBS/JobBoard/Status";
import Description from "../../../components/Details/JOBS/JobBoard/Description";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BasicInfo from "../../../components/Details/JOBS/Information/BasicInfo";
import JobTimeline from "../../../components/Details/JOBS/Information/JobTimeline";
import Ledger from "../../../components/Details/JOBS/Information/Ledger";
import JobSummary from "../../../components/Details/JOBS/Information/JobSummary";

const BOX = styled(Box)({
  display: "flex",
  alignItemns: "center",
  boxSizing: "border-box",
});

const SPAN = styled("span")({
});

const DIV = styled("div")({
  flexBasis: "19%",
});

function BasicInformation() {
  const { id } = useParams();
  return (
    <Box bgcolor="#fafbfb" flex={7}>
      <YcwNav />
      <Box sx={{ mt: "10px", padding: "10px 20px 10px 20px" }}>
        <BOX sx={{ gap: "10px" }}>
          <SPAN>
            <ArrowBackIcon />
          </SPAN>
          <SPAN>{id}</SPAN>
          <SPAN>Active</SPAN>
        </BOX>

        <Box mt={4}>
          <h4>Basic Information</h4>
          <Box mt={1}>
            <BasicInfo/>
          </Box>
        </Box>

        <Box mt={4}>
          <h4>Basic Information</h4>
          <Box mt={1}>
           <JobTimeline/>
          </Box>
        </Box>

     <Box sx={{display:"flex" , justifyContent:"space-between"}}>
        <Box mt={4}>
          <h4>Job Summary</h4>
          <Box mt={1}>
           <JobSummary/>
          </Box>
        </Box>

      <Box>
        <Box mt={4} sx={{display:"flex",marginTop: "2rem", justifyContent:"space-between"}}>
          <h4>Ledger</h4>
          <h5 style={{color:"red"}}>
      Totle Outstanding : &#x20b9; 40000
      </h5>
      </Box>
          <Box mt={1}>
           <Ledger/>
          </Box>
        </Box>
      </Box>
      </Box> 
    </Box>
  );
}

export default BasicInformation;
