import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ShobClass, PageRoute } from "./interfaces";
import { Themes, Mode } from "./Enums";
import { useAppDispatch } from "./store/store";
import { setClassrooms } from "./store/reducers/classesSlice";
import { SwalToastWithoutTimer } from "./consts/SwalToast";
import { getAllClassrooms } from "./requests/ClassroomRequests";
import Classes from "./pages/ClassesPage/Classes";
import Students from "./pages/StudentsPage/Students";
import Create from "./pages/CreatePage/Create";
export const ThemeContext = createContext(Themes.PURPLE_MODE);

function App() {
  const [theme, setTheme] = useState(Themes.PURPLE_MODE);
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
          title: "חלה תקלה בעת קבלת הכיתות, נסו שוב מאוחר יותר",
        });
      }
    };

    fetchData();
  }, []);

  function changeTheme(): void {
    setTheme((prevTheme) =>
      prevTheme === Themes.PURPLE_MODE ? Themes.RED_MODE : Themes.PURPLE_MODE
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Navbar handleThemeChange={changeTheme} />
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
