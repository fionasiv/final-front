import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { routes } from "./consts/AppConsts";
import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PageRoute, ShobClass } from "./types";
import { Modes } from "./Enums";
import { useAppDispatch } from "./store/store";
import { setClassrooms } from "./store/reducers/classesSlice";
import { SwalToastWithoutTimer } from "./consts/SwalToast";
import { getAllClassrooms } from "./requests/ClassroomRequests";

export const ThemeContext = createContext(Modes.PURPLE_MODE);

function App() {
  const [theme, setTheme] = useState(Modes.PURPLE_MODE);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes: ShobClass[] = await getAllClassrooms();
        dispatch(setClassrooms({ classrooms: classes }));
      } catch (error) {
        console.error(error);
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
      prevTheme === Modes.PURPLE_MODE ? Modes.RED_MODE : Modes.PURPLE_MODE
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        <Navbar handleThemeChange={changeTheme} />
        <Routes>
          {routes.map((route: PageRoute) => {
            return (
              <Route
                path={route.path}
                element={route.Component}
                key={route.name}
              />
            );
          })}
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
