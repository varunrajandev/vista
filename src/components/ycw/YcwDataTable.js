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
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


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
  const [tableData, setTableData] = React.useState([]);
  const [jobTypeApi, setJobTypeApi] = React.useState([]);
  const [ycwStatus, setYcwStatus] = React.useState([]);
  const [worktype, setWorkType] = React.useState("");
  const [statusycw, setStatusycw] = React.useState("");
  const [ycwidorder, setycwIdOrder] = React.useState("asc");
  const [ycwCity, setYcwCity] = React.useState("");
  const [searchItem, setSearchItem] = React.useState("");
  const [searchDD, setSearchDD] = React.useState([]);
  const [cityDD, setCityDD] = React.useState([]);
  const [ycwSearchUserId, setYcwSearchUserId] = React.useState("");
  const [SearchByName, setSearchByName] = React.useState("");
  const [filterName, setFilterName] = React.useState("userId");


  useEffect(() => {
    const fetchData = async () => {
      let jobType = await fetch(
        "http://13.126.160.155:8080/user/skill/get/skills"
      );
      let data = await fetch(

        `http://13.126.160.155:8080/user/worker/get/all/worker?city=${ycwCity}&filter=${filterName}&pageNo=1&pageSize=30&skills=${worktype}&sortby=${ycwidorder}&status=${statusycw}`
      );
      let ycwStatusApidrop = await fetch(
        // "http://13.126.160.155:8081/locationmaster/city/get/all"
        "http://13.126.160.155:8080/user/drop-down/get/profileStatus?flag=all"
      );
      let searchData = await fetch(
        `http://13.126.160.155:8080/user/worker/search/user?searchTerm=${searchItem}`
      );
      let ycwCityDD = await fetch(
        "http://13.126.160.155:8081/locationmaster/city/get/all"
      );

      let jobtypeApi = await jobType.json();
      let res = await data.json();
      let StatusApi = await ycwStatusApidrop.json();
      let responseSearch = await searchData.json();
      let cityDD = await ycwCityDD.json();

      let newData = await res.data;
      let JobTypeApi = await jobtypeApi.data;
      let ycwStatusApi = await StatusApi.data;
      let cityDropDown = await cityDD.data;
      let responseSearchData = await responseSearch.data;

      setSearchDD(responseSearchData || [{ name: "No Data" }]);
      setJobTypeApi(JobTypeApi);
      setYcwStatus(ycwStatusApi);
      setCityDD(cityDropDown);
      setTableData(newData.data);
    };

    fetchData();

  }, [ycwidorder, worktype, statusycw, ycwCity, searchItem]);

  //  console.log("searchItem",searchItem)
  function handleSort() {
    ycwidorder === "asc" ? setycwIdOrder("desc") : setycwIdOrder("asc");
  }



  return (
    <Box bgcolor="#e1e2e3" padding="20px" flex={7} sx={{ paddingLeft: "30px" }}>
      {/* //Add Ycw Section section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: "900", paddingTop: "20px" }}>Yellow Collar Workers (YCW)</Typography>
        <NavLink style={{ textDecoration: "none" }} to="/ycw/add">
          <Button
            variant="contained"
            color="success"
            sx={{ backgroundColor: "#0A9475", marginTop: "10px" }}
          >
            ADD NEW YCW
          </Button>
        </NavLink>
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


        <Autocomplete
          sx={{ width: "25%", backgroundColor: "white" }}
          freeSolo
          id="free-solo-2-demo"
          //  value={searchDD}
          onChange={(event, newValue) => {
            setYcwSearchUserId(newValue.userId);
          }}
          disableClearable
          size="small"
          options={searchDD}
          renderInput={(params) => (
            <Box sx={{ display: "flex" }}>

              {/* <SearchIcon /> */}

              <TextField

                placeholder="Search by name or phone number..."
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
                {...params}
                // label="Search by name"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            </Box>
          )}
          getOptionLabel={(item) => `${item.name}`}
        />
        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={jobTypeApi}
          sx={{ width: "20%" }}
          onChange={(event, newValue) => {
            setWorkType(newValue.uuid);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Search YCW Work Type"
            />
          )}
          getOptionLabel={(item) => `${item.name}`}
        />

        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={ycwStatus}
          onChange={(event, newValue) => {
            setStatusycw(newValue.key);
          }}
          sx={{ width: "20%" }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select YCW Status"
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />

        <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={cityDD}
          sx={{ width: "20%" }}
          onChange={(event, newValue) => {
            setYcwCity(newValue.uuid);
          }}
          renderInput={(params) => (
            <TextField
              sx={{ bgcolor: "white", borderRadius: "5px" }}
              {...params}
              label="Select YCW City"
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />

      </Box>

      {/* DataTableList */}
      <Box marginTop={5}>
        <h4> All YCWS ({tableData.length})</h4>
        <TableContainer >
          <Table sx={{ minWidth: "100%", marginTop: "10px" }} aria-label="simple table">
            <TableHead bgColor={"#e1e2e3"}>
              <TableRow>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "950", width: "10%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>YCW ID</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("userId") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "13%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>NAME</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("firstName") } }}
                      //  onClick={()=>ordersort("name")}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-16px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "10%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>PHONE#</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("mobileNo") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "5%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>GENDER</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("gender") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "5%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>CITY</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("cityName") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "18%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1.5px" }}>SKILLS</Box>
                    <Box
                      onClick={() => { handleSort(); }}
                      // { setFilterName("profileStatus") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "10%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>EXP.(YRS.)</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("totalExperience") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "12%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>WORK HOURS</Box>
                    <Box
                      onClick={() => { handleSort(); }}
                      //{ setFilterName("profileStatus") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "8%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>#JOBS</Box>
                    <Box
                      onClick={() => { handleSort(); }}
                      // { setFilterName("profileStatus") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900" }}
                  align="center"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>STATUS</Box>
                    <Box
                      onClick={() => { handleSort(); { setFilterName("profileStatus") } }}
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon sx={{ marginTop: "-5px" }} />
                      <ArrowDropDownIcon sx={{ marginTop: "-17px" }} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody component={Paper}>
              {tableData.map((item) => (


                <StyledTableRow
                  key={item.userId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    zIndex: "999",
                    border: "1px solid #E0E0E0",
                    // borderLeft:"100px"
                    fontSize: "13px"
                  }}
                >
                  <TableCell
                    sx={{ fontSize: "13px" }}
                    component="th"
                    scope="item"
                    style={{
                      borderLeft:
                        (item.profileStatus.value === "ACTIVE & AVAILABLE" &&
                          "5px solid green") ||
                        (item.profileStatus.value ===
                          "ACTIVE & NOT AVAILABLE" &&
                          "5px solid #f7aa02") ||
                        (item.profileStatus.value === "INACTIVE" &&
                          "5px solid red"),
                    }}
                  >
                    {item.userId || "--"}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.name || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.mobileNo || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.gender.value || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.cityName || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.skill || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.totalExperience || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.workingHours || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {"--"}
                  </TableCell>
                  <NavLink
                    to={`/ycw/add/dashboard/${item.userId}`}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TableCell align="left" sx={{ border: "none" }}>
                      <Typography
                        sx={{
                          width: "150px",

                          padding: "8px",
                          borderRadius: "5px",
                          fontSize: "11px",
                          textAlign: "center",
                          fontWeight: "950",
                          boxSizing: "border-box",
                        }}
                        style={{
                          backgroundColor:
                            (item.profileStatus.value ===
                              "ACTIVE & AVAILABLE" &&
                              "#E6F4F1") ||
                            (item.profileStatus.value ===
                              "ACTIVE & NOT AVAILABLE" &&
                              "#FFF7E5") ||
                            (item.profileStatus.value === "INACTIVE" &&
                              "#FEEFF0"),
                          color:
                            (item.profileStatus.value ===
                              "ACTIVE & AVAILABLE" &&
                              "0A9475") ||
                            (item.profileStatus.value ===
                              "ACTIVE & NOT AVAILABLE" &&
                              "#FFB701") ||
                            (item.profileStatus.value === "INACTIVE" &&
                              "#F55F71"),
                        }}
                      >
                        {item.profileStatus.value || "--"}
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
