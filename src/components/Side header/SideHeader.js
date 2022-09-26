import styled from "@emotion/styled";
import { Person } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

const DIV = styled("div")({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "20px",
  
});

const SideHeader = () => {

  const handleClick = ()=>{
    localStorage.removeItem("ID")
  }

  return (
    <Box
      position="sticky"
      flex={0.2}
      p={2}
      sx={{ boxShadow: "4px 0px 5px 0px rgba(143,137,143,1)", minHeight:"1000px", minWidth:"50px", }}
      
    >
      <Box position="fixed" sx={{ marginTop: "20px", marginRight:"20px" }}>
        <DIV onClick={handleClick}>
          <NavLink
            to="/ycw"
            style={({ isActive }) => {
              return { borderLeft: isActive ? "5px solid green" : "5px solid white", textDecoration: 'none', color:"black", width:"40px" };
              
            }}
          >
            {" "}
            <PeopleAltRoundedIcon/>
            <p>YCW</p>
          </NavLink>
        </DIV>
        <DIV>
          <NavLink
            to="/cx"
            style={({ isActive }) => {
              return { borderLeft: isActive ? "5px solid green" : "5px solid white", textDecoration: 'none', color:"black", width:"40px" };
            }}
          >
            {" "}
            <Person />
            <p>CX</p>
          </NavLink>
        </DIV>

        <DIV>
          <NavLink
            to="/jobs"
            style={({ isActive }) => {
              return { borderLeft: isActive ? "5px solid green" : "5px solid white", textDecoration: 'none', color:"black", width:"40px" };
            }}
          >
            {" "}
            <WorkIcon />
            <p>jobs</p>
          </NavLink>
        </DIV>
      </Box>
    </Box>
  );
};

export default SideHeader;
