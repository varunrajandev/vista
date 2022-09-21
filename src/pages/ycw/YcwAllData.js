import React from 'react'
import YcwDataTable from "../../components/ycw/YcwDataTable";
import {data} from '../../Data';
import { useEffect } from 'react';
import {Box} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/Posts/action';
// import Header from '../../components/Header/Header';
// import SideHeader from '../../components/Side header/SideHeader';
// import Header from "./components/Header/Header";
// import SideHeader from "./components/Side header/SideHeader";



function YcwDataList() { 
  return ( 
       <>
     
      <YcwDataTable/>
     
    
      
       
       </>
  )
}

export default YcwDataList