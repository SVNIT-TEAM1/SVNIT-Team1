const router = require("express").Router();
const getStockList = require("../../modules/getStockList.js")


router.post("/", (req,res)=>{
    if(req.isAuthenticated()){
        var stocks = req.app.get("stocks");
        var stockList = getStockList(stocks)
        res.json(stockList)
    }else{
        res.sendStatus(404);
    }   
})

module.exports = router;