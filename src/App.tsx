import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ShobClass from "./interfaces/ShobClass";
import { Mode } from "./Enums";
import { useAppDispatch } from "./store/store";
import { setClassrooms } from "./store/reducers/classesSlice";
import { SwalToastWithoutTimer } from "./components/SwalToast/SwalToast";
import { getAllClassrooms } from "./requests/ClassroomRequests";
import Classes from "./pages/ClassesPage/Classes";
import Students from "./pages/StudentsPage/Students";
import Create from "./pages/CreatePage/Create";
import { themes } from "./consts/App";

export const ThemeContext = createContext(themes[0]);

function App() {
  const [theme, setTheme] = useState(themes[0]);
  const [mode, setMode] = useState<Mode>(Mode.LOADING);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes: ShobClass[] = await getAllClassrooms();
        dispatch(setClassrooms({ classrooms: classes }));
        setMode(Mode.SUCCESS);
      } catch (error) {
        console.error(error);
        setMode(Mode.ERROR);
        SwalToastWithoutTimer.fire({
          icon: "error",
          iconColor: theme.hexColor,
          title: "חלה תקלה בעת קבלת הכיתות, נסו שוב מאוחר יותר",
        });
      }
    };

    fetchData();
  }, []);

  function changeTheme(themeName: string): void {  
    setTheme(themes.find((theme) => theme.name === themeName) || themes[0]);
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Navbar handleChangeTheme={changeTheme} />
        <Routes>
          <Route path="/" element={<Classes mode={mode} />} key="Classes" />
          <Route path="/students" element={<Students />} key="Students" />
          <Route path="/create" element={<Create />} key="Create" />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
