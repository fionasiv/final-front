import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
  {
    field: "firstName",
    headerName: "First name",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
  {
    field: "lastName",
    headerName: "Last name",
    headerAlign: "center",
    align: "center",
    width: 120,
  },
  {
    field: "age",
    headerName: "Age",
    headerAlign: "center",
    align: "center",
    type: "number",
    width: 120,
  },
  {
    field: "profession",
    headerName: "Profession",
    headerAlign: "center",
    align: "center",
    width: 150,
  },
];

export const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, profession: "driver" },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    profession: "driver",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    profession: "driver",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    profession: "driver",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 66,
    profession: "driver",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Fiona",
    age: 150,
    profession: "driver",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    profession: "driver",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    profession: "driver",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 6,
    profession: "driver",
  },
];
