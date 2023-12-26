import { styled } from "@mui/material";
import { mediaTheme } from "../../Theme";

export const FormFields = styled("div")({
  display: "flex",
  justifyContent: "center",
});

export const Image = styled("img")({
  [mediaTheme.breakpoints.up("lg")]: {
    width: "50vw",
    marginTop: "5vh",
  },
});

export const TextArea = styled("section")({
  direction: "rtl",
  marginTop: "20vh",
});

export const Title = styled("h1")<{ coloring: string }>(({ coloring }) => ({
  fontWeight: "700",
  fontSize: "3em",
  color: coloring,
}));

export const Description = styled("h4")<{ color: string }>(({ color }) => ({
  fontWeight: "500",
  fontSize: "1.5em",
  color: color,
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
