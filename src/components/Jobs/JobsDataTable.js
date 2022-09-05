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

  useEffect(() => {

    async function FetchApi() {
      const selectCityDropdownApi = await fetch("http://13.126.160.155:8081/locationmaster/city/get/all")
      const statusDropdownApi = await fetch("http://13.126.160.155:8080/user/get/jobStatus");
      const localityApidata = await fetch(`http://13.126.160.155:8081/locationmaster/micromarket/get/all/${cxcityId}`);
      const jobDataApi = await fetch("http://13.126.160.155:8080/user/job/get/all/job?filter=jobId&pageNo=1&pageSize=30&sortby=asc")

      let CityDropdown = await selectCityDropdownApi.json()
      let statusDropdown = await statusDropdownApi.json();
      let jobdata = await jobDataApi.json();
      let LocalityDropdown = await localityApidata.json();

      let statusApi = await statusDropdown.data;
      let selectCity = await CityDropdown.data;
      let listjobData = await jobdata.data;
      let localitydata = await LocalityDropdown.data;

      setSelectCityDropdown(selectCity);
      setJobDatatable(listjobData.data);
      setStatusDropdownApi(statusApi);
      setJobLocality(localitydata || [{ names: "please Select City" }]);
    }
    FetchApi();

  }, [cxcityId]);

  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7}>
      {/* //Add  job  section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Jobs Master</Typography>
        <Link style={{ textDecoration: "none" }} to="/jobs/new">
          <Button variant="contained" color="success">
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
          options={selectCityDropdown}
          sx={{ width: 250 }}
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
          id="combo-box-demo"
          options={jobLocality}
          sx={{ width: 250 }}
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
          id="combo-box-demo"
          options={statusDropdownApi}
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
                  JOB ID
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  JOB TYPE
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  CUSTOMER ID
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  LOCATION
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  DURATION
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  BUDGET RANGE
                </TableCell>

                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  START DATE
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  HIGHEST ACTIVE STAGE
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="left"
                >
                  STATUS
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody component={Paper}>
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
                    {row.budgetRange}
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
                        padding: "5px",
                        borderRadius: "10px",
                        fontSize: "10px",
                        textAlign: "center",
                        fontWeight: "900",
                      }}
                      style={{
                        backgroundColor:
                          (row.jobStatus.key === "CREATED" && "#cef5ce") ||
                          (row.jobStatus.key === "IN PROGRESS" && "#f0edce") ||
                          (row.jobStatus.key === "INACTIVE" && "#fcb1b8"),
                        color:
                          (row.jobStatus.key === "ACTIVE" && "green") ||
                          (row.jobStatus.key === "IN PROGRESS" && "#f7aa02") ||
                          (row.jobStatus.key === "INACTIVE" && "red"),
                      }}
                    >
                      {row.jobStatus.key}
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
