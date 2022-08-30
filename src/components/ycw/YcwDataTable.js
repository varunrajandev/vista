import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { NavLink } from "react-router-dom";
import { FilterData } from "../../AlllData";
import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: "55px",
  display: "flex",
  border: "1px solid #c2c4c3",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.95),
  "&:hover": {
    border: "1px solid black",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

//table style
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  [`&.${tableRowClasses.body}`]: {
    fontSize: 1,
    borderRadius: 20,
  },
}));

function Right() {
const [tableData, setTableData] = React.useState([])

useEffect(() => {
  const fetchData= async()=>{
    let data = await fetch("http://13.126.160.155:8080/user/worker/get/all/worker?filter=firstName&pageNo=1&pageSize=30&sortby=asc")
    let res = await data.json();
    let newData = await res.data;
    setTableData(newData.data);
  }
  fetchData();
}, [])

 

return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Yellow Collar Workers (YCW)</Typography>
        <NavLink style={{ textDecoration: "none" }} to="/ycw/add">
          <Button variant="contained" color="success">
            ADD NEW YCW
          </Button>
        </NavLink>
      </Box>

      {tableData.map((item)=>{})<Box></Box>}

      {/* //add Filter and Search Section */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by name or phone number..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={FilterData}
          sx={{ width: "20%" }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Search YCW Work Type"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={FilterData}
          sx={{ width: "20%" }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select YCW Status"
            />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={FilterData}
          sx={{ width: "20%" }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select YCW City"
            />
          )}
        />
      </Box>

      {/* DataTableList */}
      <Box marginTop={5}>
        <TableContainer>
          <Table 
          sx={{ minWidth: "100%" }} 
          aria-label="simple table">
            <TableHead bgColor={"#e1e2e3"}>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "950", width:"7%" }}
                  align="left"
                >
                  YCW ID
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"12%" }}
                  align="left"
                >
                  NAME
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"15%" }}
                  align="left"
                >
                  PHONE#
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"7%" }}
                  align="left"
                >
                  GENDER
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"7%" }}
                  align="left"
                >
                  CITY
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"15%" }}
                  align="left"
                >
                  SKILLS
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"7%" }}
                  align="left"
                >
                  EXP.(YRS.)
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"8%" }}
                  align="left"
                >
                  WORK HOURS
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width:"5%" }}
                  align="left"
                >
                  #JOBS
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="center"
                >
                  STATUS
                </TableCell>
              </TableRow>
            </TableHead>

              

            <TableBody component={Paper}>
              {tableData.map((row) => (
                <StyledTableRow
                  key={row.userId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    zIndex: "999",
                  }}
                >
                  <TableCell
                    sx={{ fontSize: "13px" }}
                    component="th"
                    scope="row"
                    style={{
                      borderLeft:
                        (row.status === "ACTIVE & AVAILABLE" &&
                          "5px solid green") ||
                        (row.status === "ACTIVE & UNAVAILABLE" &&
                          "5px solid #f7aa02") ||
                        (row.status === "INACTIVE" && "5px solid red"),
                    }}
                  >
                    {row.userId || "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.name|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.mobileNo|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.gender|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.cityName|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.skill|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.totalExperience|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.workingHours|| "NO DATA"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.jobs|| "NO DATA"}
                  </TableCell>
                  <NavLink
                    to={`/ycw/add/dashboard/${row.userId}`}
                    style={{
                      textDecoration: "none",
                      display:"flex",
                      justifyContent:"center"
                      
                    }}
                  >
                    <TableCell align="left">
                      <Typography
                        sx={{
                          width:"150px",
                          padding: "5px",
                          borderRadius: "10px",
                          fontSize: "12px",
                          textAlign: "center",
                          fontWeight: "900",
                        }}
                        style={{
                          backgroundColor:
                            (row.profileStatus === "ACTIVE & AVAILABLE" &&
                              "#cef5ce") ||
                            (row.profileStatus === "ACTIVE & NOT AVAILABLE" &&
                              "#f0edce") ||
                            (row.profileStatus === "INACTIVE" && "#fcb1b8"),
                          color:
                            (row.profileStatus === "ACTIVE & AVAILABLE" && "green") ||
                            (row.profileStatus === "ACTIVE & NOT AVAILABLE" &&
                              "#f7aa02") ||
                            (row.profileStatus === "INACTIVE" && "red"),
                        }}
                      >
                        {row.profileStatus || "NO DATA"}
                      </Typography>
                    </TableCell>
                  </NavLink>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Right;
