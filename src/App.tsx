import "./App.css";
import Navbar from "./components/Navbar";
import { useState, createContext, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Create from "./pages/Create";

export const ThemeContext = createContext("purple");
export enum Modes {
  PURPLE_MODE = "#3F50B5",
  RED_MODE = "#F50057",
}

export type PageRoute = {
  path: string,
  name: string,
  Component: ReactNode
}

export const routes : PageRoute[] = [
  { path: "/", name: "Classes", Component: <Classes /> },
  { path: "/students", name: "Students", Component: <Students /> },
  { path: "/create", name: "Create", Component: <Create /> },
];

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
          {routes.map((route : PageRoute) => {
            return <Route path={route.path} element={route.Component} />;
          })}
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
