import { Box, Button, styled, TextField } from "@mui/material";
import { mediaTheme } from "../../Theme";

export const FormBox = styled(Box)({
  display: "flex",
  width: "30vw",
  justifyContent: "center",
});

export const FormSection = styled("section")({
  paddingTop: "2vh",
  paddingLeft: "15vw",
});

export const FormFields = styled("div")({
  display: "grid",
  justifyContent: "center",
});

export const Field = styled(TextField)({
  margin: "1vh 2vw",
  color: "#9E9E9E",
});

export const Title = styled("h1")({
  fontWeight: "300",
  textAlign: "center",
  fontSize: "38px",
  width: "50vw",
  marginBottom: "2vh",
});

export const SubmitButton = styled(Button)<{ coloring: string }>(
  ({ coloring }) => ({
    background: coloring,
    color: "white",
    "&:hover": {
      background: coloring,
      color: "white",
      fontWeight: "700",
    },
    fontWeight: "400",
    fontSize: "1.4em",
    height: "4vh",
    margin: "0.5vh 1vw 0vh 1vw",
    [mediaTheme.breakpoints.down('sm')]: {
      fontSize: "1em"
    },
  })
);
