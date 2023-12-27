import { Box, IconButton, Avatar, styled } from "@mui/material";
import { mediaTheme } from "../../Theme";


export const DesignedBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "8px",
  textAlign: "center",
  overflow: "hidden",
  [mediaTheme.breakpoints.up("md")]: {
    width: "18vw",
  },
  [mediaTheme.breakpoints.only("md")]: {
    width: "20vw",
  },
  [mediaTheme.breakpoints.only("sm")]: {
    width: "30vw",
  },
  [mediaTheme.breakpoints.only("xs")]: {
    width: "40vw",
  },
  [mediaTheme.breakpoints.down("xs")]: {
    width: "50vw",
  },
});

export const ListWrapper = styled("div")({
  height: "40vh",
  overflowY: "auto",
})

export const Title = styled("h3")({
  fontWeight: "400",
});

export const Item = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "0vh 0.5vw 2vh 1vw",
});

export const IconAvatar = styled(Avatar)({
  width: "30px",
  height: "30px",
  marginLeft: "1vw",
});

export const Name = styled("small")({
  marginTop: "0.8vh",
});

export const Button = styled(IconButton)<{ coloring: string }>(
  ({ coloring }) => ({
    color: coloring,
    marginTop: "-1vh",
  })
);
