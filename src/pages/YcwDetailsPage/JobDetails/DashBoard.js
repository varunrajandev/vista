import React from "react";
import { Box } from "@mui/system";
import YcwNav from "../../../components/Details/YcwDetails/YcwNav";
import AppsIcon from "@mui/icons-material/Apps";
import styled from "@emotion/styled";
import Status from "../../../components/Details/JOBS/JobBoard/Status";
import Description from "../../../components/Details/JOBS/JobBoard/Description";


const BOX = styled(Box)({
  display: "flex",
});

const P = styled("p")({
  fontSize: "1.1rem",
  fontWeight: "900",
  color: " #7A7D7E",
});

const DIV = styled("div")({
  flexBasis: "19%",
  padding:0,
  margin:0
});

function DashBoard() {
  // const { id } = useParams();
  return ( <>
    <Box bgcolor="#fafbfb" flex={7}>
      <YcwNav />
      <BOX
        sx={{
          justifyContent: "space-between",
          padding: "10px 20px 10px 20px",
          mt: "10px",
        }}
      >
        <BOX style={{ gap: "3px", alignItems: "center", }}>
          <AppsIcon />
          <P style={{ color: "black" }}>JOBS BOARD</P>
        </BOX>
        <BOX sx={{ gap: "30px", alignItems: "center",  }}>
          <P>Filter</P>
          <P>Sort</P>
        </BOX>
      </BOX>
      <Box sx={{ width: "97%", margin: "auto" }}>
        <hr />
        <BOX mt={2} sx={{ justifyContent: "space-between"}}>
          <DIV>
            <Status color={"#dcedc1"} title="ACTIVE JOBS(1)" />
            <div style={{marginTop:"-5px"}}><Description /></div>
          </DIV>
          <DIV>
            <Status color={"#aed8ea"} title="IN PROGRESS (3)" />
            <div style={{marginTop:"-5px"}}><Description /></div>
            <div style={{marginTop:"-15px"}}><Description /></div>
            <div style={{marginTop:"-15px"}}><Description /></div>
          </DIV>
          <DIV>
            <Status color={"#f7e2b0"} title="OPEN TO APPLY (1)" />
            <div style={{marginTop:"-5px"}}><Description /></div>
          </DIV>
          <DIV>
            <Status color={"#e5dbd9"} title="PAST JOBS (1)" />
            <div style={{marginTop:"-5px"}}><Description /></div>
          </DIV>
          <DIV>
            <Status color={"#f3cbbd"} title="REJECTED JOBS (1)" />
            <div style={{marginTop:"-5px"}}><Description /></div>
          </DIV>
        </BOX>
      </Box>
    </Box>
    
    </>
  );
}

export default DashBoard;
