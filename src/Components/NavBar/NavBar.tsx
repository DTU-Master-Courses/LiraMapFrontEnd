import AppBar from "@material-ui/core/AppBar";
import Icon from "@material-ui/core/Icon";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  alpha,
  Button,
  ListItemButton,
  Menu,
  MenuProps,
  styled,
  ThemeProvider,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import React, { FC } from "react";
import "../NavBar/NavBar.css";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface NavBarProps {
  setRidesIsRendered: any;
}
const NavBar: FC<NavBarProps> = ({ setRidesIsRendered }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 

  const drawer = (
    <div>
      <List>
        <ListItemButton
          onClick={() => {
            handleClose();
            setRidesIsRendered(true);
          }}
        >
          <ListItemText primary={"Trips"} />
        </ListItemButton>
      </List>
    </div>
  );
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        style={{
          background: "white",
          maxWidth: "305px",
          borderRadius: "10px",
          left: "0",
          marginTop: theme.spacing(2),
          marginLeft: theme.spacing(2),
        }}
        elevation={1}
      >
        <Toolbar>
          <div
            className="wrap"
            style={{ display: "flex", alignItems: "center", width: "700px" }}
          >
            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <MenuIcon />
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {drawer}
              </StyledMenu>
            </div>
            <Icon style={{ minHeight: "59px", minWidth: "194px" }}>
              <img src="/lira-logo.svg" alt="app logo" />
            </Icon>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
