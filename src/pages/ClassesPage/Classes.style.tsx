import { styled } from "@mui/material";
import { mediaTheme } from "../../Theme"

export const ClassesList = styled("div") ({
    display: "grid",
    rowGap: "5vh",
    colGap: "2vw",
    [mediaTheme.breakpoints.only('xl')]: {
        gridTemplate: "auto auto / repeat(6, 1fr)",
        margin: "7vh 0vw 7vh 3vw"
    },
    [mediaTheme.breakpoints.only('lg')]: {
        gridTemplate: "auto auto / repeat(5, 1fr)",
        margin: "7vh 0vw 7vh 3vw"
    },
    [mediaTheme.breakpoints.only('md')]: {
        gridTemplate: "auto auto / repeat(4, 1fr)",
        margin: "7vh 0vw 0vh 3vw"
    },
    [mediaTheme.breakpoints.only('sm')]: {
        gridTemplate: "auto auto / repeat(3, 1fr)",
        margin: "7vh 0vw 0vh 6vw"
    },
    [mediaTheme.breakpoints.only('xs')]: {
        gridTemplate: "auto auto / repeat(2, 1fr)",
        margin: "7vh 0vw 7vh 5vw"
    },
    [mediaTheme.breakpoints.down('xs')]: {
        gridTemplate: "auto auto / repeat(1, 1fr)",
        margin: "7vh 5vw 7vh 18vw"
    }
})