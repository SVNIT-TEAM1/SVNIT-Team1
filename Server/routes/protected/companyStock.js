const router = require("express").Router();
const filter_stock = require("./../../modules/filter_stock.js")
const User = require("./../../modals/user.js");

router.post("/", function(req, res){
    if(req.isAuthenticated()){
        var data = req.body;
        // console.log(data);
        var stocks = req.app.get("stocks");
        User.updateOne({
            username: req.user.username 
        }, {
            $push: {
                history: data.symbol
            }
        }, function(err, out){
            if(err){
                console.log(err);
            }
        });
        var out = filter_stock(stocks, data.symbol, data.range , data.startdate);
        res.send(out);
    }else{
        res.sendStatus(404);
    }  
});

module.exports = router;
