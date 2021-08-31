const express = require('express');
const morgan = require('morgan');
const cors=require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const readJSON = require("./modules/readJSON.js");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passportLocalMongoose = require("passport-local-mongoose");

require('dotenv').config();


//app instance
const app = express();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const User = require("./modals/user.js");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb+srv://neelshah268:" + process.env.DBPASSWORD +"@cluster0.80dqt.mongodb.net/ohlc?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});





// function call to read JSONFILE
const read = new Promise(function(resolve, reject){
    let stocks = readJSON();
    //console.log("1");
    resolve(stocks);
})

read.then((values) => {
  //console.log("2");
  var stocks = values;
  app.set("stocks", stocks);
}).catch((err) => {
  console.log(err);
})



const port = process.env.PORT || 8000;
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
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
