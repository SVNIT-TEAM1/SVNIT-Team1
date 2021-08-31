import React from "react";
// import clsx from "clsx";
import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Paper,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    padding: theme.spacing(1, 2),
  },
  search: {
    // padding: '2px 4px',
    display: "flex",
    alignItems: "center",
    width: 500,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    color: "white",
  },
  input: {
    marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    flex: 1,
  },
  icon: {
    fill: "white",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  button: {
    float: "right",
  },
  hide: {
    display: "none",
  },
}));

const Navbar = (props) => {
  const history=useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={props.symbol}
              onChange={(e) => props.setSymbol(e.target.value)}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
              onClick={async (e) => {
                e.preventDefault();
                await props.getDescription();
              }}
            >
              <SearchIcon className={classes.icon} />
            </IconButton>
          </Paper>

          <Button className={classes.button} color="inherit" onClick={()=>{
              localStorage.removeItem('userId');
              history.push("/");
            }}>
            Logout
          </Button>
          {/*}<Button
            className={classes.button}
            onClick={props.handleDrawerOpen}
            className={clsx(props.open && classes.hide)}
            color="inherit"
          >
            <MenuIcon />
            History
          </Button>*/}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
