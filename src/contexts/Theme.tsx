import { useState, createContext, ReactNode, useContext } from "react";
import { themes } from "consts/App";
import ThemeData from "interfaces/ThemeData";

const defaultTheme: ThemeData = {
  name: "blue",
  hexColor: "#3F50B5",
};
const ThemeContext = createContext<ThemeData>(defaultTheme);
const ThemeUpdateContext = createContext<(color: string) => void>(() => {});// combine

export const useTheme = () => useContext(ThemeContext);
export const useUpdateTheme = () => useContext(ThemeUpdateContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(themes[0]);

  const changeTheme = (themeName: string) => {
    setTheme(themes.find((theme) => theme.name === themeName) || themes[0]);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={changeTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
