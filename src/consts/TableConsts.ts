import { GridColDef } from "@mui/x-data-grid";

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