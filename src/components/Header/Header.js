import React, { useContext } from "react";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import styled from "@emotion/styled";
import image from "../../images/careCrew1.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { multiStepContext } from "../../ContextApi/StepContext";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../../utils/storage.util";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
});

export default function Header() {
  const { loginData, setLoginData } = useContext(multiStepContext);
  let userResponse = getStorage("userToken");
  userResponse = JSON.parse(userResponse);
  const userTypeofLogin = userResponse?.userType ?? '';
  let LoginUserName = userResponse?.firstName ?? '';
  let LoginUserLastName = userResponse?.lastName ?? '';
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
              <h6 style={{ "marginTop": "5px" }}>{userTypeofLogin}</h6>
            </h4>
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
          {/* <PowerSettingsNewIcon
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
          /> */}
        </StyledToolbar>
      </StyledToolbar>
    </AppBar>
  );
}
