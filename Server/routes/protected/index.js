const router = require("express").Router();


const stocks = require("./companyStock.js");


router.use("/companyStockData", stocks);

module.exports = router;
