import React, { useState, useEffect } from "react";
import {
  TextField,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { FilterData, masterApi } from "../../AlllData";

function BankAccount(props) {
  const [checked, setChecked] = useState(true);
  const [accountTypeDD, setAccountTypeDD] = useState([{}]);
  const { setInputFields, inputFields, ifscCodeData } = props;

  useEffect(() => {
    async function fetchData() {
      let AccountType = await fetch(masterApi + "/drop-down/get/accountType");
      let AccountTypedata = await AccountType.json();
      setAccountTypeDD(AccountTypedata.data);
    }
    fetchData();
  }, []);

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputs", inputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        accountType: "",
        bankName: "",
        branchName: "",
        branchAddress: "",
        accountHoderName: "",
        accountNumber: "",
        ifscCode: "",
        bankAccountProof: "",
      },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <Box
      sx={{
        marginTop: 7,
        display: "grid",
        gap: 0.3,
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>Bank Account information</h5>
        <div>
          <IconButton aria-label="delete">
            <AddIcon
              sx={{
                backgroundColor: "purple",
                color: "white",
                borderRadius: "50%",
              }}
              onClick={() => handleAddFields()}
            />
          </IconButton>
          <span style={{ fontSize: "13px", fontWeight: "bolder" }}>
            &nbsp; Add a new bank account
          </span>
        </div>
      </Box>
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "30px",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <TextField
              style={{ width: "18%" }}
              name="ifscCode"
              label="IFSC Code"
              value={inputField.ifscCode}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />

            <TextField
              style={{ width: "18%" }}
              name="bankName"
              placeholder="bankName"
              label="Name of the the Bank"
              size="small"
              value={inputField.bankName}
              //value={ifscCodeData ? ifscCodeData.bankName : inputField.bankName}
              onChange={(event) => handleChangeInput(index, event)}
            />

            <TextField
              style={{ width: "18%" }}
              name="branchName"
              label="Branch Name"
              placeholder="Branch Name"
              value={inputField.branchName}
              //value={ifscCodeData ? ifscCodeData.branchName : ""}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />

            <TextField
              style={{ width: "38.5%" }}
              name="branchAddress"
              label="Branch Address"
              placeholder="Branch Address"
              value={inputField.branchAddress}
              //value={ifscCodeData ? ifscCodeData.branchAddress : ""}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />
            {/* </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}> */}

            <FormControl sx={{ minWidth: 120, width: "18%" }} size="small">
              <InputLabel id="demo-select-small">Type of Account</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-select-small"
                id="demo-select-small"
                name="accountType"
                value={inputField.accountType}
                label="Type of Account"
                onChange={(event) => handleChangeInput(index, event)}
              >
                {accountTypeDD.map((item) => (
                  <MenuItem value={item.key}>{item.value}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              style={{ width: "18%" }}
              name="accountHoderName"
              label="Account Holder Name"
              value={inputField.accountHoderName}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              style={{ width: "18%" }}
              name="accountNumber"
              label="Account Number"
              value={inputField.accountNumber}
              size="small"
              type={Number}
              onChange={(event) => handleChangeInput(index, event)}
            />

            <TextField
              style={{ width: "18%" }}
              name="BankAccountProof"
              label="Bank Account Proof*"
              value={inputField.BankAccountProof}
              size="small"
              onChange={(event) => handleChangeInput(index, event)}
            />
            <div
              style={{
                display: "flex",
                justfyContent: "space-between",
                width: "18%",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => handleRemoveFields(index)} />
              </IconButton>

              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span style={{ fontSize: "13px", fontWeight: "bolder" }}>
                Default
              </span>
            </div>
          </Box>
        ))}
      </form>
    </Box>
  );
}

export default BankAccount;
