import React from 'react'
import YcwDataTable from "../../components/ycw/YcwDataTable";
import {data} from '../../Data';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/Posts/action';



function YcmDataList() {
  //url = "http://13.126.160.155:8080/user/worker/get/all/worker?filter=firstName&pageNo=1&pageSize=30&sortby=asc"
  let url = `http://13.126.160.155:8080/user/worker/get/all/worker`;
  const dispatch = useDispatch()
     useEffect(() => {
         dispatch(getData(url))
      },[ url]);
    
  return (
   
       <>
       <YcwDataTable/>
     
       </>
        

 
  )
}

export default YcmDataList