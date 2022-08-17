import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Button
          variant="contained"
            color="primary"
            sx={{
              fontWeight: "900",
              fontSize:"15px",
              borderRadius: "7px",
              width: "30px",
              height: "30px",
            }}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
