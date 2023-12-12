import { Box, IconButton, Avatar, styled } from "@mui/material";

export const DesignedBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "15vw",
  bgcolor: "background.paper",
  background: "white",
  borderRadius: "5px",
  textAlign: "center",
});

export const Title = styled("h3")({
  fontWeight: "400",
});

export const Item = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "0vh 0.5vw 2vh 1.5vw"
});

export const IconAvatar = styled(Avatar)({
    width: "30px",
    height: "30px"
})

export const Name = styled("small")({
    marginTop: "0.8vh",
})

export const Button = styled(IconButton)<{coloring: string}>(({coloring}) => ({
    color: coloring,
    marginTop: "-1vh"
}))

// export const Icon = styled(DeleteIcon)<{coloring: string}>(({coloring}) => ({
//     color: coloring,
// }))