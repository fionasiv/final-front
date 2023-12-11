import "./App.css";
import Navbar from "./components/Navbar";
import { routes } from "./consts";
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { PageRoute } from "./types";
import { Modes } from "./Enums";

export const ThemeContext = createContext(Modes.PURPLE_MODE);

function App() {
  const [theme, setTheme] = useState(Modes.PURPLE_MODE);

  function changeTheme(): void {
    setTheme((prevTheme) =>
      prevTheme === Modes.PURPLE_MODE ? Modes.RED_MODE : Modes.PURPLE_MODE
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Navbar handleThemeChange={changeTheme} />
        <Routes>
          {routes.map((route: PageRoute) => {
            return <Route path={route.path} element={route.Component} />;
          })}
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
