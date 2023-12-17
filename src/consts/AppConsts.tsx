import { PageRoute, ShobClass } from "../types";
import Classes from "../pages/ClassesPage/Classes";
import Students from "../pages/StudentsPage/Students";
import Create from "../pages/CreatePage/Create";

export const API_CONNECTION_URL = "http://localhost:3000";

export const routes: PageRoute[] = [
  { path: "/", name: "Classes", Component: <Classes /> },
  { path: "/students", name: "Students", Component: <Students /> },
  { path: "/create", name: "Create", Component: <Create /> },
];

// export const classes: ShobClass[] = [
//   { name: "אלון", availableSeats: 2, totalSeats: 2 },
//   { name: "שקמה", availableSeats: 2, totalSeats: 11111 },
//   { name: "שיטה", availableSeats: 0, totalSeats: 96 },
//   { name: "תאנה", availableSeats: 0, totalSeats: 45 },
//   { name: "גפן", availableSeats: 1, totalSeats: 1 },
//   { name: "ארזים", availableSeats: 0, totalSeats: 22 },
// ];

export const availableClasses = ["אלון", "שקמה", "שיטה"];

export const students = ["איימי ווינהאוס", "דוד שימי"];
