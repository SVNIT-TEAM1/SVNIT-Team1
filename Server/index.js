const express = require('express');
const morgan = require('morgan');
const cors=require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const readJSON = require("./modules/readJSON.js");

const read = new Promise(function(resolve, reject){
    let stocks = readJSON();
    console.log("1");
    console.log(stocks);
    resolve(stocks);
})

let stocks = [];

read.then((values) => {
  stocks = values;
  console.log(stocks);
}).catch((err) => {
  console.log(err);
})
//app instance
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const routes = require("./routes");

app.use("/", routes);



//routes middleware

module.exports=app.listen(port, () => {
  console.log(
    `Server is running on port ${port}`
  );
});
