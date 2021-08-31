import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Description from "./Description";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 25,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [symbol, setSymbol] = useState("AAPL");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(false);

  const getDescription = async () => {
    try {
      const resp = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_b8deb498d27c4f6ab328db52163822a7`
      );

      console.log(resp.data);
      setDesc(resp.data);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    getDescription();
  }, [symbol]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={8}>
                <Search setSymbol={setSymbol} getDescription={getDescription} />
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>History</Paper>
  {/*<Description data={desc} />*/}
        </Grid>
      </Grid>
    </div>
  );
}
