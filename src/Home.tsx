import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
//@ts-ignore
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ThreatAgile from "./pages/ThreatAgile";
import { FormProvider, useForm } from "react-hook-form";
import "./App.css";
import DarkModeSwitch from "./components/DarkModeSwitch";
import HorizontalMenubar from "./components/HorizontalMenuBar";
//import ThemeColorShuffle from "./components/ThemeColorShuffle";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Threat Model
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


export default function Home() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //@ts-ignore
  const methods = useForm(); // Create a form instance

  return (
    
    <Box sx={{ display: "flex",flexDirection:'column' }}>
      <CssBaseline />
      <MuiAppBar style={{position:"sticky",top:"0", display:"flex",flexDirection:'row'}}>
          <Typography component="h1" variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Threat Agile
          </Typography>
          <HorizontalMenubar/>
          <DarkModeSwitch />
          {/*<ThemeColorShuffle />*/}
      </MuiAppBar>
      <Box
        component="main"
        sx={{
          //backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          overflow: "auto",
          minHeight:'100vh'
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "520px" }}>
          <FormProvider {...methods}>
            <div>
              <h1>Threat Modelling</h1>
              <ThreatAgile />
            </div>
          </FormProvider>
        </Container>
        <Copyright sx={{ pt: 4 }} />
      </Box>
    </Box>
    
  );
}
