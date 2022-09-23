import React, { useContext } from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import styled from "@emotion/styled";
import image from "../../images/careCrew1.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { multiStepContext } from "../../ContextApi/StepContext";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
});

export default function Header() {
  const loginLocalStorageData = localStorage.getItem("ResponseName");
  const loginLocalStorageDataLastName = localStorage.getItem("ResponseLastName");
  const { loginData, setLoginData } = useContext(multiStepContext);
  const loginLocalStorageUserType = localStorage.getItem("ResponseUserType");
  const userTypeofLogin = JSON.parse(loginLocalStorageUserType);
  let LoginUserName = JSON.parse(loginLocalStorageData);
  let LoginUserLastName = JSON.parse(loginLocalStorageDataLastName);
  let navigate = useNavigate();
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
      <StyledToolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img width={"120px"} src={image} alt="no img" />
        <StyledToolbar>
          <StyledToolbar sx={{ gap: "10px" }}>
            <Avatar alt={LoginUserName} src="/static/images/avatar/1.jpg" />
            <h4>
              {LoginUserName} {LoginUserLastName}
              <h6 style={{ "margin-top": "5px" }}>{userTypeofLogin}</h6>
            </h4>
          </StyledToolbar>
          <PowerSettingsNewIcon
            sx={{
              background: "#faf7f5",
              padding: "20px",
              marginRight: "-20px !important",
              cursor: "pointer",
            }}
            onClick={() => {
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
