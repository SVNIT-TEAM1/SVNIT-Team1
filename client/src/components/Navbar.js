import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, InputBase, IconButton, Paper } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
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
    flex: 1,
  },
  icon: {
      fill: "white",
  },
  /*menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },*/
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
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<div className={classes.search}>
            <div className={classes.searchIcon}>
            <IconButton>
              <SearchIcon />
              </IconButton>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={props.symbol}
              onChange={(e) => props.setSymbol(e.target.value)}
            />
            </div>*/}
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
      onChange={(e)=>props.setSymbol(e.target.value)}
    />
  <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={async(e)=>{
      e.preventDefault();
      await props.getDescription();
    }}>
      <SearchIcon className={classes.icon}/>
    </IconButton></Paper>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
