import { createTheme } from "@mui/material/styles";

const createCustomTheme = (mainColor: string, mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mainColor,
      },
      ...(mode === "dark" && {
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      }),
    },
  });

export const baseColors = {
  blue: "#1976d2",
  green: "#2e7d32",
  red: "#d32f2f",
  purple: "#9c27b0",
  orange: "#ef6c00",
  teal: "#00897b",
  pink: "#d81b60",
  indigo: "#3f51b5",
  cyan: "#00acc1",
  amber: "#ffb300",
};

export type ThemeName = keyof typeof baseColors;

export const getTheme = (themeName: ThemeName, mode: "light" | "dark") =>
  createCustomTheme(baseColors[themeName], mode);
