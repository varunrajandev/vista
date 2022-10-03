import { Alert, Snackbar } from '@mui/material';
import React from 'react'
 

function Notify(props) {

    const {notify, setNotify} = props;

    // setTimeout(() => {
    //   setNotify( {isOpen:false, message:"", type:""} )
    //     },5000);

  return (
    <Snackbar open={notify.isOpen} autoHideDuration={100}>
         <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  )
}

export default Notify