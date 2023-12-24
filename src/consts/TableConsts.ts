import { GridColDef } from "@mui/x-data-grid";
// import { deleteButton } from "../components/Table/Table"

export const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    minWidth: 120,
    flex: 1
  },
  {
    field: "firstName",
    headerName: "First name",
    headerAlign: "center",
    align: "center",
    minWidth: 120,
    flex: 1
  },
  {
    field: "lastName",
    headerName: "Last name",
    headerAlign: "center",
    align: "center",
    minWidth: 120,
    flex: 1
  },
  {
    field: "age",
    headerName: "Age",
    headerAlign: "center",
    align: "center",
    type: "number",
    minWidth: 120,
    flex: 1
  },
  {
    field: "profession",
    headerName: "Profession",
    headerAlign: "center",
    align: "center",
    minWidth: 150,
    flex: 1
  }
];

export const rows = [
  { _id: 1, lastName: "Snow", firstName: "Jon", age: 35, profession: "driver" },
  {
    _id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 42,
    profession: "driver",
  },
  {
    _id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 45,
    profession: "driver",
  },
  {
    _id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 16,
    profession: "driver",
  },
  {
    _id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 66,
    profession: "driver",
  },
  {
    _id: 6,
    lastName: "Melisandre",
    firstName: "Fiona",
    age: 150,
    profession: "driver",
  },
  {
    _id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    profession: "driver",
  },
  {
    _id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    profession: "driver",
  },
  {
    _id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 6,
    profession: "driver",
  },
];
