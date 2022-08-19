import React from 'react'
import YcwDataTable from "../../components/ycw/YcwDataTable";
import {data} from '../../Data';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/Posts/action';


function YcmDataList() {

  let url = `https://nykaalone.herokuapp.com/menData?_page=2&_limit=9`;
  const dispatch = useDispatch()
     useEffect(() => {
         dispatch(getData(url))
      },[ url]);

      const data2 = useSelector((state)=> state.post.data)
      console.log(data2)
  return (
   
       <>
       <YcwDataTable data = {data}/>
       </>
        

 
  )
}

export default YcmDataList