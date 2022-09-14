import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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


function App() {
  
  return (
    <>
 
    <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/user" element={<UserRegistration/>} />
      </Routes>
    
    <Box>
     <Header/>
      <Stack direction="row">
        <SideHeader />
        <Routes>
       
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/" element={<YcwAllData/>}/>
        <Route path="/ycw" element={<YcwAllData/>}/>
        
        
        <Route path="/ycw/add" element={<AddNewData/>}/>
        <Route path="/ycw/profile/:id" element={<Profile/>}/>
        <Route path="/ycw/add/dashboard/:id" element={<DashBoard/>}/>
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
