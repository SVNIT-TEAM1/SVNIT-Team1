import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Box,
  FormLabel,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import Description from "./Description";
import Navbar from "./Navbar";
import History from "./History";
require("dotenv").config();

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
  const [chart, setChart] = useState("ohlc");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [draw, setDraw] = useState(false);
  const [history, setHistory] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getHistory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8000/history",{userId:localStorage.getItem('userId')});
      setHistory(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDescription = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_b8deb498d27c4f6ab328db52163822a7`,
      );
      const response = await axios.post(
        "http://localhost:8000/companyStockData",
        { symbol, startdate: date, range, userId:localStorage.getItem('userId') }
      );
      setDesc(resp.data);
      //console.log(response.data);
      setValues(response.data);
      getHistory();
      setIsLoading(false);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const getChart = () => {
    if (chart == "bar" || chart == "lines") {
      var trace1 = {
        x: values.date,
        y: values.close,
        name: "Close",
        type: chart,
      };
      var trace2 = {
        x: values.date,
        y: values.high,
        name: "High",
        type: chart,
      };
      var trace3 = {
        x: values.date,
        y: values.low,
        name: "Low",
        type: chart,
      };

      var trace4 = {
        x: values.date,
        y: values.open,
        name: "Open",
        type: chart,
      };

      var data = [trace1, trace2, trace3, trace4];
      var layout = {
        xaxis: { title: "X axis" },
        yaxis: { title: "Y axis" },
        barmode: "relative",
      };
    } else {
      var trace = {
        x: values.date,
        close: values.close,
        high: values.high,
        low: values.low,
        open: values.open,

        // cutomise colors
        increasing: { line: { color: "black" } },
        decreasing: { line: { color: "red" } },

        // cutomise colors
        increasing: { line: { color: "black" } },
        decreasing: { line: { color: "red" } },

        type: chart,
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
    }

    return (
      <Grid item lg={12}>
        <Plot data={data} layout={layout} />
      </Grid>
    );
  };

  useEffect(() => {
    getDescription();
  }, []);

  const handleDrawerOpen = () => {
    setDraw(true);
  };

  const handleDrawerClose = () => {
    setDraw(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter initial date to filter data
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Start date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await getDescription();
              handleClose();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Navbar
        setSymbol={setSymbol}
        symbol={symbol}
        getDescription={getDescription}
        handleDrawerOpen={handleDrawerOpen}
        open={draw}
      />
      <div className={classes.root}>
        <Box m={3}>
          <Grid container spacing={3}>
            <Grid item lg={8} xs={12}>
              <Paper className={classes.paper} style={{ textAlign: "center" }}>
                <Grid container>
                  <Grid item lg={3} xs={12}>
                    <Grid container style={{ textAlign: "center" }}>
                      <Grid item lg={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Chart Type</FormLabel>
                          <RadioGroup
                            aria-label="chart"
                            name="chart"
                            value={chart}
                            onChange={(e) => setChart(e.target.value)}
                          >
                            <FormControlLabel
                              value="ohlc"
                              control={<Radio color="primary" />}
                              label="OHLC"
                            />
                            <FormControlLabel
                              value="candlestick"
                              control={<Radio color="primary" />}
                              label="Candlestick"
                            />
                            <FormControlLabel
                              value="bar"
                              control={<Radio color="primary" />}
                              label="Colored Bar"
                            />
                            <FormControlLabel
                              value="lines"
                              control={<Radio color="primary" />}
                              label="Vertex Line"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item lg={12} style={{ marginTop: 20 }}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Filters</FormLabel>
                          <RadioGroup
                            aria-label="range"
                            name="range"
                            value={range}
                            onChange={(e) => {
                              setRange(e.target.value);
                              setOpen(true);
                            }}
                          >
                            <FormControlLabel
                              value="MONTHLY"
                              control={<Radio color="primary" />}
                              label="Monthly"
                            />
                            <FormControlLabel
                              value="WEEKLY"
                              control={<Radio color="primary" />}
                              label="Weekly"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item lg={9} xs={12}>
                    {values && getChart()}
                  </Grid>
                  <Grid item lg={12}>
                    <Box m={3}>
                      <Description {...desc} loading={isLoading} />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item lg={4} xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5">History</Typography>
                <Table>
                  <TableBody>
                    {isLoading ? (
                      <>
                        <Skeleton component="TableRow" />
                        <Skeleton component="TableRow" />
                        <Skeleton component="TableRow" />
                        <Skeleton component="TableRow" />
                        <Skeleton component="TableRow" />
                      </>
                    ) : (
                      <>
                        {history.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item}</TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </Paper>
                        </Grid>
            {/*}<History
              open={draw}
              handleDrawerClose={handleDrawerClose}
              history={history}
            />*/}
          </Grid>
        </Box>
      </div>
    </>
  );
}
