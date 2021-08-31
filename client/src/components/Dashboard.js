import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Box,FormLabel, FormControlLabel, FormControl, RadioGroup, Radio, TextField, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Skeleton } from "@material-ui/lab";
import Search from "./Search";
import Description from "./Description";
import Navbar from "./Navbar";

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
  const [values,setValues]=useState("");
  const [date,setDate]=useState("2021-08-01");
  const [range,setRange]=useState("MONTHLY");
  const [chart,setChart]=useState("ohlc");
  const [open,setOpen]=useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };

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
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const getChart = () => {
    if(chart=="bar"||chart=='lines'){
      var trace1 = {
   x: values.date,
   y: values.close,
   name: 'Close',
   type: chart
 };
 var trace2 = {
   x: values.date,
   y: values.high,
   name: 'High',
   type: chart
 };
 var trace3 = {
   x: values.date,
   y: values.low,
   name: 'Low',
   type: chart
  }

  var trace4 = {
   x: values.date,
   y: values.open,
   name: 'Open',
   type: chart
  }

 var data = [trace1, trace2, trace3, trace4];
 var layout = {
   xaxis: {title: 'X axis'},
   yaxis: {title: 'Y axis'},
   barmode: 'relative'
 };
    }else{
      var trace = {
    x: values.date,
    close: values.close,
    high: values.high,
    low: values.low,
    open: values.open,

    // cutomise colors
    increasing: {line: {color: 'black'}},
    decreasing: {line: {color: 'red'}},

        // cutomise colors
        increasing: { line: { color: "black" } },
        decreasing: { line: { color: "red" } },

        type:chart,
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

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
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
            onChange={(e)=>setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={async()=>{
              await getDescription();
              handleClose();
            }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

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
               <Grid container>
                 <Grid item lg={3}>
               <Paper className={classes.paper} style={{ textAlign: "center" }}>
                <Grid container style={{ textAlign: "center" }}>
                  <Grid item lg={12}>
                 <FormControl component="fieldset">
  <FormLabel component="legend">Chart Type</FormLabel>
  <RadioGroup aria-label="chart" name="chart" value={chart} onChange={(e)=>setChart(e.target.value)}>
    <FormControlLabel value="ohlc" control={<Radio color="primary"/>} label="OHLC" />
    <FormControlLabel value="candlestick" control={<Radio color="primary"/>} label="Candlestick" />
    <FormControlLabel value="bar" control={<Radio color="primary"/>} label="Colored Bar" />
    <FormControlLabel value="lines" control={<Radio color="primary"/>} label="Vertex Line" />
  </RadioGroup>
</FormControl>
</Grid>
<Grid item lg={12} style={{marginTop:20}}>
<FormControl component="fieldset">
<FormLabel component="legend">Filters</FormLabel>
  <RadioGroup aria-label="range" name="range" value={range} onChange={(e)=>{setRange(e.target.value);setOpen(true)}}>
    <FormControlLabel value="MONTHLY" control={<Radio color="primary"/>} label="Monthly" />
    <FormControlLabel value="WEEKLY" control={<Radio color="primary"/>} label="Weekly" />
  </RadioGroup>
</FormControl>
</Grid>
</Grid>




             </Paper>

               </Grid>
                <Grid item lg={9}>
              <Paper className={classes.paper} style={{ textAlign: "center" }}>{values&&getChart()}</Paper>
              </Grid>
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
