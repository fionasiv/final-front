import { Box, Button, styled, TextField } from "@mui/material";

export const FormBox = styled(Box)({
  display: "flex",
  width: "30vw",
  justifyContent: "center",
});

export const FormSection = styled("section")({
  width: "30vw",
  paddingTop: "3vh",
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
  width: "30vw",
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
    fontSize: "20px",
    height: "4vh",
    marginTop: "0.5vh",
  })
);
