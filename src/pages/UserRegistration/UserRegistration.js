import React from 'react'
import TextField from "@mui/material/TextField";
import { Box, Button ,Alert,MenuItem,FormControl,Select,InputLabel} from "@mui/material";
import axios from "axios";
 import image from "../../images/careCrew1.png";
 import india from "../../images/india.png";
 import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect } from "react";
function UserRegistration() {
    const[ candidatemobileNumber,setCandidateMobileNumber]=React.useState("");
    const[ candidateFirstName,setCandidateFirstName]=React.useState("");
    const[ candidateMiddleName,setCandidateMiddleName]=React.useState("");
    const[ candidateLastName,setCandidateLastName]=React.useState("");
    const[ candidatetype,setCandidateType]=React.useState("");
    const[isoCode,setIsoCode]=React.useState("");
    const[department,setDepartment]=React.useState("");
    const[birthday,setBirthday]=React.useState("");
    const[education,setEducation]=React.useState("");
    const[educationDD,setEducationDD]=React.useState([]);
    console.log("hi",birthday)
    console.log("no",education)

    useEffect(() => {
        const fetchData = async () => {
          let educationdataDD = await fetch(
           "http://13.126.160.155:8080/user/drop-down/get/education"
          );

          let dropdowneducation = await educationdataDD.json();

          let DDeducationList= await dropdowneducation.data
       
          setEducationDD(DDeducationList);
    
    
       
        };
    
        fetchData();
    
      }, []);
console.log("educationDD",educationDD)
    const handleClick = async () => {
  
        try {
         let response= await axios.post("http://13.126.160.155:8080/user/internal/add",
            {   
            "birthday": birthday,
            "department": "WORKER",
            "educationalRemarks": education,
            "firstName": candidateFirstName,
            "gender": "MALE",
            "isoCode": "IN",
            "lastName": candidateLastName,
            "maritalStatus": "SINGLE",
            "middleName": candidateMiddleName,
            "mobile": candidatemobileNumber,
            "nationality": "INDIAN",
            "userType": "WORKER",        
            });
      alert("Candidate Registration successfully" )
      setCandidateFirstName("");
      setCandidateMobileNumber("");
      setCandidateMiddleName("");
      setCandidateLastName("");
      setEducation("");
      setBirthday("");

        } catch (error) {
          alert("Please Fill correct Mobile Number", error)
          
        }
    }

  return (
    <>
         <Grid 
          mt={10}
          mb={100}
           justifyContent="center"
           alignItems="center"
           sx={{display:"flex"}}
      >
      <Card 
       sx={{ maxWidth: 400,padding:"25px" , justifyContent:"center" }}
      >
         <Grid  sx={{ display:"flex",justifyContent:"center"}}>
      <CardMedia
         image={image}
        component="img"
       sx={{width:"150px", marginTop:"20px", }}
        alt="CARE CREW"
      />
      </Grid>
      <CardContent
      >
        <Box sx={{fontSize:"22px", fontWeight:"900", textAlign:"center",color:"#BDBDBD"}}>Candidate Registration</Box>
     <Grid 
      mt={2}
     justifyContent="center"
     container spacing={3}
     //</CardContent>sx={{display:"flex",gap:"10px" , marginTop:"20px"}}
     >
        {/* <Grid sx={12} sm={6} item>
      <TextField 
       sx={{width:"60px"}}
        required
        size="small"
        id="standard-size-small"
            InputProps={{
           startAdornment: (
            <InputAdornment position="start">
            <img  src={india} style={{width:"13px",height:"12px"}}></img> 
   
           </InputAdornment>
          ),
        }}
        value="+91"
        variant="standard"
        />
</Grid> */}
 <Grid 
 
 lg={6} sm={6} sx={12}  item
 
 >
     <TextField
     
    //  sx={{textDecoration:"none",counterText: ""}}
        required
        // size="small"
        //  id="standard-size-small"
         type="number"
        placeholder="Phone Number"
        variant="standard"
        onInput = {(e) =>{
            setCandidateMobileNumber( e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10))
        }}
      />
      </Grid>
         

      <Grid lg={6} sm={6} sx={3}  item>
     <TextField
 
    //  sx={{textDecoration:"none",counterText: "",marginTop:"10px"}}
        required
        // size="small"
        //  id="standard-size-small"
         type="text"
        placeholder="First Name"
        variant="standard"
        onInput = {(e) =>{
            setCandidateFirstName(e.target.value)
        }}
      />
      </Grid>
      <Grid lg={6} sm={6} sx={12}  item>
     <TextField
    //  sx={{textDecoration:"none",counterText: "",marginTop:"10px"}}
        required
        size="small"
         id="standard-size-small"
         type="text"
        placeholder="Middle Name"
        variant="standard"
        onInput = {(e) =>{
            setCandidateMiddleName(e.target.value)
        }}
      />
      </Grid>
      <Grid lg={6} sm={6} sx={12}  item>
     <TextField
    //  sx={{textDecoration:"none",counterText: "",marginTop:"10px"}}
        required
        size="small"
         id="standard-size-small"
         type="text"
        placeholder="Last Name"
        variant="standard"
        onInput = {(e) =>{
            setCandidateLastName(e.target.value)
        }}
      />
      </Grid>

      <Grid lg={6} sm={6} sx={12}   item>
       {/* <TextField
    //  sx={{textDecoration:"none",counterText: "",marginTop:"10px"}}
        required
        size="small"
         id="standard-size-small"
         type="text"
        placeholder="Type"
        variant="standard"
        onInput = {(e) =>{
            setCandidateType( e.target.value)
        }}
      /> */}



     <Autocomplete
          disablePortal
          size="small"
          id="combo-box-demo"
          options={educationDD}
          onChange={(event, newValue) => {
            setEducation(newValue.key);
          }}
          renderInput={(params) => (
            <TextField
            sx={{width:"176px"}}
            variant="standard"
              {...params}
              placeholder="Education Qulification"
              onChange={(event, newValue) => {
                setEducation("");
              }}
            />
          )}
          getOptionLabel={(item) => `${item.value}`}
        />
      </Grid>
      <Grid  sm={6} sx={12} item>
      {/* <TextField
    //  sx={{textDecoration:"none",counterText: "",marginTop:"10px"}}
        required
        size="small"
         id="standard-size-small"
         type="text"
        placeholder="department"
        variant="standard"
        onInput = {(e) =>{
            setDepartment(e.target.value )
        }}

      /> */}

         <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            // label="DOB"
            value={birthday}
            onChange={(newValue) => {
              setBirthday(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} 
              type="text"
              sx={{width:"176px"}}
              error={false}
              size="small" 
              placeholder="DOB"
              variant="standard"
              id="standard-size-small"
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      
    </Grid>
    <Grid
  mt={4}
  sx={{display:"flex",justifyContent:"center"}}   item>
      <Button 
     
      variant="contained"  color="success"  
      onClick={handleClick}
      >
     Registration
    </Button>
    </Grid>
     </CardContent>
    </Card>
    </Grid>
    </>
  )
}

export default UserRegistration