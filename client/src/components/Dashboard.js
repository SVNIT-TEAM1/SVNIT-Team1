import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Description from "./Description";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState({});

  const onSearch = (sym) => {
    axios
      .get(
        "https://cloud.iexapis.com/stable/stock/" +
          sym +
          "/company?token=pk_b8deb498d27c4f6ab328db52163822a7"
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    onSearch(symbol);
  }, [symbol]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>Search, Chart</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>History</Paper>
          <Description data={data} />
        </Grid>
      </Grid>
    </div>
  );
}
