import { createContext } from "solid-js";

export type DarkModeContextType = {
  theme: () => string;
  darkMode: () => string;
  setDarkMode: (darkMode: string) => void;
};

export const DarkModeContext = createContext<DarkModeContextType>({
  theme: () => "light",
  darkMode: () => "system",
  setDarkMode: () => {},
});
