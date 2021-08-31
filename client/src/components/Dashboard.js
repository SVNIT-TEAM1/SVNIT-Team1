import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Box } from "@material-ui/core";

import Description from "./Description";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [symbol, setSymbol] = useState("AAPL");
  const [desc, setDesc] = useState({});
  const [error, setError] = useState(false);

  const getDescription = async () => {
    try {
      const resp = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_b8deb498d27c4f6ab328db52163822a7`
      );
      const response = await axios.post(
        "http://localhost:8000/companyStockData",
        symbol
      );
      console.log(response.data);
      console.log(resp.data);
      setDesc(resp.data);
      setSymbol("");
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
        <Grid item lg={8} xs={12}>
          <Paper className={classes.paper} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item xs={3}></Grid>
              <Grid item xs={8}>
                <Search
                  setSymbol={setSymbol}
                  symbol={symbol}
                  getDescription={getDescription}
                />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={12}>
                <Box m={3}>
                  <Description {...desc} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Paper className={classes.paper}>History</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
