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
import Details from "./pages/YcwDetailsPage/Details";




function App() {
  return (
    <BrowserRouter>
    <Box>
      <Header />
      <Stack direction="row">
        <SideHeader />
        <Routes>
        <Route path="/" element={<YcwAllData/>}/>
        <Route path="/ycw" element={<YcwAllData/>}/>
        
        
        <Route path="/ycw/add" element={<AddNewData/>}/>
        <Route path="/ycw/add/details/:id" element={<Details/>}/>

        <Route path="/cx" element={<Cx/>}/>
        <Route path="/cx/new" element={<AddNewCustomer/>}/>

        <Route path="/jobs" element={<JobsTable/>}/>
        <Route path="/jobs/new" element={<AddNewRequest/>}/>
        <Route path="/jobs/new" element={<AddNewRequest/>}/>


        
        </Routes>
      </Stack>
    </Box>
    </BrowserRouter>

  );
}

export default App;
