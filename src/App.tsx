import * as React from "react";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
//@ts-ignore
import { FormProvider, useForm } from "react-hook-form";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@mui/icons-material";
import AutocompleteForm from "./components/TestComponent";
import Layout from "./Layout";
import ThreatAgile from "./pages/ThreatAgile";
//import ThemeColorShuffle from "./components/ThemeColorShuffle";


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ThreatAgile />} />
          <Route path="/test" element={<AutocompleteForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
