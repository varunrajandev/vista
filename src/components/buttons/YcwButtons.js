import { Button } from '@mui/material'
import React from 'react'
import {Link} from "react-router-dom";

export default function YcwButtons(props) {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
    <Link to="/ycw" style={{textDecoration:"none"}}>
         <Button
            sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
            variant="outlined"
          >
            CLOSE
          </Button>
          </Link>
          <Button
            sx={{ background: "#e3445f" }}
            variant="contained"
            color="secondary"
            onClick={refreshPage}
          >
            CANCEL CREATION
          </Button>
          <Button
            sx={{ background: "#e3b944" }}
            variant="contained"
            color="secondary"
          >
            SAVE AS DRAFT
          </Button>
          <Button color="success" variant="contained" type="submit" onClick={props.data} >
            CONFIRM & CREATE
          </Button>
    </>
  )
}
