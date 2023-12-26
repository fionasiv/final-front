import { Box, Button, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const DesignedBox = styled(Box)({
  width: "90vw",
  borderRadius: "5px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  boxShadow: "0px 3px 3px #D1D1D1"
});

export const Table = styled(DataGrid)({
    display: "flex",
    justifyContent: "center",
})

export const TableButton = styled(Button)<{coloring: string}>(({coloring}) => ({
    color: coloring,
    border: `1px solid ${coloring}`,
    fontWeight: "400", 
    padding: "0.5vh 2vw"
}))