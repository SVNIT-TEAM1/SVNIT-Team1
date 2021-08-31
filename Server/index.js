const express = require('express');
const morgan = require('morgan');
const cors=require("cors");
const path = require("path");

//app instance
const app = express();
const port = process.env.PORT || 8000;

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());

  //routes middleware

  module.exports=app.listen(port, () => {
  console.log(
    `Server is running on port ${port}`
  );
});
