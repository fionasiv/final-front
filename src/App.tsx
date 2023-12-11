import "./App.css";
import Navbar from "./components/Navbar";
import { useState, createContext } from "react";

export const ThemeContext = createContext("purple");
export enum Modes {
  PURPLE_MODE = "#3F50B5",
  RED_MODE = "#F50057"
}

function App() {
  const [theme, setTheme] = useState(Modes.PURPLE_MODE);

  function changeTheme() : void {
    setTheme((prevTheme) => (prevTheme === Modes.PURPLE_MODE ? Modes.RED_MODE : Modes.PURPLE_MODE));
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Navbar handleThemeChange={changeTheme} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
