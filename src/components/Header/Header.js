import React,{useContext} from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import styled from "@emotion/styled";
import image from "../../images/careCrew1.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { multiStepContext } from "../../ContextApi/StepContext";
import { useNavigate } from 'react-router-dom';
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
});

export default function Header(){
  const loginLocalStorageData=localStorage.getItem("ResponseName")
 const{loginData,setLoginData}=useContext(multiStepContext); 
 let LoginUserName=JSON.parse(loginLocalStorageData)
 let navigate=useNavigate();
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "white",
        color: "black",
        boxSizing: "border-box",
        padding: "0",
        margin: "0",
        minHeight: "60px",
      }}
    >
      <StyledToolbar >
        <img width={"120px"} src={image} alt="no img" />
        <StyledToolbar sx={{ width: "20%" }}>
          <StyledToolbar>
            <Avatar alt="Abhi" src="/static/images/avatar/1.jpg" />
            <h4 style={{ marginLeft: "2%" }}>
            {LoginUserName}<h6 style={{ "margin-top": "5px" }}>A R O</h6>
            </h4>
          </StyledToolbar>
          <PowerSettingsNewIcon
            sx={{
              background: "#faf7f5",
              padding: "20px",
              marginRight: "-40px !important",
              cursor:"pointer"
            }}
            onClick={()=>{
              localStorage.clear();
              navigate("/login");
            window.location.reload(false);
            }}
          />
        </StyledToolbar>
      </StyledToolbar>
    </AppBar>
  );
}
