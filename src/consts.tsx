import { PageRoute } from "./types";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Create from "./pages/Create";

export const routes: PageRoute[] = [
  { path: "/", name: "Classes", Component: <Classes /> },
  { path: "/students", name: "Students", Component: <Students /> },
  { path: "/create", name: "Create", Component: <Create /> },
];
