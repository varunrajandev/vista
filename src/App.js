import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import Header from "./components/Header/Header";
import SideHeader from "./components/Side header/SideHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import YcwAllData from "./pages/ycw/YcwAllData";
import AddNewData from "./pages/ycw/AddNewData";
import Cx from "./pages/CX/Cx";
import JobsTable from "./pages/Jobs/JobsTable";
import AddNewCustomer from "./pages/CX/AddNewCustomer";
import AddNewRequest from "./pages/Jobs/AddNewRequest";
import DashBoard from "./pages/YcwDetailsPage/JobDetails/DashBoard";
import BasicInformation from "./pages/YcwDetailsPage/JobDetails/BasicInformation";
 import Login from "./pages/Login/Login";
import Profile from "./components/ycw/Profilepage/Profile";
import UserRegistration from "./pages/UserRegistration/UserRegistration";
import { multiStepContext } from "./ContextApi/StepContext";


function App() {
  
  const{loginData, setLoginData} = useContext(multiStepContext); 
   const loginLocalStorageData=localStorage.getItem("Response")
   const loginLocalStorageUserType=localStorage.getItem("ResponseUserType")
  const  userTypeofLogin= JSON.parse(loginLocalStorageUserType);
 console.log("loginLocalStorageUserType",userTypeofLogin)
  return (
    <>
 
    <BrowserRouter>
        <Box>
     {loginLocalStorageData&&<Header/>}
    
      <Stack direction="row">

        {/* {loginLocalStorageData&&<SideHeader />} */}
       

        {(userTypeofLogin=="OPS")&&loginLocalStorageData&&<SideHeader />}

        <Routes>
       
        <Route path="/" element={<YcwAllData/>}/>
        <Route path="/ycw" element={<YcwAllData/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<UserRegistration/>} />
        <Route path="/ycw/add" element={<AddNewData/>}/>
        <Route path="/ycw/profile/:id" element={<Profile/>}/>
        <Route path="/ycw/add/dashboard/:id" element={<DashBoard/>}/>
        <Route path="/ycw/add/:id" element={<AddNewData/>}/>
        <Route path="/ycw/add/dashboard/basicinfo/:id" element={<BasicInformation/>}/>

        <Route path="/cx" element={<Cx/>}/>
        <Route path="/cx/new" element={<AddNewCustomer/>}/>

        <Route path="/jobs" element={<JobsTable/>}/>
        <Route path="/jobs/new" element={<AddNewRequest/>}/>
        <Route path="/jobs/new" element={<AddNewRequest/>}/>

        
        </Routes>
      </Stack>
    </Box>
    </BrowserRouter>
   </>
  );
}

export default App;
