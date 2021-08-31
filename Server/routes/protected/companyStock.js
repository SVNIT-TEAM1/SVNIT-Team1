const router = require("express").Router();



router.post("/", function(req, res){
    var data = req.body;
    console.log(data);
    
});

module.exports = router;
