import * as React from "react";
import * as S from "./Navbar.style";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { ThemeContext } from "../../App";
import { routes, themes } from "../../consts/AppConsts";
import { PageRoute, ThemeData } from "../../interfaces";

export default function Navbar(props: any) {
  const theme = React.useContext(ThemeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleThemeChange = (themeName: string) => {
    props.handleThemeChange(themeName);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listItems = routes.map((route: PageRoute) => (
    <ListItem key={route.name}>
      <S.ListButton onClick={() => handleNavigate(route.path)}>
        <S.ListText primary={route.name} />
      </S.ListButton>
    </ListItem>
  ));

  const themesList = themes.map((theme: ThemeData) => (
    <S.Item
      value={theme.name}
      key={theme.name}
      onClick={() => handleThemeChange(theme.name)}
    >
      <S.ColorIcon coloring={theme.hexColor} />
    </S.Item>
  ));

  return (
    <S.DesignedNavbar coloring={theme.hexColor}>
      <Toolbar>
        <S.Button onClick={toggleDrawer}>
          <MenuIcon />
        </S.Button>
        <S.Logo>Shob Classes</S.Logo>
        <S.Button
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
          onClick={handleClick}
        >
          <S.themeChangeButton />
        </S.Button>
        <S.MenuList
          open={Boolean(anchorEl)}
          onClose={handleClose}
          defaultValue={theme.name}
          anchorEl={anchorEl}
        >
          {themesList}
        </S.MenuList>
        <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
          <S.drawerBox onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>{listItems}</List>
          </S.drawerBox>
        </Drawer>
      </Toolbar>
    </S.DesignedNavbar>
  );
}
