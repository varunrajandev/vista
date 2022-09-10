import React from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Box } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import IosShareIcon from "@mui/icons-material/IosShare";
function Ledger() {
  return (
    <>
      <Box mt={1} sx={{ width: "100%" }}>
        <TableContainer>
          <Table size="small" sx={{ minWidth: "100%"  }}>
            <TableHead sx={{ backgroundColor: "#FFF1F1" }}>
              <TableRow>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "800", width: "5%" }}>
                  DATE & TIME
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "800", width: "20%" }}>
                  INVOICE TYPE
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "800", width: "20%" }}>
                  INVOICE DURATION
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "800", width: "5%" }}>
                  AMOUNT
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "800", width: "25%" }}>
                  PAYMENT STATUS
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "800", width: "20%" }}>
                  PAID AMOUNT
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "900", width: "5%" }}>
                  PENDING
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "10px", fontWeight: "900", width: "8%" }}></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow  sx={{border:"1px solid #E0E0E0"}}>
                <TableCell align="left" sx={{ fontSize: "13px" }}>12/12/2022</TableCell>
                <TableCell align="left" sx={{ fontSize: "13px" }}>
                  12/12/2022
                  <p>YCW Invoice</p>
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "13px" }}>12/12/2022</TableCell>
                <TableCell align="left" sx={{ fontSize: "13px" }}>2300</TableCell>
                <TableCell align="left" sx={{ fontSize: "13px" }}>Partially Paid</TableCell>
                <TableCell align="left" sx={{ fontSize: "13px" }}>2000</TableCell>
                <TableCell align="left" sx={{ fontSize: "13px" }}>10000</TableCell>
                <TableCell sx={{ color: "#7A7D7E", display: "flex", border: "none", justifyContent: "space-between", gap: "10px" }}>
                  <FileCopyIcon sx={{ fontSize: "19px" }} />
                  <IosShareIcon sx={{ fontSize: "19px" }} />
                  <SettingsIcon sx={{ fontSize: "19px" }} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
export default Ledger;