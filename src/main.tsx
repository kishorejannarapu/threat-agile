import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StyledEngineProvider } from "@mui/material";
import MyThemeProvider from "./theme/MyThemeProvider.tsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledEngineProvider injectFirst>
        <MyThemeProvider>
          <App />
        </MyThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
