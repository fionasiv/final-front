import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchClassrooms, getClassroomsStatus } from "./store/reducers/classesSlice";
import { fetchStudents, getStudentsStatus } from "./store/reducers/studentsSlice";
import Classes from "./pages/ClassesPage/Classes";
import Students from "./pages/StudentsPage/Students";
import Create from "./pages/CreatePage/Create";
import { routes, themes } from "./consts/App";

export const ThemeContext = createContext(themes[0]);

function App() {
  const [theme, setTheme] = useState(themes[0]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClassrooms())
    dispatch(fetchStudents())
  }, []);

  function changeTheme(themeName: string): void {  
    setTheme(themes.find((theme) => theme.name === themeName) || themes[0]);
  }

  const routesItems = routes.map((route) => (
    <Route path={route.path} key={route.name} element={route.Component} />
  ))

  return (
    <ThemeContext.Provider value={theme}> 
      <div className="App">
        <Navbar handleChangeTheme={changeTheme} />
        <Routes>
          {routesItems}
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
