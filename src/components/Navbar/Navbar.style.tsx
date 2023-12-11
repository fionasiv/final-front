import { AppBar, Box, IconButton, ListItemButton, ListItemText, styled } from "@mui/material";
import LoyaltyIcon from '@mui/icons-material/Loyalty';

export const DesignedNavbar = styled(AppBar)<{coloring :string}>(({coloring}) => ({
    backgroundColor: coloring,
    position: "static",
    justifyContent: "start",
    padding: "1vh 1vw"
}))

export const Button = styled(IconButton) ({
    color: "white",
    marginLeft: "1vw"
})

export const Logo = styled("h1") ({
    fontFamily: "Roboto",
    fontWeight: "400",
    paddingLeft: "1vw"
})

export const themeChangeButton = styled(LoyaltyIcon) ({
    fontSize: "35px",
})

export const drawerBox = styled(Box) ({
    width: "150px",
})

export const ListText = styled(ListItemText) ({
    textAlign: "center",
})

export const ListButton = styled(ListItemButton) ({
    padding: "0vw 0vh"
})