import { useState, createContext, ReactNode, useContext } from "react";
import { themes } from "consts/App";
import ThemeData from "interfaces/ThemeData";

const defaultTheme: ThemeData = {
  name: "blue",
  hexColor: "#3F50B5",
};
const ThemeContext = createContext<[ThemeData, (color: string) => void]>([
  defaultTheme,
  () => {},
]);

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(themes[0]);

  const changeTheme = (themeName: string) => {
    setTheme(themes.find((theme) => theme.name === themeName) || themes[0]);
  };

  return (
    <ThemeContext.Provider value={[theme, changeTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}
