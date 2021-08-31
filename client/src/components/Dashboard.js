import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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
  const [values, setValues] = useState("");
  const [date, setDate] = useState("2021-08-01");
  const [range, setRange] = useState("MONTHLY");
  const [isLoading, setIsLoading] = useState(true);

  const getDescription = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_b8deb498d27c4f6ab328db52163822a7`
      );
      const response = await axios.post(
        "http://localhost:8000/companyStockData",
        { symbol, startdate: date, range }
      );
      setDesc(resp.data);
      //console.log(response.data);
      setValues(response.data);
      setIsLoading(false);
      setSymbol("");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const getChart = () => {
    var trace = {
      x: values.row,
      close: values.close,
      high: values.high,
      low: values.low,
      open: values.open,

      // cutomise colors
      increasing: { line: { color: "black" } },
      decreasing: { line: { color: "red" } },

      type: "ohlc",
      xaxis: "x",
      yaxis: "y",
    };

    var data = [trace];

    var layout = {
      dragmode: "zoom",
      showlegend: false,
      xaxis: {
        rangeslider: {
          visible: false,
        },
      },
    };
    return (
      <Grid item lg={12}>
        <Plot data={data} layout={layout} />
      </Grid>
    );
  };

  useEffect(() => {
    getDescription();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={8} xs={12}>
          <Paper className={classes.paper} style={{ textAlign: "center" }}>
            <Grid container>
              <Grid item lg={4} xs={12}></Grid>
              <Grid item lg={4} xs={12}>
                <Search
                  setSymbol={setSymbol}
                  symbol={symbol}
                  getDescription={getDescription}
                />
              </Grid>
              <Grid item lg={4} xs={12}></Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Paper className={classes.paper}>History</Paper>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Grid item lg={12}>
            <Paper className={classes.paper} style={{ textAlign: "center" }}>
              {values && getChart()}
            </Paper>
          </Grid>
        </Grid>
        <Grid lg={4}></Grid>
        <Grid item lg={8} xs={12}>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ textAlign: "center" }}>
              <Box m={3}>
                <Description {...desc} loading={isLoading} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
