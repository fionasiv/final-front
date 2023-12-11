import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import * as S from "./Navbar.style";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { List, ListItem, Drawer } from "@mui/material";
import Classes from "../views/Classes";
import Students from "../views/Students";
import Create from "../views/Create";
import { BrowserRouter, Routes, Route, Link as RouterLink,} from "react-router-dom";

export default function Navbar(props: any) {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const routes = [
    { path: "/", name: "Classes", Component: Classes },
    { path: "/students", name: "Students", Component: Students },
    { path: "/create", name: "Create", Component: Create },
  ];

  const toggleDrawer = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const listItems = routes.map((route) => (
    <ListItem key={route.name}>
      <S.ListButton>
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
