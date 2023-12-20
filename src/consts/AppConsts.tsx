import { PageRoute } from "../types";
import Classes from "../pages/ClassesPage/Classes";
import Students from "../pages/StudentsPage/Students";
import Create from "../pages/CreatePage/Create";

export const routes: PageRoute[] = [
  { path: "/", name: "Classes", Component: <Classes /> },
  { path: "/students", name: "Students", Component: <Students /> },
  { path: "/create", name: "Create", Component: <Create /> },
];