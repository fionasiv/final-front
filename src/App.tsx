import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import { fetchClassrooms } from "./store/reducers/classesSlice";
import { fetchStudents } from "./store/reducers/studentsSlice";
import { routes } from "./consts/App";
import { ThemeProvider } from "./contexts/Theme";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClassrooms());
    dispatch(fetchStudents());
  }, []);

  const routesItems = routes.map((route) => (
    <Route path={route.path} key={route.name} element={route.Component} />
  ));

  return (
    <ThemeProvider>
      <Navbar />
      <Routes>{routesItems}</Routes>
    </ThemeProvider>
  );
}

export default App;
