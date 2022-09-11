import React from 'react'
import YcwDataTable from "../../components/ycw/YcwDataTable";
import {data} from '../../Data';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/Posts/action';



function YcwDataList() {    
  return ( 
       <>
       <YcwDataTable/>
       </>
  )
}

export default YcwDataList