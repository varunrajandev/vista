import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import StepContext from "./ContextApi/StepContext";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({

  components: {
      MuiFormLabel: {
          styleOverrides: {
              asterisk: { color: "red" },
          },
      },
  },

})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StepContext>
    <React.StrictMode>
      {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      {/* </Provider> */}
    </React.StrictMode>
  </StepContext>
);
