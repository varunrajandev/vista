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
          <Table size="small" sx={{ minWidth: "100%" }}>
            <TableHead sx={{ backgroundColor: "#FFF1F1" }}>
              <TableRow>
                <TableCell align="left" sx={{ width: "11%" }}>
                  DATE & TIME
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}>
                  INVOICE TYPE
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}>
                  INVOICE DURATION
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}>
                  AMOUNT
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}>
                  PAYMENT STATUS
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}>
                  PAID AMOUNT
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}>
                  PENDING
                </TableCell>
                <TableCell align="left" sx={{ width: "11%" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">12/12/2022</TableCell>
                <TableCell align="left">
                  12/12/2022
                  <p>YCW Invoice</p>
                </TableCell>
                <TableCell align="left">12/12/2022</TableCell>
                <TableCell align="left">2300</TableCell>
                <TableCell align="left">Partially Paid</TableCell>
                <TableCell align="left">2000</TableCell>
                <TableCell align="left">10000</TableCell>
                <TableCell sx={{ color: "#7A7D7E" }}>
                  <FileCopyIcon />
                  <IosShareIcon />
                  <SettingsIcon />
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