import { DarkModeContext } from "@shared/lib";
import { createSignal, ParentComponent } from "solid-js";

export const DarkModeProvider: ParentComponent = (props) => {
  const [darkMode, setDarkMode] = createSignal("light");
  const systemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  // systemの場合は、OSのダークモード設定に従う
  const theme = () => {
    if (darkMode() === "system") {
      return systemDarkMode ? "dark" : "light";
    }
    return darkMode();
  };

  return (
    <DarkModeContext.Provider value={{ theme, darkMode, setDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
