import { ThemeContext } from "../theme/MyThemeProvider";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import { useTheme } from "@mui/material";
const ThemeModeSwitch = () => {
  const theme = useTheme();

  const colorMode = React.useContext(ThemeContext);
  return (
    <ToggleButton value={"check"} style={{ borderRadius: "50px", border: "none" }} onChange={colorMode.shuffleColorTheme}>
      <ColorLensIcon sx={{ color: theme.palette.mode === "light" ? "#fff" : "#fff" }} />
    </ToggleButton>
  );
};

export default ThemeModeSwitch;
