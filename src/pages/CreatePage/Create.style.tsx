import { styled } from "@mui/material";
import { mediaTheme } from "../../Theme";

export const Forms = styled("div") ({
    display: "grid",
    [mediaTheme.breakpoints.up('md')]: {
        gridTemplate: "auto auto / repeat(2, 1fr)",
        marginLeft: "2vw"
    },
    [mediaTheme.breakpoints.down('md')]: {
        gridTemplate: "auto auto / repeat(1, 1fr)",
        margin: "0vh 0vw 7vh 25vw",
        rowGap: "3vh"
    },
})