const router = require("express").Router();


const stocks = require("./companyStock.js");
const companyList = require('./companyList.js')
const history = require('./history.js')

router.use("/companyList",companyList);
router.use("/history", history);
router.use("/companyStockData", stocks);

module.exports = router;
