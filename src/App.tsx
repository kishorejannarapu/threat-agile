//@ts-ignore
import { FormProvider, useForm } from "react-hook-form";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AutocompleteForm from "./components/TestComponent";
import Layout from "./Layout";
import Home from "./Home";
//import ThemeColorShuffle from "./components/ThemeColorShuffle";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/test" element={<AutocompleteForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
