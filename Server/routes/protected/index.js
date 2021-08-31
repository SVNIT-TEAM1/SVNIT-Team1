const router = require("express").Router();


const stocks = require("./companyStock.js");
const companyList = require('./companyList.js')


router.use("/companyList",companyList);

router.use("/companyStockData", stocks);

module.exports = router;
