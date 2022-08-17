import { Button } from '@mui/material'
import React from 'react'

export default function YcwButtons(props) {
  return (
    <>
         <Button
            sx={{ color: "#f52f50", border: "1px solid #f52f50" }}
            variant="outlined"
          >
            CLOSE
          </Button>
          <Button
            sx={{ background: "#e3445f" }}
            variant="contained"
            color="secondary"
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
