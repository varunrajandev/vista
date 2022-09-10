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
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

function JobsDataTable() {
  const [jobDatatable, setJobDatatable] = useState([]);
  const [selectCityDropdown, setSelectCityDropdown] = useState([]);
  const [statusDropdownApi, setStatusDropdownApi] = useState([]);
  const [jobLocality, setJobLocality] = useState([]);
  const [cxcityId, setCXCityId] = useState("");
  const [jobsOrder,setJobsOrder]=React.useState("asc");
  const [statusjobs, setStatusJobs] = React.useState("");
   const [searchItem, setSearchItem] = React.useState("");
  const [searchDD, setSearchDD] = React.useState([]);

  useEffect(() => {
    async function FetchApi() {
      const selectCityDropdownApi = await fetch(
        "http://13.126.160.155:8081/locationmaster/city/get/all"
      );
      const statusDropdownApi = await fetch(
        "http://13.126.160.155:8080/user/get/jobStatus"
      );
      const localityApidata = await fetch(
        "http://13.126.160.155:8081/locationmaster/internal/micromarkets/all"

        // `http://13.126.160.155:8081/locationmaster/micromarket/get/all/${cxcityId}`
      );
      const jobDataApi = await fetch(
        `http://13.126.160.155:8080/user/job/get/all/job?filter=jobId&pageNo=1&pageSize=30&sortby=${jobsOrder}&status=${statusjobs}`
      );
      let searchData = await fetch(
        `http://13.126.160.155:8080/user/worker/search/user?searchTerm=${searchItem}`
      );
      let CityDropdown = await selectCityDropdownApi.json();
      let statusDropdown = await statusDropdownApi.json();
      let jobdata = await jobDataApi.json();
      let LocalityDropdown = await localityApidata.json();
      let responseSearch = await searchData.json();
      let statusApi = await statusDropdown.data;
      let selectCity = await CityDropdown.data;
      let listjobData = await jobdata.data;
      let localitydata = await LocalityDropdown.data;
      setSearchDD(responseSearch.data || [{ name: "No Data" }]);
      setSelectCityDropdown(selectCity);
      setJobDatatable(listjobData.data);
      setStatusDropdownApi(statusApi);
      setJobLocality(localitydata || [{ names: "please Select City" }]);
    }
    FetchApi();
  }, [jobsOrder,statusjobs,searchItem]);

  function handleSort() {
    jobsOrder === "asc" ? setJobsOrder("desc") : setJobsOrder("asc")
    console.log("hiii",jobsOrder);
  }

  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} sx={{paddingLeft:"30px"}}>
      {/* //Add  job  section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5"  sx={{fontWeight:"900", paddingTop:"20px"}}>Jobs Master</Typography>
        <Link style={{ textDecoration: "none" }} to="/jobs/new">
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: "#0A9475" }}
          >
            ADD NEW JOB REQUEST
          </Button>
        </Link>
      </Box>

      {/* //add Filter and Search Section */}
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by name or phone number..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}

        <Autocomplete
          sx={{ width: "28%", backgroundColor: "white" }}
          freeSolo
          size="small"
          id="free-solo-2-demo"
          // value={searchDD}
          // onChange={(event, newValue) => {
          //   setYcwSearchUserId(newValue.userId);
          // }}
          disableClearable
          options={searchDD}
          renderInput={(params) => (
            <TextField
              placeholder="Search by name or phone number..."
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
              {...params}
              label="Search by name or phone number..."
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          getOptionLabel={(item) => `${item.name}`}
        />


        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={selectCityDropdown}
          sx={{ width: 260 }}
          value={cxcityId.id}
          onChange={(event, newValue) => {
            setCXCityId(newValue.id);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select City"
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />
        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={jobLocality}
          sx={{ width: 260 }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select Locality"
            />
          )}
          getOptionLabel={(item) => `${item.microMarketName} `}
        />
        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={statusDropdownApi}
          onChange={(event, newValue) => {
            setStatusJobs(newValue.key);
          }}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select Highest Active Stage"
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />
      </Box>

      {/* DataTableList */}
      <Box marginTop={5}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead bgColor={"#e1e2e3"}>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "950" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      JOB ID
                    </Box>
                    <Box
                      onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>JOB TYPE</Box>
                    <Box
                      onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-16px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>CUSTOMER ID</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>LOCATION</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>DURATION</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>BUDGET RANGE</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>

                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>START DATE</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>HIGHEST ACTIVE STAGE</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>STATUS</Box>
                    <Box
                     onClick={handleSort}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor:"pointer"
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody component={Paper} >
              {jobDatatable.map((row) => (
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
                        (row.status === "ACTIVE" && "5px solid green") ||
                        (row.status === "IN PROGRESS" && "5px solid #f7aa02") ||
                        (row.status === "INACTIVE" && "5px solid red"),
                    }}
                  >
                    {row.jobId}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.jobType.value}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.userId}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.location}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.workingHours}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                  &#x20b9; {row.budgetRange}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.startDate}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {row.jobCurrentStatus.value}
                  </TableCell>

                  <TableCell sx={{ fontSize: "8px" }} align="left">
                    <Typography
                      sx={{
                        padding: "8px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        textAlign: "center",
                        fontWeight: "900",
                        cursor:"pointer"
                      }}
                      style={{
                        backgroundColor:
                          (row.jobStatus.value === "CREATED" && "#E6F4F1") ||
                          (row.jobStatus.value === "IN PROGRESS" &&
                            "#FFF7E5") ||
                          (row.jobStatus.value === "IN ACTIVE" && "#FEEFF0"),
                        color:
                          (row.jobStatus.value === "CREATED" && "#0A9475") ||
                          (row.jobStatus.value === "IN PROGRESS" &&
                            "#FFB701") ||
                          (row.jobStatus.value === "IN ACTIVE" && "#F55F71"),
                      }}
                    >
                      {row.jobStatus.value}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default JobsDataTable;
