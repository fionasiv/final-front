import * as React from "react";
import * as S from "./Navbar.style";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { ThemeContext } from "../../App";
import {routes} from "../../consts"
import { PageRoute } from "../../types";
import ListModal from "../ListModal/ListModal";

export default function Navbar(props: any) {
  const theme = React.useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  }

  const listItems = routes.map((route: PageRoute) => (
    <ListItem key={route.name}>
      <S.ListButton onClick={() => handleNavigate(route.path)}>
        <S.ListText primary={route.name} />
      </S.ListButton>
    </ListItem>
  ));

  return (
    <S.DesignedNavbar coloring={theme}>
      <Toolbar>
        <S.Button onClick={toggleDrawer}>
          <MenuIcon />
        </S.Button>
        <S.Logo>Shob Classes</S.Logo>
        <S.Button onClick={props.handleThemeChange}>
          <S.themeChangeButton />
        </S.Button>
        <Drawer open={isOpen} onClose={toggleDrawer}>
          <S.drawerBox onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>{listItems}</List>
          </S.drawerBox>
        </Drawer>
      </Toolbar>
    </S.DesignedNavbar>
  );
}
