import * as React from "react";
import { Box, Button, Typography, Checkbox } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Navigate, NavLink } from "react-router-dom";
import { FilterData } from "../../AlllData";
import { useEffect } from "react";
import { useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from 'react-router-dom';
import { masterApi } from "../../AlllData";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { LinearProgress } from '@mui/material';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />
const label = { inputProps: { "aria-label": "Checkbox demo" } };;



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
  const [ycwidorder, setycwIdOrder] = React.useState("desc");
  const [ycwCity, setYcwCity] = React.useState("");
  const [searchItem, setSearchItem] = React.useState("");
  const [searchDD, setSearchDD] = React.useState([]);
  const [cityDD, setCityDD] = React.useState([]);
  const [searchycwStatus, setSearchYcwStatus]= React.useState("");
  const [ycwSearchUserId, setYcwSearchUserId] = React.useState("");
  const [SearchByName, setSearchByName] = React.useState("");
  const [filterName, setFilterName] = React.useState("createdAt");
  const [btnColorUserID, setBtnColorUserId] = useState("black");
  const [btnColor1UserId, setBtnColor1UserId] = useState("black");
  const [btnColorName, setBtnColorName] = useState("black");
  const [btnColor1Name, setBtnColor1Name] = useState("black");
  const [btnColorPhone, setBtnColorNamePhone] = useState("black");
  const [btnColor1Phone, setBtnColor1Phone] = useState("black");
  const [btnColorGender, setBtnColorGender] = useState("black");
  const [btnColor1Gender, setBtnColor1Gender] = useState("black");
  const [btnColorCity, setBtnColorCity] = useState("black");
  const [btnColor1City, setBtnColor1City] = useState("black");
  const [btnColorSkills, setBtnColorSkills] = useState("black");
  const [btnColor1Skills, setBtnColor1Skills] = useState("black");
  const [btnColorExp, setBtnColorExp] = useState("black");
  const [btnColor1Exp, setBtnColor1Exp] = useState("black");
  const [btnColorStatus, setBtnColorStatus] = useState("black");
  const [btnColor1Status, setBtnColor1Status] = useState("black");
  const [btnColorWorkHr, setBtnColorWorkHr] = useState("black");
  const [btnColor1WorkHr, setBtnColor1WorkHr] = useState("black");
  const [btnColorJobs, setBtnColorJobs] = useState("black");
  const [btnColor1Jobs, setBtnColor1Jobs] = useState("black");

  let navigate = useNavigate();

  ///onclick status
  const [statusData, setStatusData] = useState("")
  const [id, setId] = useState("")



  console.log("Datatale", tableData)

  useEffect(() => {
    const fetchData = async () => {
      let jobType = await fetch(
        masterApi + "/skill/get/skills"
      );
      let ycwStatusApidrop = await fetch(
        masterApi + "/drop-down/get/profileStatus?flag=all"
      );
      let ycwCityDD = await fetch(
        "http://13.126.160.155:8081/locationmaster/city/get/all"
      );

      let jobtypeApi = await jobType.json();
      let StatusApi = await ycwStatusApidrop.json();
      let cityDD = await ycwCityDD.json();

      let JobTypeApi = await jobtypeApi.data;
      let ycwStatusApi = await StatusApi.data;
      let cityDropDown = await cityDD.data;

      setJobTypeApi(JobTypeApi);
      setYcwStatus(ycwStatusApi);
      setCityDD(cityDropDown);
     
    };

    fetchData();

  }, []);

  useEffect(()=>{
    const fetchDataTable = async () => {
    let data = await fetch(
      masterApi + `/worker/get/all/worker?city=${ycwCity}&filter=${filterName}&pageNo=1&pageSize=30&skills=${worktype}&sortby=${ycwidorder}&status=${statusycw}`
     );
     let res = await data.json();
     let newData = await res.data;
     setTableData(newData.data);
    }
    
    fetchDataTable();

  },[ycwidorder, worktype, statusycw, ycwCity])

  useEffect(() => {

    const fetchSearchData = async () => {
      let searchData = await fetch(
        masterApi + `/worker/search/user?searchTerm=${searchItem}`
      );
      let responseSearch = await searchData.json();
      let responseSearchData = await responseSearch.data;
      setSearchDD(responseSearchData || [{ name: "No Data" }]);
    };
    if (searchItem.length > 3) {
      fetchSearchData()
    }
  }, [searchItem])

console.log("searchDD",searchDD)
console.log("goooo",tableData)

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

          {/* Filter and Search Section Like Search and All DropDown Code Start */}
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
            setSearchYcwStatus(newValue.profileStatus);
             if(newValue.profileStatus=="ACTIVE"){
            navigate(`/ycw/profile/${newValue.userId}`)
             } else{
              navigate(`/ycw/add/${newValue.userId}`)
             }
          }}
          disableClearable
          size="small"
          options={searchDD}
          renderInput={(params) => (
            <Box sx={{ display: "flex" }}>
              {/* <SearchIcon /> */}
              <TextField
                placeholder="Search by Name & Mobile Number"
                onChange={(e) => {
                   setSearchItem(e.target.value);
                }}
                {...params}
                // InputProps={{
                //   ...params.InputProps,
                //   type: "search",
                // }}
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
              onChange={(event, newValue) => {
                setWorkType("");
              }}
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
              onChange={(event, newValue) => {
                setStatusycw("");
              }}
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
              onChange={(event, newValue) => {
                setYcwCity("");
              }}
            />
          )}
          getOptionLabel={(item) => `${item.cityName}`}
        />
      </Box>

      {/* Filter Section Like Search and All DropDown Code End */}

      {/* DataTableList code Start From Here*/}
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("userId") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorUserId("blue")
                              setBtnColor1UserId("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorUserID }}
                      />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("userId") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorUserId("black")
                              setBtnColor1UserId("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1UserId }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("firstName") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorName("blue")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorName }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("firstName") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorName("black")
                              setBtnColor1Name("blue")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-16px", color: btnColor1Name }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("mobileNo") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorNamePhone("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorPhone }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("mobileNo") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorNamePhone("black")
                              setBtnColor1Phone("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1Phone }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("gender") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorGender("blue")
                              setBtnColor1Gender("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorGender }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("gender") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorGender("black")
                              setBtnColor1Gender("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1Gender }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("cityName") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorCity("blue")
                              setBtnColor1City("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")

                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorCity }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("cityName") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorCity("black")
                              setBtnColor1City("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1City }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("primarySkill") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorSkills("blue")
                              setBtnColor1Skills("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")

                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorSkills }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("primarySkill") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorSkills("black")
                              setBtnColor1Skills("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1Skills }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("totalExperience") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorExp("blue")
                              setBtnColor1Exp("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")

                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorExp }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("totalExperience") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorExp("black")
                              setBtnColor1Exp("blue")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1Exp }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "13%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ letterSpacing: "1px" }}>WORK HOURS</Box>
                    <Box
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("workingHours") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("blue")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorWorkHr }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("workingHours") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("blue")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1WorkHr }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ fontSize: "10px", fontWeight: "900", width: "12%" }}
                  align="left"
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>Update Status</Box>
                    <Box
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("percentage") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("blue")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}

                        sx={{ marginTop: "-5px", color: btnColorJobs }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("percentage") }; { setycwIdOrder("desc") }
                          {
                            {
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorWorkHr("black")
                              setBtnColor1WorkHr("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("blue")
                              setBtnColorStatus("black")
                              setBtnColor1Status("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1Jobs }} />
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
                      style={{
                        alignItem: "",
                        display: "flex",
                        flexDirection: "column",
                        gap: "-5px",
                        cursor: "pointer",

                      }}
                    >
                      <ArrowDropUpIcon
                        onClick={() => {
                          { setFilterName("profileStatus") }; { setycwIdOrder("asc") }
                          {
                            {
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorStatus("blue")
                              setBtnColor1Status("black")

                            }
                          }
                        }}
                        sx={{ marginTop: "-5px", color: btnColorStatus }} />
                      <ArrowDropDownIcon
                        onClick={() => {
                          { setFilterName("profileStatus") }; { setycwIdOrder("desc") } { { setBtnColorStatus("black") } }
                          {
                            {
                              setBtnColor1Status("blue")
                              setBtnColorName("black")
                              setBtnColor1Name("black")
                              setBtnColorUserId("black")
                              setBtnColor1UserId("black")
                              setBtnColor1Phone("black")
                              setBtnColorNamePhone("black")
                              setBtnColorGender("black")
                              setBtnColor1Gender("black")
                              setBtnColorCity("black")
                              setBtnColor1City("black")
                              setBtnColorExp("black")
                              setBtnColor1Exp("black")
                              setBtnColorJobs("black")
                              setBtnColor1Jobs("black")
                              setBtnColorSkills("black")
                              setBtnColor1Skills("black")
                            }
                          }
                        }}
                        sx={{ marginTop: "-17px", color: btnColor1Status }} />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>


{/*...........................Table Body.............................. */}



<TableBody component={Paper}>

              {tableData.map((item) => (
                <StyledTableRow
                  onClick={() => { setId(item.userId); { setStatusData(item.profileStatus.value) } }}
                  key={item.userId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    zIndex: "999",
                    border: "1px solid #E0E0E0",
                    fontSize: "13px"
                  }}
                >
                  <TableCell
                    sx={{ fontSize: "13px" }}
                    component="th"
                    scope="item"
                    style={{
                      borderLeft:
                        (item.profileStatus.value === "ACTIVE" &&
                          "5px solid #0A9475") ||
                        (item.profileStatus.value ===
                          "ACTIVE & NOT AVAILABLE" &&
                          "5px solid #f7aa02") ||
                        (item.profileStatus.value === "INACTIVE" &&
                          "5px solid #F55F71"),
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
                    {item.primarySkill || "--"}
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px" }} align="left">
                    {item.totalExperience || "--"}
                  </TableCell>


                  <TableCell sx={{ fontSize: "13px" }} align="left">

                    {item.workingHours?item.workingHours.value:"--"}

                 

                  </TableCell>

               


                  <TableCell sx={{ fontSize: "13px"  }} align="left">
                  <LinearProgress variant="determinate" value={item.percentage}
                   color="secondary"
                  /> {item.percentage}%
                    {/* {"--"} */}
                  </TableCell>
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
                            "ACTIVE" &&
                            "#E6F4F1") ||
                          (item.profileStatus.value ===
                            "ACTIVE & NOT AVAILABLE" &&
                            "#FFF7E5") ||
                          (item.profileStatus.value === "INACTIVE" &&
                            "#FEEFF0"),
                        color:
                          (item.profileStatus.value ===
                            "ACTIVE" &&
                            "#0A9475") ||
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {statusData === "INACTIVE" && <Navigate to={`/ycw/add/${id}`} />}
      {statusData === "ACTIVE" && <Navigate to={`/ycw/profile/${id}`} />}
    </Box>
  );
}

export default Right;
