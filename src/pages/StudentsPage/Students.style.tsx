import { Box, CircularProgress, styled } from "@mui/material";

export const TablesSection = styled("div") ({
    display: "flex",
    justifyContent: "center",
    paddingTop: "5vh",
    paddingBottom: "8vh"
})

export const Progress = styled(CircularProgress)<{coloring :string}>(({coloring}) => ({
    color: coloring,
}))

export const ProgressBox = styled(Box) ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
})