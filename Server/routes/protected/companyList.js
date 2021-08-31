const router = require("express").Router();
const getStockList = require("../../modules/getStockList.js")


router.post("/", (req,res)=>{
    var stocks = req.app.get("stocks");
    var stockList = getStockList(stocks)
    res.json(stockList)
})

module.exports = router;