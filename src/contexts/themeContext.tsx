import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme, baseColors, ThemeName } from "../themes";
import { ThemeContext } from "../utils/themeContextUtils";

const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [themeName, setThemeNameState] = useState<ThemeName>("blue");
  const [mode, setModeState] = useState<"light" | "dark">("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("themeName");
    const storedMode = localStorage.getItem("themeMode");

    if (storedTheme && storedTheme in baseColors) {
      setThemeNameState(storedTheme as ThemeName);
    }

    if (storedMode === "light" || storedMode === "dark") {
      setModeState(storedMode);
    }

    setLoading(false);
  }, []);

  const setThemeName = (name: ThemeName) => {
    setThemeNameState(name);
    localStorage.setItem("themeName", name);
  };

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setModeState(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  if (loading) return null;

  return (
    <ThemeContext.Provider
      value={{ themeName, setThemeName, mode, toggleMode }}
    >
      <ThemeProvider theme={getTheme(themeName, mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
