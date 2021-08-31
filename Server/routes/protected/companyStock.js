const router = require("express").Router();
const filter_stock = require("./../../modules/filter_stock.js")
const User = require("./../../modals/user.js");

router.post("/", function(req, res){
  
        var data = req.body;
        // console.log(data);
        var stocks = req.app.get("stocks");
        User.updateOne({
            _id:req.body.userId
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

});

module.exports = router;
