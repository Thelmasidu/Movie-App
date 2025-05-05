import { createContext, useContext } from "react";
import { ThemeName } from "../themes";

export interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  themeName: "blue",
  setThemeName: () => {},
  mode: "light",
  toggleMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const STORAGE_THEME_NAME = "themeName";
export const STORAGE_THEME_MODE = "themeMode";
