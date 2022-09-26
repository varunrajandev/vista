import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
const StyleLi = styled("li")({
  listStyle: "none",
  fontSize: "20px",
  fontWeight: "600",
  color: "gray",
});
const ActiveStyleLi = styled("li")({
  listStyle: "none",
  fontSize: "20px",
  fontWeight: "600",
  color: "blue",
});

const DIV = styled("div")({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "20px",
});
const BOX = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "25px",
});

function YcwNav() {
  const { id } = useParams();

  const [userData, setUserData] = React.useState([]);
  const [userid, setuserId] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let ycwprofiledata = await fetch(
        `http://13.126.160.155:8080/user/worker/get/details/${id}`
      );
      let profiletadata = await ycwprofiledata.json();
      let useprofiledata = await profiletadata.data;
      setUserData(useprofiledata.userProfile);
      setuserId(userData.userId);
    };
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          mt: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ fontWeight: "800", fontSize: "25px" }}>{id}</p>
          <Typography
            sx={{
              width: "100px",
              padding: "9px",
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
              fontWeight: "900",
            }}
            style={{
              backgroundColor: "#DDF2F5",
              // ("ACTIVE" === "ACTIVE_AND_NOT_AVAILABLE" &&
              //   "#DDF2F5")
              //   ||
              // (userData === "ACTIVE_AND_AVAILABLE" &&
              //   "#f0edce") ||
              // (userData === "INACTIVE" && "#fcb1b8")
              color: "#60C3AD",
              //  ("ACTIVE" === "ACTIVE & AVAILABLE" && "green")
              //   // ||
              //   // (userData === "ACTIVE & NOT AVAILABLE" &&
              //   //   "#f7aa02") ||
              //   // (userData === "INACTIVE" && "red")
              //   ,
            }}
          >
            {"ACTIVE" || "NO DATA"}
          </Typography>
        </div>

        <Button
          sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
          variant="outlined"
        >
          <NavLink
            to={`/ycw`}
            style={{
              color: "#f52f50",
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            CLOSE
          </NavLink>
        </Button>
      </Box>

      {/*NavBar */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#edf4ff",
          padding: "20px",
          mt: "60px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
      >
        <BOX>
          <ActiveStyleLi>PROFILE</ActiveStyleLi>
          <StyleLi>JOBS</StyleLi>
          <StyleLi>LEDGER</StyleLi>
          <StyleLi>SUPPORT</StyleLi>
        </BOX>

        <Button
          sx={{
            bgcolor: "#FFB701",
            color: "white",
            border: "1px solid #FFB701",
            marginRight: "20px",
            letterSpacing: "3px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        
        >
          <NavLink
            to={`/ycw/add/${id}`}
            style={{
              color: "White",
              bgcolor: "#FFB701",
              fontWeight: 900,
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            EDIT PROFILE
          </NavLink>
        </Button>
      </Box>
    </>
  );
}

export default YcwNav;
