import { AppBar, Box, IconButton, ListItemButton, ListItemText, Menu, MenuItem, styled } from "@mui/material";
import ColorLensIcon from '@mui/icons-material/ColorLens';
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
    paddingLeft: "1vw",
    fontSize: "2em",
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

export const MenuList = styled(Menu) ({
    overflowY: 'scroll',
    maxHeight: "35vh",
})

export const Item = styled(MenuItem) ({
    padding: "0.25vh 1vw"
})

export const ColorIcon = styled(ColorLensIcon)<{coloring :string}>(({coloring}) => ({
    color: coloring,
}))