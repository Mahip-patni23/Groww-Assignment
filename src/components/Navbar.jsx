import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Close, Menu } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    fontFamily: "Raleway, sans-serif",
    fontWeight: 700,
  },
}));

function Navbar() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [drawer, setdrawer] = useState(null);
  const location = useLocation();
  const history = useHistory();

  const classes = useStyles();

  useEffect(() => {
    setActiveRoute(location.pathname);
    setdrawer(document.getElementById("drawer"));
  }, [location.pathname]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="mobileDisplay">
            <IconButton
              onClick={() => {
                drawer.classList.add("showDrawer");
              }}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
          </div>

          <Typography variant="h6" className={classes.title}>
            <Link to="/all-banks">
              <span style={{ color: "#ebebeb" }}>GROWW.. Search Your Own Bank </span>
            </Link>
          </Typography>

          <div className="desktopDisplay">
            <Button
              onClick={() => {
                history.push("/all-banks");
              }}
            >
              <span className={activeRoute === "/all-banks" ? "active" : null}>
                All banks
              </span>
            </Button>

            <Button
              onClick={() => {
                history.push("/favorites");
              }}
            >
              <span className={activeRoute === "/favorites" ? "active" : null}>
                Favorite banks
              </span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div className="drawer" id="drawer">
        <div className="closeButton">
          <IconButton
            onClick={() => {
              drawer.classList.remove("showDrawer");
            }}
            aria-label="close drawer"
            component="span"
          >
            <Close />
          </IconButton>
        </div>
        <Divider />
        <div className="drawerItems">
          <ul>
            <li>
              <Link
                to="/all-banks"
                onClick={() => {
                  drawer.classList.remove("showDrawer");
                }}
              >
                <span
                  className={activeRoute === "/all-banks" ? "active" : null}
                >
                  All banks
                </span>{" "}
              </Link>
            </li>
            <Divider />
            <li>
              <Link
                to="/favorites"
                onClick={() => {
                  drawer.classList.remove("showDrawer");
                }}
              >
                <span
                  className={activeRoute === "/favorites" ? "active" : null}
                >
                  Favorites
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;