import ThemeData from "../interfaces/ThemeData";
import Classes from "../pages/ClassesPage/Classes";
import Students from "../pages/StudentsPage/Students";
import Create from "../pages/CreatePage/Create";
import PageRoute from "../interfaces/PageRoute";

export const routes: PageRoute[] = [
  { path: "/", name: "Classes", Component: <Classes /> },
  { path: "/students", name: "Students", Component: <Students /> },
  { path: "/create", name: "Create", Component: <Create /> },
];

export const themes: ThemeData[] = [
  {
    name: "blue",
    hexColor: "#3F50B5",
  },
  {
    name: "turquoise",
    hexColor: "#1d9496",
  },
  {
    name: "green",
    hexColor: "#227B1E",
  },
  {
    name: "yellow",
    hexColor: "#D5D900",
  },
  {
    name: "orange",
    hexColor: "#F57C00",
  },
  {
    name: "red",
    hexColor: "#F50057",
  },
  {
    name: "purple",
    hexColor: "#A129E0",
  },
  {
    name: "white",
    hexColor: "#C0C1C3",
  },
  {
    name: "black",
    hexColor: "#363A43",
  }
]
;
