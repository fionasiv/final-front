import { styled } from "@mui/material";
import { mediaTheme } from "../../Theme";

export const ErrorWrapper = styled("div")({
  [mediaTheme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "center",
  },
  [mediaTheme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export const Image = styled("img")({
  [mediaTheme.breakpoints.up("md")]: {
    width: "45vw",
    marginTop: "5vh",
  },
  [mediaTheme.breakpoints.down("md")]: {
    width: "50vw",
    margin: "5vh 25vw 0vh 25vw",
  },
  [mediaTheme.breakpoints.down("xs")]: {
    width: "60vw",
    margin: "5vh 20vw 0vh 20vw",
  },
});

export const TextArea = styled("section")({
  direction: "rtl",
  margin: "0vh 5vw 0vh 5vw",
  lineHeight: "5vh",
  [mediaTheme.breakpoints.up("md")]: {
    marginTop: "20vh",
  },
});

export const Title = styled("h1")<{ coloring: string }>(({ coloring }) => ({
  fontWeight: "700",
  color: coloring,
  fontSize: "2em",
  [mediaTheme.breakpoints.up("lg")]: {
    fontSize: "3em",
  },
  [mediaTheme.breakpoints.only("lg")]: {
    fontSize: "2.8em",
  },
  [mediaTheme.breakpoints.only("md")]: {
    fontSize: "2.5em",
  },
  [mediaTheme.breakpoints.only("sm")]: {
    fontSize: "2.5em",
    textAlign: "center",
  },
  [mediaTheme.breakpoints.only("xs")]: {
    fontSize: "2em",
    textAlign: "center",
  },
  [mediaTheme.breakpoints.down("xs")]: {
    textAlign: "center",
    fontSize: "1.8em",
  },
}));

export const Description = styled("h4")<{ color: string }>(({ color }) => ({
  fontWeight: "500",
  fontSize: "1.2em",
  color: color,
  lineHeight: "0.30vh",
  [mediaTheme.breakpoints.up("lg")]: {
    fontSize: "1.5em",
  },
  [mediaTheme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  [mediaTheme.breakpoints.down("xs")]: {
    fontSize: "1em",
  },
}));

export const otherPageLink = styled("a")<{ color: string }>(({ color }) => ({
  fontWeight: "700",
  fontSize: "1.1em",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
  color: color,
}));
